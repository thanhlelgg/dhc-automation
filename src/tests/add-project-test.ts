import { gondola, TestCase, TestModule } from "gondolajs";
import loginPage from "../pages/login-page";
import addProjectPage from "../pages/add-project-page";
import businessSystempage from "../pages/business-system-page";
import listProjectPage from "../pages/list-project-page";
import { constants } from "../common/constants";

TestModule("");

Before(async () => {
    await loginPage.openWebsite();
    await loginPage.login(constants.adminUserName, constants.adminPassword);
});

TestCase("Verify add project successfully", async () => {
    await loginPage.gotoBusinessSystem();
    await businessSystempage.gotoAddProjectPage();
    await addProjectPage.inputProjectOverview("123", constants.projectForms.result, "test", "営業部", "西川三郎", "2019-08-13", "2019-08-16", "2019-08-13", "2019-08-16", constants.accuracyTypes.high,
        constants.projectStatuses.delivered, constants.projectPlace.dispatch, constants.currencyIds.jpy, constants.billingTypes.consolidate, constants.closingDates[1], "123", "123", "123");
    await addProjectPage.inputProjectResultBases(constants.projectRole.designer, "SES", constants.debitCreditGroupIds.advance, 2, 8, "300", "3000", "4000", "5000", "5000", "5000", "7000", true, constants.taxIds[10], "123", "4");
    await addProjectPage.addProjectDetails("1", "abc", "SES", constants.debitCreditGroupIds.advance, true, constants.taxIds[10], "1", "1", "1", "2019-08-13", "2019-08-16", "2019-08-17", "2019-08-18");
    await addProjectPage.addResourceRow("1", "2019-08-13", "1", "1", "2", "1", "1", "0", "0", "0", "0", "0");
    let projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    // verify result
    await businessSystempage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));
});