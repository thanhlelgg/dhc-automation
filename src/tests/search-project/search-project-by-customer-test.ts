import { gondola, TestCase, TestModule } from 'gondolajs';
import listProjectPage from '../../pages/list-project-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import setup from './search-project-setup';

TestModule('Search project - Search project by customer');

const PROJECT_CUSTOMER_KEY_SEARCH = 'Gatebox';

Before(setup);

TestCase('BMS-113. BMS:案件:案件検索:取引先', async () => {
    gondola.report(`Step 2. 検索付きプルダウンを確認する`);
    gondola.report(`Step 3. 検索条件を入力する`);
    gondola.report(`Step 4. 検索結果を選択し、検索する`);
    await listProjectPage.searchProject({ customerName: PROJECT_CUSTOMER_KEY_SEARCH });
    const actualResult = await listProjectPage.verifySearchResultsByOneColumn(
        PROJECT_CUSTOMER_KEY_SEARCH,
        SearchResultColumn.SUPPLIERS,
        true,
    );
    gondola.report(`VP. 選択したものと一致する取引先名である案件が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');

    gondola.report(`Step 5. 検索結果をクリアする`);
    await listProjectPage.clearSelectedCustomer();
    const selectedSearchResult = await listProjectPage.getCurrentSelectedCustomer();
    gondola.report(`VP. 選択した検索結果がクリアされること。`);
    await gondola.checkEqual(selectedSearchResult, '', 'The selected search results should be cleared.');
});
