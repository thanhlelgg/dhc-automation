import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './positions-setup';
import addPositionPage from '../../pages/add-position-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

const POSITION_ABBREVIATION_NAME = Constants.translator.fieldName.addPosition.positionAbbreviation;

TestModule('Positions - Abbreviation field validation');

Before(setup);

TestCase('TMS-128. マスタ:役職作成:省略名:文字数', async () => {
    gondola.report(`Step 2. 「省略名」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addPositionPage.clickButtonByIcon(ButtonIcon.CHECK);
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: update when requirement specified
    await gondola.checkEqual(
        await addPositionPage.getHelpBlockError(POSITION_ABBREVIATION_NAME, true),
        Constants.fieldRequiredErrorMessage,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「省略名」で2文字を入力する。`);
    const maximumNOC = 2;
    const randomText = Utilities.getRandomText(maximumNOC);
    await addPositionPage.enterTextFieldByLabel(POSITION_ABBREVIATION_NAME, randomText, true);
    await addPositionPage.clickButtonByIcon(ButtonIcon.CHECK);
    gondola.report(`VP. 2文字まで入力できること。`);
    await gondola.checkEqual(
        await addPositionPage.getTextFieldValueByLabel(POSITION_ABBREVIATION_NAME, true),
        randomText,
        'All characters should be displayed',
    );

    gondola.report(`Step 4.「省略名」で3文字を入力する。`);
    await addPositionPage.enterTextFieldByLabel(POSITION_ABBREVIATION_NAME, randomText + 'a', true);
    await addPositionPage.clickButtonByIcon(ButtonIcon.CHECK);
    gondola.report(`VP. 3目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addPositionPage.getTextFieldValueByLabel(POSITION_ABBREVIATION_NAME, true),
        randomText,
        'Exceed characters should be stripped',
    );
});
