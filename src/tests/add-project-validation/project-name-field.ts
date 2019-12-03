import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Before from './setup-and-teardown';

TestModule('Add Project Overview validation');

const PROJECT_NAME_FIELD_NAME = Constants.translator.fieldName.name;

TestCase('BMS-1. 案件:案件作成:案件形態', async () => {
    gondola.report(`Step 2.「案件形態」プルダウンで選択肢を確認する`);
    const projectFormOptions = Object.values(Constants.projectForms);
    await gondola.checkEqual(
        await addProjectPage.checkProjectFormOptions(projectFormOptions),
        true,
        'Project form options should be displayed correctly',
    );

    gondola.report(`Step 3.「案件形態」プルダウンで「出来高案件」を選択し`);
    await addProjectPage.selectProjectForm(Constants.projectForms.result);
    gondola.report(`VP.「案件明細」の上に「出来高明細」欄が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.isProjectResultSectionDisplayed(),
        true,
        'Project result section should be displayed',
    );

    gondola.report(`Step 4. 出来高案件」以外の選択肢を選択する`);
    await addProjectPage.selectProjectForm(Constants.projectForms.continue);
    gondola.report(`VP.「出来高明細」欄が表示されないこと`);
    await gondola.checkEqual(
        await addProjectPage.isProjectResultSectionDisplayed(),
        false,
        'Project result section should not be displayed',
    );
});

TestCase('BMS-2. 案件:案件作成:案件名:未入力と境界値の入力', async () => {
    gondola.report(`Step 2.「案件名」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    let actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 3.「案件名」テキストボックスで256文字以上を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(PROJECT_NAME_FIELD_NAME, Constants.exceededNOCMessage);
    await addProjectPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「255文字以内で入力してください」が表示されること。`);
    actualFeedback = await addProjectPage.getInvalidFeedBack(PROJECT_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.exceededNOCErrorMessage255,
        'Invalid feedback message should be correct',
    );
});
