import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './results-base-setup';
import { ResultsBaseField } from '../../models/enum-class/project-results-base-field';

TestModule('Add Project - Results base - Debit credit field validation');

let randomRole = '';

Before(async () => {
    randomRole = await setup();
});

TestCase('BMS-61. BMS:案件:案件作成:出来高明細:請求単価:平日通常:文字種', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日通常」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.ONLY_WORD,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」の「平日通常」で数値のみを入力する`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力でき、カンマはユーザ入力させず、自動入力されること。`);
    //BUG: no comma is added
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.EIGHT_DIGIT_NUMBER_WITH_COMMAS,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「平日通常」で「---」「+++」「...」を入力する。`);
    gondola.report(`VP. エラー「数値を入力してください」が表示されること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseNumberFieldValidationWorkingCorrectly(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY,
        ),
        'Number field validation should work correctly',
    );
});

TestCase('BMS-62. 案件:案件作成:出来高明細:請求単価:平日通常:桁数', async () => {
    gondola.report(`Step 3. 出来高明細行の「請求単価」の「平日通常」で何も入力しなく、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日通常」で8桁の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日通常」で9桁以上の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.NINE_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「平日通常」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.NEGATIVE_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    //BUG: No error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「平日通常」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        '',
        'Invalid input value message should not be displayed',
    );
    gondola.report(`Step 8. 出来高明細行の「請求単価」の「平日通常」で小数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.DECIMAL_TWO_DIGITS,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );
});

/////

TestCase('BMS-63. 案件:案件作成:出来高明細:請求単価:平日通常残業:文字種', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日通常残業」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.ONLY_WORD,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」の「平日通常残業」で数値のみを入力する`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力でき、カンマはユーザ入力させず、自動入力されること。`);
    //BUG: no comma is added
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME),
        Constants.EIGHT_DIGIT_NUMBER_WITH_COMMAS,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「平日通常残業」で「---」「+++」「...」を入力する。`);
    gondola.report(`VP. エラー「数値を入力してください」が表示されること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseNumberFieldValidationWorkingCorrectly(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        'Number field validation should work correctly',
    );
});

