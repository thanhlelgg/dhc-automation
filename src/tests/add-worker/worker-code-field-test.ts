import { gondola, TestCase, TestModule } from 'gondolajs';
import addWorkerPage from '../../pages/add-worker-page';
import { Constants } from '../../common/constants';
import { DatabaseHelper } from '../../helper/database-helpers';
import { WorkerInfoData } from '../../models/worker-info';
import { Utilities } from '../../common/utilities';
import setup from './add-worker-setup';

TestModule('Add Worker - Worker code field validation');

const WORKER_CODE_FIELD_NAME = Constants.translator.fieldName.addWorker.code;
const TEXT_16_CHARACTERS = Utilities.getRandomText(16);
const TEXT_17_CHARACTERS = Utilities.getRandomText(17);
const TEXT_FULL_SIZE_ALPHANUMERIC = Constants.FULL_SIZE_ALPHA_NUMERIC_STRING;
const TEXT_HIRAGANA_KATAKANA = Constants.HIRAGANA_KATAKANA_STRING;
const TEXT_SYMBOL = Constants.SYMBOL_STRING;
const TEXT_HALF_SIZE_ALPHANUMERIC = Constants.HALF_SIZE_ALPHA_NUMERIC_STRING;
const WORKER_INFO_REQUIRED_ONLY = WorkerInfoData.WORKER_REQUIRED_DATA;

Before(setup);

TestCase('BMS-102. BMS:案件:従業員マスタ作成:従業員コード:文字数', async () => {
    gondola.report(`Step 2.「従業員コード」で入力しなくて、保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    const actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3.「従業員コード」で16文字を入力し、「保存」ボタンをクリックする。`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_16_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME),
        '',
        'Invalid feedback message should be not displayed.',
    );

    gondola.report(`Step 4. 「従業員コード」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_17_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    await gondola.checkNotEqual(
        await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME),
        16 + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback message should be correct.',
    );
});

TestCase('BMS-174. BMS:案件:従業員マスタ作成:従業員コード:文字種', async () => {
    gondola.report(`Step 2. 「従業員コード」で全角英数字を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_FULL_SIZE_ALPHANUMERIC);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: No error message displayed
    let actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3. 「従業員コード」でひらがな・カタカナ字を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_HIRAGANA_KATAKANA);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 4. 「従業員コード」で記号を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_SYMBOL);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 5. 「従業員コード」で半角英数字を入力し、保存する`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_CODE_FIELD_NAME, TEXT_HALF_SIZE_ALPHANUMERIC);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');
});

TestCase('BMS-175. BMS:案件:従業員マスタ作成:従業員コード:重複時', async () => {
    const workerData = WORKER_INFO_REQUIRED_ONLY;
    workerData.workerCode = await DatabaseHelper.getExistedWorkerCode();
    gondola.report(`Step 2. 「従業員コード」で重複しているコードを入力し、保存する。`);
    await addWorkerPage.inputWorkerInformation(workerData);
    await addWorkerPage.saveNewWorker();
    gondola.report(
        `VP. 入力フィールドの下にエラー「既に使われている値のため異なる値を入力してください」が表示されること。`,
    );
    const actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        WORKER_CODE_FIELD_NAME + Constants.translator.invalidFeedback.isDuplicated,
        'Invalid feedback message should be correct',
    );
});
