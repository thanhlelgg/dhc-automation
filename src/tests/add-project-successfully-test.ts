import { gondola, TestCase, TestModule, importData } from 'gondolajs';
import loginPage from '../pages/login-page';
import addProjectPage from '../pages/add-project-page';
import businessSystemPage from '../pages/business-system-page';
import listProjectPage from '../pages/list-project-page';
import { Constants } from '../common/constants';
import { ProjectOverviewInfo } from '../models/project-overview-info';

TestModule('Add Project Successfully');

const PROJECT_OVERVIEW_DATA = importData('./data/project-overview-data.json');
const PROJECT_RESULT_BASE_DATA = importData('./data/project-result-base-data.json');
const PROJECT_DETAIL_DATA = importData('./data/project-detail-data.json');
const PROJECT_RESOURCE_DATA = importData('./data/project-resource-data.json');
const PROJECT_FORM_CONTINUE = Constants.projectForms.continue;
const PROJECT_FORM_SHOT = Constants.projectForms.shot;

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report('Step 1. 新規案件登録の画面に移動する');
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
});

TestCase("BMS-108. Verify add project with form '出来高案件' successfully", async () => {
    gondola.report('Step 2. 案件概要を入力する');
    let projectOverview = new ProjectOverviewInfo(PROJECT_OVERVIEW_DATA[0]);
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('step 3. 出来高明細を入力する');
    await addProjectPage.inputProjectResultBases(PROJECT_RESULT_BASE_DATA);

    gondola.report('Step 4. 案件明細を入力する');
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);

    gondola.report('Step 5. リソースを入力する');
    await addProjectPage.inputProjectResource(
        PROJECT_RESOURCE_DATA[0].labName,
        PROJECT_RESOURCE_DATA[0].workingStartTime,
        PROJECT_RESOURCE_DATA[0].workingEndTime,
    );
    await addProjectPage.addResourceRows(PROJECT_RESOURCE_DATA[0].resources);

    gondola.report('Step 6. 保存する');
    let projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('Verify content of new project are displayed correctly');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await gondola.checkEqual(
        await addProjectPage.doesProjectOverviewDisplayCorrect(projectOverview),
        true,
        'One of content of project overview display displays incorrectly.',
    );
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResultBasesDisplayCorrect(PROJECT_RESULT_BASE_DATA),
        true,
        'One of content of project result base row displays incorrectly.',
    );
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectDetailsDisplayCorrect(PROJECT_DETAIL_DATA),
        true,
        'One of content of project detail row displays incorrectly',
    );
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResourcesDisplayCorrect(
            PROJECT_RESOURCE_DATA[0].labName,
            PROJECT_RESOURCE_DATA[0].workingStartTime,
            PROJECT_RESOURCE_DATA[0].workingEndTime,
            PROJECT_RESOURCE_DATA[0].resources,
        ),
        true,
        'One of content of project resource displays incorrectly',
    );
});

TestCase("BMS-109. Verify add project with form '継続案件' successfully", async () => {
    gondola.report('Step 2. 案件概要を入力する');
    let projectOverview = new ProjectOverviewInfo(PROJECT_OVERVIEW_DATA[0]);
    projectOverview.$projectForm = PROJECT_FORM_CONTINUE;
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('Step 3. 案件明細を入力する');
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);

    gondola.report('Step 4. リソースを入力する');
    await addProjectPage.inputProjectResource(
        PROJECT_RESOURCE_DATA[0].labName,
        PROJECT_RESOURCE_DATA[0].workingStartTime,
        PROJECT_RESOURCE_DATA[0].workingEndTime,
    );
    await addProjectPage.addResourceRows(PROJECT_RESOURCE_DATA[0].resources);

    gondola.report('Step 5. 保存する');
    let projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('Verify content of new project are displayed correctly');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await gondola.checkEqual(
        await addProjectPage.doesProjectOverviewDisplayCorrect(projectOverview),
        true,
        'One of content of project overview display displays incorrectly.',
    );
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectDetailsDisplayCorrect(PROJECT_DETAIL_DATA),
        true,
        'One of content of project detail row displays incorrectly',
    );
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResourcesDisplayCorrect(
            PROJECT_RESOURCE_DATA[0].labName,
            PROJECT_RESOURCE_DATA[0].workingStartTime,
            PROJECT_RESOURCE_DATA[0].workingEndTime,
            PROJECT_RESOURCE_DATA[0].resources,
        ),
        true,
        'One of content of project resource displays incorrectly',
    );
});

TestCase("BMS-110. Verify add project with form 'ショット案件' successfully", async () => {
    gondola.report('Step 2. 案件概要を入力する');
    let projectOverview = new ProjectOverviewInfo(PROJECT_OVERVIEW_DATA[0]);
    projectOverview.$projectForm = PROJECT_FORM_SHOT;
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('Step 3. 案件明細を入力する');
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);

    gondola.report('Step 4. リソースを入力する');
    await addProjectPage.inputProjectResource(
        PROJECT_RESOURCE_DATA[0].labName,
        PROJECT_RESOURCE_DATA[0].workingStartTime,
        PROJECT_RESOURCE_DATA[0].workingEndTime,
    );
    await addProjectPage.addResourceRows(PROJECT_RESOURCE_DATA[0].resources);

    gondola.report('Step 5. 保存する');
    let projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('Verify content of new project are displayed correctly');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await gondola.checkEqual(
        await addProjectPage.doesProjectOverviewDisplayCorrect(projectOverview),
        true,
        'One of content of project overview display displays incorrectly.',
    );
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectDetailsDisplayCorrect(PROJECT_DETAIL_DATA),
        true,
        'One of content of project detail row displays incorrectly',
    );
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResourcesDisplayCorrect(
            PROJECT_RESOURCE_DATA[0].labName,
            PROJECT_RESOURCE_DATA[0].workingStartTime,
            PROJECT_RESOURCE_DATA[0].workingEndTime,
            PROJECT_RESOURCE_DATA[0].resources,
        ),
        true,
        'One of content of project resource displays incorrectly',
    );
});
