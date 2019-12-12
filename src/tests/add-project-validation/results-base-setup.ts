import { gondola } from 'gondolajs';
import { Constants } from '../../common/constants';
import addProjectPage from '../../pages/add-project-page';
import addProjectSetup from './add-project-setup';

export default async function setup(): Promise<string> {
    await addProjectSetup();
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の請求用役職別のチェックボックスでチェックを行う。`,
    );
    const PROJECT_FORM_FIELD_NAME = Constants.translator.fieldName.addProject.projectForm;
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    const randomRole = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.setStatusResultBasesRoleCheckbox(randomRole, true);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRole),
        true,
        'Billing details line for role should be displayed',
    );
    return randomRole;
}
