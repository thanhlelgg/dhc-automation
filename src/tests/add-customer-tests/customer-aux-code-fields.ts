import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Customer Aux code fields validation');

const ADVANCE_RECEIVED_AUX_CODE = Constants.translator.fieldName.addCustomer.advanceReceivedAuxCode;
const ACCOUNT_RECEIVABLE_AUX_CODE = Constants.translator.fieldName.addCustomer.accountReceivableAuxCode;
const SALES_AUX_CODE = Constants.translator.fieldName.addCustomer.salesAuxCode;
const VALID_NOC_AUX_CODE = 20;

Before(setup);

TestCase('BMS-95. 案件:得意先マスタ作成:顧客情報:前受金補助コード :入力確認', async () => {
    gondola.report(`Step 2. 「前受金補助コード 」で20文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_AUX_CODE);
    await addCustomerPage.enterTextFieldByLabel(ADVANCE_RECEIVED_AUX_CODE, maximumCharactersName);
    gondola.report(`VP. 20文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ADVANCE_RECEIVED_AUX_CODE),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「前受金補助コード 」で21文字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ADVANCE_RECEIVED_AUX_CODE, maximumCharactersName + 'a');
    gondola.report(`VP. 21目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ADVANCE_RECEIVED_AUX_CODE),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );

    gondola.report(`Step 4. 「前受金補助コード 」で全角英数字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ADVANCE_RECEIVED_AUX_CODE, Constants.FULL_SIZE_ALPHA_NUMERIC_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ADVANCE_RECEIVED_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 5. 「前受金補助コード 」でひらがな・カタカナ字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ADVANCE_RECEIVED_AUX_CODE, Constants.HIRAGANA_KATAKANA_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ADVANCE_RECEIVED_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 6. 「前受金補助コード 」で記号を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ADVANCE_RECEIVED_AUX_CODE, Constants.SYMBOL_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ADVANCE_RECEIVED_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 7. 「前受金補助コード 」で半角英字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ADVANCE_RECEIVED_AUX_CODE, Constants.SINGE_BYTE_ALPHABET_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ADVANCE_RECEIVED_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 8. 「前受金補助コード 」で半角数字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ADVANCE_RECEIVED_AUX_CODE, Constants.SINGLE_BYTE_NUMBER_STRING);
    gondola.report(`VP. 入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ADVANCE_RECEIVED_AUX_CODE),
        Constants.SINGLE_BYTE_NUMBER_STRING,
        'Should be able to enter the valid text',
    );
});

TestCase('BMS-96. 案件:得意先マスタ作成:顧客情報:売掛金補助コード:入力確認', async () => {
    gondola.report(`Step 2. 「売掛金補助コード」で20文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_AUX_CODE);
    await addCustomerPage.enterTextFieldByLabel(ACCOUNT_RECEIVABLE_AUX_CODE, maximumCharactersName);
    gondola.report(`VP. 20文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ACCOUNT_RECEIVABLE_AUX_CODE),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「売掛金補助コード」で21文字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ACCOUNT_RECEIVABLE_AUX_CODE, maximumCharactersName + 'a');
    gondola.report(`VP. 21目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ACCOUNT_RECEIVABLE_AUX_CODE),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );

    gondola.report(`Step 4. 「売掛金補助コード」で全角英数字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ACCOUNT_RECEIVABLE_AUX_CODE, Constants.FULL_SIZE_ALPHA_NUMERIC_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ACCOUNT_RECEIVABLE_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 5. 「売掛金補助コード」でひらがな・カタカナ字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ACCOUNT_RECEIVABLE_AUX_CODE, Constants.HIRAGANA_KATAKANA_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ACCOUNT_RECEIVABLE_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 6. 「売掛金補助コード」で記号を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ACCOUNT_RECEIVABLE_AUX_CODE, Constants.SYMBOL_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ACCOUNT_RECEIVABLE_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 7. 「売掛金補助コード」で半角英字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ACCOUNT_RECEIVABLE_AUX_CODE, Constants.SINGE_BYTE_ALPHABET_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ACCOUNT_RECEIVABLE_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 8. 「売掛金補助コード」で半角数字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(ACCOUNT_RECEIVABLE_AUX_CODE, Constants.SINGLE_BYTE_NUMBER_STRING);
    gondola.report(`VP. 入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(ACCOUNT_RECEIVABLE_AUX_CODE),
        Constants.SINGLE_BYTE_NUMBER_STRING,
        'Should be able to enter the valid text',
    );
});

TestCase('BMS-97. 案件:得意先マスタ作成:顧客情報:売上金補助コード:入力確認', async () => {
    gondola.report(`Step 2. 「売上金補助コード」で20文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_AUX_CODE);
    await addCustomerPage.enterTextFieldByLabel(SALES_AUX_CODE, maximumCharactersName);
    gondola.report(`VP. 20文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(SALES_AUX_CODE),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「売上金補助コード」で21文字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(SALES_AUX_CODE, maximumCharactersName + 'a');
    gondola.report(`VP. 21目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(SALES_AUX_CODE),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );

    gondola.report(`Step 4. 「売上金補助コード」で全角英数字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(SALES_AUX_CODE, Constants.FULL_SIZE_ALPHA_NUMERIC_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(SALES_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 5. 「売上金補助コード」でひらがな・カタカナ字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(SALES_AUX_CODE, Constants.HIRAGANA_KATAKANA_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(SALES_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 6. 「売上金補助コード」で記号を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(SALES_AUX_CODE, Constants.SYMBOL_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(SALES_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 7. 「売上金補助コード」で半角英字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(SALES_AUX_CODE, Constants.SINGE_BYTE_ALPHABET_STRING);
    gondola.report(`VP. 入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(SALES_AUX_CODE),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 8. 「売上金補助コード」で半角数字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(SALES_AUX_CODE, Constants.SINGLE_BYTE_NUMBER_STRING);
    gondola.report(`VP. 入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(SALES_AUX_CODE),
        Constants.SINGLE_BYTE_NUMBER_STRING,
        'Should be able to enter the valid text',
    );
});
