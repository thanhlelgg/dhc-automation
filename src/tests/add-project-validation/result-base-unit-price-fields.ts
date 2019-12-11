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

TestCase('BMS-61. 案件:案件作成:出来高明細:予定時間:入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日通常」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日通常」で何も入力しなくて、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「平日通常」で小数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 6. 「予定時間」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 7. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-62. 案件:案件作成:出来高明細:予定時間:下限値・上限値', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「平日通常」で10億の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日通常」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日通常」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「平日通常」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「平日通常」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY),
        '',
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-63. 案件:案件作成:出来高明細:請求単価:平日通常残業の入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日通常残業」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日通常残業」で何も入力しなくて、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日通常残業」で小数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 6. 「予定時間」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 7. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-64. 案件:案件作成:出来高明細:予定時間:下限値・上限値', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「平日通常残業」で10億の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
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
        `Step 4. 出来高明細行の「請求単価」の「平日通常残業」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
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
        `Step 5. 出来高明細行の「請求単価」の「平日通常残業」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 6. 出来高明細行の「請求単価」の「平日通常残業」で負の数を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 7. 出来高明細行の「請求単価」の「平日通常残業」で「0」を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-65. 案件:案件作成:出来高明細:請求単価:休日通常の入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「休日通常」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「休日通常」で何も入力しなくて、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「休日通常」で小数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRole,
            ResultsBaseField.UNIT_PRICE_HOLIDAY,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 6. 「予定時間」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 7. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-66. 案件:案件作成:出来高明細:請求単価:休日通常の下限値・上限値', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「休日通常」で10億の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「休日通常」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「休日通常」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「休日通常」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「休日通常」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY),
        '',
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-67. 案件:案件作成:出来高明細:請求単価:平日深夜の入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日深夜」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日深夜」で何も入力しなくて、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「平日深夜」で小数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 6. 「予定時間」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 7. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-68. 案件:案件作成:出来高明細:請求単価:平日深夜の下限値・上限値', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「平日深夜」で10億の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日深夜」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日深夜」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「平日深夜」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「平日深夜」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-69. 案件:案件作成:出来高明細:請求単価:平日深夜残業の入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「平日深夜残業」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.onlyWord,
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

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「平日深夜残業」で何も入力しなくて、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        '',
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「平日深夜残業」で小数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 6. 「予定時間」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 7. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-70. 案件:案件作成:出来高明細:請求単価:平日深夜残業の下限値・上限値', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「平日深夜残業」で10億の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
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
        `Step 4. 出来高明細行の「請求単価」の「平日深夜残業」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
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
        `Step 5. 出来高明細行の「請求単価」の「平日深夜残業」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 6. 出来高明細行の「請求単価」の「平日深夜残業」で負の数を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        '',
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
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
        ),
        '',
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-71. 案件:案件作成:出来高明細:請求単価:休日深夜の入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「請求単価」の「休日深夜」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「休日深夜」で何も入力しなくて、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「請求単価」の「休日深夜」で小数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRole,
            ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 6. 「予定時間」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 7. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-72. 案件:案件作成:出来高明細:請求単価:休日深夜の下限値・上限値', async () => {
    gondola.report(
        `Step 3. 出来高明細行の「請求単価」の「休日深夜」で10億の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 4. 出来高明細行の「請求単価」の「休日深夜」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「請求単価」の「休日深夜」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「請求単価」の「休日深夜」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「請求単価」の「休日深夜」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE),
        '',
        'Invalid input value message should not be displayed',
    );
});
