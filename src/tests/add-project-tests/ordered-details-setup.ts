import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { ProjectInfoData } from '../../models/project-info';
import addProjectPage from '../../pages/add-project-page';
import listProjectPage from '../../pages/list-project-page';
import projectDetailsPage from '../../pages/project-details-page';

const PROJECT_OVERVIEW_DATA = ProjectInfoData.OVERVIEW_FULL_DATA;
const PROJECT_DETAIL_DATA = ProjectInfoData.DETAIL_TWO_RECORDS;
const PROJECT_RESOURCE_DATA = ProjectInfoData.RESOURCE_FULL_DATA;
const PROJECT_FORM_SHOT = Constants.PROJECT_FORMS.shot;

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「案件」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();

    gondola.report(`Step 2. 案件概要を入力する`);
    const projectOverview = PROJECT_OVERVIEW_DATA;
    projectOverview.projectForm = PROJECT_FORM_SHOT;
    await addProjectPage.inputProjectOverviewInfo(projectOverview);

    gondola.report(`Step 3. 案件明細を入力する`);
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);

    gondola.report(`Step 4. リソースを入力する`);
    await addProjectPage.inputProjectResource(
        PROJECT_RESOURCE_DATA.labName,
        PROJECT_RESOURCE_DATA.workingStartTime,
        PROJECT_RESOURCE_DATA.workingEndTime,
    );
    await addProjectPage.addResourceRows(PROJECT_RESOURCE_DATA.resources);

    gondola.report(`Step 5. 保存する`);
    const projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    gondola.report(
        `Step 6. 水平メニューで「営業管理」⇒垂直メニュー「案件」⇒「一覧」をクリックし、「案件一覧」画面で案件番号をクリック`,
    );
    await businessSystemPage.gotoListProject();
    await listProjectPage.openProject(projectCode);

    gondola.report(`VP. 案件詳細画面に移動すること`);
    await gondola.checkTrue(await projectDetailsPage.isCurrentPage());
}
