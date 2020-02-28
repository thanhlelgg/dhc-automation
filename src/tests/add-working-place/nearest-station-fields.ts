import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { WorkingPlaceInfoData } from '../../models/working-place-info';
import { Utilities } from '../../common/utilities';

const WORKING_PLACE_NEAREST_STATION_1 = Constants.translator.fieldName.addWorkingPlace.nearestStation1;
const WORKING_PLACE_NEAREST_STATION_2 = Constants.translator.fieldName.addWorkingPlace.nearestStation2;
const WORKING_PLACE_NEAREST_STATION_3 = Constants.translator.fieldName.addWorkingPlace.nearestStation3;

TestModule('Working place - Nearest station fields validation');

Before(setup);

TestCase('TMS-122. マスタ:ラボ管理作成:住所:文字数', async () => {
    gondola.report(`Step 2. 「最寄駅1 」で何も入力しなくて、「保存」ボタンをクリックする。`);
    const requireData = WorkingPlaceInfoData.WORKING_PLACE_REQUIRED_DATA;
    requireData.nearestStation1 = '';
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getSelectorValidationMessageByLabel(WORKING_PLACE_NEAREST_STATION_1, true),
        Constants.translator.invalidFeedback.dropdownNeedToBeSelected,
        'Field is required error message should be displayed',
    );
});

TestCase('TMS-123. マスタ:ラボ管理作成:最寄駅1:検索機能付プルダウンで入力', async () => {
    gondola.report(`Step 2. 「最寄駅1」で枠内をクリックする。`);
    await addWorkingPlacePage.clickSearchSelectionDropdownByLabel(WORKING_PLACE_NEAREST_STATION_1, true);
    gondola.report(`VP. 検索付きプルダウンが表示され、一部の駅一覧が表示されること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSearchSelectionDisplay(),
        'Search selection should be displayed',
    );
    gondola.report(`Step 3. プルダウンリスト内の検索窓には駅名の一部を入力する。`);
    const randomItem = await addWorkingPlacePage.getRandomSelectionSearchResult();
    const stationName = Utilities.getStationNameFromNearestStationString(randomItem);
    const partialSearch = await addWorkingPlacePage.enterSearchSelectionTextfield(stationName, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに対象の選択肢が表示されること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSearchResultDisplayCorrectly(partialSearch),
        'Search result should be filtered correctly',
    );

    gondola.report(`Step 4. 任意の検索結果を選択する。`);
    await addWorkingPlacePage.selectSearchSelectionResult(randomItem);
    gondola.report(`VP. 選択したものと一致する駅名である路線と駅が表示されること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getSearchSelectionSelectedItemByLabel(WORKING_PLACE_NEAREST_STATION_1, true),
        randomItem,
        'Item should be selected correctly',
    );

    gondola.report(`Step 5. 選択項目横の「×」をクリックする。`);
    await addWorkingPlacePage.clearSearchSelectionByLabel(WORKING_PLACE_NEAREST_STATION_1, true);
    gondola.report(`VP. 選択した検索結果がクリアされること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSelectedSearchResultEmpty(WORKING_PLACE_NEAREST_STATION_1, true),
        'Selected search result should be removed',
    );
});

TestCase('TMS-124. マスタ:ラボ管理作成:最寄駅2:検索機能付プルダウンで入力', async () => {
    gondola.report(`Step 2. 「最寄駅2」で枠内をクリックする。`);
    await addWorkingPlacePage.clickSearchSelectionDropdownByLabel(WORKING_PLACE_NEAREST_STATION_2, true);
    gondola.report(`VP. 検索付きプルダウンが表示され、一部の駅一覧が表示されること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSearchSelectionDisplay(),
        'Search selection should be displayed',
    );
    gondola.report(`Step 3. プルダウンリスト内の検索窓には駅名の一部を入力する。`);
    const randomItem = await addWorkingPlacePage.getRandomSelectionSearchResult();
    const stationName = Utilities.getStationNameFromNearestStationString(randomItem);
    const partialSearch = await addWorkingPlacePage.enterSearchSelectionTextfield(stationName, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに対象の選択肢が表示されること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSearchResultDisplayCorrectly(partialSearch),
        'Search result should be filtered correctly',
    );

    gondola.report(`Step 4. 任意の検索結果を選択する。`);
    await addWorkingPlacePage.selectSearchSelectionResult(randomItem);
    gondola.report(`VP. 選択したものと一致する駅名である路線と駅が表示されること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getSearchSelectionSelectedItemByLabel(WORKING_PLACE_NEAREST_STATION_2, true),
        randomItem,
        'Item should be selected correctly',
    );

    gondola.report(`Step 5. 選択項目横の「×」をクリックする。`);
    await addWorkingPlacePage.clearSearchSelectionByLabel(WORKING_PLACE_NEAREST_STATION_2, true);
    gondola.report(`VP. 選択した検索結果がクリアされること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSelectedSearchResultEmpty(WORKING_PLACE_NEAREST_STATION_2, true),
        'Selected search result should be removed',
    );
});

TestCase('TMS-125. マスタ:ラボ管理作成:最寄駅3:検索機能付プルダウンで入力', async () => {
    gondola.report(`Step 2. 「最寄駅3」で枠内をクリックする。`);
    await addWorkingPlacePage.clickSearchSelectionDropdownByLabel(WORKING_PLACE_NEAREST_STATION_3, true);
    gondola.report(`VP. 検索付きプルダウンが表示され、一部の駅一覧が表示されること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSearchSelectionDisplay(),
        'Search selection should be displayed',
    );
    gondola.report(`Step 3. プルダウンリスト内の検索窓には駅名の一部を入力する。`);
    const randomItem = await addWorkingPlacePage.getRandomSelectionSearchResult();
    const stationName = Utilities.getStationNameFromNearestStationString(randomItem);
    const partialSearch = await addWorkingPlacePage.enterSearchSelectionTextfield(stationName, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに対象の選択肢が表示されること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSearchResultDisplayCorrectly(partialSearch),
        'Search result should be filtered correctly',
    );

    gondola.report(`Step 4. 任意の検索結果を選択する。`);
    await addWorkingPlacePage.selectSearchSelectionResult(randomItem);
    gondola.report(`VP. 選択したものと一致する駅名である路線と駅が表示されること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getSearchSelectionSelectedItemByLabel(WORKING_PLACE_NEAREST_STATION_3, true),
        randomItem,
        'Item should be selected correctly',
    );

    gondola.report(`Step 5. 選択項目横の「×」をクリックする。`);
    await addWorkingPlacePage.clearSearchSelectionByLabel(WORKING_PLACE_NEAREST_STATION_3, true);
    gondola.report(`VP. 選択した検索結果がクリアされること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesSelectedSearchResultEmpty(WORKING_PLACE_NEAREST_STATION_3, true),
        'Selected search result should be removed',
    );
});
