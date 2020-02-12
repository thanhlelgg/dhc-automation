import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Item manage unit field validation');

const MANAGEMENT_UNIT_FIELD_NAME = Constants.translator.fieldName.addItem.managementUnit;
const TEXT_64_CHARACTERS = Utilities.getRandomText(64);
const TEXT_65_CHARACTERS = Utilities.getRandomText(65);

Before(setup);

TestCase('BMS-483. BMS:マスタ:品目作成:管理単位:文字数', async () => {
    gondola.report(`Step 2.「管理単位」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(MANAGEMENT_UNIT_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「管理単位」で64文字を入力し、「保存」ボタンをクリックする。`);
    await addItemPage.enterTextFieldByLabel(MANAGEMENT_UNIT_FIELD_NAME, TEXT_64_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(MANAGEMENT_UNIT_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should be correct');

    gondola.report(`Step 4.「管理単位」で65文字以上を入力し、「保存」ボタンをクリックする。`);
    await addItemPage.enterTextFieldByLabel(MANAGEMENT_UNIT_FIELD_NAME, TEXT_65_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP.入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(MANAGEMENT_UNIT_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.EXCEEDED_NOC_ERROR_MESSAGE_64,
        'Invalid feedback message should be correct',
    );
});
