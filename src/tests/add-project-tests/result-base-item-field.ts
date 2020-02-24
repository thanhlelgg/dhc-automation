import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import searchModalWindows from '../../pages/search-modal-windows';
import { Constants } from '../../common/constants';
import setup from './results-base-setup';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Project - Results base - Item field validation');

const SEARCH_ITEM_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.searchItemTitle;
const ITEM_FIELD_NAME = Constants.translator.resultBases.fieldName.item;

Before(setup);

TestCase('BMS-52. 案件:案件作成:出来高明細:品目:未入力', async () => {
    gondola.report(`Step 3. 出来高明細行の「品目」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    //BUG: no required error message is displayed
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBack(ITEM_FIELD_NAME),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );
});

TestCase('BMS-53. 案件:案件作成:出来高明細:品目:品目の検索および結果表示', async () => {
    gondola.report(`Step 3. 出来高明細行の「品目」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickResultsBaseItemTextfield();
    gondola.report(`VP. 品目検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search Item modal title should be displayed');

    gondola.report(`Step 4. 品目のデータ表示を確認する。`);
    gondola.report(`VP. 品目マスタのものは表示されること。`);
    gondola.checkEqual(await addProjectPage.doesItemsDisplayCorrect(), true, 'Item should be displayed correctly');

    gondola.report(`Step 5. 検索条件欄には品目コード又は品目名の一部を入力する。`);
    let randomResult = await searchModalWindows.getOneResultItemAllColumns();
    gondola.report(`Step 6. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await searchModalWindows.filterItemsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行で品目コード、又は品目名は入力したフィールドと一致すること。`);
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 7. 任意の検索結果を選択する。`);
    randomResult = await searchModalWindows.getOneResultItemAllColumns();
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await searchModalWindows.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 案件登録画面に戻り、選択した品目名が表示されること。`);
    const inputtedText = await addProjectPage.getResultsBaseItemTextfieldValue();
    await gondola.checkEqual(inputtedText, randomResultName, 'Item should be selected');
});

TestCase('BMS-54. 案件:案件作成:出来高明細:品目:モーダルウィンドウのクローズ', async () => {
    gondola.report(`Step 3. 「出来高明細」の「品目」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickResultsBaseItemTextfield();
    gondola.report(`VP. 品目検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search item modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    await addProjectPage.closeModalWindowByName(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE, false);
    await gondola.checkEqual(isModuleDisplayed, false, 'Search item modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickResultsBaseItemTextfield();
    await addProjectPage.clickOutsideOfWindowModal(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE, false);
    await gondola.checkEqual(isModuleDisplayed, false, 'Search item modal title should not be displayed');
});
