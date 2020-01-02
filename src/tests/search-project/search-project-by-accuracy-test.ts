import { gondola, TestCase, TestModule } from 'gondolajs';
import listProjectPage from '../../pages/list-project-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import Accuracy from '../../models/enum-class/accuracy';
import { DatabaseHelper } from '../../helper/database-helpers';
import setup from './search-project-setup';

TestModule('Search project - Search project by accuracy');

Before(setup);

TestCase('BMS-115. BMS:案件:案件検索:確度', async () => {
    gondola.report(`Step 2. プルダウンの選択肢を確認する`);
    let accuracy: string;
    let resultsFromDatabase;
    let expectedResults: any[];
    let actualResults: any[];

    for (const accuracyKey in Accuracy) {
        expectedResults = [];
        actualResults = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        accuracy = Accuracy[accuracyKey];
        resultsFromDatabase = await DatabaseHelper.getProjectsBy({ accuracy: accuracyKey });
        resultsFromDatabase.forEach(v => {
            expectedResults.push((v.number as string).trim());
        });

        gondola.report(`Step 3. プルダウンで任意の選択肢を選択し、検索する`);
        gondola.report(`===== 確度: ${accuracy}`);
        await listProjectPage.searchProject({ accuracy: accuracy });

        actualResults = await listProjectPage.getResultsOfAllPagesOnOneColumn(SearchResultColumn.CODE);
        gondola.report(`VP. 選択したものと一致する確度である案件が表示されること。`);
        await gondola.checkEqual(actualResults.sort(), expectedResults.sort(), 'Search result should be correct');
    }
});
