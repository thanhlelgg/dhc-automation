import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import setup from './results-base-setup';
import { Constants } from '../../common/constants';
import { ResultsBaseField } from '../../models/enum-class/project-results-base-field';
import { ElementType } from '../../models/enum-class/element-type';

TestModule('Add Project - Results base - Tax field validation');

let randomRole = '';

Before(async () => {
    randomRole = await setup();
});

TestCase('BMS-74. 案件:案件作成:出来高明細:課税', async () => {
    gondola.report(`Step 3. 出来高明細行の「課税」でチェックを入れる。`);
    await addProjectPage.setTaxableState(randomRole, true);
    gondola.report(`VP. 「税率」プルダウンが有効になり、選択できること。`);
    await gondola.checkTrue(await addProjectPage.isTaxDropdownEnabled(randomRole), 'Tax id dropdown should be enabled');
    gondola.report(`Step 4. 出来高明細行の「課税」でチェックを外す。`);
    await addProjectPage.setTaxableState(randomRole, false);
    gondola.report(`VP. 「税率」プルダウンが無効になり、選択できないこと。`);
    await gondola.checkFalse(
        await addProjectPage.isTaxDropdownEnabled(randomRole),
        'Tax id dropdown should be disabled',
    );
});

TestCase('BMS-75. 案件:案件作成:出来高明細:税率', async () => {
    gondola.report(`Step 3. 出来高明細行の「課税」でチェックを入れ、「税率」プルダウンの選択肢を確認する。`);
    await addProjectPage.setTaxableState(randomRole, true);
    gondola.report(
        `VP. 「税率」プルダウンには選択肢が税率マスタに登録されたものを含んでいること。(現状：「８％」、「10%」を含んでいる)`,
    );
    await gondola.checkTrue(
        await addProjectPage.checkResultsBaseTaxOptions(randomRole, Constants.TAX_IDS),
        'Tax id dropdown should be displayed correctly',
    );
    gondola.report(
        `Step 4. 出来高明細行の「課税」でチェックを入れ、「税率」プルダウンで何も選択しなくて、「保存」ボタンをクリックする。`,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 「税率」フィールドの下にエラー「課税の場合、このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(
            randomRole,
            ResultsBaseField.TAX_ID,
            ElementType.SELECTOR,
        ),
        Constants.translator.invalidFeedback.taxFieldRequired,
        'Invalid feedback message should be displayed correctly',
    );
});
