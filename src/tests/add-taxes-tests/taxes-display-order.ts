import { TestModule, TestCase, gondola } from 'gondolajs';
import taxesSetup from './taxes-setup';
import { Constants } from '../../common/constants';
import addTaxPage from '../../pages/add-tax-page';
import { Utilities } from '../../common/utilities';
import { ButtonIcon } from '../../models/enum-class/button-icon';

TestModule('Add Taxes - Taxes display order field validation');

const TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL = Constants.translator.fieldName.addTax.displayOrder;

Before(taxesSetup);

TestCase('BMS-224. マスタ:税率作成:表示順:桁数', async () => {
    const maximumNOD = 4;
    gondola.report('Step 2. 「表示順」で4桁を入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(
        TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD),
    );
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「4桁以内の数値を入力してください」が表示されないこと。');
    //BUG: invalid feedback is still displayed
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL),
        '',
        'Invalid feedback message should not be displayed',
    );

    gondola.report('Step 3. 「表示順」で5桁以上を入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(
        TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD + 1),
    );
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「4桁以内の数値を入力してください」が表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.exceededNODUpdate,
        'Invalid feedback should be displayed correctly',
    );

    gondola.report('Step 4. 「表示順」で「0」を入力し、「保存」ボタンをクリックする。）');
    await addTaxPage.enterTextFieldByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL, '0');
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「0以上の数値を入力してください」が表示されないこと。');
    //BUG: invalid feedback is still displayed
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report('Step 5. 「表示順」で負の数を入力し、「保存」ボタンをクリックする。(例：「-1」を入力)');
    await addTaxPage.enterTextFieldByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL, Constants.NEGATIVE_NUMBER);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「0以上の数値を入力してください」が表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid feedback message should display correctly',
    );

    gondola.report('Step 6. 「表示順」で小数を入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL, Constants.DECIMAL);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 「整数で入力してください」というエラーが表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValidationMessageByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL, true),
        Constants.translator.invalidFeedback.inputDecimalTypeError,
        'Invalid feedback should be displayed correctly',
    );
});

TestCase('BMS-225. マスタ:税率作成:表示順:文字種', async () => {
    gondola.report('Step 2. 「表示順」で半角数値のみを入力する。');
    await addTaxPage.enterTextFieldByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL, Constants.HALF_SIZE_NUMBER);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力できること。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValueByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL),
        Constants.HALF_SIZE_NUMBER,
        'Should be able to enter the valid text',
    );

    gondola.report('Step 3. 「表示順」で半角数値以外を入力する。');
    await addTaxPage.enterTextFieldByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL, Constants.NON_HALF_SIZE_NUMBER_STRING);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 「-」「+」「.」以外に、半角数値以外の文字を入力できないこと。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValueByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report('Step 4. 「表示順」で「---」「+++」「...」を入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL, Constants.MINUS_PLUS_DOTS_STRING);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 文字種誤りエラー「半角数値で入力してください」が表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValidationMessageByLabel(TAXES_DISPLAY_ORDER_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.inputNumericTypeError,
        'Invalid feedback should be displayed correctly',
    );
});
