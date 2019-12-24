import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './results-base-setup';
import { ResultsBaseField } from '../../models/enum-class/project-results-base-field';

TestModule('Add Project - Results base - All Plan fields validation');

let randomRole = '';

Before(async () => {
    randomRole = await setup();
});

TestCase('BMS-77. 案件:案件作成:出来高明細:予定人数:入力可能', async () => {
    gondola.report(`Step 3. 出来高明細行で「予定人数」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.OUTPUT_ORDER, Constants.onlyWord);
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRole, ResultsBaseField.OUTPUT_ORDER),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「出力順」で小数値を入力し、「保存」ボタンをクリックする。（例：1.5を入力）`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRole, ResultsBaseField.OUTPUT_ORDER, Constants.decimal);
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(randomRole, ResultsBaseField.OUTPUT_ORDER),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 5. 「予定人数」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
    gondola.report(
        `Step 6. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow buttons since it's from HTML`,
    );
});

TestCase('BMS-78. 案件:案件作成:出来高明細:予定人数:下限値・上限値', async () => {
    gondola.report(`Step 3. 出来高明細行の「出力順」で10億の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.OUTPUT_ORDER,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.OUTPUT_ORDER),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 4. 出来高明細行の「出力順」で「1000000001」の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.OUTPUT_ORDER,
        Constants.moreThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.OUTPUT_ORDER),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「出力順」で「999999999」の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.OUTPUT_ORDER,
        Constants.lessThanOneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.OUTPUT_ORDER),
        '',
        'Invalid input value message should not be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「出力順」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.OUTPUT_ORDER,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRole, ResultsBaseField.OUTPUT_ORDER),
        '',
        'Invalid input value message should not be displayed',
    );
});
