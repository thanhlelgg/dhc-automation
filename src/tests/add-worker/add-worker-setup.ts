import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import addWorkerPage from '../../pages/add-worker-page';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(`Step 1. 新規従業員登録の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();

    gondola.report(`VP. 新規従業員登録の画面に移動すること。`);
    await addWorkerPage.isCurrentPage();
}
