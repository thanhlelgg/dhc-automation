import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './setup-and-teardown';
import { Utilities } from '../../common/utilities';

TestModule('Add Project - Project Description field validation');

const DESCRIPTION_FIELD_NAME = Constants.translator.fieldName.description;

Before(setup);

TestCase('BMS-50. 案件:案件作成:説明', async () => {
    gondola.report(`Step 2.「説明」で21,850文字を入力し、他の必須情報を入力し、「保存」ボタンをクリックする。`);
    const randomInput = Utilities.getRandomText(21850);
    await addProjectPage.enterTextAreaByLabel(DESCRIPTION_FIELD_NAME, randomInput);
    gondola.report(
        `VP. 21,845文字まで入力可能であり、それ以降の文字列については自動的に削除され、アラートは出ないこと。`,
    );
    //BUG: all 21850 characters can be entered
    await gondola.checkEqual(
        await addProjectPage.getTextAreaValueByLabel(DESCRIPTION_FIELD_NAME),
        randomInput.substring(0, 21845),
        'Description should be stripped correctly',
    );
});
