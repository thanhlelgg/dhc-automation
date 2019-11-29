import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../pages/login-page';
import addProjectPage from '../pages/add-project-page';
import businessSystemPage from '../pages/business-system-page';
import { Constants } from '../common/constants';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { Utilities } from '../common/utilities';
import listProjectPage from '../pages/list-project-page';

TestModule('Add Project Overview validation');

const PROJECT_NUMBER_FIELD_NAME = Constants.translator.fieldName.number;
const BUSINESS_CUSTOMER_FIELD_NAME = Constants.translator.fieldName.businessCustomer;
const PROJECT_NAME_FIELD_NAME = Constants.translator.fieldName.name;
const SEARCH_CUSTOMER_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.customerSearchTitle;
const DEPARTMENT_FIELD_NAME = Constants.translator.fieldName.department;
const SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.departmentSearchTitle;
const WORKER_FIELD_NAME = Constants.translator.fieldName.worker;
const SEARCH_WORKER_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.workerSearchTitle;
const START_DATE_FIELD_NAME = Constants.translator.fieldName.startDate;
const END_DATE_FIELD_NAME = Constants.translator.fieldName.endDate;
const SCHEDULED_START_DATE_FIELD_NAME = Constants.translator.fieldName.scheduledStartDate;
const SCHEDULED_END_DATE_FIELD_NAME = Constants.translator.fieldName.scheduledEndDate;
const ACCURACY_FIELD_NAME = Constants.translator.fieldName.accuracy;
const PROJECT_STATUS_FIELD_NAME = Constants.translator.fieldName.status;
const PROJECT_PLACE_FIELD_NAME = Constants.translator.fieldName.place;
const LAB_NAME_FIELD_NAME = Constants.translator.fieldName.labName;

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「案件」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
});

TestCase('BMS-1. 案件:案件作成:案件形態', async () => {
    gondola.report(`Step 2.「案件形態」プルダウンで選択肢を確認する`);
    const projectFormOptions = Object.values(Constants.projectForms);
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
        Constants.exceededNOCErrorMessage255,
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

TestCase('BMS-12. 案件:案件作成:案件開始日:未入力 ', async () => {
    gondola.report(
        `Step 2. 案件開始日を入力しない、他のフィールドでTTS連携できるように情報を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(青い紙飛行機のアイコン)をクリックする。`);
    await listProjectPage.clickOnTTSLinkButton(projectNumber);
    gondola.report(`VP. エラーとなること。`);
    await (gondola as any).waitForAlert();
    await gondola.checkEqual(
        await gondola.getPopupText(),
        Constants.translator.alertMessage.couldNotSend,
        'Error message should be displayed',
    );
});

TestCase('BMS-13. 案件:案件作成:案件開始日:「yyyy-mm-dd」形式で入力 ', async () => {
    gondola.report(`Step 2. 「案件開始日」の枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(START_DATE_FIELD_NAME);
    gondola.report(`VP. カレンダー入力画面が表示されこと。`);
    let isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay();
    await gondola.checkEqual(isDatePickerDisplayed, true, 'Date picker should be displayed');

    gondola.report(`Step 3. カレンダー枠外をクリックする。`);
    await addProjectPage.clickOutsideDatePicker();
    gondola.report(`VP. カレンダーは消えること。`);
    isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay(false);
    await gondola.checkEqual(isDatePickerDisplayed, false, 'Date picker should not be displayed');

    gondola.report(`Step 4. 「案件開始日」の枠内をクリックし、日付を選択する。`);
    await addProjectPage.clickTextFieldByLabel(START_DATE_FIELD_NAME);
    const pickedDate = await addProjectPage.selectRandomDate();
    gondola.report(`VP. 入力画面に戻り、選択した日付が「yyyy-mm-dd」形式で表示されること。`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(START_DATE_FIELD_NAME);
    await gondola.checkEqual(pickedDate, displayedDate, 'Date should be selected correctly in the textfield');

    gondola.report(`Step 5. 案件開始日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する`);
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE);
    gondola.report(`VP. 直接入力でき、入力した日付はカレンダーに反映されること。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );
});

TestCase('BMS-14. 案件:案件作成:案件開始日:「yyyy-m-d」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy-m-d」形式で「案件開始日」を入力する`);
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE_SHORT);
    await addProjectPage.clickTextFieldByLabel(START_DATE_FIELD_NAME);
    gondola.report(`VP. 入力した日付はカレンダーに反映されること。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-15. 案件:案件作成:案件開始日:「yyyy.mm.dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy.mm.dd」形式で「案件開始日」を入力する`);
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_DOT);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-16. 案件:案件作成:案件開始日:「yyyy/mm/dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy-m-d」形式で「案件開始日」を入力する`);
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_SLASH);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-17. 案件:案件作成:案件終了日:未入力 ', async () => {
    gondola.report(`Step 2. 案件終了日を入力しなくて、他の情報を入力し、保存する`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(青い紙飛行機のアイコン)をクリックする。`);
    await listProjectPage.clickOnTTSLinkButton(projectNumber);
    gondola.report(`VP. エラーとなること。`);
    await (gondola as any).waitForAlert();
    await gondola.checkEqual(
        await gondola.getPopupText(),
        Constants.translator.alertMessage.couldNotSend,
        'Error message should be displayed',
    );
});

