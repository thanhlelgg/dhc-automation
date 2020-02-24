import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-validation-setup';
import projectDetailsPage from '../../pages/project-details-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Project - Ordered details - Buttons validation');

Before(setup);
const columnName = Constants.translator.tableColumnName.addProject.orderedDetails;
const REQUIRED_ERROR_MESSAGE = Constants.translator.invalidFeedback.fieldRequired;

TestCase('BMS-303. BMS:案件:案件編集:非稼働明細:数量:文字数', async () => {
    gondola.report(`Step 8. 数量を未入力で保存`);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 「このフィールドは入力必須です」という未入力のエラーが表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.quantity),
        REQUIRED_ERROR_MESSAGE,
        'Required error message should be displayed',
    );

    gondola.report(`Step 9. 数量を8桁を入力し、「保存」ボタンをクリックする。`);
    const maximumNOD = 8;
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, Constants.EIGHT_DIGIT_NUMBER);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「8桁以内の数値を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.quantity),
        '',
        'Invalid feedback message should not be displayed',
    );

    gondola.report(`Step 10. 数量を9桁以上を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, Constants.NINE_DIGIT_NUMBER);
    await projectDetailsPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「8桁以内の数値を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.quantity),
        maximumNOD + Constants.EXCEEDED_NOD_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 11. 数量を小数第2位まで入力し、「保存」ボタンをクリックする。（例：「3.45」を入力）`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, Constants.DECIMAL_TWO_DIGITS);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfieldValidationMessage(columnName.quantity),
        '',
        'Invalid feedback message should not be displayed',
    );

    gondola.report(`Step 12. 数量を小数第3位以上で入力し、「保存」ボタンをクリックする。（例：「2.275」を入力）`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, Constants.NINE_DIGIT_NUMBER);
    await projectDetailsPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfieldValidationMessage(columnName.quantity),
        Constants.DECIMAL_PLACE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 13. 数量に「0」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, '0');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の数値を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfieldValidationMessage(columnName.quantity),
        '',
        'Invalid feedback message should not be displayed',
    );

    gondola.report(`Step 14. 数量に負の数を入力し、「保存」ボタンをクリックする。(例：「-1」を入力)`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, Constants.NEGATIVE_NUMBER);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「0以上の数値を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfieldValidationMessage(columnName.quantity),
        Constants.NOT_POSITIVE_INTEGER_NUMBER_ERROR_MESSAGE,
        'Invalid feedback message should not be displayed',
    );
});

TestCase('BMS-306. BMS:案件:案件編集:非稼働明細:単位', async () => {
    gondola.report(
        `Step 8. 「非稼働明細」セッションの追加された行の「単位」テキストボックスで未入力で、「保存」ボタンをクリックする。`,
    );
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.unit),
        REQUIRED_ERROR_MESSAGE,
        'Required error message should be displayed',
    );

    gondola.report(`Step 9. 数量を8桁を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 64;
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unit, Utilities.getRandomText(maximumNOC));
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「8桁以内の数値を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.unit),
        '',
        'Invalid feedback message should not be displayed',
    );

    gondola.report(`Step 10. 数量を9桁以上を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unit, Utilities.getRandomText(maximumNOC + 1));
    await projectDetailsPage.saveNewProject();
    // BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「8桁以内の数値を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.unit),
        maximumNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-307. BMS:案件:案件編集:非稼働明細:単価:文字数', async () => {
    gondola.report(`Step 8. 入力せずに、保存する`);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 「このフィールドは入力必須です」という未入力のエラーが表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.unit),
        REQUIRED_ERROR_MESSAGE,
        'Required error message should be displayed',
    );

    gondola.report(`Step 9. 16桁を入力し、「保存」ボタンをクリックする。`);
    const maximumNOD = 16;
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unit, Constants.SIXTEEN_DIGIT_NUMBER);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. エラー「16桁以内の数値を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.unit),
        '',
        'Invalid feedback message should not be displayed',
    );

    gondola.report(`Step 10. 17桁以上を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unitPrice, Constants.SEVENTEEN_DIGIT_NUMBER);
    await projectDetailsPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. エラー「16桁以内の数値を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.unitPrice),
        maximumNOD + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 11. 数量を小数第2位まで入力し、「保存」ボタンをクリックする。（例：「3.45」を入力）`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unitPrice, Constants.DECIMAL_TWO_DIGITS);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfieldValidationMessage(columnName.unitPrice),
        '',
        'Invalid feedback message should not be displayed',
    );

    gondola.report(`Step 12. 数量を小数第3位以上で入力し、「保存」ボタンをクリックする。（例：「2.275」を入力）`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unitPrice, Constants.NINE_DIGIT_NUMBER);
    await projectDetailsPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「小数は第2位までが有効です」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfieldValidationMessage(columnName.unitPrice),
        Constants.DECIMAL_PLACE_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-308. BMS:案件:案件編集:非稼働明細:単価:文字種', async () => {
    gondola.report(`Step 8. 半角数字以外を入力（例：（例：「abcａｂｃははカｶｶ!@#」を入力）`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unitPrice, Constants.NON_HALF_SIZE_NUMBER_STRING);
    gondola.report(`VP. 入力できないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfield(columnName.unitPrice),
        '',
        'Can not enter non-number characters',
    );
});

TestCase('BMS-309. BMS:案件:案件編集:非稼働明細:金額:自動計算', async () => {
    gondola.report(`Step 8. 数量に数値を入力　例:15`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, '15');
    gondola.report(`VP. 金額欄はブランクのままであること`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfield(columnName.amount),
        '',
        'Amount field should be blank',
    );

    gondola.report(`Step 9. 単価に数値を入力　例:1000`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.unitPrice, '1000');
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.amount);
    gondola.report(`VP. 金額欄に数量×単価の計算結果が表示されること　例:15000`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfield(columnName.amount),
        '15000',
        'Amount field should be calculated correctly',
    );

    gondola.report(`Step 10. 数量を削除`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, '');
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.amount);
    gondola.report(`VP. 金額欄がブランクに戻ること`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfield(columnName.amount),
        '',
        'Amount field should be calculated correctly',
    );
});

TestCase('BMS-310. BMS:案件:案件編集:非稼働明細:備考:文字数', async () => {
    gondola.report(`Step 8. 「備考」で1025文字を入力し、保存する`);
    const maximumNOC = 1024;
    await projectDetailsPage.enterOrderedDetailsTextarea(columnName.note, Utilities.getRandomText(maximumNOC + 1));
    await projectDetailsPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されること`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.note),
        maximumNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 9. 「備考」で1024文字を入力し、保存する`);
    await projectDetailsPage.enterOrderedDetailsTextarea(columnName.note, Utilities.getRandomText(maximumNOC));
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されないこと`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.note),
        '',
        'Invalid feedback message should not be displayed',
    );
});

TestCase('BMS-326. BMS:案件:案件編集:非稼働明細:数量:文字種', async () => {
    gondola.report(`Step 8. 半角数字を入力する。（例：「1234」を入力）`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, Constants.SINGLE_BYTE_NUMBER_STRING);
    gondola.report(`VP. 入力できないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfield(columnName.quantity),
        Constants.SINGLE_BYTE_NUMBER_STRING,
        'Can enter half-size numbers normally',
    );
    gondola.report(`Step 9. 半角数字以外を入力（例：（例：「abcａｂｃははカｶｶ!@#」を入力）`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.quantity, Constants.NON_HALF_SIZE_NUMBER_STRING);
    gondola.report(`VP. 入力できないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getOrderedDetailsTextfield(columnName.quantity),
        '',
        'Can not enter non-number characters',
    );
});
