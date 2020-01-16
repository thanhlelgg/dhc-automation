import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import { Constants } from '../../common/constants';
import talentManagementMenu from '../../pages/talent-management-menu';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること。`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「タレントマネジメント」（または「ホーム」）をクリックして、垂直メニューで「マスタデータ管理」→「役職」をクリックする。`,
    );
    await loginPage.gotoTalentManagement();
    await talentManagementMenu.gotoPositionsPage();
}
