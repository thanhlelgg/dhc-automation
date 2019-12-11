import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Add Project - Results base - Debit credit field validation');

const PROJECT_FORM_FIELD_NAME = Constants.translator.fieldName.addProject.projectForm;
const START_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.startDate;

Before(setup);

TestCase('BMS-73. 案件:案件作成:出来高明細:請求単価:自動計算:リーダの場合', async () => {
    const projectRole = Constants.projectRole.leader;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「リーダ」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.checkResultBasesRoleCheckbox(projectRole);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const customerMagnification = await DatabaseHelper.getRandomMagnification();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(
        customerMagnification.business_customer_id,
    );
    const unitPrice = await DatabaseHelper.getCustomerUnitPrice(
        customerMagnification.business_customer_id,
        customerMagnification.start_date,
        customerMagnification.end_date,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, customerMagnification.start_date);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 得意先マスタの当該取引先の顧客単価と割増率をもとに、請求単価が自動計算されること。`);
    await gondola.checkEqual(
        await addProjectPage.isUnitPriceCalculatedCorrectly(projectRole, customerMagnification, unitPrice.leader),
        true,
        'Unit prices should be calculated correctly',
    );
});
