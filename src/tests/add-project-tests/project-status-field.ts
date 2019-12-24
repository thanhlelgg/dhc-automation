import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { ProjectInfoData } from '../../models/project-info';
import businessSystemPage from '../../pages/business-system-page';
import listProjectPage from '../../pages/list-project-page';

TestModule('Add Project - Status field validation');

const PROJECT_NUMBER_FIELD_NAME = Constants.translator.fieldName.addProject.number;
const PROJECT_STATUS_FIELD_NAME = Constants.translator.fieldName.addProject.status;
const PROJECT_OVERVIEW_REQUIRED_ONLY = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;

Before(setup);

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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
    const overviewData = PROJECT_OVERVIEW_REQUIRED_ONLY;
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
