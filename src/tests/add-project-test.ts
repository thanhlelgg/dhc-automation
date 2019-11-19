import { gondola, TestCase, TestModule, importData } from "gondolajs";
import loginPage from "../pages/login-page";
import addProjectPage from "../pages/add-project-page";
import businessSystempage from "../pages/business-system-page";
import listProjectPage from "../pages/list-project-page";
import { constants } from "../common/constants";
import { ProjectOverviewInfo } from "../models/project-overview-info";
import { utilities } from "../common/utilities";

TestModule("");

Before(async () => {
    await loginPage.openWebsite();
    await loginPage.login(constants.adminUserName, constants.adminPassword);
});

TestCase("Verify add project successfully", async () => {
    var projectOverview = new ProjectOverviewInfo({
        projectName: "123", 
        projectForm: constants.projectForms.result, 
        customerName: "test", 
        department: "営業部", 
        workerName: "西川三郎", 
        startDate: undefined, 
        endDate: undefined, 
        scheduleStartDate: undefined, 
        scheduleEndDate: undefined, 
        accuracy: constants.accuracyTypes.high,
        status: constants.projectStatuses.delivered, 
        workingPlace: constants.projectPlace.dispatch, 
        currencyId: constants.currencyIds.jpy, 
        billingType: constants.billingTypes.consolidate, 
        closingDate: constants.closingDates[1], 
        segment: "123", 
        tag: "123,test", 
        description: "123"
    });
    await loginPage.gotoBusinessSystem();
    await businessSystempage.gotoAddProjectPage();
    await addProjectPage.inputProjectOverview(projectOverview);
    await addProjectPage.inputProjectResultBases(constants.projectRole.designer, "SES", constants.debitCreditGroupIds.advance, 2, 8, "3000", "4000", "5000", "5000", "5000", "7000", true, constants.taxIds[10], "123", "4");
    await addProjectPage.addProjectDetails("1", "abc", "SES", constants.debitCreditGroupIds.advance, true, constants.taxIds[10], "1", "1", "1", "2019-08-13", "2019-08-16", "2019-08-17", "2019-08-18");
    await addProjectPage.inputProjectResource("ZEG", "08:00", "17:30");
    await addProjectPage.addResourceRow("1", "2019-08-13", "1", "1", "2", "1", "1", "0", "0", "0", "0", "0");
    let projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    // verify result
    await businessSystempage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));
});
