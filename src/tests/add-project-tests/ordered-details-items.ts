import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-setup';
import projectDetailsPage from '../../pages/project-details-page';
import { ProjectInfoData } from '../../models/project-info';
import { Constants } from '../../common/constants';
import searchModalWindows from '../../pages/search-modal-windows';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Project - Ordered details - Item fields validation');

const columnName = Constants.translator.tableColumnName.addProject.orderedDetails;
const SEARCH_ITEM_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.searchItemTitle;
Before(setup);

TestCase('BMS-274. BMS:案件:案件編集:非稼働明細:追加ボタン', async () => {
    gondola.report(`Step 7.1. 入力行を3つ追加し、非稼働明細行で有効な情報を入力する。`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    await projectDetailsPage.clickAddOrderedDetailsRowButton();

    gondola.report(`Step 7.2. 一行目には品目マスタで課税trueの品目を選択`);
    const record1 = ProjectInfoData.ORDERED_DETAILS_RECORD_1;
    record1.itemName = 'ゲームデバッグ';
    record1.taxable = undefined;
    await projectDetailsPage.enterOrderedDetailsRow(record1, '1');
    record1.taxable = true;

    gondola.report(`Step 7.3. 二行目には課税falseの品目を選択`);
    const record2 = ProjectInfoData.ORDERED_DETAILS_RECORD_2;
    record2.itemName = '立替金（旅費交通費）';
    record2.taxable = undefined;
    await projectDetailsPage.enterOrderedDetailsRow(record2, '2');
    record2.taxable = false;

    gondola.report(`Step 7.4. 三行目には標準販売単価のある品目を選択`);
    const record3 = ProjectInfoData.ORDERED_DETAILS_RECORD_3;
    record3.itemName = 'サンプル品目';
    record3.unitPrice = undefined;
    await projectDetailsPage.enterOrderedDetailsRow(record3, '3');
    record3.unitPrice = '99999999';

    gondola.report(`VP 1. 一行目：課税チェックボックス⇒true`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsDisplayCorrectly(record1, '1'),
        'First line should be displayed correctly',
    );
    gondola.report(`VP 2. 二行目：課税チェックボックス⇒false`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsDisplayCorrectly(record2, '2'),
        'Second line should be displayed correctly',
    );
    gondola.report(`VP 3. 三行目：単価⇒マスタの標準販売単価が転記`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsDisplayCorrectly(record3, '3'),
        'Third line should be displayed correctly',
    );

    gondola.report(`Step 8. 正常に保存`);
    await projectDetailsPage.saveNewProject();

    gondola.report(`VP. 一行目：課税チェックボックス⇒true`);
    await gondola.checkTrue(await projectDetailsPage.doesSavedMessageDisplay());
    await gondola.checkTrue(await projectDetailsPage.doesOrderedDetailsDisplayCorrectly(record1, '1'));
    await gondola.checkTrue(await projectDetailsPage.doesOrderedDetailsDisplayCorrectly(record2, '2'));
    await gondola.checkTrue(await projectDetailsPage.doesOrderedDetailsDisplayCorrectly(record3, '3'));
});

TestCase('BMS-280. BMS:案件:案件編集:非稼働明細:品目:未入力', async () => {
    gondola.report(`Step 7. 「追加」ボタンをクリック`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    gondola.report(`VP. 入力行が追加されること`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be displayed',
    );

    gondola.report(`Step 8. 「非稼働明細」の「品目」テキストボックスで何も入力せずに、「保存」ボタンをクリック`);
    await projectDetailsPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表`);
    await gondola.checkEqual(
        await projectDetailsPage.getInvalidFeedBackOrderedDetails(columnName.itemName),
        Constants.translator.invalidFeedback.fieldRequired,
        'Required error message should be displayed',
    );
});

TestCase('BMS-282. BMS:案件:案件編集:非稼働明細:品目:未入力', async () => {
    gondola.report(`Step 7. 「追加」ボタンをクリック`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    gondola.report(`VP. 入力行が追加されること`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be displayed',
    );

    gondola.report(`Step 8. 「取引先」テキストボックスの枠内をクリックする。`);
    await projectDetailsPage.clickOrderedDetailsItemName();
    gondola.report(`VP. 品目検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search Item modal title should be displayed');

    gondola.report(`Step 9. 品目のデータ表示を確認する。`);
    gondola.report(`VP. 品目マスタのものは表示されること。`);
    gondola.checkEqual(await projectDetailsPage.doesItemsDisplayCorrect(), true, 'Item should be displayed correctly');

    gondola.report(`Step 10. 検索条件欄には品目コード又は品目名の一部を入力する。`);
    let randomResult = await searchModalWindows.getOneResultItemAllColumns();
    gondola.report(`Step 11. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await searchModalWindows.filterItemsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行で品目コード、又は品目名は入力したフィールドと一致すること。`);
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 12. 任意の検索結果を選択する。`);
    randomResult = await searchModalWindows.getOneResultItemAllColumns();
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await searchModalWindows.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 案件登録画面に戻り、選択した品目名が表示されること。`);
    const inputtedText = await projectDetailsPage.getOrderedDetailsTextfield(columnName.itemName);
    await gondola.checkEqual(inputtedText, randomResultName, 'Item should be selected');
});

TestCase('BMS-284. BMS:案件:案件編集:非稼働明細:品目:モーダルウィンドウのクローズ', async () => {
    gondola.report(`Step 7. 「追加」ボタンをクリック`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    gondola.report(`VP. 入力行が追加されること`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be displayed',
    );
    gondola.report(`Step 8. 「出来高明細」の「品目」テキストボックスの枠内をクリックする。`);
    await projectDetailsPage.clickOrderedDetailsItemName();
    gondola.report(`VP. 品目検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search item modal title should be displayed');

    gondola.report(`Step 9. 「×」をクリックする。`);
    await projectDetailsPage.closeModalWindowByName(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE, false);
    await gondola.checkEqual(isModuleDisplayed, false, 'Search item modal title should not be displayed');

    gondola.report(`Step 10. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await projectDetailsPage.clickOrderedDetailsItemName();
    await projectDetailsPage.clickOutsideOfWindowModal(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE, false);
    await gondola.checkEqual(isModuleDisplayed, false, 'Search item modal title should not be displayed');
});
