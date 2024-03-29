import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Customer contact fields validation');

const ZIPCODE_TEXTFIELD_PLACEHOLDER = Constants.translator.fieldPlaceHolder.addCustomer.zipcode;
const ADDRESS1_TEXTFIELD_PLACEHOLDER = Constants.translator.fieldPlaceHolder.addCustomer.address1;
const ADDRESS2_TEXTFIELD_PLACEHOLDER = Constants.translator.fieldPlaceHolder.addCustomer.address2;
const TEL_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.tel;
const FAX_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.fax;
const VALID_NOC_ZIPCODE = 10;
const VALID_NOC_ADDRESS = 100;
const VALID_NOC_CONTACT_NUMBER = 30;
const INVALID_CONTACT_NUMBERS_ERROR_MESSAGE = Constants.translator.invalidFeedback.invalidContactNumber;

Before(setup);

TestCase('BMS-85. 案件:得意先マスタ作成:顧客情報:住所(郵便番号):入力確認', async () => {
    gondola.report(`Step 2. 「住所(郵便番号)」で10文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_ZIPCODE);
    await addCustomerPage.enterTextfieldByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER, maximumCharactersName);
    gondola.report(`VP. 10文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「住所(郵便番号)」で11文字を入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER, maximumCharactersName + 'a');
    gondola.report(`VP. 11目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );

    gondola.report(`Step 4. 「住所(郵便番号)」で半角英字を入力する。（例：「abcd」を入力）`);
    await addCustomerPage.enterTextfieldByPlaceholder(
        ZIPCODE_TEXTFIELD_PLACEHOLDER,
        Constants.SINGE_BYTE_ALPHABET_STRING,
    );
    gondola.report(`VP. 半角英字を入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 5. 「住所(郵便番号)」で全角英数字を入力する。（例：「ａｂｃｄ１２３４」を入力）`);
    await addCustomerPage.enterTextfieldByPlaceholder(
        ZIPCODE_TEXTFIELD_PLACEHOLDER,
        Constants.SINGE_BYTE_ALPHABET_STRING,
    );
    gondola.report(`VP. 全角英数字を入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 6. 「住所(郵便番号)」でひらがな・カタカナ字を入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(
        ZIPCODE_TEXTFIELD_PLACEHOLDER,
        Constants.HIRAGANA_KATAKANA_STRING,
    );
    gondola.report(`VP. ひらがな・カタカナ字を入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 7. 「住所(郵便番号)」でハイフン以外の記号を入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER, Constants.SYMBOL_STRING);
    gondola.report(`VP. ハイフン以外の記号を入力できないこと。`);
    //BUG: till can enter invalid value
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER),
        '',
        'Should not be able to enter the invalid text',
    );

    gondola.report(`Step 8. 「住所(郵便番号)」で半角数値とハイフンを入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(
        ZIPCODE_TEXTFIELD_PLACEHOLDER,
        Constants.HALF_SIZE_NUMBER_AND_HYPHEN,
    );
    gondola.report(`VP. 半角数値とハイフンを入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ZIPCODE_TEXTFIELD_PLACEHOLDER),
        Constants.HALF_SIZE_NUMBER_AND_HYPHEN,
        'Should be able to enter the valid text',
    );
});

TestCase('BMS-86. 案件:得意先マスタ作成:顧客情報:住所(住所1):文字数', async () => {
    gondola.report(`Step 2. 「住所(住所1)」で100文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_ADDRESS);
    await addCustomerPage.enterTextfieldByPlaceholder(ADDRESS1_TEXTFIELD_PLACEHOLDER, maximumCharactersName);
    gondola.report(`VP. 100文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ADDRESS1_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「住所(住所1)」で101文字を入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(ADDRESS1_TEXTFIELD_PLACEHOLDER, maximumCharactersName + 'a');
    gondola.report(`VP. 101目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ADDRESS1_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );
});

TestCase('BMS-87. 案件:得意先マスタ作成:顧客情報:住所(住所2):文字数', async () => {
    gondola.report(`Step 2. 「住所(住所2)」で100文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_ADDRESS);
    await addCustomerPage.enterTextfieldByPlaceholder(ADDRESS2_TEXTFIELD_PLACEHOLDER, maximumCharactersName);
    gondola.report(`VP. 100文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ADDRESS2_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「住所(住所2)」で101文字を入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(ADDRESS2_TEXTFIELD_PLACEHOLDER, maximumCharactersName + 'a');
    gondola.report(`VP. 101目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(ADDRESS2_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );
});

TestCase('BMS-88. 案件:得意先マスタ作成:顧客情報:TEL:入力確認', async () => {
    gondola.report(`Step 2. 「TEL」で30文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_CONTACT_NUMBER);
    await addCustomerPage.enterTextFieldByLabel(TEL_TEXTFIELD_LABEL, maximumCharactersName);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 30文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(TEL_TEXTFIELD_LABEL),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「TEL」で31文字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(TEL_TEXTFIELD_LABEL, maximumCharactersName + 'a');
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 31目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(TEL_TEXTFIELD_LABEL),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );

    gondola.report(`Step 4. 「TEL」で半角英字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(TEL_TEXTFIELD_LABEL, Constants.SINGE_BYTE_ALPHABET_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(TEL_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 5. 「TEL」で全角英数字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(TEL_TEXTFIELD_LABEL, Constants.FULL_SIZE_ALPHA_NUMERIC_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(TEL_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 6. 「TEL」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(TEL_TEXTFIELD_LABEL, Constants.HIRAGANA_KATAKANA_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(TEL_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 7. 「TEL」で「+」「-」以外の記号を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(TEL_TEXTFIELD_LABEL, Constants.SYMBOL_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(TEL_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 8. 「TEL」で半角数値と「+」「-」を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(TEL_TEXTFIELD_LABEL, Constants.VALID_CONTACT_NUMBER);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(TEL_TEXTFIELD_LABEL),
        '',
        'Invalid contact numbers feedback should not be displayed',
    );
});

TestCase('BMS-89. 案件:得意先マスタ作成:顧客情報:FAX:入力確認', async () => {
    gondola.report(`Step 2. 「FAX」で30文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_CONTACT_NUMBER);
    await addCustomerPage.enterTextFieldByLabel(FAX_TEXTFIELD_LABEL, maximumCharactersName);
    gondola.report(`VP. 30文字まで入力できること。`);
    //BUG: currently only 15 characters are received.
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(FAX_TEXTFIELD_LABEL),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「FAX」で31文字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(FAX_TEXTFIELD_LABEL, maximumCharactersName + 'a');
    gondola.report(`VP. 31目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(FAX_TEXTFIELD_LABEL),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );

    gondola.report(`Step 4. 「FAX」で半角英字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(FAX_TEXTFIELD_LABEL, Constants.SINGE_BYTE_ALPHABET_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(FAX_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 5. 「FAX」で全角英数字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(FAX_TEXTFIELD_LABEL, Constants.SINGE_BYTE_ALPHABET_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(FAX_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 6. 「FAX」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(FAX_TEXTFIELD_LABEL, Constants.HIRAGANA_KATAKANA_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(FAX_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 7. 「FAX」で「+」「-」以外の記号を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(FAX_TEXTFIELD_LABEL, Constants.SYMBOL_STRING);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: no invalid feedback were present
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(FAX_TEXTFIELD_LABEL),
        INVALID_CONTACT_NUMBERS_ERROR_MESSAGE,
        'Invalid contact numbers feedback should be displayed',
    );

    gondola.report(`Step 8. 「FAX」で半角数値と「+」「-」を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(FAX_TEXTFIELD_LABEL, Constants.VALID_CONTACT_NUMBER);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「電話(FAX)番号形式で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(FAX_TEXTFIELD_LABEL),
        '',
        'Invalid contact numbers feedback should not be displayed',
    );
});
