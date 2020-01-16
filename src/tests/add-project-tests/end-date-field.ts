import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { ProjectInfoData } from '../../models/project-info';
import businessSystemPage from '../../pages/business-system-page';
import listProjectPage from '../../pages/list-project-page';

const PROJECT_NUMBER_FIELD_NAME = Constants.translator.fieldName.addProject.number;
const START_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.startDate;
const PROJECT_OVERVIEW_REQUIRED_ONLY = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;
const END_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.endDate;
const INVALID_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.invalidDateFormat;
const END_DATE_LESSER_THAN_START_DATE_ERROR_MESSAGE = Constants.translator.invalidFeedback.endDateLesserThanStartDate;

TestModule('Add Project - End Date field validation');

Before(setup);

TestCase('BMS-17. 案件:案件作成:案件終了日:未入力 ', async () => {
    gondola.report(`Step 2. 案件終了日を入力しなくて、他の情報を入力し、保存する`);
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, Constants.EXAMPLE_DEFAULT_DATE);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 新しい案件が保存されること。`);
    await gondola.checkEqual(await addProjectPage.doesSavedMessageDisplay(), true, 'New project is saved');
    const projectNumber = await addProjectPage.getSpanValueByLabel(PROJECT_NUMBER_FIELD_NAME);

    gondola.report(`Step 3. 垂直メニューで「案件」の「一覧」をクリックします。`);
    await businessSystemPage.gotoListProject(true);
    gondola.report(`Step 4. 上の登録した案件行で「TTS連携ボタン」(青い紙飛行機のアイコン)をクリックする。`);
    await listProjectPage.clickOnTTSLinkButton(projectNumber);
    gondola.report(`VP. エラーとなること。`);
    await gondola.waitForAlert();
    //BUG: error message is not displayed correctly
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(END_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});

TestCase('BMS-166. 案件:案件作成:案件開始日:下限値・上限値', async () => {
    gondola.report(`Step 2. 案件終了日で「1899-12-31」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, '1899-12-31');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        INVALID_DATE_ERROR_MESSAGE,
        await addProjectPage.getInvalidFeedBack(END_DATE_FIELD_NAME),
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 3. 案件終了日で「2100-01-01」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, '2100-01-01');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        INVALID_DATE_ERROR_MESSAGE,
        await addProjectPage.getInvalidFeedBack(END_DATE_FIELD_NAME),
        'Invalid date error message should be displayed',
    );

    gondola.report(`Step 4. 案件終了日で「1900-01-01」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, '1900-01-01');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        '',
        await addProjectPage.getInvalidFeedBack(END_DATE_FIELD_NAME),
        'Invalid date error message should not be displayed',
    );

    gondola.report(`Step 5. 案件終了日で「2099-12-31」を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, '2099-12-31');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「正しい日付を入力してください」が表示されること。`);
    await gondola.checkEqual(
        '',
        await addProjectPage.getInvalidFeedBack(END_DATE_FIELD_NAME),
        'Invalid date error message should not be displayed',
    );
});

TestCase('BMS-167. 案件:案件作成:案件開始日:下限値・上限値', async () => {
    gondola.report(`Step 2. 案件終了日で開始日未満の値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(START_DATE_FIELD_NAME, '2020-12-12');
    await addProjectPage.enterTextFieldByLabel(END_DATE_FIELD_NAME, '2019-12-12');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「開始日以降の日付を入力してください」が表示されること。`);
    //BUG: no error message presents
    await gondola.checkEqual(
        END_DATE_LESSER_THAN_START_DATE_ERROR_MESSAGE,
        await addProjectPage.getInvalidFeedBack(END_DATE_FIELD_NAME),
        'Invalid end date error message should be displayed',
    );
});
