import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import addWorkerPage from '../../pages/add-worker-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';

TestModule('Add Worker - Enrollment status field');

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.新規従業員登録の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();
});

TestCase('BMS-106. BMS:案件:従業員マスタ作成:在籍状況:選択肢', async () => {
    gondola.report(`Step 2. 「在籍状況」チェックボックスで選択肢を確認する`);
    gondola.report(`VP. 「在籍状況」の選択肢が一つあり、「退職済」を含めていること。`);
    const actualResult = await addWorkerPage.doesCheckboxLabelExist('退職済');
    await gondola.checkEqual(actualResult, true, 'Checkbox label does not exist');
});
