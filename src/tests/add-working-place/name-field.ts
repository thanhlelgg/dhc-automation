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
    const requireData = WorkingPlaceInfoData.WORKING_PLACE_REQUIRED_DATA;
    requireData.name = '';
    //BUG: currently search function for nearest station is not working correctly
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: update when requirement specified
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValidationMessageByLabel(WORKING_PLACE_NAME, true),
        Constants.fieldRequiredErrorMessage,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「就業先名称」で50文字を入力する。`);
    const maximumNOC = 50;
    const randomText = Utilities.getRandomText(maximumNOC);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_NAME, randomText, true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 50文字まで入力できること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValueByLabel(WORKING_PLACE_NAME, true),
        randomText,
        'All characters should be displayed',
    );

    gondola.report(`Step 4.「就業先名称」で51文字を入力する。`);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_NAME, randomText + 'a', true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 51目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValueByLabel(WORKING_PLACE_NAME, true),
        randomText,
        'Exceed characters should be stripped',
    );
});
