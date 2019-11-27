import { gondola, TestCase, TestModule, importData } from 'gondolajs';
import loginPage from '../pages/login-page';
import addProjectPage from '../pages/add-project-page';
import businessSystemPage from '../pages/business-system-page';
import listProjectPage from '../pages/list-project-page';
import { Constants } from '../common/constants';
import { ProjectOverviewInfo } from '../models/project-overview-info';
import { ProjectResultBaseInfo } from '../models/project-result-base-info';
import { ProjectDetailInfo } from '../models/project-detail-info';
import { ProjectResourceInfo } from '../models/project-resource-info';

TestModule('');

Before(async () => {
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);
});

TestCase("BMS-108. Verify add project with form '出来高案件' successfully", async () => {
    gondola.report('Step 1: 新規案件登録の画面に移動する');
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();

    gondola.report('Step 2: 案件概要を入力する');
    const projectOverviewData = importData('./data/project-overview-data.json');
    const projectOverview = new ProjectOverviewInfo(projectOverviewData[0]);
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('step 3: 出来高明細を入力する');
    const projectResultBaseData = importData('./data/project-result-base-data.json');
    for (let i = 1; i <= projectResultBaseData.length; i++) {
        await addProjectPage.inputProjectResultBases(new ProjectResultBaseInfo(projectResultBaseData[i - 1]));
    }

    gondola.report('Step 4: 案件明細を入力する');
    const projectDetailData = importData('./data/project-detail-data.json');
    for (let i = 1; i <= projectDetailData.length; i++) {
        await addProjectPage.addProjectDetails(i + '', new ProjectDetailInfo(projectDetailData[i - 1]));
    }

    gondola.report('Step 5: リソースを入力する');
    const projectResourceData = importData('./data/project-resource-data.json');
    await addProjectPage.inputProjectResource('札幌第3Lab.(並行稼働用)', '10:00', '19:00');
    for (let i = 1; i <= projectResourceData.length; i++) {
        await addProjectPage.addResourceRow(i + '', new ProjectResourceInfo(projectResourceData[i - 1]));
    }
    const projectCode = await addProjectPage.getProjectCode();

    gondola.report('Step 6: 保存する');
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));
});

TestCase("BMS-109. Verify add project with form '継続案件' successfully", async () => {
    gondola.report('Step 1: 新規案件登録の画面に移動する');
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();

    gondola.report('Step 2: 案件概要を入力する');
    const projectOverviewData = importData('./data/project-overview-data.json');
    const projectOverview = new ProjectOverviewInfo(projectOverviewData[0]);
    projectOverview.$projectForm = Constants.projectForms.continue;
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('Step 3: 案件明細を入力する');
    const projectDetailData = importData('./data/project-detail-data.json');
    for (let i = 1; i <= projectDetailData.length; i++) {
        await addProjectPage.addProjectDetails(i + '', new ProjectDetailInfo(projectDetailData[i - 1]));
    }

    gondola.report('Step 4: リソースを入力する');
    const projectResourceData = importData('./data/project-resource-data.json');
    await addProjectPage.inputProjectResource('札幌第3Lab.(並行稼働用)', '10:00', '19:00');
    for (let i = 1; i <= projectResourceData.length; i++) {
        await addProjectPage.addResourceRow(i + '', new ProjectResourceInfo(projectResourceData[i - 1]));
    }
    const projectCode = await addProjectPage.getProjectCode();

    gondola.report('Step 5: 保存する');
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));
});

TestCase("BMS-110. Verify add project with form 'ショット案件' successfully", async () => {
    gondola.report('Step 1: 新規案件登録の画面に移動する');
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();

    gondola.report('Step 2: 案件概要を入力する');
    const projectOverviewData = importData('./data/project-overview-data.json');
    const projectOverview = new ProjectOverviewInfo(projectOverviewData[0]);
    projectOverview.$projectForm = Constants.projectForms.shot;
    await addProjectPage.inputProjectOverview(projectOverview);

    gondola.report('Step 3: 案件明細を入力する');
    const projectDetailData = importData('./data/project-detail-data.json');
    for (let i = 1; i <= projectDetailData.length; i++) {
        await addProjectPage.addProjectDetails(i + '', new ProjectDetailInfo(projectDetailData[i - 1]));
    }

    gondola.report('Step 4: リソースを入力する');
    const projectResourceData = importData('./data/project-resource-data.json');
    await addProjectPage.inputProjectResource('札幌第3Lab.(並行稼働用)', '10:00', '19:00');
    for (let i = 1; i <= projectResourceData.length; i++) {
        await addProjectPage.addResourceRow(i + '', new ProjectResourceInfo(projectResourceData[i - 1]));
    }
    const projectCode = await addProjectPage.getProjectCode();

    gondola.report('Step 5: 保存する');
    await addProjectPage.saveNewProject();

    gondola.report('Verify result: new project is added successfully and display on project list page');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));
});
