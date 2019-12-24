import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Remarks field validation');

const REMARKS_FIELD_NAME = Constants.translator.fieldName.addItem.remarks;
const TEXT_1024_CHARACTERS = Utilities.getRandomText(1024);
const TEXT_1025_CHARACTERS = Utilities.getRandomText(1025);

Before(setup);

TestCase('BMS-206. BMS:マスタ:品目作成:備考:文字数', async () => {
    gondola.report(`Step 2.「備考」で1024文字を入力し、保存する`);
    await addItemPage.enterTextAreaByLabel(REMARKS_FIELD_NAME, TEXT_1024_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されないこと。`);
    let actualFeedback = await addItemPage.getInvalidFeedBack(REMARKS_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should not be displayed');

    gondola.report(`Step 3.「備考」で1025文字以上を入力し、保存する`);
    await addItemPage.enterTextAreaByLabel(REMARKS_FIELD_NAME, TEXT_1025_CHARACTERS);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されること。`);
    actualFeedback = await addItemPage.getInvalidFeedBack(REMARKS_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, TEXT_1025_CHARACTERS, 'Invalid feedback message should be correct');
});
