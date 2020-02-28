import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-validation-setup';
import projectDetailsPage from '../../pages/project-details-page';
import { Constants } from '../../common/constants';

TestModule('Add Project - Ordered details - Credit credit group field validation');
const columnName = Constants.translator.tableColumnName.addProject.orderedDetails;

Before(setup);

TestCase('BMS-294. BMS:案件:案件編集:非稼働明細:計上区分:選択肢', async () => {
    gondola.report(`Step 8. 「計上区分」プルダウンで選択肢を確認する。`);
    const debitCreditGroupIds = Object.values(Constants.DEBIT_CREDIT_GROUP_IDS);

    gondola.report(
        `VP.「計上区分」プルダウンには選択肢が六つあり、「売掛/売上」、「前受/売上」、「売掛/前受」、「立替(消耗品)/消耗品費」、「立替(旅費交通費)/旅費交通費」、「立替(システム関係費)/システム関連費」を含んでいること。`,
    );
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsDropdownOptionExist(
            columnName.debitCreditGroup,
            debitCreditGroupIds,
        ),
        'Debit credit options should be displayed correctly',
    );
});
