import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import setup from './add-project-setup';
import { ProjectInfoData } from '../../models/project-info';

const PROJECT_OVERVIEW_REQUIRED_ONLY = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;
const SCHEDULED_START_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.scheduledStartDate;
const INVALID_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.invalidDateFormat;
const START_DATE_EXCEEDS_END_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.startDateExceedsEndDate;
const SCHEDULED_END_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.scheduledEndDate;

TestModule('Add Project - Scheduled start date validation');

Before(setup);

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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-168. 案件:案件作成:案件開始予定日:下限値・上限値', async () => {
    gondola.report(`Step 2. 案件開始予定日で「1899-12-31」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, '1899-12-31');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        INVALID_DATE_ERROR_MESSAGE,
        await addProjectPage.getInvalidFeedBack(SCHEDULED_START_DATE_FIELD_NAME),
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 3. 案件開始予定日で「2100-01-01」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, '2100-01-01');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        INVALID_DATE_ERROR_MESSAGE,
        await addProjectPage.getInvalidFeedBack(SCHEDULED_START_DATE_FIELD_NAME),
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 4. 案件開始予定日で「1900-01-01」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, '1900-01-01');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        '',
        await addProjectPage.getInvalidFeedBack(SCHEDULED_START_DATE_FIELD_NAME),
        'Invalid date error message should not be displayed',
    );

    gondola.report(`Step 5. 案件開始予定日で「2099-12-31」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, '2099-12-31');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        '',
        await addProjectPage.getInvalidFeedBack(SCHEDULED_START_DATE_FIELD_NAME),
        'Invalid date error message should not be displayed',
    );
});

TestCase('BMS-169. 案件:案件作成:案件開始予定日:終了日超', async () => {
    gondola.report(`Step 2. 案件開始予定日で終了予定日超の値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, '2020-12-12');
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, '2019-12-12');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「終了日よりも前の日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        START_DATE_EXCEEDS_END_DATE_ERROR_MESSAGE,
        await addProjectPage.getInvalidFeedBack(SCHEDULED_START_DATE_FIELD_NAME),
        'Invalid start date error message should be displayed',
    );
});
