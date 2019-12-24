import { gondola, TestCase, TestModule } from 'gondolajs';
import addSegmentPage from '../../pages/add-segment-page';
import searchModalWindows from '../../pages/search-modal-windows';
import { Constants } from '../../common/constants';
import setup from './add-segment-setup';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Project - Parent segment field validation');

const PARENT_SEGMENT_FIELD_NAME = Constants.translator.fieldName.addSegment.parentSegment;
const SEARCH_SEGMENTS_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.segmentSearchTitle;

Before(setup);

TestCase('BMS-214. マスタ:セグメント作成:親セグメント:モーダルウィンドウのクローズ', async () => {
    gondola.report(`Step 2. 「親セグメント」テキストボックスの枠内をクリックする。`);
    await addSegmentPage.clickTextFieldByLabel(PARENT_SEGMENT_FIELD_NAME);
    gondola.report(`VP. セグメント選択のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    await gondola.checkTrue(isModuleDisplayed, 'Search segments modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    await addSegmentPage.closeModalWindowByName(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    await gondola.checkFalse(isModuleDisplayed, 'Search segments modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addSegmentPage.clickTextFieldByLabel(PARENT_SEGMENT_FIELD_NAME);
    await addSegmentPage.clickOutsideOfWindowModal(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    await gondola.checkFalse(isModuleDisplayed, 'Search segments modal title should not be displayed');
});

TestCase('BMS-215. マスタ:セグメント作成:親セグメント:セグメントの検索および結果表示', async () => {
    gondola.report(`Step 2. 「親セグメント」テキストボックスの枠内をクリックする。`);
    await addSegmentPage.clickTextFieldByLabel(PARENT_SEGMENT_FIELD_NAME);
    gondola.report(`VP. セグメント検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    await gondola.checkTrue(isModuleDisplayed, 'Search Segments modal title should be displayed');
    gondola.report(`Step 3. セグメントのデータ表示を確認する。`);
    gondola.report(`VP. セグメントマスタのものは表示されること。`);
    gondola.checkTrue(await searchModalWindows.doesSegmentsDisplayCorrect(), 'Segments should be displayed correctly');

    gondola.report(`Step 4. 検索条件欄にはコード、セグメント名、または階層の一部を入力する。`);
    let randomResult = await searchModalWindows.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await searchModalWindows.filterSegmentsAndVerifyResult(randomResult);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、セグメント名、階層は入力したフィールドと一致すること。`);
    //Bug: currently filtering is not working correctly for some keyword
    await gondola.checkTrue(doesFilteringWorkCorrectly, 'Filtering should be working correctly');

    gondola.report(`Step 6. 任意の検索結果を選択する。`);
    randomResult = await searchModalWindows.getOneResultItemAllColumns();
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await searchModalWindows.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. セグメント登録画面に戻り、選択したセグメント名が表示されること。`);
    const inputtedText = await addSegmentPage.getTextFieldValueByLabel(PARENT_SEGMENT_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Segment should be selected');
});
