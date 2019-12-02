import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../pages/login-page';
import addWorkerPage from '../pages/add-worker-page';
import businessSystemPage from '../pages/business-system-page';
import { Constants } from '../common/constants';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { Utilities } from '../common/utilities';

TestModule('Add Worker validation');

const WORKER_CODE_FIELD_NAME = Constants.translator.workerFieldName.code;
const WORKER_NAME_FIELD_NAME = Constants.translator.workerFieldName.name;
const TEXT_20_CHARACTERS = Constants.exceededNOCMessage.substr(0, 20);
const TEXT_21_CHARACTERS = Constants.exceededNOCMessage.substr(0, 21);
const TEXT_50_CHARACTERS = Constants.exceededNOCMessage.substr(0, 50);
const TEXT_51_CHARACTERS = Constants.exceededNOCMessage.substr(0, 51)
const TEXT_FULL_SIZE_ALPHANUMERIC = 'ａｂｃｄ１２３４';
const TEXT_HIRAGANA_KATAKANA = 'あああｱｱｱハハハ';
const TEXT_SYMBOL = `!"#$%&'()`;
const TEXT_HALF_SIZE_ALPHANUMERIC = 'abcd1234';

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.新規従業員登録の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();
});

TestCase('BMS-102. BMS:案件:従業員マスタ作成:従業員コード:入力確認', async () => {
    gondola.report(`Step 2.「従業員コード」で入力しなくて、保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    let actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3.「従業員コード」で20文字を入力する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_20_CHARACTERS);
    gondola.report(`VP. 20文字まで入力できること。`);
    await gondola.checkEqual(
        await addWorkerPage.getTextFieldValueByLabel(WORKER_CODE_FIELD_NAME),
        TEXT_20_CHARACTERS,
        'Cannot input to 20 characters.',
    );

    gondola.report(`Step 4. 「従業員コード」で21文字を入力する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_21_CHARACTERS);
    gondola.report(`VP. 21目の文字まで入力できないこと。`);
    await gondola.checkNotEqual(
        await addWorkerPage.getTextFieldValueByLabel(WORKER_CODE_FIELD_NAME),
        TEXT_21_CHARACTERS,
        'Can input to 21 characters.',
    );

    gondola.report(`Step 5. 「従業員コード」で全角英数字を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_FULL_SIZE_ALPHANUMERIC);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「。。。」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.characterTypeErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 6. 「従業員コード」でひらがな・カタカナ字を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_HIRAGANA_KATAKANA);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「。。。」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.characterTypeErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 7. 「従業員コード」で記号を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_SYMBOL);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「。。。」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.characterTypeErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 8. 「従業員コード」で半角英数字を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_HALF_SIZE_ALPHANUMERIC);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「。。。」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        '',
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-103. BMS:案件:従業員マスタ作成:従業員名:入力確認', async () => {
    gondola.report(`Step 2.「従業員名」で入力しなくて、保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    let actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3.「従業員名」で50文字を入力する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_NAME_FIELD_NAME, TEXT_50_CHARACTERS);
    gondola.report(`VP. 50文字まで入力できること。`);
    await gondola.checkEqual(
        await addWorkerPage.getTextFieldValueByLabel(WORKER_NAME_FIELD_NAME),
        TEXT_50_CHARACTERS,
        'Cannot input to 50 characters.',
    );

    gondola.report(`Step 4. 「従業員名」で51文字を入力する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_NAME_FIELD_NAME, TEXT_51_CHARACTERS);
    gondola.report(`VP. 51目の文字まで入力できないこと。`);
    await gondola.checkNotEqual(
        await addWorkerPage.getTextFieldValueByLabel(WORKER_NAME_FIELD_NAME),
        TEXT_51_CHARACTERS,
        'Can input to 51 characters.',
    );
});
