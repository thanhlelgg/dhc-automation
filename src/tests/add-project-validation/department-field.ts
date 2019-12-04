import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './setup-and-teardown';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import { Utilities } from '../../common/utilities';

TestModule('Add Project - Department field validation');

const DEPARTMENT_FIELD_NAME = Constants.translator.fieldName.department;
const SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.departmentSearchTitle;

Before(setup);

TestCase('BMS-6. 案件:案件作成:部門:未入力', async () => {
    gondola.report(`Step 2. 部門を入力しなくて、保存する`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    const actualFeedback = await addProjectPage.getInvalidFeedBack(DEPARTMENT_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-7. 案件:案件作成:部門:部門の検索および結果表示', async () => {
    gondola.report(`Step 2. 「部門」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(DEPARTMENT_FIELD_NAME);
    gondola.report(`VP. 部門検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search customer modal title should be displayed');
    gondola.report(`Step 3. 部門のデータ表示を確認する。`);
    gondola.report(`VP. 部門マスタで有効としたものは表示されること。`);
    gondola.checkEqual(
        await addProjectPage.doesDepartmentsDisplayCorrect(),
        true,
        'Department should be displayed correctly',
    );

    gondola.report(`Step 4. 検索条件欄にはコード又は部門名の一部を入力する。`);
    const randomResult = await addProjectPage.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await addProjectPage.filterDepartmentsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、または部門名は入力したフィールドと一致すること。`);
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 6. 任意の検索結果を選択する。`);
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await addProjectPage.selectSearchResult(randomResultName);
    gondola.report(`VP. 案件登録画面に戻り、選択した部門名が表示されること。`);
    const inputtedText = await addProjectPage.getTextFieldValueByLabel(DEPARTMENT_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Department should be selected');
});

TestCase('BMS-8. 案件:案件作成:取引先:モーダルウィンドウのクローズ ', async () => {
    gondola.report(`Step 2. 「部門」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(DEPARTMENT_FIELD_NAME);
    gondola.report(`VP. 部門検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search departments modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    addProjectPage.closeModalWindowByName(SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search Departments modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(DEPARTMENT_FIELD_NAME);
    await addProjectPage.clickOutsideOfWindowModal();
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_DEPARTMENT_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search Departments modal title should not be displayed');
});
