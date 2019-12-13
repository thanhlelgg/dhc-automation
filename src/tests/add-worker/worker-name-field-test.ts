import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import addWorkerPage from '../../pages/add-worker-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Worker - Worker name field validation');

const WORKER_NAME_FIELD_NAME = Constants.translator.fieldName.addWorker.name;
const TEXT_64_CHARACTERS = Utilities.getRandomText(64);
const TEXT_65_CHARACTERS = Utilities.getRandomText(65);

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.新規従業員登録の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();
});

TestCase('BMS-103. BMS:案件:従業員マスタ作成:従業員名:入力確認', async () => {
    gondola.report(`Step 2.「従業員名」で入力しなくて、保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須です」が表示されること。`);
    const actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3.「従業員名」で64文字を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_NAME_FIELD_NAME, TEXT_64_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addWorkerPage.getTextFieldValueByLabel(WORKER_NAME_FIELD_NAME),
        TEXT_64_CHARACTERS,
        'Invalid feedback message should be not displayed.',
    );

    gondola.report(`Step 4. 「従業員名」で65文字以上を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_NAME_FIELD_NAME, TEXT_65_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    await gondola.checkNotEqual(
        await addWorkerPage.getTextFieldValueByLabel(WORKER_NAME_FIELD_NAME),
        TEXT_65_CHARACTERS,
        'Invalid feedback message should be correct.',
    );
});