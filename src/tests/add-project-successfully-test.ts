import { gondola, TestCase, TestModule, importData } from 'gondolajs';
import loginPage from '../pages/login-page';
import addProjectPage from '../pages/add-project-page';
import businessSystempage from '../pages/business-system-page';
import listProjectPage from '../pages/list-project-page';
import { Constants } from '../common/constants';
import { ProjectOverviewInfo, IProjectOverviewInfo } from '../models/project-overview-info';
import { ProjectResultBaseInfo } from '../models/project-result-base-info';
import { ProjectDetailInfo } from '../models/project-detail-info';
import { ProjectResourceInfo } from '../models/project-resource-info';

TestModule('');

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report('Step 1. 新規案件登録の画面に移動する');
    await loginPage.gotoBusinessSystem();
    await businessSystempage.gotoAddProjectPage();
});

TestCase("BMS-108. Verify add project with form '出来高案件' successfully", async () => {
    gondola.report('Step 2. 案件概要を入力する');
    const projectOverviewData = importData('./data/project-overview-data.json');
    let projectOverview = new ProjectOverviewInfo(projectOverviewData[0]);
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('step 3. 出来高明細を入力する');
    const projectResultBaseData = importData('./data/project-result-base-data.json');
    for (let i = 1; i <= projectResultBaseData.length; i++) {
        await addProjectPage.inputProjectResultBases(new ProjectResultBaseInfo(projectResultBaseData[i - 1]));
    }

    gondola.report('Step 4. 案件明細を入力する');
    const projectDetailData = importData('./data/project-detail-data.json');
    for (let i = 1; i <= projectDetailData.length; i++) {
        await addProjectPage.addProjectDetails(i + '', new ProjectDetailInfo(projectDetailData[i - 1]));
    }

    gondola.report('Step 5. リソースを入力する');
    const projectResourceData = importData('./data/project-resource-data.json');
    await addProjectPage.inputProjectResource(
        projectResourceData[0].labName,
        projectResourceData[0].workingStartTime,
        projectResourceData[0].workingEndTime,
    );
    for (let i = 1; i <= projectResourceData[0].resources.length; i++) {
        await addProjectPage.addResourceRow(i + '', new ProjectResourceInfo(projectResourceData[0].resources[i - 1]));
    }
    let projectCode = await addProjectPage.getProjectCode();

    gondola.report('Step 6. 保存する');
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystempage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('Verify content of new project are displayed correctly');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await addProjectPage.verifyContentOfProjectOverview(projectOverview);
    await addProjectPage.verifyContentOfProjectResultBases(projectResultBaseData);
    await addProjectPage.verifyContentOfProjectDetails(projectDetailData);
    await addProjectPage.verifyContentOfProjectResources(
        projectResourceData[0].labName,
        projectResourceData[0].workingStartTime,
        projectResourceData[0].workingEndTime,
        projectResourceData[0].resources,
    );
});

TestCase("BMS-109. Verify add project with form '継続案件' successfully", async () => {
    gondola.report('Step 2. 案件概要を入力する');
    const projectOverviewData = importData('./data/project-overview-data.json');
    let projectOverview = new ProjectOverviewInfo(projectOverviewData[0]);
    projectOverview.$projectForm = Constants.projectForms.continue;
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('Step 3. 案件明細を入力する');
    const projectDetailData = importData('./data/project-detail-data.json');
    for (let i = 1; i <= projectDetailData.length; i++) {
        await addProjectPage.addProjectDetails(i + '', new ProjectDetailInfo(projectDetailData[i - 1]));
    }

    gondola.report('Step 4. リソースを入力する');
    const projectResourceData = importData('./data/project-resource-data.json');
    await addProjectPage.inputProjectResource(
        projectResourceData[0].labName,
        projectResourceData[0].workingStartTime,
        projectResourceData[0].workingEndTime,
    );
    for (let i = 1; i <= projectResourceData[0].resources.length; i++) {
        await addProjectPage.addResourceRow(i + '', new ProjectResourceInfo(projectResourceData[0].resources[i - 1]));
    }
    let projectCode = await addProjectPage.getProjectCode();

    gondola.report('Step 5. 保存する');
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystempage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('Verify content of new project are displayed correctly');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await addProjectPage.verifyContentOfProjectOverview(projectOverview);
    await addProjectPage.verifyContentOfProjectDetails(projectDetailData);
    await addProjectPage.verifyContentOfProjectResources(
        projectResourceData[0].labName,
        projectResourceData[0].workingStartTime,
        projectResourceData[0].workingEndTime,
        projectResourceData[0].resources,
    );
});

TestCase("BMS-110. Verify add project with form 'ショット案件' successfully", async () => {
    gondola.report('Step 2. 案件概要を入力する');
    const projectOverviewData = importData('./data/project-overview-data.json');
    let projectOverview = new ProjectOverviewInfo(projectOverviewData[0]);
    projectOverview.$projectForm = Constants.projectForms.shot;
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('Step 3. 案件明細を入力する');
    const projectDetailData = importData('./data/project-detail-data.json');
    for (let i = 1; i <= projectDetailData.length; i++) {
        await addProjectPage.addProjectDetails(i + '', new ProjectDetailInfo(projectDetailData[i - 1]));
    }

    gondola.report('Step 4. リソースを入力する');
    const projectResourceData = importData('./data/project-resource-data.json');
    await addProjectPage.inputProjectResource(
        projectResourceData[0].labName,
        projectResourceData[0].workingStartTime,
        projectResourceData[0].workingEndTime,
    );
    for (let i = 1; i <= projectResourceData[0].resources.length; i++) {
        await addProjectPage.addResourceRow(i + '', new ProjectResourceInfo(projectResourceData[0].resources[i - 1]));
    }
    let projectCode = await addProjectPage.getProjectCode();

    gondola.report('Step 5. 保存する');
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystempage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('Verify content of new project are displayed correctly');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await addProjectPage.verifyContentOfProjectOverview(projectOverview);
    await addProjectPage.verifyContentOfProjectDetails(projectDetailData);
    await addProjectPage.verifyContentOfProjectResources(
        projectResourceData[0].labName,
        projectResourceData[0].workingStartTime,
        projectResourceData[0].workingEndTime,
        projectResourceData[0].resources,
    );
});
