import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-department-setup';
import addDepartmentPage from '../../pages/add-department-page';
import { Utilities } from '../../common/utilities';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Add Department - Department code field validation');

const DEPARTMENT_CODE_TEXTFIELD_LABEL = Constants.translator.fieldName.addDepartment.code;
const INVALID_DEPARTMENT_CODE_ERROR_MESSAGE = Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;
const ALREADY_IN_USE_ERROR_MESSAGE = Constants.translator.invalidFeedback.alreadyInUse;
Before(setup);

TestCase('BMS-181. マスタ:部門作成:部門コード:文字数', async () => {
    gondola.report(`Step 2.「部門コード」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        Constants.fieldRequiredErrorMessage,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「部門コード」で16文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 16;
    await addDepartmentPage.enterTextFieldByLabel(DEPARTMENT_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report(`Step 4.「部門コード」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addDepartmentPage.enterTextFieldByLabel(
        DEPARTMENT_CODE_TEXTFIELD_LABEL,
        Utilities.getRandomText(maximumNOC + 1),
    );
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.exceededNOCErrorMessage,
        'Invalid feedback should be displayed correctly',
    );
});

TestCase('BMS-182. マスタ:部門作成:部門コード:文字種', async () => {
    gondola.report(`Step 2. 「部門コード」で全角英数字を入力し、「保存」ボタンをクリックする`);
    await addDepartmentPage.enterTextFieldByLabel(
        DEPARTMENT_CODE_TEXTFIELD_LABEL,
        Constants.fullSizeAlphaNumericString,
    );
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        INVALID_DEPARTMENT_CODE_ERROR_MESSAGE,
        'Invalid department code feedback should be displayed',
    );

    gondola.report(`Step 3. 「部門コード」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addDepartmentPage.enterTextFieldByLabel(DEPARTMENT_CODE_TEXTFIELD_LABEL, Constants.hiraganaKatakanaString);
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        INVALID_DEPARTMENT_CODE_ERROR_MESSAGE,
        'Invalid department code feedback should be displayed',
    );

    gondola.report(`Step 4. 「部門コード」で記号を入力し、「保存」ボタンをクリックする。（例：「!"#$%&'()」を入力）`);
    await addDepartmentPage.enterTextFieldByLabel(DEPARTMENT_CODE_TEXTFIELD_LABEL, Constants.symbolString);
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        INVALID_DEPARTMENT_CODE_ERROR_MESSAGE,
        'Invalid department code feedback should be displayed',
    );

    gondola.report(`Step 5. 「部門コード」で半角英数字を入力し、「保存」ボタンをクリックする。`);
    await addDepartmentPage.enterTextFieldByLabel(
        DEPARTMENT_CODE_TEXTFIELD_LABEL,
        Constants.halfSizeAlphaNumericString,
    );
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        '',
        'Invalid department code feedback should not be displayed',
    );
});

TestCase('BMS-183. マスタ:部門作成:部門コード:重複時', async () => {
    gondola.report(`Step 2. 「部門コード」で重複しているコードを入力し、「保存」ボタンをクリックする。`);
    const randomExistedDepartment = await DatabaseHelper.getRandomDepartment();
    await addDepartmentPage.enterTextFieldByLabel(DEPARTMENT_CODE_TEXTFIELD_LABEL, randomExistedDepartment.cd);
    await addDepartmentPage.saveDepartment();
    gondola.report(
        `VP. 入力フィールドの下にエラー「既に使われている値のため異なる値を入力してください」が表示されること。`,
    );
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_CODE_TEXTFIELD_LABEL),
        ALREADY_IN_USE_ERROR_MESSAGE,
        'Department code is already in use feedback should be displayed',
    );
});
