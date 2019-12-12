import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './results-base-setup';
import { ResultsBaseField } from '../../models/enum-class/project-results-base-field';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Project - Results base - Debit credit field validation');

let randomRole = '';

Before(async () => {
    randomRole = await setup();
});

TestCase('BMS-xx. 案件:案件作成:出来高明細:予定時間:下限値・上限値', async () => {
    gondola.report(`Step 1. Do abc`);
    gondola.report(`VP. Verify xyz`);
});