TestCase('BMS-19. 案件:案件作成:案件終了日:「yyyy-mm-dd」形式で入力', async () => {
    gondola.report(`Step 2. 「案件終了日」の枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(END_DATE_FIELD_NAME);
    gondola.report(`VP. カレンダー入力画面が表示されこと。`);
    let isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay();
    await gondola.checkEqual(isDatePickerDisplayed, true, 'Date picker should be displayed');

    gondola.report(`Step 3. カレンダー枠外をクリックする。`);
    await addProjectPage.clickOutsideDatePicker();
    gondola.report(`VP. カレンダーは消えること。`);
    isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay(false);
    await gondola.checkEqual(isDatePickerDisplayed, false, 'Date picker should not be displayed');

    gondola.report(`Step 4. 「案件終了日」の枠内をクリックし、日付を選択する。`);
    await addProjectPage.clickTextFieldByLabel(END_DATE_FIELD_NAME);
    const pickedDate = await addProjectPage.selectRandomDate();
    gondola.report(`VP. 入力画面に戻り、選択した日付が「yyyy-mm-dd」形式で表示されること。`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(END_DATE_FIELD_NAME);
    await gondola.checkEqual(pickedDate, displayedDate, 'Date should be selected correctly in the textfield');

    gondola.report(`Step 5. 案件開始日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE);
    gondola.report(`VP. 「案件終了日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );
});

TestCase('BMS-20. 案件:案件作成:案件開始日:「yyyy-m-d」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy-m-d」形式で「案件終了日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE_SHORT);
    await addProjectPage.clickTextFieldByLabel(END_DATE_FIELD_NAME);
    gondola.report(`VP. 入力した日付はカレンダーに反映されること。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-21. 案件:案件作成:案件終了日:「yyyy.mm.dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy.mm.dd」形式で「案件終了日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_DOT);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-22. 案件:案件作成:案件終了日:「yyyy/mm/dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy/mm/dd」形式で「案件終了日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_SLASH);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-23. 案件:案件作成:案件開始予定日:「yyyy-mm-dd」形式で入力', async () => {
    gondola.report(`Step 2. 「案件開始予定日」の枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    gondola.report(`VP. カレンダー入力画面が表示されこと。`);
    let isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay();
    await gondola.checkEqual(isDatePickerDisplayed, true, 'Date picker should be displayed');

    gondola.report(`Step 3. カレンダー枠外をクリックする。`);
    await addProjectPage.clickOutsideDatePicker();
    gondola.report(`VP. カレンダーは消えること。`);
    isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay(false);
    await gondola.checkEqual(isDatePickerDisplayed, false, 'Date picker should not be displayed');

    gondola.report(`Step 4. 「案件開始予定日」の枠内をクリックし、日付を選択する。`);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    const pickedDate = await addProjectPage.selectRandomDate();
    gondola.report(`VP. 入力画面に戻り、選択した日付が「yyyy-mm-dd」形式で表示されること。`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    await gondola.checkEqual(pickedDate, displayedDate, 'Date should be selected correctly in the textfield');

    gondola.report(`Step 5. 「案件開始予定日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE);
    gondola.report(`VP. 「案件終了日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );
});

TestCase('BMS-24. 案件:案件作成:案件開始予定日:「yyyy-m-d」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy-m-d」形式で「案件開始予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE_SHORT);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    gondola.report(`VP. 入力した日付はカレンダーに反映されること。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-25. 案件:案件作成:案件開始予定日:「yyyy.mm.dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy.mm.dd」形式で「案件開始予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_DOT);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-26. 案件:案件作成:案件開始予定日:「yyyy/mm/dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy/mm/dd」形式で「案件開始予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(
        SCHEDULED_START_DATE_FIELD_NAME,
        Constants.EXAMPLE_DATE_DIVIDED_BY_SLASH,
    );

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-27. 案件:案件作成:案件終了予定日:「yyyy-mm-dd」形式で入力', async () => {
    gondola.report(`Step 2. 「案件終了予定日」の枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    gondola.report(`VP. カレンダー入力画面が表示されこと。`);
    let isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay();
    await gondola.checkEqual(isDatePickerDisplayed, true, 'Date picker should be displayed');

    gondola.report(`Step 3. カレンダー枠外をクリックする。`);
    await addProjectPage.clickOutsideDatePicker();
    gondola.report(`VP. カレンダーは消えること。`);
    isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay(false);
    await gondola.checkEqual(isDatePickerDisplayed, false, 'Date picker should not be displayed');

    gondola.report(`Step 4. 「案件終了予定日」の枠内をクリックし、日付を選択する。`);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    const pickedDate = await addProjectPage.selectRandomDate();
    gondola.report(`VP. 入力画面に戻り、選択した日付が「yyyy-mm-dd」形式で表示されること。`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(pickedDate, displayedDate, 'Date should be selected correctly in the textfield');

    gondola.report(`Step 5. 「案件終了予定日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE);
    gondola.report(`VP. 「案件終了日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );
});

TestCase('BMS-28. 案件:案件作成:案件終了予定日:「yyyy-m-d」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy-m-d」形式で「案件終了予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE_SHORT);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    gondola.report(`VP. 入力した日付はカレンダーに反映されること。`);
    const selectedDate = await addProjectPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-29. 案件:案件作成:案件終了予定日:「yyyy.mm.dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy.mm.dd」形式で「案件終了予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_DOT);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-30. 案件:案件作成:案件終了予定日:「yyyy/mm/dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy/mm/dd」形式で「案件終了予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_SLASH);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(Constants.PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-31. 「案件番号」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。', async () => {
    gondola.report(`Step 2.「案件名」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(PROJECT_NUMBER_FIELD_NAME, Constants.exceededNOCMessage);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    let actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「案件番号」テキストボックスで51文字以上を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(PROJECT_NAME_FIELD_NAME, Constants.exceededNOCMessage);
    await addProjectPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「50文字以内で入力してください」が表示されること。`);
    actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.exceededNOCErrorMessage50,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-32. 案件:案件作成:確度:選択肢', async () => {
    gondola.report(`Step 2.「確度」プルダウンで選択肢を確認する。`);
    const projectAccuracyOptions = Object.values(Constants.accuracyTypes);
    gondola.report(`VP.確度」は必須項目であり`);
    await gondola.checkEqual(
        await addProjectPage.doesFieldRequired(ACCURACY_FIELD_NAME),
        true,
        'Project accuracy field should be required',
    );
    gondola.report(`VP.「確度」プルダウンには選択肢が三つあり、「高」と「普通」と「低」を含んでいること。`);
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(ACCURACY_FIELD_NAME, projectAccuracyOptions),
        true,
        'Project accuracy options should be displayed correctly',
    );
});

TestCase('BMS-33. 案件:案件作成:ステータス:選択肢 ', async () => {
    gondola.report(`Step 2.「ステータス」プルダウンで選択肢を確認する。`);
    const projectStatusOptions = Object.values(Constants.projectStatuses);
    gondola.report(`VP.確度」は必須項目であり`);
    await gondola.checkEqual(
        await addProjectPage.doesFieldRequired(PROJECT_STATUS_FIELD_NAME),
        true,
        'Project status field should be required',
    );
    gondola.report(`VP.「ステータス」は必須項目であり、「ステータス」プルダウンには選択肢が8つあり`);
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(PROJECT_STATUS_FIELD_NAME, projectStatusOptions),
        true,
        'Project status options should be displayed correctly',
    );
});

TestCase('BMS-34. 案件:案件作成:ステータス:「見込」の選択肢', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「見込」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.prospecting;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が無効であり、TTS連携可能がないこと。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        true,
        'TTS Link should be disabled',
    );
});

TestCase('BMS-35. 案件:案件作成:ステータス:「見積済」の選択肢', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「見積済」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.estimated;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が無効であり、TTS連携可能がないこと。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        true,
        'TTS Link should be disabled',
    );
});

TestCase('BMS-36. 案件:案件作成:ステータス:「延期」の選択肢択肢', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「延期」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.postponed;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が無効であり、TTS連携可能がないこと。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        true,
        'TTS Link should be disabled',
    );
});

TestCase('BMS-37. 案件:案件作成:ステータス:「失注」の選択肢', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「失注」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.lost;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が無効であり、TTS連携可能がないこと。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        true,
        'TTS Link should be disabled',
    );
});

TestCase('BMS-38. 案件:案件作成:ステータス:「仮受注」の選択肢', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「仮受注」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.temporaryOrdering;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が青で有効であり、TTS連携可能があること。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        false,
        'TTS Link should be enabled',
    );
});

TestCase('BMS-39. 案件:案件作成:ステータス:「受注済」の選択肢', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「受注済」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.ordered;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が青で有効であり、TTS連携可能があること。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        false,
        'TTS Link should be enabled',
    );
});

TestCase('BMS-40. 案件:案件作成:ステータス:「納品済」の選択肢', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「納品済」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.delivered;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が青で有効であり、TTS連携可能があること。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        false,
        'TTS Link should be enabled',
    );
});

TestCase('BMS-41. 案件:案件作成:ステータス:「完了」の選択肢 ', async () => {
    gondola.report(
        `Step 2. 「ステータス」プルダウンで「完了」を選択し、他のフィールドで情報を入力し、「保存」ボタンをクリックする。`,
    );
    const overviewData = Constants.PROJECT_OVERVIEW_REQUIRED_ONLY;
    overviewData.status = Constants.projectStatuses.done;
    await addProjectPage.inputProjectOverviewInfo(overviewData);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getTextFieldValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject();
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(紙飛行機のアイコン)を確認する。`);
    gondola.report(`VP. 「TTS連携ボタン」が青で有効であり、TTS連携可能があること。`);
    await gondola.checkEqual(
        await listProjectPage.isTTSLinkDisabled(projectNumber),
        false,
        'TTS Link should be enabled',
    );
});

