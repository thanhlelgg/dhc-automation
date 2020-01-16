import { Data, TestModule, gondola } from 'gondolajs';
import listProjectPage from '../../pages/list-project-page';
import { Constants } from '../../common/constants';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import setup from './search-project-setup';

TestModule('Search project - Search project by status');

const PROJECT_STATUS_FIELD_NAME = Constants.translator.fieldName.addProject.status;
const PROJECT_STATUSES = Object.values(Constants.PROJECT_STATUSES);

Before(setup);

Data(PROJECT_STATUSES).TestCase('BMS-114. BMS:案件:案件検索:ステータス', async (current: any) => {
    await gondola.report(`Step 2. ステータス」プルダウンの選択肢を確認する`, '');
    gondola.report(
        `VP. 「ステータス」プルダウンの選択肢が八つあり、「見込」、「見積済」、「仮受注」、「受注済」、「納品済」、「完了」、「延期」と「失注」を含めていること。`,
    );
    await gondola.checkTrue(
        await listProjectPage.doesSelectorByLabelOptionsExist(PROJECT_STATUS_FIELD_NAME, PROJECT_STATUSES.concat('')),
        'Project status options should be displayed correctly',
    );

    gondola.report(`Step 3. ステータス」プルダウンで任意の選択肢を選択し、検索する`);
    await listProjectPage.searchProject({ status: current });
    const actualResult = await listProjectPage.verifySearchResultsByOneColumn(current, SearchResultColumn.STATUS, true);
    gondola.report(`VP. 選択したものと一致するステータスである案件が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
});
