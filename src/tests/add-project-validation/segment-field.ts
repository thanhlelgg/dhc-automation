import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Project - Worker field validation');

const SEGMENT_FIELD_NAME = Constants.translator.fieldName.segment;
const SEARCH_SEGMENTS_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.segmentSearchTitle;

Before(setup);

TestCase('BMS-45. 案件:案件作成:セグメント:未入力', async () => {
    gondola.report(`Step 2. 「セグメント」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    const actualFeedback = await addProjectPage.getInvalidFeedBack(SEGMENT_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-46. 案件:案件作成:セグメント:モーダルウィンドウのクローズ ', async () => {
    gondola.report(`Step 2. 「セグメント」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(SEGMENT_FIELD_NAME);
    gondola.report(`VP. セグメント検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search segments modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    addProjectPage.closeModalWindowByName(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_SEGMENTS_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search segments modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(SEGMENT_FIELD_NAME);
    await addProjectPage.clickOutsideOfWindowModal();
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_SEGMENTS_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search segments modal title should not be displayed');
});

TestCase('BMS-47. 案件:案件作成:セグメント:セグメントの検索および結果表示', async () => {
    gondola.report(`Step 2. 「セグメント」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(SEGMENT_FIELD_NAME);
    gondola.report(`VP. セグメント検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_SEGMENTS_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search Segments modal title should be displayed');
    gondola.report(`Step 3. セグメントのデータ表示を確認する。`);
    gondola.report(`VP. セグメントマスタのものは表示されること。`);
    gondola.checkEqual(
        await addProjectPage.doesSegmentsDisplayCorrect(),
        true,
        'Segments should be displayed correctly',
    );

    gondola.report(`Step 4. 検索条件欄にはコード、セグメント名、または階層の一部を入力する。`);
    let randomResult = await addProjectPage.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await addProjectPage.filterSegmentsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、セグメント名、階層は入力したフィールドと一致すること。`);
    //Bug: currently filtering is not working correctly for some keyword
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 6. 任意の検索結果を選択する。`);
    randomResult = await addProjectPage.getOneResultItemAllColumns();
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await addProjectPage.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 案件登録画面に戻り、選択したセグメント名が表示されること。`);
    const inputtedText = await addProjectPage.getTextFieldValueByLabel(SEGMENT_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Segment should be selected');
});
