import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Customer Representative fields validation');

const REPRESENTATIVE_NAME_TEXTFIELD_PLACEHOLDER = Constants.translator.fieldPlaceHolder.addCustomer.repName;
const REPRESENTATIVE_DEPARTMENT_TEXTFIELD_PLACEHOLDER = Constants.translator.fieldPlaceHolder.addCustomer.repDepartment;
const VALID_NOC_REP_DEPARTMENT = 50;
const VALID_NOC_REP_NAME = 40;
Before(setup);

TestCase('BMS-83. 案件:得意先マスタ作成:顧客情報:取引先名 :文字数 ', async () => {
    gondola.report(`Step 2. 「取引先担当(部署、役職名) 」で50文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_REP_DEPARTMENT);
    await addCustomerPage.enterTextfieldByPlaceholder(
        REPRESENTATIVE_DEPARTMENT_TEXTFIELD_PLACEHOLDER,
        maximumCharactersName,
    );
    gondola.report(`VP. 50文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(REPRESENTATIVE_DEPARTMENT_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「取引先名」で51文字を入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(
        REPRESENTATIVE_DEPARTMENT_TEXTFIELD_PLACEHOLDER,
        maximumCharactersName + 'a',
    );
    gondola.report(`VP. 51目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(REPRESENTATIVE_DEPARTMENT_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );
});

TestCase('BMS-84. 案件:得意先マスタ作成:顧客情報:取引先担当(名前) :文字数', async () => {
    gondola.report(`Step 2. 「取引先担当(名前)」で40文字を入力する。`);
    const maximumCharactersName = Utilities.getRandomText(VALID_NOC_REP_NAME);
    await addCustomerPage.enterTextfieldByPlaceholder(REPRESENTATIVE_NAME_TEXTFIELD_PLACEHOLDER, maximumCharactersName);
    gondola.report(`VP. 40文字まで入力できること。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(REPRESENTATIVE_NAME_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'All characters should be entered',
    );

    gondola.report(`Step 3. 「取引先担当(名前)」で41文字を入力する。`);
    await addCustomerPage.enterTextfieldByPlaceholder(
        REPRESENTATIVE_NAME_TEXTFIELD_PLACEHOLDER,
        maximumCharactersName + 'a',
    );
    gondola.report(`VP. 41目の文字まで入力できないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getTextfieldValueByPlaceholder(REPRESENTATIVE_NAME_TEXTFIELD_PLACEHOLDER),
        maximumCharactersName,
        'Exceed characters can not be be entered',
    );
});
