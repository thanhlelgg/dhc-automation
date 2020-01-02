import { gondola, TestCase, TestModule } from 'gondolajs';
import listProjectPage from '../../pages/list-project-page';
import { Constants } from '../../common/constants';
import setup from './search-project-setup';

TestModule('Search project - Verify button add new project');

Before(setup);

TestCase('BMS-117. BMS:案件:案件検索:新規登録ボタン', async () => {
    gondola.report(`Step 2.「新規登録」ボタンをクリックする`);
    listProjectPage.gotoAddNewProjectPage();
    gondola.report(`VP. 新規登録画面に遷移すること。`);
    await gondola.checkTrue(
        await listProjectPage.verifyPageDisplayByUrl(Constants.addProjectUrl),
        'New project page should be displayed.',
    );
});
