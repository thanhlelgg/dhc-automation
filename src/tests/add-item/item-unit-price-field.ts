import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Standard sales unit price field validation');

const ITEM_UNIT_PRICE_FIELD_NAME = Constants.translator.fieldName.addItem.unitPrice;
const UNIT_PRICE_16_DIGITS = Utilities.getRandomNumber(0, 0, 16);
const UNIT_PRICE_17_DIGITS = Utilities.getRandomNumber(0, 0, 17);
const SECOND_DECIMAL = UNIT_PRICE_16_DIGITS / 100;
const THRID_DECIMAL = UNIT_PRICE_16_DIGITS / 1000;

const TEXT_FULL_SIZE_ALPHANUMERIC = Constants.fullSizeAlphaNumericString;
const TEXT_ONE_BYTE_ALPHANUMERIC = Constants.fullSizeAlphaNumericString[0];
const TEXT_HIRAGANA_KATAKANA = Constants.hiraganaKatakanaString;
const TEXT_SYMBOL = Constants.symbolString;
const NUMBER_FULL_WIDTH = Utilities.getRandomNumber(0, 0, 16);
const NUMBER_ONE_BYTE = Utilities.getRandomNumber(1, 9);

Before(setup);

TestCase('BMS-198. BMS:マスタ:品目作成:標準販売単価:文字数', async () => {
    gondola.report(`Step 2.「標準販売単価」で16桁を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, UNIT_PRICE_16_DIGITS + '');
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「16桁以内の数値を入力してください」が表示されないこと。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 3.「標準販売単価」で17桁以上を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, UNIT_PRICE_17_DIGITS + '');
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「16桁以内の数値を入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '入力値が不正です', 'Invalid feedback message should be correct');

    gondola.report(`Step 4.「標準販売単価」で小数第2位を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, SECOND_DECIMAL + '');
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 5.「標準販売単価」で小数第3位以上を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, THRID_DECIMAL + '');
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '入力値が不正です', 'Invalid feedback message should be correct');
});

TestCase('BMS-199. BMS:マスタ:品目作成:標準販売単価:文字種', async () => {
    gondola.report(`Step 2.「標準販売単価」で全角英字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, TEXT_FULL_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「数値を入力してください」という文字種誤りのエラーが表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '入力値が不正です', 'Invalid feedback message should be correct');

    gondola.report(`Step 3.「標準販売単価」で半角英字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, TEXT_ONE_BYTE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「数値を入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '入力値が不正です', 'Invalid feedback message should be correct');

    gondola.report(`Step 4.「標準販売単価」でひらがな・カタカナ字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, TEXT_HIRAGANA_KATAKANA);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「数値を入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '入力値が不正です', 'Invalid feedback message should be correct');

    gondola.report(`Step 5.「標準販売単価」で記号を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, TEXT_SYMBOL);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「数値を入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '入力値が不正です', 'Invalid feedback message should be correct');

    gondola.report(`Step 6.「標準販売単価」で全角数字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, NUMBER_FULL_WIDTH + '');
    await addItemPage.saveNewItem();
    gondola.report(`VP.「数値を入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 7.「標準販売単価」で半角数字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_UNIT_PRICE_FIELD_NAME, NUMBER_ONE_BYTE + '');
    await addItemPage.saveNewItem();
    gondola.report(`VP. カンマが自動入力され、「数値を入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_UNIT_PRICE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');
});
