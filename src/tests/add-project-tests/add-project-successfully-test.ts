import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import addProjectPage from '../../pages/add-project-page';
import businessSystemPage from '../../pages/business-system-page';
import listProjectPage from '../../pages/list-project-page';
import { Constants } from '../../common/constants';
import { ProjectInfoData } from '../../models/project-info';

TestModule('Add Project Successfully');

const PROJECT_OVERVIEW_DATA = ProjectInfoData.OVERVIEW_FULL_DATA;
const PROJECT_RESULT_BASE_DATA = ProjectInfoData.RESULT_BASE_TWO_RECORDS;
const PROJECT_DETAIL_DATA = ProjectInfoData.DETAIL_TWO_RECORDS;
const PROJECT_RESOURCE_DATA = ProjectInfoData.RESOURCE_FULL_DATA;
const PROJECT_FORM_CONTINUE = Constants.PROJECT_FORMS.continue;
const PROJECT_FORM_SHOT = Constants.PROJECT_FORMS.shot;

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);

    gondola.report('Step 1. 新規案件登録の画面に移動する');
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
});

TestCase('BMS-108. 案件:案件作成:全項目:保存:案件形態の出来高案件 ', async () => {
    gondola.report('Step 2. 案件概要を入力する');
    const projectOverview = ProjectInfoData.OVERVIEW_FULL_DATA;
    await addProjectPage.inputProjectOverviewInfo(projectOverview);

    gondola.report('step 3. 出来高明細を入力する');
    await addProjectPage.inputProjectResultBases(PROJECT_RESULT_BASE_DATA);

    gondola.report('Step 4. 案件明細を入力する');
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);

    gondola.report('Step 5. リソースを入力する');
    await addProjectPage.inputProjectResource(
        PROJECT_RESOURCE_DATA.labName,
        PROJECT_RESOURCE_DATA.workingStartTime,
        PROJECT_RESOURCE_DATA.workingEndTime,
    );
    await addProjectPage.addResourceRows(PROJECT_RESOURCE_DATA.resources);

    gondola.report('Step 6. 保存する');
    const projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    gondola.report('VP 1. 正常に保存でき、案件一覧画面には登録した案件が表示され');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('VP 2. 登録された案件の内容は正しく保存されること。');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await gondola.checkTrue(
        await addProjectPage.doesProjectOverviewDisplayCorrect(projectOverview),
        'One of content of project overview displays incorrectly.',
    );
    await gondola.checkTrue(
        await addProjectPage.doesContentOfProjectResultBasesDisplayCorrect(PROJECT_RESULT_BASE_DATA),
        'One of content of project result base row displays incorrectly.',
    );
    await gondola.checkTrue(
        await addProjectPage.doesContentOfProjectDetailsDisplayCorrect(PROJECT_DETAIL_DATA),
        'One of content of project detail row displays incorrectly',
    );
    await gondola.checkTrue(
        await addProjectPage.doesContentOfProjectResourcesDisplayCorrect(
            PROJECT_RESOURCE_DATA.labName,
            PROJECT_RESOURCE_DATA.workingStartTime,
            PROJECT_RESOURCE_DATA.workingEndTime,
            PROJECT_RESOURCE_DATA.resources,
        ),
        'One of content of project resource displays incorrectly',
    );
});

TestCase('BMS-109. 案件:案件作成:全項目:保存:案件形態の継続案件', async () => {
    gondola.report('Step 2. 案件概要を入力する');
    const projectOverview = PROJECT_OVERVIEW_DATA;
    projectOverview.projectForm = PROJECT_FORM_CONTINUE;
    await addProjectPage.inputProjectOverviewInfo(projectOverview);

    gondola.report('Step 3. 案件明細を入力する');
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);

    gondola.report('Step 4. リソースを入力する');
    await addProjectPage.inputProjectResource(
        PROJECT_RESOURCE_DATA.labName,
        PROJECT_RESOURCE_DATA.workingStartTime,
        PROJECT_RESOURCE_DATA.workingEndTime,
    );
    await addProjectPage.addResourceRows(PROJECT_RESOURCE_DATA.resources);

    gondola.report('Step 5. 保存する');
    const projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    gondola.report('VP 1. 正常に保存でき、案件一覧画面には登録した案件が表示され');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('VP 2. 登録された案件の内容は正しく保存されること。');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await gondola.checkTrue(
        await addProjectPage.doesProjectOverviewDisplayCorrect(projectOverview),
        'One of content of project overview displays incorrectly.',
    );
    await gondola.checkTrue(
        await addProjectPage.doesContentOfProjectDetailsDisplayCorrect(PROJECT_DETAIL_DATA),
        'One of content of project detail row displays incorrectly',
    );
    await gondola.checkTrue(
        await addProjectPage.doesContentOfProjectResourcesDisplayCorrect(
            PROJECT_RESOURCE_DATA.labName,
            PROJECT_RESOURCE_DATA.workingStartTime,
            PROJECT_RESOURCE_DATA.workingEndTime,
            PROJECT_RESOURCE_DATA.resources,
        ),
        'One of content of project resource displays incorrectly',
    );
});

TestCase('BMS-110. 案件:案件作成:全項目:保存:案件形態のショット案件', async () => {
    gondola.report('Step 2. 案件概要を入力する');
    const projectOverview = PROJECT_OVERVIEW_DATA;
    projectOverview.projectForm = PROJECT_FORM_SHOT;
    await addProjectPage.inputProjectOverviewInfo(projectOverview);

    gondola.report('Step 3. 案件明細を入力する');
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);

    gondola.report('Step 4. リソースを入力する');
    await addProjectPage.inputProjectResource(
        PROJECT_RESOURCE_DATA.labName,
        PROJECT_RESOURCE_DATA.workingStartTime,
        PROJECT_RESOURCE_DATA.workingEndTime,
    );
    await addProjectPage.addResourceRows(PROJECT_RESOURCE_DATA.resources);

    gondola.report('Step 5. 保存する');
    const projectCode = await addProjectPage.getProjectCode();
    await addProjectPage.saveNewProject();

    gondola.report('VP 1. 正常に保存でき、案件一覧画面には登録した案件が表示され');
    await businessSystemPage.gotoListProject();
    await gondola.checkControlExist(listProjectPage.getProjectLink(projectCode));

    gondola.report('VP 2. 登録された案件の内容は正しく保存されること。');
    await gondola.click(listProjectPage.getProjectLink(projectCode));
    await gondola.checkTrue(
        await addProjectPage.doesProjectOverviewDisplayCorrect(projectOverview),
        'One of content of project overview displays incorrectly.',
    );
    await gondola.checkTrue(
        await addProjectPage.doesContentOfProjectDetailsDisplayCorrect(PROJECT_DETAIL_DATA),
        'One of content of project detail row displays incorrectly',
    );
    await gondola.checkTrue(
        await addProjectPage.doesContentOfProjectResourcesDisplayCorrect(
            PROJECT_RESOURCE_DATA.labName,
            PROJECT_RESOURCE_DATA.workingStartTime,
            PROJECT_RESOURCE_DATA.workingEndTime,
            PROJECT_RESOURCE_DATA.resources,
        ),
        'One of content of project resource displays incorrectly',
    );
});
