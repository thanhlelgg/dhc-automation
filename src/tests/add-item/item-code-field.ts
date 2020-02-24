import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { ItemInfoData } from '../../models/item-info';
import { DatabaseHelper } from '../../helper/database-helpers';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Item code field validation');

const ITEM_CODE_FIELD_NAME = Constants.translator.fieldName.addItem.itemCode;
const TEXT_FULL_SIZE_ALPHANUMERIC = Constants.FULL_SIZE_ALPHA_NUMERIC_STRING;
const TEXT_HIRAGANA_KATAKANA = Constants.HIRAGANA_KATAKANA_STRING;
const TEXT_SYMBOL = Constants.SYMBOL_STRING;
const TEXT_HALF_SIZE_ALPHANUMERIC = Constants.HALF_SIZE_ALPHA_NUMERIC_STRING;
const ITEM_INFO_REQUIRED_ONLY = ItemInfoData.ITEM_REQUIRED_DATA;
const TEXT_16_CHARACTERS = Utilities.getRandomText(16);
const TEXT_17_CHARACTERS = Utilities.getRandomText(17);

Before(setup);

TestCase('BMS-189. BMS:マスタ:品目作成:品目コード:文字種', async () => {
    gondola.report(`Step 2.「品目コード」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3. 「品目コード」で16文字を入力し、「保存」ボタンをクリックする。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_16_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 4.「品目コード」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_17_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.EXCEEDED_NOC_ERROR_MESSAGE_16,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-190. BMS:マスタ:品目作成:品目コード:文字種', async () => {
    gondola.report(`Step 2.「品目コード」で全角英数字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_FULL_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3. 品目コード」でひらがな・カタカナ字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_HIRAGANA_KATAKANA);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 4.「品目コード」で記号を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_SYMBOL);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 5.「品目コード」で半角英数字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_HALF_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');
});

TestCase('BMS-191. BMS:マスタ:品目作成:品目コード:重複時', async () => {
    const itemData = ITEM_INFO_REQUIRED_ONLY;
    itemData.itemCode = (await DatabaseHelper.getExistedItem()).cd;
    gondola.report(`Step 2. 「品目コード」で重複しているコードを入力し、保存する。`);
    await addItemPage.inputItemInformation(itemData);
    await addItemPage.saveNewItem();
    gondola.report(
        `VP. 入力フィールドの下にエラー「既に使われている値のため異なる値を入力してください」が表示されること。`,
    );
    const actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        ITEM_CODE_FIELD_NAME + Constants.translator.invalidFeedback.isDuplicated,
        'Invalid feedback message should be correct',
    );
});
