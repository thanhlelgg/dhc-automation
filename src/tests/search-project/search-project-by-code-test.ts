import { gondola, TestCase, TestModule } from 'gondolajs';
import listProjectPage from '../../pages/list-project-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import setup from './search-project-setup';

TestModule('Search project - Search project by code');

const PROJECT_CODE_PARTIAL_SEARCH = '1';
const PROJECT_CODE_IGNORE_CHARACTER_WIDTH_SEARCH = '123';
const PROJECT_CODE_IGNORE_LOWER_UPPERCASE_SEARCH = 'ABC';
const PROJECT_CODE_IGNORE_DAKUTEN_HANDAKUTEN_SEARCH = 'ひひ';

Before(setup);

TestCase('BMS-111. BMS:案件:案件検索:案件番号', async () => {
    gondola.report(`Step 2.案件番号で一部の検索条件を入力し、「検索」ボタンをクリックする。（例：「１」を入力`);
    await listProjectPage.searchProject({ projectCode: PROJECT_CODE_PARTIAL_SEARCH });
    let actualResult = await listProjectPage.verifySearchResultsByOneColumn(
        PROJECT_CODE_PARTIAL_SEARCH,
        SearchResultColumn.CODE,
        false,
    );
    gondola.report(`VP. 一部として入力した文字を含めている案件が表示されないこと。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');

    gondola.report(`Step 3.全角半角は無視して検索する。（例：「１２３」を入力）`);
    await listProjectPage.searchProject({ projectCode: PROJECT_CODE_IGNORE_CHARACTER_WIDTH_SEARCH });
    actualResult = await listProjectPage.verifySearchResultsByOneColumn(
        PROJECT_CODE_IGNORE_CHARACTER_WIDTH_SEARCH,
        SearchResultColumn.CODE,
        false,
    );
    gondola.report(`VP. 検索結果で「１２３」と「123」の案件番号が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');

    gondola.report(`Step 4. 大文字小文字は無視して検索する。（例：「ABC」を入力）`);
    await listProjectPage.searchProject({ projectCode: PROJECT_CODE_IGNORE_LOWER_UPPERCASE_SEARCH });
    actualResult = await listProjectPage.verifySearchResultsByOneColumn(
        PROJECT_CODE_IGNORE_LOWER_UPPERCASE_SEARCH,
        SearchResultColumn.CODE,
        false,
    );
    gondola.report(`VP. 検索結果で「abc」と「ABC」の案件番号が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');

    gondola.report(`Step 5. 濁点半濁点は無視して検索する。（例：「ひひ」を入力）`);
    await listProjectPage.searchProject({ projectCode: PROJECT_CODE_IGNORE_DAKUTEN_HANDAKUTEN_SEARCH });
    actualResult = await listProjectPage.verifySearchResultsByOneColumn(
        PROJECT_CODE_IGNORE_DAKUTEN_HANDAKUTEN_SEARCH,
        SearchResultColumn.CODE,
        false,
    );
    gondola.report(`VP. 検索結果で「ひひ」と「びび」と「ぴぴ」の案件番号が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
});
