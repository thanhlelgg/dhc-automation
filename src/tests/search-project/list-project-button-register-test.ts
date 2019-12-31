import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import listProjectPage from '../../pages/list-project-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import addProjectPage from '../../pages/add-project-page';

TestModule('Search project - Verify button add new project');

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.案件一覧の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListProject();
});

TestCase('BMS-117. BMS:案件:案件検索:新規登録ボタン', async () => {
    gondola.report(`Step 2.「新規登録」ボタンをクリックする`);
    listProjectPage.gotoAddNewProjectPage();
    gondola.report(`VP. 新規登録画面に遷移すること。`);
    await gondola.checkTrue(await addProjectPage.isCurrentPage(), 'New project page should be displayed.');
});
