import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「案件」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
}
