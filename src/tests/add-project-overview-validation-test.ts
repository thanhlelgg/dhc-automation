import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../pages/login-page';
import addProjectPage from '../pages/add-project-page';
import businessSystemPage from '../pages/business-system-page';
import { Constants } from '../common/constants';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { Utilities } from '../common/utilities';

TestModule('Add Project Overview validation');

const BUSINESS_CUSTOMER_FIELD_NAME = Constants.translator.fieldName.businessCustomer;
const PROJECT_NAME_FIELD_NAME = Constants.translator.fieldName.name;
const SEARCH_CUSTOMER_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.customerSearchTitle;
const DEPARTMENT_FIELD_NAME = Constants.translator.fieldName.department;
const SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.departmentSearchTitle;
const WORKER_FIELD_NAME = Constants.translator.fieldName.worker;
const SEARCH_WORKER_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.workerSearchTitle;

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「案件」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
});

TestCase('BMS-1. 案件:案件作成:案件形態', async () => {
    gondola.report(`Step 2.「案件形態」プルダウンで選択肢を確認する`);
    const projectFormOptions = [
        Constants.projectForms.continue,
        Constants.projectForms.result,
        Constants.projectForms.shot,
    ];
    await gondola.checkEqual(
        await addProjectPage.checkProjectFormOptions(projectFormOptions),
        true,
        'Project form options should be displayed correctly',
    );

    gondola.report(`Step 3.「案件形態」プルダウンで「出来高案件」を選択し`);
    await addProjectPage.selectProjectForm(Constants.projectForms.result);
    gondola.report(`VP.「案件明細」の上に「出来高明細」欄が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.isProjectResultSectionDisplayed(),
        true,
        'Project result section should be displayed',
    );

    gondola.report(`Step 4. 出来高案件」以外の選択肢を選択する`);
    await addProjectPage.selectProjectForm(Constants.projectForms.continue);
    gondola.report(`VP.「出来高明細」欄が表示されないこと`);
    await gondola.checkEqual(
        await addProjectPage.isProjectResultSectionDisplayed(),
        false,
        'Project result section should not be displayed',
    );
});

TestCase('BMS-2. 案件:案件作成:案件名:未入力と境界値の入力', async () => {
    gondola.report(`Step 2.「案件名」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    let actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「案件名」テキストボックスで256文字以上を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(PROJECT_NAME_FIELD_NAME, Constants.exceededNOCMessage);
    await addProjectPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「255文字以内で入力してください」が表示されること。`);
    actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.exceededNOCErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-3. 案件:案件作成:取引先:得意先の検索および結果表示', async () => {
    gondola.report(`Step 2. 「取引先」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(BUSINESS_CUSTOMER_FIELD_NAME);
    gondola.report(`VP. 取引先検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_CUSTOMER_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search customer modal title should be displayed');
    gondola.report(`Step 3. 取引先のデータ表示を確認する`);
    gondola.report(`VP. 得意先マスタで有効としたものは表示され、無効としたものは表示されないこと。`);
    gondola.checkEqual(
        await addProjectPage.doesBusinessCustomerDisplayCorrect(),
        true,
        'Business customers should be displayed correctly',
    );

    gondola.report(`Step 4. 取引先コード、取引先名、取引先担当名について、文字入力する。`);
    const randomResult = await addProjectPage.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await addProjectPage.filterCustomerAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(
        `VP. AND検索で絞り込みができ、各結果行で取引先コード、取引先名、取引先担当名は入力したフィールドと一致すること。`,
    );
    // BUG: filtering is not working correctly
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 6. 検索結果を確認する。`);
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await addProjectPage.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 案件登録画面に戻り、選択した社名と担当名が表示されること。`);
    const inputtedText = await addProjectPage.getTextFieldValueByLabel(BUSINESS_CUSTOMER_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Customer should be selected');
});

TestCase('BMS-4. 案件:案件作成:取引先:未入力', async () => {
    gondola.report(`Step 2. 取引先を入力しなくて、保存する`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    const actualFeedback = await addProjectPage.getInvalidFeedBack(BUSINESS_CUSTOMER_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-5. 案件:案件作成:取引先:モーダルウィンドウのクローズ ', async () => {
    gondola.report(`Step 2. モーダルウィンドウを起動する`);
    await addProjectPage.clickTextFieldByLabel(BUSINESS_CUSTOMER_FIELD_NAME);
    gondola.report(`VP. モーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_CUSTOMER_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search customer modal title should be displayed');

    gondola.report(`Step 3.「×」をクリックする。`);
    addProjectPage.closeModalWindowByName(SEARCH_CUSTOMER_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_CUSTOMER_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search customer modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(BUSINESS_CUSTOMER_FIELD_NAME);
    await addProjectPage.clickOutsideOfWindowModal();
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_CUSTOMER_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search customer modal title should not be displayed');
});

TestCase('BMS-6. 案件:案件作成:部門:未入力', async () => {
    gondola.report(`Step 2. 部門を入力しなくて、保存する`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    const actualFeedback = await addProjectPage.getInvalidFeedBack(DEPARTMENT_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-7. 案件:案件作成:部門:部門の検索および結果表示', async () => {
    gondola.report(`Step 2. 「部門」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(DEPARTMENT_FIELD_NAME);
    gondola.report(`VP. 部門検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search customer modal title should be displayed');
    gondola.report(`Step 3. 部門のデータ表示を確認する。`);
    gondola.report(`VP. 部門マスタで有効としたものは表示されること。`);
    gondola.checkEqual(
        await addProjectPage.doesDepartmentsDisplayCorrect(),
        true,
        'Department should be displayed correctly',
    );

    gondola.report(`Step 4. 検索条件欄にはコード又は部門名の一部を入力する。`);
    const randomResult = await addProjectPage.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await addProjectPage.filterDepartmentsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、または部門名は入力したフィールドと一致すること。`);
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 6. 任意の検索結果を選択する。`);
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await addProjectPage.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 案件登録画面に戻り、選択した部門名が表示されること。`);
    const inputtedText = await addProjectPage.getTextFieldValueByLabel(DEPARTMENT_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Department should be selected');
});

TestCase('BMS-8. 案件:案件作成:取引先:モーダルウィンドウのクローズ ', async () => {
    gondola.report(`Step 2. 「部門」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(DEPARTMENT_FIELD_NAME);
    gondola.report(`VP. 部門検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search departments modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    addProjectPage.closeModalWindowByName(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search Departments modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(DEPARTMENT_FIELD_NAME);
    await addProjectPage.clickOutsideOfWindowModal();
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search Departments modal title should not be displayed');
});

TestCase('BMS-9. 案件:案件作成:担当者:未入力', async () => {
    gondola.report(`Step 2. 「担当者」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    const actualFeedback = await addProjectPage.getInvalidFeedBack(WORKER_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-10. 案件:案件作成:担当者:モーダルウィンドウのクローズ', async () => {
    gondola.report(`Step 2. 「担当者」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(WORKER_FIELD_NAME);
    gondola.report(`VP. 担当者検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_WORKER_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search worker modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    addProjectPage.closeModalWindowByName(SEARCH_WORKER_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_WORKER_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search worker modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(WORKER_FIELD_NAME);
    await addProjectPage.clickOutsideOfWindowModal();
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_WORKER_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search worker modal title should not be displayed');
});

TestCase('BMS-11. 案件:案件作成:担当者:担当者の検索および結果表示', async () => {
    gondola.report(`Step 2. 「担当者」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(WORKER_FIELD_NAME);
    gondola.report(`VP. 担当者検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_WORKER_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search Worker modal title should be displayed');
    gondola.report(`Step 3. 担当者のデータ表示を確認する。`);
    gondola.report(`VP. 従業員マスタで有効としたものは表示されること。`);
    gondola.checkEqual(await addProjectPage.doesWorkersDisplayCorrect(), true, 'Worker should be displayed correctly');

    gondola.report(`Step 4. 検索条件欄にはコード又は従業員名の一部を入力する。`);
    const randomResult = await addProjectPage.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await addProjectPage.filterWorkersAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、または従業員名は入力したフィールドと一致すること。`);
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 6. 任意の検索結果を選択する。`);
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await addProjectPage.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 案件登録画面に戻り、選択した従業員名が表示されること。`);
    const inputtedText = await addProjectPage.getTextFieldValueByLabel(WORKER_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Worker should be selected');
});
