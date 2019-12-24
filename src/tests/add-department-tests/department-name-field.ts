import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-department-setup';
import addDepartmentPage from '../../pages/add-department-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Department - Department name field validation');

const DEPARTMENT_NAME_TEXTFIELD_LABEL = Constants.translator.fieldName.addDepartment.name;
Before(setup);

TestCase('BMS-184. マスタ:部門作成:部門名:文字数', async () => {
    gondola.report(`Step 2.「部門名」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_NAME_TEXTFIELD_LABEL),
        Constants.fieldRequiredErrorMessage,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「部門名」で64文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 64;
    await addDepartmentPage.enterTextFieldByLabel(DEPARTMENT_NAME_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_NAME_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report(`Step 4.「部門名」で65文字以上を入力し、「保存」ボタンをクリックする。`);
    await addDepartmentPage.enterTextFieldByLabel(
        DEPARTMENT_NAME_TEXTFIELD_LABEL,
        Utilities.getRandomText(maximumNOC + 1),
    );
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_NAME_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.exceededNOCErrorMessage,
        'Invalid feedback should be displayed correctly',
    );
});
