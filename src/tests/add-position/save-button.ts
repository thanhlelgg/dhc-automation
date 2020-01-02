import { gondola, TestCase, TestModule } from 'gondolajs';
import addPositionPage from '../../pages/add-position-page';
import listPositionPage from '../../pages/list-position-page';
import { PositionInfoData } from '../../models/position-info';
import loginPage from '../../pages/login-page';
import { Constants } from '../../common/constants';
import talentManagementMenu from '../../pages/talent-management-menu';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { ActionButton } from '../../models/enum-class/action-button';
import { PositionsTableHeader } from '../../models/enum-class/positions-table-header';

const POSITION_DATA = PositionInfoData.POSITION_FULL_DATA;
const POSITION_NAME_HEADER_NAME = Constants.translator.tableColumnName.positionsList.positionName;

TestModule('Positions - Save button validation');

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること。`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.modUserName, Constants.modPassword);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(
        `Step 1. 水平メニューで「タレントマネジメント」（または「ホーム」）をクリックして、垂直メニューで「マスタデータ管理」→「役職」をクリックして、「役職一覧」画面で「新規」ボタンをクリックする。`,
    );
    await loginPage.gotoTalentManagement();
    await talentManagementMenu.gotoPositionsPage();
    await listPositionPage.removePositionIfExist(POSITION_DATA.positionName, POSITION_DATA.abbreviationName);
    await listPositionPage.clickAddButton();
    gondola.report(`VP. 役職の新規登録画面に遷移すること。`);
    await gondola.checkTrue(await addPositionPage.isCurrentPage(), 'Should be navigated to Add position page');
});

TestCase('TMS-131. マスタ:役職作成:戻るボタン', async () => {
    gondola.report(
        `Step 2. 「役職名」と「省略名」で有効な情報を入力し、「タイムカード承認」プルダウンで選択肢を選択し、「保存」ボタンをクリックする。`,
    );
    await addPositionPage.inputPositionInfo(POSITION_DATA);
    await addPositionPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 正常に保存でき、新しい役職が役職一覧画面で表示されること。`);
    await gondola.checkTrue(
        await listPositionPage.doesPositionValueDisplay(POSITION_DATA.positionName, PositionsTableHeader.POSITION_NAME),
        'New position should be displayed correctly',
    );
    await listPositionPage.clickActionButton(ActionButton.VIEW, POSITION_NAME_HEADER_NAME, POSITION_DATA.positionName);
    await gondola.checkTrue(
        await addPositionPage.doesPositionInfoDisplayCorrectly(POSITION_DATA),
        'Position info should be displayed correctly',
    );
});
