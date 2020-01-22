import { TestModule, TestCase, gondola } from 'gondolajs';
import preconditonSetup from './precodition-setup';
import addExchangePage from '../../pages/add-exchange-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

const EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL = Constants.translator.fieldName.addExchange.currencyUnit;

TestModule('Add Exchanges - Exchanges currency unit validation');

Before(preconditonSetup);

TestCase('BMS-358. マスタ:通貨作成:通貨単位:桁数', async () => {
    gondola.report('Step 2. 「通貨単位」で何も入力しなく、「保存」ボタンをクリックする。');
    await addExchangePage.saveExchange();
    gondola.report('VP. 入力したフィールドの下にエラー「このフィールドは入力必須です」が表示されること。');
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Field is required error message should be displayed',
    );
    gondola.report('Step 3. 「通貨単位」で8桁の数値を入力し、「保存」ボタンをクリックする。');
    const maximumNOD = 8;
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD),
    );
    await addExchangePage.saveExchange();
    gondola.report(`VP. 入力したフィールドの下にエラー「8桁以内の数値を入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );
    gondola.report(`Step 4. 「通貨単位」で9桁以上の数値を入力し、「保存」ボタンをクリックする。`);
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL,
        Utilities.getRandomNumberByLength(maximumNOD + 1),
    );
    await addExchangePage.saveExchange();
    gondola.report(`VP. 入力したフィールドの下にエラー「8桁以内の数値を入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        maximumNOD + Constants.EXCEEDED_NOD_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});

TestCase('BMS-359. マスタ:通貨作成:通貨単位:文字種', async () => {
    gondola.report('Step 2. 「通貨単位」で半角数値のみを入力する。');
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL, Constants.HALF_SIZE_NUMBER);
    gondola.report('VP. 入力できること。');
    await gondola.checkEqual(
        await addExchangePage.getTextFieldValueByLabel(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        Constants.HALF_SIZE_NUMBER,
        'Should be able to enter the valid text',
    );
    gondola.report('Step 3. 「通貨単位」で半角数値以外を入力する。');
    await addExchangePage.enterTextFieldByLabel(
        EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL,
        Constants.NON_HALF_SIZE_NUMBER_STRING,
    );
    gondola.report('VP. 入力できないこと。「-」「+」「.」を入力できる。');
    await gondola.checkEqual(
        await addExchangePage.getTextFieldValueByLabel(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        '',
        'Should not be able to enter the invalid text',
    );
    gondola.report('Step 4. 「通貨単位」で0未満の数値を入力し、「保存」ボタンをクリックする。');
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL, Constants.NEGATIVE_NUMBER);
    await addExchangePage.saveExchange();
    gondola.report('VP. エラー「0以上の数値を入力してください」が表示されること。');
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getTextFieldValidationMessageByLabel(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.negativeNumberError,
        'Invalid feedback should be displayed correctly',
    );
    gondola.report('Step 5. 「通貨単位」で小数を入力し、「保存」ボタンをクリックする');
    await addExchangePage.enterTextFieldByLabel(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL, Constants.DECIMAL);
    await addExchangePage.saveExchange();
    gondola.report('VP. エラー「整数で入力してください」が表示されること。');
    await gondola.checkEqual(
        await addExchangePage.getTextFieldValidationMessageByLabel(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        Constants.translator.invalidFeedback.inputDecimalTypeError,
        'Invalid feedback should be displayed correctly',
    );
    gondola.report('Step 6. 「通貨単位」で「---」「+++」「....」を入力し、「保存」ボタンをクリックする。');
    gondola.report('VP. エラー「半角数値で入力してください」が表示されること。');
    await gondola.checkTrue(
        await addExchangePage.doesNumberFieldByLabelValidationWorkingCorrectly(EXCHANGE_CURRENCY_UNIT_TEXTFIELD_LABEL),
        'Invalid feedback message should be correct',
    );
});
