import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './results-base-setup';

TestModule('Add Project - Results base - Debit credit field validation');

let randomRole = '';

Before(async () => {
    randomRole = await setup();
});

TestCase('BMS-55. 案件:案件作成:取引通貨:選択肢', async () => {
    gondola.report(`Step 3. 出来高明細行で「計上区分」プルダウンで選択肢を確認する。`);
    const debitCreditGroupIds = Object.values(Constants.debitCreditGroupIds);
    gondola.report(`VP.「計上区分」は必須項目であり`);
    await addProjectPage.doesResultsBaseColumnRequired(Constants.translator.resultBases.columnName.debitCredit);

    gondola.report(
        `VP.「計上区分」プルダウンには選択肢が五つあり、「売掛」、「前受」、「立替(消耗品)」、「立替(旅費交通費)」と「立替(システム関係費)」を含んでいること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.doesDebitCreditsOptionsExist(randomRole, debitCreditGroupIds),
        true,
        'Debit credit options should be displayed correctly',
    );
});
