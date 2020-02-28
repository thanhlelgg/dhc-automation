import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { ProjectInfoData } from '../../models/project-info';

const PROJECT_OVERVIEW_REQUIRED_ONLY = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;
const SCHEDULED_END_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.scheduledEndDate;
const INVALID_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.invalidDateFormat;
const END_DATE_LESSER_THAN_START_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.endDateLesserThanStartDate;
const SCHEDULED_START_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.scheduledStartDate;

TestModule('Add Project - Scheduled end date field validation');

Before(setup);

TestCase('BMS-27. 案件:案件作成:案件終了予定日:「yyyy-mm-dd」形式で入力', async () => {
    gondola.report(`Step 2. 「案件終了予定日」の枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    gondola.report(`VP. カレンダー入力画面が表示されこと。`);
    let isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay();
    await gondola.checkTrue(isDatePickerDisplayed, 'Date picker should be displayed');

    gondola.report(`Step 3. カレンダー枠外をクリックする。`);
    await addProjectPage.clickOutsideDatePicker();
    gondola.report(`VP. カレンダーは消えること。`);
    isDatePickerDisplayed = await addProjectPage.doesDatePickerDisplay(false);
    await gondola.checkFalse(isDatePickerDisplayed, 'Date picker should not be displayed');

    gondola.report(`Step 4. 「案件終了予定日」の枠内をクリックし、日付を選択する。`);
    await addProjectPage.clickTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    const pickedDate = await addProjectPage.selectRandomDate();
    gondola.report(`VP. 入力画面に戻り、選択した日付が「yyyy-mm-dd」形式で表示されること。`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(displayedDate, pickedDate, 'Date should be selected correctly in the textfield');

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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        displayedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-29. 案件:案件作成:案件終了予定日:「yyyy.mm.dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy.mm.dd」形式で「案件終了予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_DOT);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        displayedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-30. 案件:案件作成:案件終了予定日:「yyyy/mm/dd」形式で入力', async () => {
    gondola.report(`Step 2. 「yyyy/mm/dd」形式で「案件終了予定日」を入力する。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, Constants.EXAMPLE_DATE_DIVIDED_BY_SLASH);

    gondola.report(`Step 3. 他の必須フィールドで情報を入力して、「保存」ボタンをクリックする。`);
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(SCHEDULED_END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        displayedDate,
        Constants.EXAMPLE_DEFAULT_DATE,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-170. 案件:案件作成:案件終了予定日:下限値・上限値', async () => {
    gondola.report(`Step 2. 案件終了予定日で「1899-12-31」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, '1899-12-31');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(SCHEDULED_END_DATE_FIELD_NAME),
        INVALID_DATE_ERROR_MESSAGE,
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 3. 案件終了予定日で「2100-01-01」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, '2100-01-01');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(SCHEDULED_END_DATE_FIELD_NAME),
        INVALID_DATE_ERROR_MESSAGE,
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 4. 案件終了予定日で「1900-01-01」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, '1900-01-01');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(SCHEDULED_END_DATE_FIELD_NAME),
        '',
        'Invalid date error message should not be displayed',
    );

    gondola.report(`Step 5. 案件終了予定日で「2099-12-31」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, '2099-12-31');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(SCHEDULED_END_DATE_FIELD_NAME),
        '',
        'Invalid date error message should not be displayed',
    );
});

TestCase('BMS-171. 案件:案件作成:案件終了予定日:開始日未満', async () => {
    gondola.report(`Step 2. 案件終了予定日で開始予定日未満の値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_START_DATE_FIELD_NAME, '2020-12-12');
    await addProjectPage.enterTextFieldByLabel(SCHEDULED_END_DATE_FIELD_NAME, '2019-12-12');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「開始日以降の日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(SCHEDULED_END_DATE_FIELD_NAME),
        END_DATE_LESSER_THAN_START_DATE_ERROR_MESSAGE,
        'Invalid end date error message should be displayed',
    );
});
