import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { DatabaseHelper } from '../../helper/database-helpers';
import { ProjectInfoData } from '../../models/project-info';
import { Utilities } from '../../common/utilities';

TestModule('Add Project - Results base - Debit credit field validation');

const PROJECT_FORM_FIELD_NAME = Constants.translator.fieldName.addProject.projectForm;
const START_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.startDate;
const UNIT_PRICES_INFO = ProjectInfoData.RESULT_BASE_UNIT_PRICES;
const UNIT_PRICES_EMPTY = ProjectInfoData.RESULT_BASE_UNIT_PRICES_EMPTY;

Before(setup);

TestCase('BMS-73. 案件:案件作成:出来高明細:請求単価:自動計算:リーダの場合', async () => {
    const projectRole = Constants.projectRole.leader;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「リーダ」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 得意先マスタの当該取引先の顧客単価と割増率をもとに、請求単価が自動計算されること。`);
    await gondola.checkEqual(
        await addProjectPage.isUnitPriceCalculatedCorrectly(projectRole, customerMagnification, unitPrice.leader),
        true,
        'Unit prices should be calculated correctly',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」で自動計算された値を変更する。`);
    await addProjectPage.enterUnitPrices(projectRole, UNIT_PRICES_INFO);
    gondola.report(`VP. 自動計算された値を変更できること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_INFO),
        'Unit prices should be changed',
    );
});

TestCase('BMS-153. 案件:案件作成:出来高明細:請求単価:自動計算:テスターの場合', async () => {
    const projectRole = Constants.projectRole.tester;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「テスター」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. テスターの出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 得意先マスタの当該取引先の顧客単価と割増率をもとに、請求単価が自動計算されること。`);
    await gondola.checkEqual(
        await addProjectPage.isUnitPriceCalculatedCorrectly(projectRole, customerMagnification, unitPrice.tester),
        true,
        'Unit prices should be calculated correctly',
    );

    gondola.report(`Step 4. 出来高明細行の「請求単価」で自動計算された値を変更する。`);
    await addProjectPage.enterUnitPrices(projectRole, UNIT_PRICES_INFO);
    gondola.report(`VP. 自動計算された値を変更できること。`);
    gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_INFO),
        'Unit prices should be changed',
    );
});

TestCase('BMS-154. 案件:案件作成:出来高明細:請求単価:自動計算:PMの場合', async () => {
    const projectRole = Constants.projectRole.PM;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「PM」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. PMの出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});

TestCase('BMS-155. 案件:案件作成:出来高明細:請求単価:自動計算:設計者の場合 ', async () => {
    const projectRole = Constants.projectRole.designer;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「設計者」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. 設計者の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});

TestCase('BMS-156. 案件:案件作成:出来高明細:請求単価:自動計算:EXDBの場合', async () => {
    const projectRole = Constants.projectRole.expert;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「EXDB」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. EXDBの出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});

TestCase('BMS-157. 案件:案件作成:出来高明細:請求単価:自動計算:予備1の場合', async () => {
    const projectRole = Constants.projectRole.reserve1;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「予備1」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. 予備1の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});

TestCase('BMS-158. 案件:案件作成:出来高明細:請求単価:自動計算:予備2の場合', async () => {
    const projectRole = Constants.projectRole.reserve2;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「予備2」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. 予備2の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});

TestCase('BMS-159. 案件:案件作成:出来高明細:請求単価:自動計算:予備3の場合', async () => {
    const projectRole = Constants.projectRole.reserve3;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「予備3」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. 予備3の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});

TestCase('BMS-160. 案件:案件作成:出来高明細:請求単価:自動計算:予備4の場合', async () => {
    const projectRole = Constants.projectRole.reserve4;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「予備4」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. 予備4の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});

TestCase('BMS-161. 案件:案件作成:出来高明細:請求単価:自動計算:予備5の場合', async () => {
    const projectRole = Constants.projectRole.reserve5;
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の「予備5」チェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    await addProjectPage.setStatusResultBasesRoleCheckbox(projectRole, true);
    gondola.report(`VP. 予備5の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(projectRole),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 出来高明細行で「請求単価」で何も入力しなくて、「取引先」と「案件開始日」を入力する。`);
    const unitPrice = await DatabaseHelper.getRandomCustomerUnitPrices();
    const businessCustomer = await DatabaseHelper.getActiveBusinessCustomerById(unitPrice.business_customer_id);
    const customerMagnification = await DatabaseHelper.getCustomerMagnifications(
        unitPrice.business_customer_id,
        unitPrice.end_date,
    );
    const validStartDate = Utilities.getLaterDateOfTwoDates(
        unitPrice.start_date,
        customerMagnification.start_date,
        Constants.NORMAL_DATE_FORMAT,
    );
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, validStartDate);
    await addProjectPage.selectCustomerByCode(businessCustomer.cd);
    gondola.report(`VP. 請求単価が自動計算されないこと。`);
    await gondola.checkTrue(
        await addProjectPage.doesResultBaseUnitPricesDisplayCorrectly(projectRole, UNIT_PRICES_EMPTY),
        'Unit prices should not be calculated automatically',
    );
});
