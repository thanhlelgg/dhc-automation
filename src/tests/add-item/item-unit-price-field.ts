import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Standard sales unit price field validation');

const ITEM_UNIT_PRICE_FIELD_NAME = Constants.translator.fieldName.addItem.unitPrice;
const UNIT_PRICE_16_DIGITS = Utilities.getRandomNumberByLength(16);
const UNIT_PRICE_17_DIGITS = Utilities.getRandomNumberByLength(17);
const SECOND_DECIMAL = UNIT_PRICE_16_DIGITS / 100;
const THIRD_DECIMAL = UNIT_PRICE_16_DIGITS / 1000;

const NON_HALF_SIZE_NUMBER_STRING = Constants.NON_HALF_SIZE_NUMBER_STRING;
const SINGLE_BYTE_NUMBER_STRING = Constants.SINGLE_BYTE_NUMBER_STRING;

Before(setup);

TestCase('BMS-198. BMS:マスタ:品目作成:標準販売単価:文字数', async () => {
    gondola.report(`Step 2.「標準販売単価」で16桁を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, UNIT_PRICE_16_DIGITS);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「16桁以内の数値を入力してください」が表示されないこと。`);
    //BUG: we can't enter more than 11 characters
    let actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 3.「標準販売単価」で17桁以上を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, UNIT_PRICE_17_DIGITS);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「16桁以内の数値を入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.EXCEEDED_NOC_ERROR_MESSAGE_16,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 4.「標準販売単価」で小数第2位を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, SECOND_DECIMAL);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 5.「標準販売単価」で小数第3位以上を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, THIRD_DECIMAL);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.DECIMAL_PLACE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-199. BMS:マスタ:品目作成:標準販売単価:文字種', async () => {
    gondola.report(`Step 2.「標準販売単価」で半角数字を入力する。（例：「1234」を入力）`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, SINGLE_BYTE_NUMBER_STRING);
    gondola.report(`VP.「-」「+」「.」以外に、半角数字以外の文字を入力できないこと。`);
    await gondola.checkEqual(
        await addItemPage.getTextFieldValueByLabel(ITEM_UNIT_PRICE_FIELD_NAME),
        SINGLE_BYTE_NUMBER_STRING,
        'Number textfield should be displayed correctly',
    );

    gondola.report(`Step 3.「標準販売単価」で半角数字以外を入力する。（例：「abcａｂｃひひカｶｶ!@#」を入力）`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, NON_HALF_SIZE_NUMBER_STRING);
    gondola.report(`VP.「-」「+」「.」以外に、半角数字以外の文字を入力できないこと。`);
    await gondola.checkEqual(
        await addItemPage.getTextFieldValueByLabel(ITEM_UNIT_PRICE_FIELD_NAME),
        '',
        'Number textfield should be empty',
    );

    gondola.report(`Step 4.「標準販売単価」で「---」「+++」「...」などを入力し、「保存」ボタンをクリックする。`);
    gondola.report(`VP. 文字種誤りエラー「数値を入力してください」が表示されること。`);
    await gondola.checkTrue(
        await addItemPage.doesNumberFieldByLabelValidationWorkingCorrectly(ITEM_UNIT_PRICE_FIELD_NAME),
        'Invalid feedback message should be correct',
    );
});
