import { TestModule, TestCase, gondola } from 'gondolajs';
import taxesSetup from './taxes-setup';
import addTaxPage from '../../pages/add-tax-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Utilities } from '../../common/utilities';
import { Constants } from '../../common/constants';

TestModule('Add Taxes - Taxes rate field validation');

const TAXES_RATE_TEXTFIELD_LABEL = Constants.translator.fieldName.addTax.taxRate;

Before(taxesSetup);

TestCase('BMS-222. マスタ:税率作成:表示名:文字数', async () => {
    gondola.report('Step 2. 「税率」で8桁を入力し、「保存」ボタンをクリックする。');
    const maximumNOD = 8;
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, Utilities.getRandomNumberByLength(maximumNOD));
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「8桁以内の数値を入力してください」が表示されないこと。');
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_RATE_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report('Step 3. 「税率」で9桁以上を入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(
        TAXES_RATE_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD + 1),
    );
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「8桁以内の数値を入力してください」が表示されること。');
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_RATE_TEXTFIELD_LABEL),
        maximumNOD + Constants.EXCEEDED_NOD_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );

    gondola.report('Step 4. 「税率」で小数第2位を入力し、「保存」ボタンをクリックする。（例：「3.45」を入力）');
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, Constants.DECIMAL_TWO_DIGITS);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されないこと。');
    //BUG: invalid message is still displayed
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValidationMessageByLabel(TAXES_RATE_TEXTFIELD_LABEL, true),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report('Step 5. 「税率」で小数第3位以上を入力し、「保存」ボタンをクリックする。（例：「2.275」を入力）');
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, Constants.DECIMAL_THREE_DIGITS);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValidationMessageByLabel(TAXES_RATE_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.inputDecimalTypeError,
        'Invalid feedback message should be correct',
    );

    gondola.report('Step 6. 「税率」で「0」を入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, '0');
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「0以上の数値を入力してください」が表示されないこと。');
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_RATE_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report('Step 7. 「税率」で負の数を入力し、「保存」ボタンをクリックする。(例：「-1」を入力)');
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, Constants.NEGATIVE_NUMBER);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力フィールドの下にエラー「0以上の数値を入力してください」が表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getInvalidFeedBack(TAXES_RATE_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid feedback message should display correctly',
    );
});

TestCase('BMS-223. スタ:税率作成:税率:文字種', async () => {
    gondola.report('Step 2. 「税率」で半角数字を入力する。（例：「1234」を入力）');
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, Constants.SINGLE_BYTE_NUMBER_STRING);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 入力できること。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValueByLabel(TAXES_RATE_TEXTFIELD_LABEL),
        Constants.SINGLE_BYTE_NUMBER_STRING,
        'Should be able to enter the valid text',
    );

    gondola.report('Step 3. 「税率」で半角数字以外を入力する。（例：「abcあカ!@#」を入力）');
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, Constants.NON_HALF_SIZE_NUMBER_STRING);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 「-」「+」「.」以外に、半角数字以外の文字を入力できないこと。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValueByLabel(TAXES_RATE_TEXTFIELD_LABEL),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report('Step 4. 「税率」で「---」「+++」「...」などを入力し、「保存」ボタンをクリックする。');
    await addTaxPage.enterTextFieldByLabel(TAXES_RATE_TEXTFIELD_LABEL, Constants.MINUS_PLUS_DOTS_STRING);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report('VP. 文字種誤りエラー「半角数値で入力してください」が表示されること。');
    await gondola.checkEqual(
        await addTaxPage.getTextFieldValidationMessageByLabel(TAXES_RATE_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.inputNumericTypeError,
        'Invalid feedback should be displayed correctly',
    );
});
