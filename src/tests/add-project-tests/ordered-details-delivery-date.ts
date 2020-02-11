import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-validation-setup';
import projectDetailsPage from '../../pages/project-details-page';
import { Constants } from '../../common/constants';
import { ProjectInfoData } from '../../models/project-info';

TestModule('Add Project - Ordered details - Delivery date field validation');

Before(setup);
const columnName = Constants.translator.tableColumnName.addProject.orderedDetails;
const REQUIRED_ONLY_RECORD = ProjectInfoData.ORDERED_DETAILS_RECORD_REQUIRED_ONLY;
const INVALID_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.invalidDateFormat;

TestCase('BMS-311. BMS:案件:案件編集:非稼働明細:納品日:「yyyy-mm-dd」形式で入力', async () => {
    gondola.report(`Step 8. 「納品日」の枠内をクリックする。`);
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.deliveryDate);
    gondola.report(`VP. カレンダー入力画面が表示されこと。`);
    let isDatePickerDisplayed = await projectDetailsPage.doesDatePickerDisplay();
    await gondola.checkEqual(isDatePickerDisplayed, true, 'Date picker should be displayed');

    gondola.report(`Step 9. カレンダー枠外をクリックする。`);
    await projectDetailsPage.clickOutsideDatePicker();
    gondola.report(`VP. カレンダーは消えること。`);
    isDatePickerDisplayed = await projectDetailsPage.doesDatePickerDisplay(false);
    await gondola.checkEqual(isDatePickerDisplayed, false, 'Date picker should not be displayed');

    gondola.report(`Step 10. 「納品日」の枠内をクリックし、日付を選択する。`);
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.deliveryDate);
    const pickedDate = await projectDetailsPage.selectRandomDate();
    gondola.report(`VP. 入力画面に戻り、選択した日付が「yyyy-mm-dd」形式で表示されること。`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.deliveryDate);
    await gondola.checkEqual(pickedDate, displayedDate, 'Date should be selected correctly in the textfield');

    gondola.report(`Step 11. 案件開始日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.deliveryDate, Constants.EXAMPLE_DEFAULT_DATE);
    gondola.report(`VP. 「納品日」テキストボックスで「yyyy-mm-dd」形式で日付を直接入力する。`);
    const selectedDate = await projectDetailsPage.getSelectedDate();
    await gondola.checkEqual(
        selectedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the calendar',
    );
});

TestCase('BMS-312. BMS:案件:案件編集:非稼働明細:納品日:「yyyy-m-d」形式で入力', async () => {
    gondola.report(`Step 8. 「yyyy-m-d」形式で「納品日」を入力する。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(
        columnName.deliveryDate,
        Constants.EXAMPLE_DEFAULT_DATE_SHORT,
    );
    await projectDetailsPage.clickOrderedDetailsTextfield(columnName.deliveryDate);
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
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.deliveryDate);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-313. BMS:案件:案件編集:非稼働明細:納品日:「yyyy.mm.dd」形式で入力', async () => {
    gondola.report(`Step 8. 「yyyy.mm.dd」形式で「納品日」を入力する。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(
        columnName.deliveryDate,
        Constants.EXAMPLE_DATE_DIVIDED_BY_DOT,
    );

    gondola.report(`Step 9. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsRow(REQUIRED_ONLY_RECORD);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.deliveryDate);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-314. BMS:案件:案件編集:非稼働明細:納品日:「yyyy/mm/dd」形式で入力', async () => {
    gondola.report(`Step 8. 「yyyy/mm/dd」形式で「納品日」を入力する。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(
        columnName.deliveryDate,
        Constants.EXAMPLE_DATE_DIVIDED_BY_SLASH,
    );

    gondola.report(`Step 9. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsRow(REQUIRED_ONLY_RECORD);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await projectDetailsPage.getOrderedDetailsTextfield(columnName.deliveryDate);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-315.BMS:案件:案件編集:非稼働明細:納品日:下限値・上限値', async () => {
    gondola.report(`Step 8. 納品日で「1899-12-31」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.deliveryDate, '1899-12-31');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        INVALID_DATE_ERROR_MESSAGE,
        await projectDetailsPage.getInvalidFeedBack(columnName.deliveryDate),
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 9. 納品日で「2100-01-01」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.deliveryDate, '2100-01-01');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBack(columnName.deliveryDate),
        INVALID_DATE_ERROR_MESSAGE,
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 10. 納品日で「1900-01-01」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.deliveryDate, '1900-01-01');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBack(columnName.deliveryDate),
        '',
        'Invalid date error message should not be displayed',
    );

    gondola.report(`Step 11. 納品日で「2099-12-31」を入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.deliveryDate, '2099-12-31');
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBack(columnName.deliveryDate),
        '',
        'Invalid date error message should not be displayed',
    );
});
