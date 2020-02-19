import { TestModule, TestCase, gondola } from 'gondolajs';
import taxesSetup from './taxes-setup';
import addTaxPage from '../../pages/add-tax-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Taxes - Taxes name field validation');

const TAXES_NAME_TEXTFIELD_LABEL = Constants.translator.fieldName.addTax.name;

Before(taxesSetup);

TestCase('BMS-221. マスタ:税率作成:表示名:文字数', async () => {
    gondola.report('Step 2. 「表示名」で何も入力しなくて、「保存」ボタンをクリックする。');
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_NAME_TEXTFIELD_LABEL),
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );

    gondola.report('Step 3. 「表示名」で64文字を入力し、「保存」ボタンをクリックする。');
    const maximumNOC = 64;
    await addTaxPage.enterTextFieldByLabel(TAXES_NAME_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。');
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_NAME_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report('Step 4. 「表示名」で65文字以上を入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(TAXES_NAME_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC + 1));
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。');
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_NAME_TEXTFIELD_LABEL),
        maximumNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});
