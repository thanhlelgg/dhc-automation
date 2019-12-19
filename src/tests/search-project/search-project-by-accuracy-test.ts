import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import listProjectPage from '../../pages/list-project-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import Accuracy from '../../models/enum-class/accuracy';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Search project - Search project by accuracy');

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.案件一覧の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListProject();
});

TestCase('BMS-115. BMS:案件:案件検索:確度', async () => {
    gondola.report(`Step 2. プルダウンの選択肢を確認する`);
    let accuracy: string;
    let resultsFromDatabase;
    let expectedResults: any[];
    let actualResults: any[];

    for (let accuracyKey in Accuracy) {
        expectedResults = [];
        actualResults = [];
        //@ts-ignore
        accuracy = Accuracy[accuracyKey];
        resultsFromDatabase = await DatabaseHelper.getProjectsBy({ accuracy: accuracyKey });
        resultsFromDatabase.forEach((v) => { expectedResults.push((v.number as string).trim()); });

        gondola.report(`Step 3. プルダウンで任意の選択肢を選択し、検索する`);
        gondola.report(`===== 確度: ${accuracy}`);
        await listProjectPage.searchProject({ accuracy: accuracy });

        actualResults = await listProjectPage.getResultsOfAllPagesOnOneColumn(SearchResultColumn.CODE);
        gondola.report(`VP. 選択したものと一致する確度である案件が表示されること。`);
        await gondola.checkEqual(actualResults.sort(), expectedResults.sort(), 'Search result should be correct');
    }
});
