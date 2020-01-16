import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './positions-setup';
import addPositionPage from '../../pages/add-position-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

const POSITION_NAME = Constants.translator.fieldName.addPosition.positionName;

TestModule('Positions - Title field validation');

Before(setup);

TestCase('TMS-127. マスタ:役職作成:役職名:文字数', async () => {
    gondola.report(`Step 2. 「役職名」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addPositionPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: update when requirement specified
    await gondola.checkEqual(
        await addPositionPage.getTextFieldValidationMessageByLabel(POSITION_NAME, true),
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「役職名」で255文字を入力する。`);
    const maximumNOC = 255;
    const randomText = Utilities.getRandomText(maximumNOC);
    await addPositionPage.enterTextFieldByLabel(POSITION_NAME, randomText, true);
    await addPositionPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 255文字まで入力できること。`);
    await gondola.checkEqual(
        await addPositionPage.getTextFieldValueByLabel(POSITION_NAME, true),
        randomText,
        'All characters should be displayed',
    );

    gondola.report(`Step 4.「役職名」で256文字を入力する。`);
    await addPositionPage.enterTextFieldByLabel(POSITION_NAME, randomText + 'a', true);
    await addPositionPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 256目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addPositionPage.getTextFieldValueByLabel(POSITION_NAME, true),
        randomText,
        'Exceed characters should be stripped',
    );
});
