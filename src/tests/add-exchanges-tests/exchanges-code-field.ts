import { TestModule, TestCase, gondola } from 'gondolajs';
import setup from './add-exchanges-setup';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import addExchangePage from '../../pages/add-exchange-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import listExchangePage from '../../pages/list-exchange-page';

const EXCHANGE_CODE_TEXTFIELD_LABEL = Constants.translator.fieldName.addExchange.code;
const EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL = Constants.translator.fieldName.addExchange.currencyUnit;
const INVALID_CUSTOMER_CODE_ERROR_MESSAGE = Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;

TestModule('Add Exchanges - Exchange code field validation');

Before(setup);

TestCase('BMS-353. マスタ:通貨作成:コード(略称) :文字数', async () => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「為替」の「通貨登録」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    gondola.report('VP. 新規通貨作成の画面に移動すること。');
    await gondola.checkTrue(await addExchangePage.isCurrentPage(), 'Should be navigated to add exchange page');
    gondola.report('Step 2. 「コード(略称)」で何も入力しなくて、「保存」ボタンをクリックする。');
    await addExchangePage.saveExchange();
    gondola.report('VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。');
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Field is required error message should be displayed',
    );
    gondola.report('Step 3. 「コード(略称)」で16文字を入力し、「保存」ボタンをクリックする。');
    const maximumNOC = 16;
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addExchangePage.saveExchange();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );
    gondola.report(`Step 4.「コード(略称)」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC + 1));
    await addExchangePage.saveExchange();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});

TestCase('BMS-356. BMS:マスタ:通貨作成:コード(略称):重複時', async () => {
    gondola.report('Precondition 2. コードが「1111」である通貨は既に存在しました。');
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    const code = Constants.CODE_NUMBER;
    const maximumNOD = 8;
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CODE_TEXTFIELD_LABEL, code);
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD),
    );
    addExchangePage.saveExchange();
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「為替」の「通貨登録」をクリックします。',
    );
    await listExchangePage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    gondola.report('VP. 新規通貨作成の画面に移動すること。');
    await gondola.checkTrue(await addExchangePage.isCurrentPage(), 'Should be navigated to add exchange page');
    gondola.report('Step 2. 「コード(略称)」で重複しているコードを入力し、「保存」ボタンをクリックする。');
    addExchangePage.enterTextFieldByLabel(EXCHANGE_CODE_TEXTFIELD_LABEL, code);
    await addExchangePage.saveExchange();
    gondola.report(
        'VP.入力フィールドの下にエラー「既に使われている値のため異なる値を入力してください」が表示されること。',
    );
    //BUG: invalid feedback displays wrong
    //Expected result: 「既に使われている値のため異なる値を入力してください」
    //Actual result: 「入力値が不正です」
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        Constants.DUPLICATED_TYPE_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});

TestCase('BMS-355. BMS:マスタ:通貨作成:コード(略称):文字種', async () => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「為替」の「通貨登録」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    gondola.report('VP. 新規通貨作成の画面に移動すること。');
    await gondola.checkTrue(await addExchangePage.isCurrentPage(), 'Should be navigated to add exchange page');
    gondola.report(`Step 2. 「コード(略称)」で全角英数字を入力し、「保存」ボタンをクリックする。`);
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CODE_TEXTFIELD_LABEL,
        Constants.FULL_SIZE_ALPHA_NUMERIC_STRING,
    );
    await addExchangePage.saveExchange();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        INVALID_CUSTOMER_CODE_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
    gondola.report(`Step 3. 「コード(略称)」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CODE_TEXTFIELD_LABEL, Constants.HIRAGANA_KATAKANA_STRING);
    await addExchangePage.saveExchange();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        INVALID_CUSTOMER_CODE_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
    gondola.report(`Step 4. 「コード(略称)」で記号を入力し、「保存」ボタンをクリックする。`);
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CODE_TEXTFIELD_LABEL, Constants.SYMBOL_STRING);
    await addExchangePage.saveExchange();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        INVALID_CUSTOMER_CODE_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
    gondola.report(`Step 5. 「コード(略称)」で半角英数字を入力し、「保存」ボタンをクリックする。`);
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CODE_TEXTFIELD_LABEL,
        Constants.HALF_SIZE_ALPHA_NUMERIC_STRING,
    );
    await addExchangePage.saveExchange();
    gondola.report(`VP. 「「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CODE_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );
});
