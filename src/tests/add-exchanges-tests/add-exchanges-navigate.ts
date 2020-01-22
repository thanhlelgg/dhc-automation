import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './add-exchanges-setup';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import addExchangePage from '../../pages/add-exchange-page';

TestModule('Add exchanges - Navigate pages tests');

Before(setup);

TestCase('BMS-354. マスタ:通貨作成:画面遷移', async () => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「為替」の「通貨登録」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    gondola.report('VP. 新規通貨作成の画面に移動すること。');
    await gondola.checkTrue(await addExchangePage.isCurrentPage(), 'Should be navigated to add exchange page');
});
