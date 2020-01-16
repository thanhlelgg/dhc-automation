import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Customer name field validation');

const CUSTOMER_NAME_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.name;
const VALID_NOC = 50;
Before(setup);

TestCase('BMS-82. 案件:得意先マスタ作成:顧客情報:取引先名 :文字数 ', async () => {
    gondola.report(`Step 2. 「取引先名」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力フィールドの下にエラー「このフィールドは入力必須です」が表示されること。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_NAME_TEXTFIELD_LABEL),
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );

    gondola.report(`Step 3. 「取引先名」で50文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_NAME_TEXTFIELD_LABEL, maximumCharactersName);
    gondola.report(`VP. 50文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(CUSTOMER_NAME_TEXTFIELD_LABEL),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 4. 「取引先名」で51文字を入力する。`);
    await addCustomerPage.enterTextFieldByLabel(CUSTOMER_NAME_TEXTFIELD_LABEL, maximumCharactersName + 'a');
    gondola.report(`VP. 51目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextFieldValueByLabel(CUSTOMER_NAME_TEXTFIELD_LABEL),
        maximumCharactersName,
        'Exceed characters should be stripped correctly',
    );
});
