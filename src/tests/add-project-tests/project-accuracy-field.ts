import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';

TestModule('Add Project - Project accuracy field validation');

const ACCURACY_FIELD_NAME = Constants.translator.fieldName.addProject.accuracy;

Before(setup);

TestCase('BMS-32. 案件:案件作成:確度:選択肢', async () => {
    gondola.report(`Step 2.「確度」プルダウンで選択肢を確認する。`);
    const projectAccuracyOptions = Object.values(Constants.ACCURACY_TYPES);
    gondola.report(`VP.確度」は必須項目であり`);
    await gondola.checkEqual(
        await addProjectPage.doesFieldRequired(ACCURACY_FIELD_NAME),
        true,
        'Project accuracy field should be required',
    );
    gondola.report(`VP.「確度」プルダウンには選択肢が三つあり、「高」と「普通」と「低」を含んでいること。`);
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(ACCURACY_FIELD_NAME, projectAccuracyOptions),
        true,
        'Project accuracy options should be displayed correctly',
    );
});
