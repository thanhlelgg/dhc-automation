import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-department-setup';
import addDepartmentPage from '../../pages/add-department-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Department - Department note field validation');

const DEPARTMENT_NOTE_TEXTFIELD_LABEL = Constants.translator.fieldName.addDepartment.name;
Before(setup);

TestCase('BMS-185. マスタ:部門作成:備考:文字数', async () => {
    gondola.report(`Step 2.「備考」で1024文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 1024;
    await addDepartmentPage.enterTextFieldByLabel(DEPARTMENT_NOTE_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_NOTE_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report(`Step 3.「備考」で1025文字以上を入力し、「保存」ボタンをクリックする。`);
    await addDepartmentPage.enterTextFieldByLabel(
        DEPARTMENT_NOTE_TEXTFIELD_LABEL,
        Utilities.getRandomText(maximumNOC + 1),
    );
    await addDepartmentPage.saveDepartment();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addDepartmentPage.getInvalidFeedBack(DEPARTMENT_NOTE_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.exceededNOCErrorMessage,
        'Invalid feedback should be displayed correctly',
    );
});
