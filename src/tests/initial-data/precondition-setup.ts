import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import { Constants } from '../../common/constants';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.modUserName, Constants.modPassword);
    await loginPage.chooseLanguage(process.env.LANGUAGE);
}
