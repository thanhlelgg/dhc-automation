import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import listProjectPage from '../../pages/list-project-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Search project - Search project by tag');

const PROJECT_TAG_SEARCH = 'PS';

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.案件一覧の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListProject();
});

TestCase('BMS-116. BMS:案件:案件検索:タグ', async () => {
    let resultsFromDatabase;
    let expectedResults: any[] = [];
    let actualResults: any[] = [];

    resultsFromDatabase = await DatabaseHelper.getProjectsBy({ tag: PROJECT_TAG_SEARCH });
    resultsFromDatabase.forEach((v) => { expectedResults.push((v.number as string).trim()); });

    gondola.report(`Step 2. タグで文字列の部分を入力し、検索する`);
    await listProjectPage.searchProject({ tag: PROJECT_TAG_SEARCH });

    actualResults = await listProjectPage.getResultsOfAllPagesOnOneColumn(SearchResultColumn.CODE);
    gondola.report(`VP. 部分一致するタグである案件が表示されること。`);
    await gondola.checkEqual(actualResults.sort(), expectedResults.sort(), 'Search result should be correct');
    
});
