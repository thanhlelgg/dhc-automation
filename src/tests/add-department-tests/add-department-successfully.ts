import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './add-department-setup';
import addDepartmentPage from '../../pages/add-department-page';
import listDepartmentPage from '../../pages/list-department-page';
import { DepartmentInfoData } from '../../models/department-info';
import { Utilities } from '../../common/utilities';
import { Constants } from '../../common/constants';

const SEARCH_CODE_FIELD_NAME = Constants.translator.fieldName.departmentList.code;

TestModule('Add Department - Add Department successfully test');

Before(setup);

TestCase('BMS-187. マスタ:部門作成:保存ボタン:必須項目のみ', async () => {
    const departmentInfo = DepartmentInfoData.DEPARTMENT_REQUIRED_DATA;
    departmentInfo.code += Utilities.getRandomText(10);
    gondola.report(`Step 2.「部門コード」と「部門名」で有効な情報を入力する。`);
    await addDepartmentPage.enterDepartmentInformation(departmentInfo);
    gondola.report(`Step 3. 「保存」ボタンをクリックする。`);
    //BUG: currently department is also required, so we can't create new department, lead to testcase failed
    await addDepartmentPage.saveDepartment();
    gondola.report(
        `VP. 正常に保存でき、部門一覧画面には登録した部門が表示され、登録された部門の内容は正しく保存されること。`,
    );
    await addDepartmentPage.clickReturnButton();
    await listDepartmentPage.enterTextFieldByLabel(SEARCH_CODE_FIELD_NAME, departmentInfo.code);
    await listDepartmentPage.clickSearchButton();
    await listDepartmentPage.openDepartmentByCode(departmentInfo.code);
    gondola.checkTrue(await addDepartmentPage.doesDepartmentDisplayCorrectly(departmentInfo));
});

TestCase('BMS-188. マスタ:部門作成:保存ボタン:全ての項目', async () => {
    const departmentInfo = DepartmentInfoData.DEPARTMENT_FULL_DATA;
    departmentInfo.code += Utilities.getRandomText(10);
    gondola.report(`Step 2.「部門コード」と「部門名」で有効な情報を入力する。`);
    gondola.report(`Step 3. 他の項目（「備考」）で有効な情報を入力する。`);
    await addDepartmentPage.enterDepartmentInformation(departmentInfo);
    gondola.report(`Step 4.「保存」ボタンをクリックする。`);
    //BUG: currently department is also required, so we can't create new department, lead to testcase failed
    await addDepartmentPage.saveDepartment();
    gondola.report(
        `VP. 正常に保存でき、部門一覧画面には登録した部門が表示され、登録された部門の内容は正しく保存されること。`,
    );
    await addDepartmentPage.clickReturnButton();
    await listDepartmentPage.enterTextFieldByLabel(SEARCH_CODE_FIELD_NAME, departmentInfo.code);
    await listDepartmentPage.clickSearchButton();
    await listDepartmentPage.openDepartmentByCode(departmentInfo.code);
    gondola.checkTrue(await addDepartmentPage.doesDepartmentDisplayCorrectly(departmentInfo));
});
