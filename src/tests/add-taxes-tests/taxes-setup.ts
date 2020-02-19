import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import addTaxPage from '../../pages/add-tax-page';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「税」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddTaxPage();
    gondola.report('VP. 新規税率登録の画面に移動すること。');
    gondola.checkTrue(await addTaxPage.isCurrentPage(), 'Should be navigated to add tax page');
}
