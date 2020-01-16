import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import { WorkingPlaceInfoData } from '../../models/working-place-info';

const WORKING_PLACE_ADDRESS = Constants.translator.fieldName.addWorkingPlace.address;

TestModule('Working place - Address field validation');

Before(setup);

TestCase('TMS-121. マスタ:ラボ管理作成:住所:文字数', async () => {
    gondola.report(`Step 2. 「住所」で何も入力しなくて、「保存」ボタンをクリックする。`);
    const requireData = WorkingPlaceInfoData.WORKING_PLACE_REQUIRED_DATA;
    requireData.address = '';
    //BUG: currently search function for nearest station is not working correctly
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: update when requirement specified
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextAreaValidationMessageByLabel(WORKING_PLACE_ADDRESS, true),
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「住所」で255文字を入力する。`);
    const maximumNOC = 255;
    const randomText = Utilities.getRandomText(maximumNOC);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_ADDRESS, randomText, true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 255文字まで入力できること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValueByLabel(WORKING_PLACE_ADDRESS, true),
        randomText,
        'All characters should be displayed',
    );

    gondola.report(`Step 4.「住所」で256文字を入力する。`);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_ADDRESS, randomText + 'a', true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 256目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValueByLabel(WORKING_PLACE_ADDRESS, true),
        randomText,
        'Exceed characters should be stripped',
    );
});
