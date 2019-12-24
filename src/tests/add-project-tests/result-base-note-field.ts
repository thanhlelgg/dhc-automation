import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './results-base-setup';
import { ResultsBaseField } from '../../models/enum-class/project-results-base-field';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import { Utilities } from '../../common/utilities';
import { ElementType } from '../../models/enum-class/element-type';

TestModule('Add Project - Results base - Debit credit field validation');

let randomRole = '';

Before(async () => {
    randomRole = await setup();
});

TestCase('BMS-76. 案件:案件作成:出来高明細:備考:文字数', async () => {
    const text20000Characters = Utilities.getRandomText(20000);
    const text19999Characters = Utilities.getRandomText(19999);
    gondola.report(`Step 3. 「出来高案件」の「備考」で2万文字を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.NOTE,
        text20000Characters,
        ElementType.TEXTAREA,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.NOTE,
            ElementType.TEXTAREA,
        ),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value feedback should be displayed',
    );

    gondola.report(`Step 4. 「出来高案件」の「備考」で19999文字を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRole,
        ResultsBaseField.NOTE,
        text19999Characters,
        ElementType.TEXTAREA,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されないこと。`);
    gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.NOTE,
            ElementType.TEXTAREA,
        ),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value feedback should be displayed',
    );
});
