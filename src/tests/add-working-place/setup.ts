import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import { Constants } from '../../common/constants';
import talentManagementMenu from '../../pages/talent-management-menu';
import listWorkingPlacePage from '../../pages/list-working-place-page';
import addWorkingPlacePage from '../../pages/add-working-place-page';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること。`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「タレントマネジメント」（または「ホーム」）をクリックして、垂直メニューで「マスタデータ管理」→「ラボ管理」をクリックして、「就業先一覧」画面で「就業先追加」ボタンをクリックする。`,
    );
    await loginPage.gotoTalentManagement();
    await talentManagementMenu.gotoWorkingPlacePage();
    await listWorkingPlacePage.clickAddButton();
    gondola.report(`VP. 就業先追加の画面に移動すること。`);
    await gondola.checkTrue(await addWorkingPlacePage.isCurrentPage(), 'Should be navigated to Add working place page');
}
