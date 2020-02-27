import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-validation-setup';
import projectDetailsPage from '../../pages/project-details-page';
import { Constants } from '../../common/constants';
import { ProjectInfoData } from '../../models/project-info';

TestModule('Add Project - Ordered details - Billing date field validation');

Before(setup);
const columnName = Constants.translator.tableColumnName.addProject.orderedDetails;
const REQUIRED_ONLY_RECORD = ProjectInfoData.ORDERED_DETAILS_RECORD_REQUIRED_ONLY;
const INVALID_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.invalidDateFormat;

TestCase('BMS-321. BMS:案件:案件編集:非稼働明細:請求日:「yyyy-mm-dd」形式で入力', async () => {
    gondola.report(`Step 8. 「請求日」の枠内をクリックする。`);
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.billingDate);
    gondola.report(`VP. カレンダー入力画面が表示されこと。`);
    let isDatePickerDisplayed = await projectDetailsPage.doesDatePickerDisplay();
    await gondola.checkTrue(isDatePickerDisplayed, 'Date picker should be displayed');

    gondola.report(`Step 9. カレンダー枠外をクリックする。`);
    await projectDetailsPage.clickOutsideDatePicker();
    gondola.report(`VP. カレンダーは消えること。`);
    isDatePickerDisplayed = await projectDetailsPage.doesDatePickerDisplay(false);
    await gondola.checkFalse(isDatePickerDisplayed, 'Date picker should not be displayed');

    gondola.report(`Step 10. 「請求日」の枠内をクリックし、日付を選択する。`);
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.billingDate);
    const pickedDate = await projectDetailsPage.selectRandomDate();
    gondola.report(`VP. 入力画面に戻り、選択した日付が「yyyy-mm-dd」形式で表示されること。`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.billingDate);
    await gondola.checkEqual(displayedDate, pickedDate, 'Date should be selected correctly in the textfield');

    gondola.report(`Step 11. 案件開始日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.billingDate, Constants.EXAMPLE_DEFAULT_DATE);
    gondola.report(`VP. 「請求日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する。`);
    const selectedDate = await projectDetailsPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );
});

TestCase('BMS-322. BMS:案件:案件編集:非稼働明細:請求日:「yyyy-m-d」形式で入力', async () => {
    gondola.report(`Step 8. 「yyyy-m-d」形式で「請求日」を入力する。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.billingDate, Constants.EXAMPLE_DEFAULT_DATE_SHORT);
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.billingDate);
    gondola.report(`VP. 入力した日付はカレンダーに反映されること。`);
    const selectedDate = await projectDetailsPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );

    gondola.report(`Step 9. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsRow(REQUIRED_ONLY_RECORD);
    await projectDetailsPage.saveNewProject();
    //BUG: navigate to error page
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.billingDate);
    await gondola.checkEqual(
        displayedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-323. BMS:案件:案件編集:非稼働明細:請求日:「yyyy.mm.dd」形式で入力', async () => {
    gondola.report(`Step 8. 「yyyy.mm.dd」形式で「請求日」を入力する。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(
        columnName.billingDate,
        Constants.EXAMPLE_DATE_DIVIDED_BY_DOT,
    );

    gondola.report(`Step 9. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsRow(REQUIRED_ONLY_RECORD);
    await projectDetailsPage.saveNewProject();
    //BUG: navigate to error page
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.billingDate);
    await gondola.checkEqual(
        displayedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-324. BMS:案件:案件編集:非稼働明細:請求日:「yyyy/mm/dd」形式で入力', async () => {
    gondola.report(`Step 8. 「yyyy/mm/dd」形式で「請求日」を入力する。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(
        columnName.billingDate,
        Constants.EXAMPLE_DATE_DIVIDED_BY_SLASH,
    );

    gondola.report(`Step 9. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsRow(REQUIRED_ONLY_RECORD);
    await projectDetailsPage.saveNewProject();
    //BUG: navigate to error page
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.billingDate);
    await gondola.checkEqual(
        displayedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-325.BMS:案件:案件編集:非稼働明細:請求日:下限値・上限値', async () => {
    gondola.report(`Step 8. 請求日で「1899-12-31」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.billingDate, '1899-12-31');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBack(columnName.billingDate),
        INVALID_DATE_ERROR_MESSAGE,
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 9. 請求日で「2100-01-01」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.billingDate, '2100-01-01');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBack(columnName.billingDate),
        INVALID_DATE_ERROR_MESSAGE,
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 10. 請求日で「1900-01-01」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.billingDate, '1900-01-01');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBack(columnName.billingDate),
        '',
        'Invalid date error message should not be displayed',
    );

    gondola.report(`Step 11. 請求日で「2099-12-31」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.billingDate, '2099-12-31');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBack(columnName.billingDate),
        '',
        'Invalid date error message should not be displayed',
    );
});
