import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';
import searchModalWindows from '../../pages/search-modal-windows';
import setup from './add-item-setup';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Item - Segment field validation');

const ITEM_SEGMENT_FIELD_NAME = Constants.translator.fieldName.addItem.segment;
const SEARCH_SEGMENTS_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.segmentSearchTitle;

Before(setup);

TestCase('BMS-194. BMS:マスタ:品目作成:セグメント:未入力', async () => {
    gondola.report(`Step 2. セグメントを入力しなくて、保存する`);
    await addItemPage.saveNewItem();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    const actualFeedback = await addItemPage.getInvalidFeedBack(ITEM_SEGMENT_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-195. BMS:マスタ:品目作成:セグメント:モーダルウィンドウのクローズ', async () => {
    gondola.report(`Step 2. モーダルウィンドウを起動する `);
    await addItemPage.clickTextFieldByLabel(ITEM_SEGMENT_FIELD_NAME);
    gondola.report(`VP. セグメント検索のモーダルウィンドウが起動すること。`);
    await gondola.checkTrue(
        await addItemPage.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE),
        'A modal window for segment search should be displayed',
    );

    gondola.report(`Step 3.「×」ボタンでモーダルウィンドウを閉じる`);
    await addItemPage.closeModalWindowByName(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    await gondola.checkFalse(
        await addItemPage.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE, false),
        'A modal window for segment search should be hidden',
    );

    gondola.report(`Step 3. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addItemPage.clickTextFieldByLabel(ITEM_SEGMENT_FIELD_NAME);
    await addItemPage.clickOutsideTextFieldByLabel(ITEM_SEGMENT_FIELD_NAME);
    gondola.report(`VP.モーダルウィンドウが非表示になること。`);
    await gondola.checkFalse(
        await addItemPage.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE, false),
        'A modal window for segment search should be hidden',
    );
});

TestCase('BMS-196. マスタ:品目作成:セグメント:セグメントの検索および結果表示', async () => {
    gondola.report(`Step 2. モーダルウィンドウを起動する`);
    await addItemPage.clickTextFieldByLabel(ITEM_SEGMENT_FIELD_NAME);
    gondola.report(`VP. セグメント検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addItemPage.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search Segments modal title should be displayed');
    gondola.report(`Step 3. セグメントの表示を確認する`);
    gondola.report(`VP. セグメントマスタのものは表示されること。`);
    gondola.checkTrue(await searchModalWindows.doesSegmentsDisplayCorrect(), 'Segments should be displayed correctly');

    gondola.report(`Step 4. 検索条件を入力する`);
    let randomResult = await searchModalWindows.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する`);
    const doesFilteringWorkCorrectly = await searchModalWindows.filterSegmentsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、セグメント名、階層は入力したフィールドと一致すること。`);
    //Bug: currently filtering is not working correctly for some keyword
    await gondola.checkTrue(doesFilteringWorkCorrectly, 'Filtering should be working correctly');

    gondola.report(`Step 6. 結果を選択する`);
    randomResult = await searchModalWindows.getOneResultItemAllColumns();
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await searchModalWindows.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 品目登録画面に戻り、選択したセグメント名が表示されること。`);
    const inputtedText = await addItemPage.getTextFieldValueByLabel(ITEM_SEGMENT_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Segment should be selected');
});
