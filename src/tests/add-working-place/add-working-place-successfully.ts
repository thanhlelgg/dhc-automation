import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import { WorkingPlaceInfoData } from '../../models/working-place-info';
import listWorkingPlacePage from '../../pages/list-working-place-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

const WORKING_PLACE_CATEGORY_OPTIONS = Constants.translator.radioButtonOptions.addWorkingPlace.category;
const WORKING_PLACE_LIST_CODE_SEARCH_FIELD = Constants.translator.fieldName.listWorkingPlace.code;

TestModule('Working place - Code field validation');

Before(setup);

TestCase('TMS-149. マスタ:ラボ管理作成:保存ラボ:必須項目のみ', async () => {
    gondola.report(`Step 2. 「カテゴリ」ラジオボタンで「ラボ」を選択する。`);
    gondola.report(`Step 3. 「就業先名称」、「就業先コード」、「住所」、「最寄り駅 1」の有効な情報を入力する。`);
    const requireData = WorkingPlaceInfoData.WORKING_PLACE_REQUIRED_DATA;
    requireData.code += Utilities.getRandomText(10);
    requireData.category = WORKING_PLACE_CATEGORY_OPTIONS.lab;
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);

    gondola.report(`Step 4.「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        `VP. 正常に保存でき、ラボ一覧画面には登録したラボが表示され、登録されたラボの内容は正しく保存されること。`,
    );
    await listWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_LIST_CODE_SEARCH_FIELD, requireData.code);
    await listWorkingPlacePage.clickButtonByIcon(ButtonIcon.SEARCH);
    await listWorkingPlacePage.clickTabularTableLinkByText(SearchResultColumn.NAME, requireData.name);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesWorkingPlaceInfoDisplayCorrectly(requireData),
        'Working place should be displayed correctly',
    );
});

TestCase('TMS-150. マスタ:ラボ管理作成:保存ラボ:全ての項目', async () => {
    gondola.report(`Step 2. 「カテゴリ」ラジオボタンで「ラボ」を選択する。`);
    gondola.report(`Step 3. 「就業先名称」、「就業先コード」、「住所」、「最寄り駅 1」の有効な情報を入力する。`);
    gondola.report(`Step 4. 他の項目で情報を入力する。`);
    const fullData = WorkingPlaceInfoData.WORKING_PLACE_FULL_DATA;
    fullData.code += Utilities.getRandomText(10);
    fullData.category = WORKING_PLACE_CATEGORY_OPTIONS.lab;
    await addWorkingPlacePage.inputWorkingPlaceInfo(fullData);
    gondola.report(`Step 5.「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        `VP. 正常に保存でき、ラボ一覧画面には登録したラボが表示され、登録されたラボの内容は正しく保存されること。`,
    );
    await listWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_LIST_CODE_SEARCH_FIELD, fullData.code);
    await listWorkingPlacePage.clickButtonByIcon(ButtonIcon.SEARCH);
    await listWorkingPlacePage.clickTabularTableLinkByText(SearchResultColumn.NAME, fullData.name);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesWorkingPlaceInfoDisplayCorrectly(fullData),
        'Working place should be displayed correctly',
    );
});

TestCase('TMS-151. マスタ:ラボ管理作成:保存クライアント:必須項目のみ', async () => {
    gondola.report(`Step 2. 「カテゴリ」ラジオボタンで「クライアント」を選択する。`);
    gondola.report(`Step 3. 「就業先名称」、「就業先コード」、「住所」、「最寄り駅 1」の有効な情報を入力する。`);
    const requireData = WorkingPlaceInfoData.WORKING_PLACE_REQUIRED_DATA;
    requireData.code += Utilities.getRandomText(10);
    requireData.category = WORKING_PLACE_CATEGORY_OPTIONS.client;
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);

    gondola.report(`Step 4.「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        `VP. 正常に保存でき、ラボ一覧画面には登録したクライアントが表示され、登録されたクライアントの内容は正しく保存されること。`,
    );
    await listWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_LIST_CODE_SEARCH_FIELD, requireData.code);
    await listWorkingPlacePage.clickButtonByIcon(ButtonIcon.SEARCH);
    await listWorkingPlacePage.clickTabularTableLinkByText(SearchResultColumn.NAME, requireData.name);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesWorkingPlaceInfoDisplayCorrectly(requireData),
        'Working place should be displayed correctly',
    );
});

TestCase('TMS-152. マスタ:ラボ管理作成:保存クライアント:全ての項目', async () => {
    gondola.report(`Step 2. 「カテゴリ」ラジオボタンで「クライアント」を選択する。`);
    gondola.report(`Step 3. 「就業先名称」、「就業先コード」、「住所」、「最寄り駅 1」の有効な情報を入力する。`);
    gondola.report(`Step 4. 他の項目で情報を入力する。`);
    const fullData = WorkingPlaceInfoData.WORKING_PLACE_FULL_DATA;
    fullData.code += Utilities.getRandomText(10);
    fullData.category = WORKING_PLACE_CATEGORY_OPTIONS.client;
    await addWorkingPlacePage.inputWorkingPlaceInfo(fullData);
    gondola.report(`Step 5.「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        `VP. 正常に保存でき、ラボ一覧画面には登録したクライアントが表示され、登録されたクライアントの内容は正しく保存されること。`,
    );
    await listWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_LIST_CODE_SEARCH_FIELD, fullData.code);
    await listWorkingPlacePage.clickButtonByIcon(ButtonIcon.SEARCH);
    await listWorkingPlacePage.clickTabularTableLinkByText(SearchResultColumn.NAME, fullData.name);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesWorkingPlaceInfoDisplayCorrectly(fullData),
        'Working place should be displayed correctly',
    );
});
