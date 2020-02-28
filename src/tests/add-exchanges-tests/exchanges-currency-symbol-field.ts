import { TestModule, TestCase, gondola } from 'gondolajs';
import preconditionSetup from './precodition-setup';
import addExchangePage from '../../pages/add-exchange-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

const EXCHANGE_CURRENCY_SYMBOL_TEXTFIELD_LABEL = Constants.translator.fieldName.addExchange.currencyName;

TestModule('Add exchange page - Exchange currency symbol field validation');

Before(preconditionSetup);

TestCase('BMS-360. マスタ:通貨作成:通貨記号:文字数', async () => {
    gondola.report('Step 2. 「通貨記号」で何も入力しなく、「保存」ボタンをクリックする。');
    await addExchangePage.saveExchange();
    gondola.report('VP. 入力したフィールドの下にエラー「入力必須です」が表示されないこと。');
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_SYMBOL_TEXTFIELD_LABEL),
        '',
        'Field is required error message should be displayed',
    );
    gondola.report('Step 3. 「通貨記号」で8桁の数値を入力し、「保存」ボタンをクリックする。');
    const maximumNOD = 8;
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_SYMBOL_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD),
    );
    await addExchangePage.saveExchange();
    gondola.report('VP. 入力したフィールドの下にエラー「8文字以内で入力してください」が表示されないこと。');
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_SYMBOL_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );
    gondola.report('Step 4. 「通貨記号」で9桁以上の数値を入力し、「保存」ボタンをクリックする。');
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_SYMBOL_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD + 1),
    );
    await addExchangePage.saveExchange();
    gondola.report('VP. 入力したフィールドの下にエラー「8文字以内で入力してください」が表示されること。');
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_SYMBOL_TEXTFIELD_LABEL),
        maximumNOD + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});
