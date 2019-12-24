import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './add-department-setup';
import addDepartmentPage from '../../pages/add-department-page';
import listDepartmentPage from '../../pages/list-department-page';

TestModule('Add Department - Back button test');

Before(setup);

TestCase('BMS-186. マスタ:部門作成:戻るボタン', async () => {
    gondola.report(`Step 2.「戻る」ボタンをクリックする。`);
    await addDepartmentPage.clickReturnButton();
    gondola.report(`VP. 部門一覧画面に遷移すること。`);
    gondola.checkTrue(await listDepartmentPage.isCurrentPage(), 'List department page should be displayed');
});
