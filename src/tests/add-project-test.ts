import { gondola, TestCase, TestModule, importData } from "gondolajs";
import loginPage from "../pages/login-page";
import addProjectPage from "../pages/add-project-page";
import businessSystempage from "../pages/business-system-page";
import listProjectPage from "../pages/list-project-page";
import { constants } from "../common/constants";
import { ProjectOverviewInfo, IProjectOverviewInfo } from "../models/project-overview-info";
import { utilities } from "../common/utilities";
import { ProjectResultBaseInfo } from "../models/project-result-base-info";
import { ProjectDetailInfo } from "../models/project-detail-info";
import { ProjectResourceInfo } from "../models/project-resource-info";

TestModule("");

Before(async () => {
    await loginPage.openWebsite();
    await loginPage.login(constants.adminUserName, constants.adminPassword);
});

TestCase("Verify add project successfully", async () => {
    const projectOverviewData = importData("./data/project-overview-data.json");
    let projectOverview = new ProjectOverviewInfo(projectOverviewData[0]);
    const projectResultBaseData = importData("./data/project-result-base-data.json");
    let projectResultBase = new ProjectResultBaseInfo(projectResultBaseData[0]);
    const projectDetailData = importData("./data/project-detail-data.json");
    let projectDetail = new ProjectDetailInfo(projectDetailData[0]);
    const projectResourceData = importData("./data/project-resource-data.json");
    let projectResource = new ProjectResourceInfo(projectResourceData[0]);
    await loginPage.gotoBusinessSystem();
    await businessSystempage.gotoAddProjectPage();
    await addProjectPage.inputProjectOverview(projectOverview);
    await addProjectPage.inputProjectResultBases(projectResultBase);
    await addProjectPage.addProjectDetails("1", projectDetail);
    await addProjectPage.inputProjectResource("ZEG", "08:00", "17:30");
    await addProjectPage.addResourceRow("1", projectResource);
    let projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    // verify result
    await businessSystempage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));
});
