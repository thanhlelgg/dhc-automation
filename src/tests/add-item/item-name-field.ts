import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Item name field validation');

const ITEM_NAME_FIELD_NAME = Constants.translator.fieldName.addItem.itemName;
const TEXT_64_CHARACTERS = Utilities.getRandomText(64);
const TEXT_65_CHARACTERS = Utilities.getRandomText(65);

Before(setup);

TestCase('BMS-192. BMS:マスタ:品目作成:品目名:文字数', async () => {
    gondola.report(`Step 2.「品目名」で入力しなくて、保存する`);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「品目名」で64文字を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_NAME_FIELD_NAME, TEXT_64_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_NAME_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, TEXT_64_CHARACTERS, 'Invalid feedback message should be correct');

    gondola.report(`Step 4.「品目名」で65文字以上を入力し、保存する`);
    await addItemPage.enterTextFieldByLabel(ITEM_NAME_FIELD_NAME, TEXT_65_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_NAME_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, TEXT_65_CHARACTERS, 'Invalid feedback message should be correct');
});
