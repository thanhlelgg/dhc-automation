import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './setup-and-teardown';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Project - Worker field validation');

const WORKER_FIELD_NAME = Constants.translator.fieldName.worker;
const SEARCH_WORKER_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.workerSearchTitle;

Before(setup);

TestCase('BMS-9. 案件:案件作成:担当者:未入力', async () => {
    gondola.report(`Step 2. 「担当者」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    const actualFeedback = await addProjectPage.getInvalidFeedBack(WORKER_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback message should be correct',
    );
});

TestCase('BMS-10. 案件:案件作成:担当者:モーダルウィンドウのクローズ', async () => {
    gondola.report(`Step 2. 「担当者」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(WORKER_FIELD_NAME);
    gondola.report(`VP. 担当者検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_WORKER_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search worker modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    addProjectPage.closeModalWindowByName(SEARCH_WORKER_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_WORKER_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search worker modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(WORKER_FIELD_NAME);
    await addProjectPage.clickOutsideOfWindowModal();
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_WORKER_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search worker modal title should not be displayed');
});

TestCase('BMS-11. 案件:案件作成:担当者:担当者の検索および結果表示', async () => {
    gondola.report(`Step 2. 「担当者」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickTextFieldByLabel(WORKER_FIELD_NAME);
    gondola.report(`VP. 担当者検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_WORKER_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search Worker modal title should be displayed');
    gondola.report(`Step 3. 担当者のデータ表示を確認する。`);
    gondola.report(`VP. 従業員マスタで有効としたものは表示されること。`);
    gondola.checkEqual(await addProjectPage.doesWorkersDisplayCorrect(), true, 'Worker should be displayed correctly');

    gondola.report(`Step 4. 検索条件欄にはコード又は従業員名の一部を入力する。`);
    const randomResult = await addProjectPage.getOneResultItemAllColumns();
    gondola.report(`Step 5. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await addProjectPage.filterWorkersAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行でコード、または従業員名は入力したフィールドと一致すること。`);
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 6. 任意の検索結果を選択する。`);
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await addProjectPage.selectSearchResult(randomResultName);
    gondola.report(`VP. 案件登録画面に戻り、選択した従業員名が表示されること。`);
    const inputtedText = await addProjectPage.getTextFieldValueByLabel(WORKER_FIELD_NAME);
    await gondola.checkEqual(inputtedText, randomResultName, 'Worker should be selected');
});
