import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { Utilities } from '../../common/utilities';

TestModule('Add Project - Project Description field validation');

const DESCRIPTION_FIELD_NAME = Constants.translator.fieldName.addProject.description;

Before(setup);

TestCase('BMS-50. 案件:案件作成:説明', async () => {
    const maximumNOC = 1024;
    gondola.report(`Step 2.「説明」で1024文字を入力し、「保存」ボタンをクリックする。`);
    const randomInput = Utilities.getRandomText(maximumNOC);
    await addProjectPage.enterTextAreaByLabel(DESCRIPTION_FIELD_NAME, randomInput);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(DESCRIPTION_FIELD_NAME),
        '',
        'No error message should be displayed',
    );

    gondola.report(`Step 3.「説明」で1025文字以上を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterTextAreaByLabel(DESCRIPTION_FIELD_NAME, randomInput + 'a');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されること。`);
    //BUG: no error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(DESCRIPTION_FIELD_NAME),
        maximumNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed',
    );
});