TestCase('BMS-64. 案件:案件作成:出来高明細:請求単価:平日通常残業:桁数', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「平日通常残業」で何も入力しなく、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日通常残業」で8桁の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日通常残業」で9桁以上の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.NINE_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 6. 出来高明細行の「請求単価」の「平日通常残業」で負の数を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.NEGATIVE_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    //BUG: No error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 7. 出来高明細行の「請求単価」の「平日通常残業」で「0」を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );
    gondola.report(
        `Step 8. 出来高明細行の「請求単価」の「平日通常残業」で小数を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.DECIMAL_TWO_DIGITS,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-65. 案件:案件作成:出来高明細:請求単価:休日通常:文字種', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「休日通常」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.ONLY_WORD,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」の「休日通常」で数値のみを入力する`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力でき、カンマはユーザ入力させず、自動入力されること。`);
    //BUG: no comma is added
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.EIGHT_DIGIT_NUMBER_WITH_COMMAS,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「休日通常」で「---」「+++」「...」を入力する。`);
    gondola.report(`VP. エラー「数値を入力してください」が表示されること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseNumberFieldValidationWorkingCorrectly(
            randomRole,
            ResultsBaseField.UNIT_PRICE_HOLIDAY,
        ),
        'Number field validation should work correctly',
    );
});

TestCase('BMS-66. 案件:案件作成:出来高明細:請求単価:休日通常:桁数', async () => {
    gondola.report(`Step 3. 出来高明細行の「請求単価」の「休日通常」で何も入力しなく、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「休日通常」で8桁の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「休日通常」で9桁以上の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.NINE_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「休日通常」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.NEGATIVE_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    //BUG: No error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「休日通常」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        '',
        'Invalid input value message should not be displayed',
    );
    gondola.report(`Step 8. 出来高明細行の「請求単価」の「休日通常」で小数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.DECIMAL_TWO_DIGITS,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-67. 案件:案件作成:出来高明細:請求単価:平日深夜:文字種', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日深夜」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.ONLY_WORD,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」の「平日深夜」で数値のみを入力する`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力でき、カンマはユーザ入力させず、自動入力されること。`);
    //BUG: no comma is added
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.EIGHT_DIGIT_NUMBER_WITH_COMMAS,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「平日深夜」で「---」「+++」「...」を入力する。`);
    gondola.report(`VP. エラー「数値を入力してください」が表示されること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseNumberFieldValidationWorkingCorrectly(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        ),
        'Number field validation should work correctly',
    );
});

TestCase('BMS-68. 案件:案件作成:出来高明細:請求単価:平日深夜:桁数', async () => {
    gondola.report(`Step 3. 出来高明細行の「請求単価」の「平日深夜」で何も入力しなく、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日深夜」で8桁の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日深夜」で9桁以上の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.NINE_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「平日深夜」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.NEGATIVE_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    //BUG: No error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「平日深夜」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );
    gondola.report(`Step 8. 出来高明細行の「請求単価」の「平日深夜」で小数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.DECIMAL_TWO_DIGITS,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-69. 案件:案件作成:出来高明細:請求単価:平日深夜残業:文字種', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日深夜残業」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.ONLY_WORD,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」の「平日深夜残業」で数値のみを入力する`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力でき、カンマはユーザ入力させず、自動入力されること。`);
    //BUG: no comma is added
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        Constants.EIGHT_DIGIT_NUMBER_WITH_COMMAS,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「平日深夜残業」で「---」「+++」「...」を入力する。`);
    gondola.report(`VP. エラー「数値を入力してください」が表示されること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseNumberFieldValidationWorkingCorrectly(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        'Number field validation should work correctly',
    );
});

TestCase('BMS-70. 案件:案件作成:出来高明細:請求単価:平日深夜残業:桁数', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「平日深夜残業」で何も入力しなく、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        '',
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日深夜残業」で8桁の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日深夜残業」で9桁以上の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.NINE_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 6. 出来高明細行の「請求単価」の「平日深夜残業」で負の数を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.NEGATIVE_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    //BUG: No error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 7. 出来高明細行の「請求単価」の「平日深夜残業」で「0」を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        '0',
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );
    gondola.report(
        `Step 8. 出来高明細行の「請求単価」の「平日深夜残業」で小数を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.DECIMAL_TWO_DIGITS,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-71. 案件:案件作成:出来高明細:請求単価:請求単価:文字種', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「請求単価」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.ONLY_WORD,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」の「請求単価」で数値のみを入力する`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力でき、カンマはユーザ入力させず、自動入力されること。`);
    //BUG: no comma is added
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.EIGHT_DIGIT_NUMBER_WITH_COMMAS,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「請求単価」で「---」「+++」「...」を入力する。`);
    gondola.report(`VP. エラー「数値を入力してください」が表示されること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseNumberFieldValidationWorkingCorrectly(
            randomRole,
            ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        ),
        'Number field validation should work correctly',
    );
});

TestCase('BMS-72. 案件:案件作成:出来高明細:請求単価:請求単価:桁数', async () => {
    gondola.report(`Step 3. 出来高明細行の「請求単価」の「請求単価」で何も入力しなく、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「請求単価」で8桁の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.EIGHT_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「請求単価」で9桁以上の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.NINE_DIGIT_NUMBER,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「請求単価」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.NEGATIVE_NUMBER,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    //BUG: No error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「請求単価」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );
    gondola.report(`Step 8. 出来高明細行の「請求単価」の「請求単価」で小数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.DECIMAL_TWO_DIGITS,
    );
    await addProjectPage.saveNewProject();
    //BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の整数を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid input value message should not be displayed',
    );
});
