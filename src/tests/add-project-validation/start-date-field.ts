import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Before from './setup-and-teardown';
import { ProjectInfoData } from '../../models/project-info';
import businessSystemPage from '../../pages/business-system-page';
import listProjectPage from '../../pages/list-project-page';

const PROJECT_NUMBER_FIELD_NAME = Constants.translator.fieldName.number;
const START_DATE_FIELD_NAME = Constants.translator.fieldName.startDate;
const PROJECT_OVERVIEW_REQUIRED_ONLY = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;
const END_DATE_FIELD_NAME = Constants.translator.fieldName.endDate;

TestModule('Add Project Overview validation');

TestCase('BMS-12. 案件:案件作成:案件開始日:未入力 ', async () => {
    gondola.report(
        `Step 2. 案件開始日を入力しない、他のフィールドでTTS連携できるように情報を入力し、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
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
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力した「案件開始日」は「yyyy-mm-dd」形式に自動的に変換されること`);
    const displayedDate = await addProjectPage.getTextFieldValueByLabel(START_DATE_FIELD_NAME);
    await gondola.checkEqual(
        Constants.EXAMPLE_DEFAULT_DATE,
        displayedDate,
        'Date should be selected correctly in the textfield',
    );
});
