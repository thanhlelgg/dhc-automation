import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { ProjectInfoData } from '../../models/project-info';

TestModule('Add Project - Results base section validation');

const PROJECT_FORM_FIELD_NAME = Constants.translator.fieldName.addProject.projectForm;
const PROJECT_RESULT_BASE_DATA = ProjectInfoData.RESULT_BASE_ONE_RECORD;
const PROJECT_OVERVIEW_REQUIRED_ONLY = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;
const PROJECT_RESULT_BASE_EMPTY_RECORD = ProjectInfoData.RESULT_BASE_ONE_EMPTY_RECORD;

Before(setup);

TestCase('BMS-51. 案件:案件作成:出来高明細:請求用役職別のチェックボックス', async () => {
    gondola.report(`Step 2.「案件形態」で「出来高案件」を選択する。`);
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    gondola.report(`VP. 出来高明細欄が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.isProjectResultSectionDisplayed(),
        true,
        'Project result base section is displayed',
    );
    gondola.report(`Step 3. 請求用役職別のチェックボックスでチェックを行う。`);
    //we just do a random one
    const randomRole = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.checkResultBasesRoleCheckbox(randomRole);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRole),
        true,
        'Billing details line for role should be displayed',
    );

    gondola.report(
        `Step 4. 該当する請求用役職の出来高明細行で任意の内容を入力し、チェックを入れたチェックボックスでチェックを外す。`,
    );
    PROJECT_RESULT_BASE_DATA[0].role = randomRole;
    await addProjectPage.inputProjectResultBases(PROJECT_RESULT_BASE_DATA);
    await addProjectPage.uncheckResultBasesRoleCheckbox(randomRole);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRole, false),
        false,
        'Billing details line for role should be displayed',
    );

    gondola.report(`Step 5. 上のチェックボックスで再度チェックを入れる。`);
    await addProjectPage.checkResultBasesRoleCheckbox(randomRole);
    gondola.report(`VP. ステップ4で入力された値も保持した状態で表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResultBasesDisplayCorrect(PROJECT_RESULT_BASE_DATA),
        true,
        'Project Result base should be displayed correctly',
    );

    gondola.report(`Step 6. 再度チェックを外し、「保存」ボタンをクリックし、再度チェックを入れる。`);
    await addProjectPage.uncheckResultBasesRoleCheckbox(randomRole);
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 当該請求用役職のデータは入力途中であってもクリアされること。`);
    PROJECT_RESULT_BASE_EMPTY_RECORD[0].role = randomRole;
    await addProjectPage.checkResultBasesRoleCheckbox(randomRole);
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResultBasesDisplayCorrect(PROJECT_RESULT_BASE_EMPTY_RECORD),
        true,
        'Project Result base should be displayed correctly',
    );
});
