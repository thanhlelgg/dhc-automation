import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import setup from './add-project-setup';
import { DatabaseHelper } from '../../helper/database-helpers';
import { ProjectInfoData } from '../../models/project-info';
import { Utilities } from '../../common/utilities';

TestModule('Add Project - Project number validation');

const PROJECT_NUMBER_FIELD_NAME = Constants.translator.fieldName.addProject.number;
const INVALID_INPUT_ERROR_MESSAGE = Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;

Before(setup);

TestCase('BMS-31. 「案件番号」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。', async () => {
    gondola.report(`Step 2.「案件番号」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    let actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「案件番号」テキストボックスで16文字を入力し、「保存」ボタンをクリックする。`);
    const maximumN0C = 16;
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, Utilities.getRandomText(maximumN0C));
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should be correct');

    gondola.report(`Step 3.「案件番号」テキストボックスで17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, Utilities.getRandomText(maximumN0C + 1));
    await addProjectPage.saveNewProject();
    // BUG: No error message is displayed
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        maximumN0C + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-162. 案件:案件作成:案件番号:文字種', async () => {
    gondola.report(
        `Step 2. 「案件番号」で全角英数字を入力し、「保存」ボタンをクリックする。（例：「ａｂｃｄ１２３４」を入力）`,
    );
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, Constants.FULL_SIZE_ALPHA_NUMERIC_STRING);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「半角英数で入力してください」が表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME),
        INVALID_INPUT_ERROR_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(
        `Step 3. 「案件番号」テキストボックスでひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。（例：「あああｱｱｱハハハ」を入力）`,
    );
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, Constants.HIRAGANA_KATAKANA_STRING);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「半角英数で入力してください」が表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME),
        INVALID_INPUT_ERROR_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(`Step 4. 「案件番号」で記号を入力し、「保存」ボタンをクリックする。（例：「!"#$%&'()」を入力）`);
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, Constants.SYMBOL_STRING);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「半角英数で入力してください」が表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME),
        INVALID_INPUT_ERROR_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(
        `Step 5. 「案件番号」で半角英数字を入力し、「保存」ボタンをクリックする。（例：「abcd1234」を入力）`,
    );
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, Constants.HALF_SIZE_ALPHA_NUMERIC_STRING);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「半角英数で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME),
        '',
        'Invalid customer code feedback should not be displayed',
    );
});

TestCase('BMS-163. 案件:案件作成:案件番号:重複時', async () => {
    gondola.report(`Step 2. 「案件番号」で重複しているコードを入力し、「保存」ボタンをクリックする`);
    const existingProjectNumber = await addProjectPage.getExistingProjectNumber();
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, existingProjectNumber);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「半角英数で入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(PROJECT_NUMBER_FIELD_NAME),
        PROJECT_NUMBER_FIELD_NAME + Constants.translator.invalidFeedback.isDuplicated,
        'Value is already in use feedback should be displayed',
    );
});
