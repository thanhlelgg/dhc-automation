import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './setup-and-teardown';
import { ProjectInfoData } from '../../models/project-info';
import { ResultsBaseTextfield } from '../../models/enum-class/project-results-base-textfield';
import { Utilities } from '../../common/utilities';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('Add Project - Project Currency field validation');

const PROJECT_FORM_FIELD_NAME = Constants.translator.fieldName.projectForm;
const PROJECT_RESULT_BASE_DATA = ProjectInfoData.RESULT_BASE_ONE_RECORD;
const PROJECT_OVERVIEW_REQUIRED_ONLY = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;
const PROJECT_RESULT_BASE_EMPTY_RECORD = ProjectInfoData.RESULT_BASE_ONE_EMPTY_RECORD;
const SEARCH_ITEM_MODAL_WINDOW_TITLE = Constants.translator.modalWindows.searchItemTitle;

Before(setup);

TestCase('BMS-51. 案件:案件作成:出来高明細:請求用役職別のチェックボックス', async () => {
    gondola.report(`Step 2.「案件形態」で「出来高案件」を選択する。`);
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    gondola.report(`VP. 出来高明細欄が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.isProjectResultSectionDisplayed(),
        true,
        'Project result base section is displayed',
    );
    gondola.report(`Step 3. 請求用役職別のチェックボックスでチェックを行う。`);
    //we just do a random one
    const randomRoles = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRoles),
        true,
        'Billing details line for role should be displayed',
    );

    gondola.report(
        `Step 4. 該当する請求用役職の出来高明細行で任意の内容を入力し、チェックを入れたチェックボックスでチェックを外す。`,
    );
    PROJECT_RESULT_BASE_DATA[0].role = randomRoles;
    await addProjectPage.inputProjectResultBases(PROJECT_RESULT_BASE_DATA);
    await addProjectPage.uncheckResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRoles, false),
        false,
        'Billing details line for role should be displayed',
    );

    gondola.report(`Step 5. 上のチェックボックスで再度チェックを入れる。`);
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. ステップ4で入力された値も保持した状態で表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResultBasesDisplayCorrect(PROJECT_RESULT_BASE_DATA),
        true,
        'Project Result base should be displayed correctly',
    );

    gondola.report(`Step 6. 再度チェックを外し、「保存」ボタンをクリックし、再度チェックを入れる。`);
    await addProjectPage.uncheckResultBasesRoleCheckbox(randomRoles);
    await addProjectPage.inputProjectOverviewInfo(PROJECT_OVERVIEW_REQUIRED_ONLY);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 当該請求用役職のデータは入力途中であってもクリアされること。`);
    PROJECT_RESULT_BASE_EMPTY_RECORD[0].role = randomRoles;
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    await gondola.checkEqual(
        await addProjectPage.doesContentOfProjectResultBasesDisplayCorrect(PROJECT_RESULT_BASE_EMPTY_RECORD),
        true,
        'Project Result base should be displayed correctly',
    );
});

TestCase('BMS-52. 案件:案件作成:出来高明細:品目:未入力', async () => {
    gondola.report(
        `Step 2.「案件形態」で「出来高案件」を選択し、「出来高明細」の請求用役職別のチェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    const randomRoles = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRoles),
        true,
        'Billing details line for role should be displayed',
    );

    gondola.report(`Step 3. 出来高明細行の「品目」テキストボックスで何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRoles, ResultsBaseTextfield.ITEM_ID),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );
});

