import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import addWorkerPage from '../../pages/add-worker-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Worker - Worker note field validation');

const WORKER_NOTE_FIELD_NAME = Constants.translator.fieldName.addWorker.note;
const TEXT_1024_CHARACTERS = Utilities.getRandomText(1024);
const TEXT_1025_CHARACTERS = Utilities.getRandomText(1025);

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.新規従業員登録の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();
});

TestCase('BMS-107. BMS:案件:従業員マスタ作成:備考:文字数', async () => {
    gondola.report(`Step 2.「備考」で1024文字を入力し、保存する`);
    await addWorkerPage.enterTextAreaByLabel(WORKER_NOTE_FIELD_NAME, TEXT_1024_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されないこと。`);
    let actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_NOTE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should be not displayed');

    gondola.report(`Step 3.「備考」で1025文字以上を入力し、保存する`);
    await addWorkerPage.enterTextAreaByLabel(WORKER_NOTE_FIELD_NAME, TEXT_1025_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP.入力フィールドの下にエラー「1024文字以内で入力してください」が表示されること。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_NOTE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.exceededNOCErrorMessage1024,
        'Invalid feedback message should be correct',
    );
});
