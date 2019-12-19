import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import listProjectPage from '../../pages/list-project-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Search project - Search project by customer');

const PROJECT_CUSTOMER_KEY_SEARCH = 'Gatebox';

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.案件一覧の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListProject();
});

TestCase('BMS-113. BMS:案件:案件検索:取引先', async () => {
    gondola.report(`Step 2. 検索付きプルダウンを確認する`);
    gondola.report(`Step 3. 検索条件を入力する`);
    gondola.report(`Step 4. 検索結果を選択し、検索する`);
    await listProjectPage.searchProject({ customerName: PROJECT_CUSTOMER_KEY_SEARCH });
    let actualResult = await listProjectPage.verifySearchResultsByOneColumn(
        PROJECT_CUSTOMER_KEY_SEARCH,
        SearchResultColumn.SUPPLIERS,
        true,
    );
    gondola.report(`VP. 選択したものと一致する取引先名である案件が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');

    gondola.report(`Step 5. 検索結果をクリアする`);
    await listProjectPage.clearSelectedCustomer();
    let selectedSearchResult = await listProjectPage.getCurrentSelectedCustomer();
    gondola.report(`VP. 選択した検索結果がクリアされること。`);
    await gondola.checkEqual(selectedSearchResult, '', 'The selected search results should be cleared.');
});
