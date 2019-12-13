import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Customer code field validation');

const CUSTOMER_CODE_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.code;
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
