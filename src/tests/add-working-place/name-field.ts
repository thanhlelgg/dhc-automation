import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import { WorkingPlaceInfoData } from '../../models/working-place-info';

const WORKING_PLACE_NAME = Constants.translator.fieldName.addWorkingPlace.name;
TestModule('Working place - Name field validation');

Before(setup);

TestCase('TMS-118. マスタ:ラボ管理作成:就業先名称:文字数', async () => {
    gondola.report(`Step 2. 「就業先名称」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValidationMessageByLabel(WORKING_PLACE_NAME, true),
        Constants.translator.invalidFeedback.fieldNeedToBeFilled,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「就業先名称」で64文字を入力する。`);
    const maximumNOC = 64;
    const randomText = Utilities.getRandomText(maximumNOC);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_NAME, randomText, true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getInvalidFeedBack(WORKING_PLACE_NAME, true),
        '',
        'Error message should not be displayed',
    );

    gondola.report(`Step 4.「就業先名称」で65文字を入力する。`);
    const requireData = WorkingPlaceInfoData.WORKING_PLACE_REQUIRED_DATA;
    requireData.name = '';
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_NAME, randomText + 'a', true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    //BUG: no error message is displayed #167
    await gondola.checkEqual(
        await addWorkingPlacePage.getInvalidFeedBack(WORKING_PLACE_NAME, true),
        maximumNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Error message should be displayed',
    );
});
