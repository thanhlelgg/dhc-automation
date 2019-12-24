import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { Utilities } from '../../common/utilities';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Add Customer - Customer code field validation');

const CUSTOMER_CODE_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.code;
const INVALID_CUSTOMER_CODE_ERROR_MESSAGE = Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;
const ALREADY_IN_USE_ERROR_MESSAGE = Constants.translator.invalidFeedback.alreadyInUse;
Before(setup);

TestCase('BMS-81. 案件:得意先マスタ作成:顧客情報:取引先コード :文字数', async () => {
    gondola.report(`Step 2. 「取引先コード」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        Constants.fieldRequiredErrorMessage,
        'Invalid feedback should be displayed correctly',
    );

    gondola.report(`Step 3. 「取引先コード」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(17));
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        Constants.exceededNOCErrorMessage16,
        'Invalid feedback should be displayed correctly',
    );

    gondola.report(`Step 4. 「取引先コード」で16文字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(16));
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        '',
        'Default option should be displayed correctly',
    );
});

TestCase('BMS-172. 案件:得意先マスタ作成:顧客情報:取引先コード :文字種', async () => {
    gondola.report(`Step 2. 「取引先コード」で全角英数字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_TEXTFIELD_LABEL, Constants.fullSizeAlphaNumericString);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        INVALID_CUSTOMER_CODE_ERROR_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(`Step 3. 「取引先コード」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_TEXTFIELD_LABEL, Constants.hiraganaKatakanaString);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        INVALID_CUSTOMER_CODE_ERROR_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(`Step 4. 「取引先コード」で記号を入力し、「保存」ボタンをクリックする。（例：「!"#$%&'()」を入力）`);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_TEXTFIELD_LABEL, Constants.symbolString);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        INVALID_CUSTOMER_CODE_ERROR_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(`Step 5. 「取引先コード」で半角英数字を入力し、「保存」ボタンをクリックする`);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(15));
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        '',
        'Invalid customer code feedback should not be displayed',
    );
});

TestCase('BMS-173. 案件:得意先マスタ作成:顧客情報:取引先コード :重複時', async () => {
    gondola.report(`Step 2. 「取引先コード」で重複しているコードを入力し、「保存」ボタンをクリックする。`);
    const randomExistedCustomer = await DatabaseHelper.getRandomBusinessCustomer();
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_TEXTFIELD_LABEL, randomExistedCustomer.cd);
    await addCustomerPage.saveCustomer();
    gondola.report(
        `VP. 入力フィールドの下にエラー「既に使われている値のため異なる値を入力してください」が表示されること。`,
    );
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_CODE_TEXTFIELD_LABEL),
        ALREADY_IN_USE_ERROR_MESSAGE,
        'Customer code is already in use feedback should be displayed',
    );
});
