import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './results-base-setup';
import { ResultsBaseTextfield } from '../../models/enum-class/project-results-base-textfield';

TestModule('Add Project - Results base - All Plan fields validation');

let randomRole = '';

Before(async () => {
    randomRole = await setup();
});

TestCase('BMS-56. 案件:案件作成:出来高明細:予定人数:入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「予定人数」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.PLAN_PEOPLE),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「予定人数」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.PLAN_PEOPLE, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_PEOPLE),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「予定人数」で小数値を入力し、「保存」ボタンをクリックする。（例：1.5を入力）`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRole,
            ResultsBaseTextfield.PLAN_PEOPLE,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 6. 「予定人数」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 7. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-57. 案件:案件作成:出来高明細:予定人数:下限値・上限値', async () => {
    gondola.report(`Step 3. 出来高明細行の「予定人数」で10億の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_PEOPLE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 4. 出来高明細行の「予定人数」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_PEOPLE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「予定人数」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_PEOPLE),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 6. 出来高明細行の「予定人数」で負の数を入力し、「保存」ボタンをクリックする。（例：「-1」を入力）`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_PEOPLE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「予定人数」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.PLAN_PEOPLE, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_PEOPLE),
        '',
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-58. 案件:案件作成:出来高明細:予定時間:入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「予定時間」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_TIME,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.PLAN_TIME),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「予定時間」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.PLAN_TIME, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_TIME),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(
        `Step 5. 出来高明細行の「予定時間」で小数値を入力し、「保存」ボタンをクリックする。（例：1.5を入力）`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.PLAN_TIME, Constants.decimal);
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(randomRole, ResultsBaseTextfield.PLAN_TIME),
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

TestCase('BMS-59. 案件:案件作成:出来高明細:予定時間:下限値・上限値', async () => {
    gondola.report(`Step 3. 出来高明細行の「予定時間」で10億の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_TIME,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_TIME),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 4. 出来高明細行の「予定時間」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_TIME,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_TIME),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「予定時間」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_TIME,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_TIME),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(
        `Step 6. 出来高明細行の「予定時間」で負の数を入力し、「保存」ボタンをクリックする。（例：「-1」を入力）`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_TIME,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_TIME),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 7. 出来高明細行の「予定時間」で「0」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.PLAN_TIME, '0');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseTextfield.PLAN_TIME),
        '',
        'Invalid input value message should not be displayed',
    );
});

TestCase('BMS-60. 案件:案件作成:出来高明細:予定時間:下限値・上限値', async () => {
    gondola.report(`Step 3. 出来高明細行の「予定総合時間」で入力可能を確認する。`);
    gondola.report(`VP. 出来高明細行の「予定総合時間」フィールドは非入力項目であり、入力できないこと。`);
    await gondola.checkEqual(
        await addProjectPage.isProjectResultBaseTextFieldReadOnly(randomRole, ResultsBaseTextfield.TOTAL_TIME),
        true,
        'Total time text field should be readonly',
    );

    gondola.report(`Step 4. 出来高明細行で「予定人数」と「予定時間」双方に入力する。`);
    const examplePlanTime = 2;
    const examplePlanPeople = 8;
    const expectedTotalTime = examplePlanTime * examplePlanPeople;
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_TIME,
        examplePlanTime.toString(),
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseTextfield.PLAN_PEOPLE,
        examplePlanPeople.toString(),
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 「予定人数×予定時間」を行った数値が「予定総合時間」に自動計算されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseTextfield.TOTAL_TIME),
        expectedTotalTime.toString(),
        'Total time textfield should be calculated correctly',
    );
});
