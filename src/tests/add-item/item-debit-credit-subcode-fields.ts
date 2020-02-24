import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Debit/Credit Subcode validation');

const DEBIT_SUBCODE_FIELD_NAME = Constants.translator.fieldName.addItem.debitSubcode;
const CREDIT_SUBCODE_FIELD_NAME = Constants.translator.fieldName.addItem.creditSubcode;

const TEXT_16_CHARACTERS = Utilities.getRandomText(16);
const TEXT_17_CHARACTERS = Utilities.getRandomText(17);

const TEXT_FULL_SIZE_ALPHANUMERIC = Constants.FULL_SIZE_ALPHA_NUMERIC_STRING;
const TEXT_HIRAGANA_KATAKANA = Constants.HIRAGANA_KATAKANA_STRING;
const TEXT_SYMBOL = Constants.SYMBOL_STRING;
const TEXT_HALF_SIZE_ALPHANUMERIC = Constants.HALF_SIZE_ALPHA_NUMERIC_STRING;

Before(setup);

TestCase('BMS-201. BMS:マスタ:品目作成:借方補助コード:文字数', async () => {
    gondola.report(`Step 2. 「借方補助コード」で16文字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(DEBIT_SUBCODE_FIELD_NAME, TEXT_16_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(DEBIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 3.「借方補助コード」で17文字以上を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(DEBIT_SUBCODE_FIELD_NAME, TEXT_17_CHARACTERS);
    await addItemPage.saveNewItem();
    //BUG: no error message
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(DEBIT_SUBCODE_FIELD_NAME);
    gondola.checkEqual(
        actualFeedback,
        Constants.EXCEEDED_NOC_ERROR_MESSAGE_16,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-202. BMS:マスタ:品目作成:借方補助コード:文字種', async () => {
    gondola.report(`Step 2.「借方補助コード」で全角英数字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(DEBIT_SUBCODE_FIELD_NAME, TEXT_FULL_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    //BUG: no error message
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(DEBIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「借方補助コード」でひらがな・カタカナ字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(DEBIT_SUBCODE_FIELD_NAME, TEXT_HIRAGANA_KATAKANA);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(DEBIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 4.「借方補助コード」で記号を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(DEBIT_SUBCODE_FIELD_NAME, TEXT_SYMBOL);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(DEBIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 5.「借方補助コード」で半角英数字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(DEBIT_SUBCODE_FIELD_NAME, TEXT_HALF_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(DEBIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-203. BMS:マスタ:品目作成:貸方補助コード:文字数', async () => {
    gondola.report(`Step 2.「貸方補助コード」で16文字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(CREDIT_SUBCODE_FIELD_NAME, TEXT_16_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(CREDIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 3.「貸方補助コード」で17文字以上を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(CREDIT_SUBCODE_FIELD_NAME, TEXT_17_CHARACTERS);
    await addItemPage.saveNewItem();
    //BUG: no error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(CREDIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.EXCEEDED_NOC_ERROR_MESSAGE_16,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-204. BMS:マスタ:品目作成:貸方補助コード:文字種', async () => {
    gondola.report(`Step 2.「貸方補助コード」で全角英数字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(CREDIT_SUBCODE_FIELD_NAME, TEXT_FULL_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    //BUG: no error message is displayed
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(CREDIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「貸方補助コード」でひらがな・カタカナ字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(CREDIT_SUBCODE_FIELD_NAME, TEXT_HIRAGANA_KATAKANA);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(CREDIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 4.「貸方補助コード」で記号を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(CREDIT_SUBCODE_FIELD_NAME, TEXT_SYMBOL);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(CREDIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 5.「貸方補助コード」で半角英数字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(CREDIT_SUBCODE_FIELD_NAME, TEXT_HALF_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(CREDIT_SUBCODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
});