TestCase('BMS-42. 案件:案件作成:場所:選択肢', async () => {
    gondola.report(`Step 2.「場所」プルダウンで選択肢を確認する。`);
    const placeOptions = Object.values(Constants.projectPlace);
    gondola.report(
        `VP.「場所」は必須項目であり、「場所」プルダウンには選択肢が三つあり、「社内」、「出向」、「派遣」を含んでいること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.doesFieldRequired(PROJECT_PLACE_FIELD_NAME),
        true,
        'Project place field should be required',
    );
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(PROJECT_PLACE_FIELD_NAME, placeOptions),
        true,
        'Project place options should be displayed correctly',
    );

    gondola.report(
        `Step 3.「場所」プルダウンで「社内」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.projectPlace.house);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    gondola.report(`VP. お客様先が表示されなくて、社内のラボのみが表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesLabsDisplayCorrect(true),
        true,
        'Labs should be displayed correctly',
    );
    await addProjectPage.clickOutsideOfWindowModal();

    gondola.report(
        `Step 4.「場所」プルダウンで「出向」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.projectPlace.secondment);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    await addProjectPage.waitForTableUpdated();
    gondola.report(`VP. お客様先が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesLabsDisplayCorrect(false),
        true,
        'Labs should be displayed correctly',
    );
    await addProjectPage.clickOutsideOfWindowModal();

    gondola.report(
        `Step 5.「場所」プルダウンで「派遣」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.projectPlace.dispatch);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    await addProjectPage.waitForTableUpdated();
    gondola.report(`VP. お客様先が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesLabsDisplayCorrect(false),
        true,
        'Labs should be displayed correctly',
    );
});
