import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { ItemInfoData } from '../../models/item-info';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Add Item - Item code field validation');

const ITEM_CODE_FIELD_NAME = Constants.translator.fieldName.addItem.itemCode;
const TEXT_FULL_SIZE_ALPHANUMERIC = Constants.fullSizeAlphaNumericString;
const TEXT_HIRAGANA_KATAKANA = Constants.hiraganaKatakanaString;
const TEXT_SYMBOL = Constants.symbolString;
const TEXT_HALF_SIZE_ALPHANUMERIC = Constants.halfSizeAlphaNumericString;
const ITEM_INFO_REQUIRED_ONLY = ItemInfoData.ITEM_REQUIRED_DATA;

Before(setup);

TestCase('BMS-190. BMS:マスタ:品目作成:品目コード:文字種', async () => {
    gondola.report(`Step 2.「品目コード」で全角英数字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_FULL_SIZE_ALPHANUMERIC);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.inputHalfSizeAlphaNumericTypeErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3. 品目コード」でひらがな・カタカナ字を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_HIRAGANA_KATAKANA);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.inputHalfSizeAlphaNumericTypeErrorMessage,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 4.「品目コード」で記号を入力し、保存する。`);
    await addItemPage.enterTextFieldByLabel(ITEM_CODE_FIELD_NAME, TEXT_SYMBOL);
    await addItemPage.saveNewItem();
    gondola.report(`VP.「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_CODE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.inputHalfSizeAlphaNumericTypeErrorMessage,
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
        Constants.duplicatedTypeErrorMessage,
        'Invalid feedback message should be correct',
    );
});
