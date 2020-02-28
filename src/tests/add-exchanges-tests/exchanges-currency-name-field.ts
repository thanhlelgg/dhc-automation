import { TestModule, TestCase, gondola } from 'gondolajs';
import preconditionSetup from './precodition-setup';
import addExchangePage from '../../pages/add-exchange-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

const EXCHANGE_CURRENCY_NAME_TEXTFIELD_LABEL = Constants.translator.fieldName.addExchange.currencyName;

TestModule('Add Exchanges - Exchange currency name field validation');

Before(preconditionSetup);

TestCase('BMS-357. マスタ:通貨作成:通貨名:文字数', async () => {
    gondola.report('Step 2. 「通貨名」で何も入力しなくて、「保存」ボタンをクリックする。');
    await addExchangePage.saveExchange();
    gondola.report('VP.入力フィールドの下にエラー「入力必須です」が表示されること。');
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_NAME_TEXTFIELD_LABEL),
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Field is required error message should be displayed',
    );
    gondola.report('Step 3. 「通貨名」で64文字を入力し、「保存」ボタンをクリックする。');
    const maximumNOC = 64;
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_NAME_TEXTFIELD_LABEL,
        Utilities.getRandomText(maximumNOC),
    );
    await addExchangePage.saveExchange();
    gondola.report('VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。');
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_NAME_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );
    gondola.report('Step 4. 「通貨名」で65文字以上を入力し、「保存」ボタンをクリックする。');
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_NAME_TEXTFIELD_LABEL,
        Utilities.getRandomText(maximumNOC + 1),
    );
    await addExchangePage.saveExchange();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_NAME_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});
