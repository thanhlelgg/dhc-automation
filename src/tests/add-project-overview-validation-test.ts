import { gondola, TestCase, TestModule, importData } from "gondolajs";
import loginPage from "../pages/login-page";
import addProjectPage from "../pages/add-project-page";
import businessSystemPage from "../pages/business-system-page";
import { constants } from "../common/constants";

TestModule("");

Before(async () => {
    await loginPage.openWebsite();
    await loginPage.login(constants.adminUserName, constants.adminPassword);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
});

TestCase("BMS-1. Verify the displaying of Project details section", async () => {
    gondola.report(`Verify all project form options are available`)
    const projectFormOptions = [constants.projectForms.continue, constants.projectForms.result, constants.projectForms.shot];
    await gondola.checkEqual(await addProjectPage.checkProjectFormOptions(projectFormOptions), true,
                             "Project form options should be displayed correctly");

    gondola.report(`Select project form: ${constants.projectForms.result}`)
    await addProjectPage.selectProjectForm(constants.projectForms.result);
    gondola.report(`Verify Project Result section is displayed`)
    await gondola.checkEqual(await addProjectPage.isProjectResultSectionDisplayed(), true, 
                             "Project result section should be displayed");

    gondola.report(`Select project form: ${constants.projectForms.continue}`)
    await addProjectPage.selectProjectForm(constants.projectForms.continue);
    gondola.report(`Verify Project Result section is not displayed`)
    await gondola.checkEqual(await addProjectPage.isProjectResultSectionDisplayed(), false, 
                             "Project result section should not be displayed");
});

TestCase("BMS-2. Verify the validation of business customer text field", async () => {
    const projectNameFieldName = constants.translator.fieldName.name;

    gondola.report(`Save project without entering anything`)
    await addProjectPage.saveNewProject();
    gondola.report(`Verify invalid feedback is displayed correctly`)
    let actualFeedback = await addProjectPage.getInvalidFeedBack(projectNameFieldName);
    await gondola.checkEqual(actualFeedback, constants.fieldRequiredErrorMessage, "Invalid feedback message should be correct");

    gondola.report(`Save project after entered more than 255 characters in ${projectNameFieldName} field`)
    await addProjectPage.enterTextFieldByLabel(projectNameFieldName, constants.exceededNOCMessage);
    await addProjectPage.saveNewProject();
    gondola.report(`Verify invalid feedback is displayed correctly`)
    actualFeedback = await addProjectPage.getInvalidFeedBack(projectNameFieldName);
    await gondola.checkEqual(actualFeedback, constants.exceededNOCErrorMessage, "Invalid feedback message should be correct");
});
