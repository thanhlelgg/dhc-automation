import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-validation-setup';
import projectDetailsPage from '../../pages/project-details-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

TestModule('Add Project - Ordered details - Buttons validation');

Before(setup);
const columnName = Constants.translator.tableColumnName.addProject.orderedDetails;
const REQUIRED_ERROR_MESSAGE = Constants.translator.invalidFeedback.fieldRequired;

TestCase('BMS-278. BMS:案件:案件編集:非稼働明細:明細名:文字数', async () => {
    gondola.report(
        `Step 8. 「案件明細」セッションの追加された行の「明細名」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`,
    );
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.name),
        REQUIRED_ERROR_MESSAGE,
        'Required error message should be displayed',
    );

    gondola.report(`Step 9.「明細名」テキストボックスで64文字入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 64;
    const validText = Utilities.getRandomText(maximumNOC);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.name, validText);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.name),
        '',
        'Invalid feedback message should be correct',
    );

    gondola.report(`Step 10.「明細名」テキストボックスで65文字以上入力し、「保存」ボタンをクリックする。`);
    await projectDetailsPage.enterOrderedDetailsTextfield(columnName.name, validText + 'a');
    await projectDetailsPage.saveNewProject();
    // BUG: Invalid feedback does not match with test case requirement
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.name),
        maximumNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
});
