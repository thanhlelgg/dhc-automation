import { Data, TestModule, gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import listProjectPage from '../../pages/list-project-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Search project - Search project by status');

const PROJECT_STATUS_FIELD_NAME = Constants.translator.fieldName.addProject.status;
const PROJECT_STATUSES = Object.values(Constants.projectStatuses);

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.案件一覧の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListProject();
});

Data(PROJECT_STATUSES).TestCase('BMS-114. BMS:案件:案件検索:ステータス', async (current: any) => {
    await gondola.report(`Step 2. ステータス」プルダウンの選択肢を確認する`, '');
    gondola.report(
        `VP. 「ステータス」プルダウンの選択肢が八つあり、「見込」、「見積済」、「仮受注」、「受注済」、「納品済」、「完了」、「延期」と「失注」を含めていること。`,
    );
    await gondola.checkTrue(
        await listProjectPage.doesSelectorByLabelOptionsExist(PROJECT_STATUS_FIELD_NAME, PROJECT_STATUSES.concat('')),
        'Project status options should be displayed correctly',
    );

    gondola.report(`Step 3. ステータス」プルダウンで任意の選択肢を選択し、検索する`);
    await listProjectPage.searchProject({ status: current });
    let actualResult = await listProjectPage.verifySearchResultsByOneColumn(current, SearchResultColumn.STATUS, true);
    gondola.report(`VP. 選択したものと一致するステータスである案件が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
});
