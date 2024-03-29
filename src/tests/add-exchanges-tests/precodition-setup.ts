import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import { Constants } from '../../common/constants';
import businessSystemPage from '../../pages/business-system-page';
import addExchangePage from '../../pages/add-exchange-page';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「為替」の「通貨登録」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    gondola.report('VP. 新規通貨作成の画面に移動すること。');
    await gondola.checkTrue(await addExchangePage.isCurrentPage(), 'Should be navigated to add exchange page');
}
