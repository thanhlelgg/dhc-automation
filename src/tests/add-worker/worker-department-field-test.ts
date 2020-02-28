import { gondola, TestCase, TestModule } from 'gondolajs';
import addWorkerPage from '../../pages/add-worker-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import searchModalWindows from '../../pages/search-modal-windows';
import setup from './add-worker-setup';

TestModule('Add Worker - Department field validation');

const WORKER_DEPARTMENT_FIELD_NAME = Constants.translator.fieldName.addWorker.department;
const SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE = Constants.translator.fieldName.addWorker.searchDepartmentModalTitle;

Before(setup);

TestCase('BMS-104. BMS:案件:従業員マスタ作成:所属部門:所属部門の検索および結果表示', async () => {
    gondola.report(`Step 2. 「所属部門」テキストボックスの枠内をクリックする。`);
    await addWorkerPage.clickTextFieldByLabel(WORKER_DEPARTMENT_FIELD_NAME);
    gondola.report(`VP. 所属部門検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    await gondola.checkTrue(isModuleDisplayed, 'Search department modal title should be displayed');
    gondola.report(`Step 3. 所属部門のデータ表示を確認する。`);
    gondola.report(`VP. 部門マスタで有効としたものは表示されること。`);
    gondola.checkTrue(
        await searchModalWindows.doesDepartmentsDisplayCorrect(),
        'Department should be displayed correctly',
    );

    gondola.report(`Step 4. 検索条件欄にはコード又は部門名の一部を入力する。`);
    const randomResult = await searchModalWindows.getOneResultItemAllColumns();
    gondola.report('Random department: ' + randomResult);
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await searchModalWindows.filterDepartmentsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、または部門名は入力したフィールドと一致すること。`);
    await gondola.checkTrue(doesFilteringWorkCorrectly, 'Filtering should be working correctly');

    gondola.report(`Step 6. 任意の検索結果を選択する。`);
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    gondola.report('Random department name: ' + randomResultName);
    await searchModalWindows.selectSearchResult(randomResultName);
    gondola.report(`VP. 従業員登録画面に戻り、選択した部門名が表示されること。`);
    const inputtedText = await addWorkerPage.getTextFieldValueByLabel(WORKER_DEPARTMENT_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Worker should be selected');
});

TestCase('BMS-105. BMS:案件:従業員マスタ作成:所属部門:モーダルウィンドウのクローズ', async () => {
    gondola.report(`Step 2. 「所属部門」テキストボックスの枠内をクリックする。`);
    await addWorkerPage.clickTextFieldByLabel(WORKER_DEPARTMENT_FIELD_NAME);
    gondola.report(`VP. 部門検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    await gondola.checkTrue(isModuleDisplayed, 'Search departments modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    await searchModalWindows.closeModalWindowByName(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE, false);
    await gondola.checkFalse(isModuleDisplayed, 'Search Departments modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addWorkerPage.clickTextFieldByLabel(WORKER_DEPARTMENT_FIELD_NAME);
    await searchModalWindows.clickOutsideOfWindowModal(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await searchModalWindows.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE, false);
    await gondola.checkFalse(isModuleDisplayed, 'Search Departments modal title should not be displayed');
});