TestCase('BMS-53. 案件:案件作成:出来高明細:品目:品目の検索および結果表示', async () => {
    gondola.report(
        `Step 2. 「案件形態」で「出来高案件」を選択し、「出来高明細」の請求用役職別のチェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    const randomRoles = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRoles),
        true,
        'Billing details line for role should be displayed',
    );

    gondola.report(`Step 3. 出来高明細行の「品目」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickResultsBaseItemTextfield(randomRoles);
    gondola.report(`VP. 品目検索のモーダルウィンドウが起動すること。`);
    const isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search Item modal title should be displayed');

    gondola.report(`Step 4. 品目のデータ表示を確認する。`);
    gondola.report(`VP. 品目マスタのものは表示されること。`);
    gondola.checkEqual(await addProjectPage.doesItemsDisplayCorrect(), true, 'Item should be displayed correctly');

    gondola.report(`Step 5. 検索条件欄には品目コード又は品目名の一部を入力する。`);
    let randomResult = await addProjectPage.getOneResultItemAllColumns();
    gondola.report(`Step 6. 検索結果を確認する。`);
    const doesFilteringWorkCorrectly = await addProjectPage.filterItemsAndVerifyResult(randomResult, true);
    gondola.report(`VP. 1文字入力するごとにリアルタイムに検索(部分一致)できること。`);
    gondola.report(`VP. 各結果行で品目コード、又は品目名は入力したフィールドと一致すること。`);
    await gondola.checkEqual(doesFilteringWorkCorrectly, true, 'Filtering should be working correctly');

    gondola.report(`Step 7. 任意の検索結果を選択する。`);
    randomResult = await addProjectPage.getOneResultItemAllColumns();
    const randomResultName = Utilities.getMapValue(randomResult, SearchResultColumn.NAME.tabulatorField);
    await addProjectPage.selectSearchResult(randomResultName, SearchResultColumn.NAME);
    gondola.report(`VP. 案件登録画面に戻り、選択した品目名が表示されること。`);
    const inputtedText = await addProjectPage.getResultsBaseItemTextfieldValue(randomRoles);
    await gondola.checkEqual(inputtedText, randomResultName, 'Item should be selected');
});

TestCase('BMS-54. 案件:案件作成:出来高明細:品目:モーダルウィンドウのクローズ', async () => {
    gondola.report(
        `Step 2. 「案件形態」で「出来高案件」を選択し、「出来高明細」の請求用役職別のチェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    const randomRoles = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRoles),
        true,
        'Billing details line for role should be displayed',
    );
    gondola.report(`Step 3. 「出来高明細」の「品目」テキストボックスの枠内をクリックする。`);
    await addProjectPage.clickResultsBaseItemTextfield(randomRoles);
    gondola.report(`VP. 品目検索のモーダルウィンドウが起動すること。`);
    let isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    await gondola.checkEqual(isModuleDisplayed, true, 'Search item modal title should be displayed');

    gondola.report(`Step 3. 「×」をクリックする。`);
    addProjectPage.closeModalWindowByName(SEARCH_ITEM_MODAL_WINDOW_TITLE);
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_ITEM_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search item modal title should not be displayed');

    gondola.report(`Step 4. もう一回モーダルウィンドウを起動して、ウィンドウ外をクリックする。`);
    await addProjectPage.clickResultsBaseItemTextfield(randomRoles);
    await addProjectPage.clickOutsideOfWindowModal();
    gondola.report(`VP. モーダルウィンドウが非表示になること。`);
    isModuleDisplayed = await addProjectPage.doesModalTitleDisplay(
        SEARCH_ITEM_MODAL_WINDOW_TITLE,
        Constants.SHORT_TIMEOUT,
    );
    await gondola.checkEqual(isModuleDisplayed, false, 'Search item modal title should not be displayed');
});

TestCase('BMS-55. 案件:案件作成:取引通貨:選択肢', async () => {
    gondola.report(
        `Step 2. 「案件形態」で「出来高案件」を選択し、「出来高明細」の請求用役職別のチェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    const randomRoles = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRoles),
        true,
        'Billing details line for role should be displayed',
    );

    gondola.report(`Step 3. 出来高明細行で「計上区分」プルダウンで選択肢を確認する。`);
    const debitCreditGroupIds = Object.values(Constants.debitCreditGroupIds);
    gondola.report(`VP.「計上区分」は必須項目であり`);
    await addProjectPage.doesResultsBaseColumnRequired(Constants.translator.resultBases.columnName.debitCredit);

    gondola.report(
        `VP.「計上区分」プルダウンには選択肢が五つあり、「売掛」、「前受」、「立替(消耗品)」、「立替(旅費交通費)」と「立替(システム関係費)」を含んでいること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.doesDebitCreditsOptionsExist(randomRoles, debitCreditGroupIds),
        true,
        'Debit credit options should be displayed correctly',
    );
});

TestCase('BMS-56. 案件:案件作成:出来高明細:予定人数:入力可能', async () => {
    gondola.report(
        `Step 2. 「案件形態」で「出来高案件」を選択し、「出来高明細」の請求用役職別のチェックボックスでチェックを行う。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_FORM_FIELD_NAME, Constants.projectForms.result);
    const randomRoles = await addProjectPage.getRandomRoleLabel();
    await addProjectPage.checkResultBasesRoleCheckbox(randomRoles);
    gondola.report(`VP. 該当する請求用役職の出来高明細行が表示され、明細の入力ができる状態になること。`);
    await gondola.checkEqual(
        await addProjectPage.doesRoleBillingDetailsLineDisplay(randomRoles),
        true,
        'Billing details line for role should be displayed',
    );

    gondola.report(`Step 3. 出来高明細行で「予定人数」で文字列を入力する。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRoles,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.onlyWord,
    );
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfield(randomRoles, ResultsBaseTextfield.PLAN_PEOPLE),
        '',
        'Character should not be allowed for this field',
    );

    gondola.report(`Step 4. 出来高明細行の「予定人数」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(randomRoles, ResultsBaseTextfield.PLAN_PEOPLE, '');
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 文字列を入力しても自動的に削除されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRoles, ResultsBaseTextfield.PLAN_PEOPLE),
        Constants.translator.invalidFeedback.fieldRequired,
        'Field is required message should be displayed',
    );

    gondola.report(`Step 5. 出来高明細行の「予定人数」で負の数を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRoles,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.negativeNumber,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRoles, ResultsBaseTextfield.PLAN_PEOPLE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(`Step 6. 出来高明細行の「予定人数」で10億以上の数値を入力し、「保存」ボタンをクリックする。`);
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRoles,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.oneBillion,
    );
    await addProjectPage.saveNewProject();
    gondola.report(`VP. 入力フィールドの下にエラー「入力値が不正です」が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.getInvalidFeedBackProjectResultsBase(randomRoles, ResultsBaseTextfield.PLAN_PEOPLE),
        Constants.translator.invalidFeedback.invalidInputValue,
        'Invalid input value message should be displayed',
    );

    gondola.report(
        `Step 7. 出来高明細行の「予定人数」で小数値を入力し、「保存」ボタンをクリックする。（例：1.5を入力）`,
    );
    await addProjectPage.enterProjectResultBaseTextfield(
        randomRoles,
        ResultsBaseTextfield.PLAN_PEOPLE,
        Constants.decimal,
    );
    await addProjectPage.saveNewProject();
    gondola.report(
        `VP. 入力フィールドの下にエラー「有効な値を入力してください。有効な値として最も近いのは〇と〇です」のアラートが表示されること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.getProjectResultBaseTextfieldValidationMessage(
            randomRoles,
            ResultsBaseTextfield.PLAN_PEOPLE,
        ),
        Constants.validationMessageForDecimal,
        'Invalid input value message should be displayed',
    );
    gondola.report(
        `Step 8. 「予定人数」の入力欄にカーソルを合わせる。- SKIPPED: we can't interact with the arrow button since it's from HTML`,
    );
    gondola.report(
        `Step 9. 他のフィールドにカーソルを移動するs - SKIPPED: we can't interact with the arrow button since it's from HTML`,
    );
});
