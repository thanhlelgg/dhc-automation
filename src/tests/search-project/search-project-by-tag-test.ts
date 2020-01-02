import { gondola, TestCase, TestModule } from 'gondolajs';
import listProjectPage from '../../pages/list-project-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import { DatabaseHelper } from '../../helper/database-helpers';
import setup from './search-project-setup';

TestModule('Search project - Search project by tag');

const PROJECT_TAG_SEARCH = 'PS';

Before(setup);

TestCase('BMS-116. BMS:案件:案件検索:タグ', async () => {
    const expectedResults: any[] = [];
    let actualResults: any[] = [];

    const resultsFromDatabase = await DatabaseHelper.getProjectsBy({ tag: PROJECT_TAG_SEARCH });
    resultsFromDatabase.forEach(v => {
        expectedResults.push((v.number as string).trim());
    });

    gondola.report(`Step 2. タグで文字列の部分を入力し、検索する`);
    await listProjectPage.searchProject({ tag: PROJECT_TAG_SEARCH });

    actualResults = await listProjectPage.getResultsOfAllPagesOnOneColumn(SearchResultColumn.CODE);
    gondola.report(`VP. 部分一致するタグである案件が表示されること。`);
    await gondola.checkEqual(actualResults.sort(), expectedResults.sort(), 'Search result should be correct');
});
