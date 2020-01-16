import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import { Constants } from '../../common/constants';
import talentManagementMenu from '../../pages/talent-management-menu';
import listPositionPage from '../../pages/list-position-page';
import addPositionPage from '../../pages/add-position-page';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること。`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「タレントマネジメント」（または「ホーム」）をクリックして、垂直メニューで「マスタデータ管理」→「役職」をクリックして、「役職一覧」画面で「新規」ボタンをクリックする。`,
    );
    await loginPage.gotoTalentManagement();
    await talentManagementMenu.gotoPositionsPage();
    await listPositionPage.clickAddButton();
    gondola.report(`VP. 役職の新規登録画面に遷移すること。`);
    await gondola.checkTrue(await addPositionPage.isCurrentPage(), 'Should be navigated to Add position page');
}
