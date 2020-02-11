import { gondola, Data, TestModule } from 'gondolajs';
import setup from './precondition-setup';
import loginPage from '../../pages/login-page';
import talentManagementSystemPage from '../../pages/talent-management-menu';
import { WorkingPlaceInfoData } from '../../models/working-place-info';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import listWorkingPlacePage from '../../pages/list-working-place-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import { Constants } from '../../common/constants';
import addPositionPage from '../../pages/add-position-page';
import listPositionPage from '../../pages/list-position-page';
import { PositionsTableHeader } from '../../models/enum-class/positions-table-header';
import { PositionInfoData } from '../../models/position-info';

TestModule('Add initial data for TMS');

const WORKING_PLACE_INFO = WorkingPlaceInfoData.WORKING_PLACE_INITIAL_DATA;
const POSITION_INFO = PositionInfoData.POSITION_INITIAL_DATA;
const POSITION_NAME_HEADER_NAME = Constants.translator.tableColumnName.positionsList.positionName;

Before(setup);

Data(WORKING_PLACE_INFO).TestCase('InitialData6. マスタ: 就業先(ラボ管理)作成', async (current: any) => {
    gondola.report(
        `Step 1. 水平メニューで「タレントマネジメント」（または「ホーム」）をクリックして、垂直メニューで「マスタデータ管理」→「ラボ管理」をクリックして、「就業先一覧」画面で「就業先追加」ボタンをクリックする。`,
    );
    await loginPage.gotoTalentManagement();
    await talentManagementSystemPage.gotoWorkingPlacePage();
    await listWorkingPlacePage.clickAddButton();
    gondola.report(`VP. 就業先追加の画面に移動すること。`);
    await gondola.checkTrue(await addWorkingPlacePage.isCurrentPage(), 'Should be navigated to Add working place page');
    gondola.report(`Step 2. 「カテゴリ」ラジオボタンで「ラボ」を選択する。`);
    gondola.report(`Step 3. 「就業先名称」、「就業先コード」、「住所」、「最寄り駅 1」の有効な情報を入力する。`);
    gondola.report(`Step 4. 他の項目で情報を入力する。`);
    await addWorkingPlacePage.inputWorkingPlaceInfo(current);
    gondola.report(`Step 5.「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        `VP. 正常に保存でき、ラボ一覧画面には登録したラボが表示され、登録されたラボの内容は正しく保存されること。`,
    );
    await listWorkingPlacePage.enterTextFieldByLabel(
        Constants.translator.fieldName.listWorkingPlace.code,
        current.code,
    );
    await listWorkingPlacePage.clickButtonByIcon(ButtonIcon.SEARCH);
    await listWorkingPlacePage.clickTabularTableLinkByText(SearchResultColumn.NAME, current.name);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesWorkingPlaceInfoDisplayCorrectly(current),
        'Working place should be displayed correctly',
    );
});

Data(POSITION_INFO).TestCase('InitialData7. マスタ:役職作成', async (current: any) => {
    gondola.report(
        `Step 1. 水平メニューで「タレントマネジメント」（または「ホーム」）をクリックして、垂直メニューで「マスタデータ管理」→「役職」をクリックして、「役職一覧」画面で「新規」ボタンをクリックする。`,
    );
    await loginPage.gotoTalentManagement();
    await talentManagementSystemPage.gotoPositionsPage();
    await listPositionPage.removePositionIfExist(current.positionName, current.abbreviationName);
    await listPositionPage.clickAddButton();
    gondola.report(`VP. 役職の新規登録画面に遷移すること。`);
    await gondola.checkTrue(await addPositionPage.isCurrentPage(), 'Should be navigated to Add position page');
    gondola.report(
        `Step 2. 「役職名」と「省略名」で有効な情報を入力し、「タイムカード承認」プルダウンで選択肢を選択し、「保存」ボタンをクリックする。`,
    );
    await addPositionPage.inputPositionInfo(current);
    await addPositionPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 正常に保存でき、新しい役職が役職一覧画面で表示されること。`);
    await gondola.checkTrue(
        await listPositionPage.doesPositionValueDisplay(current.positionName, PositionsTableHeader.POSITION_NAME),
        'New position should be displayed correctly',
    );
    await listPositionPage.clickActionButton(ButtonIcon.VIEW, POSITION_NAME_HEADER_NAME, current.positionName);
    await gondola.checkTrue(
        await addPositionPage.doesPositionInfoDisplayCorrectly(current),
        'Position info should be displayed correctly',
    );
});
