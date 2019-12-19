import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { CustomerInfoData } from '../../models/customer-info';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Classify field validation');

const CUSTOMER_CLASSIFY_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.classify;
const CUSTOMER_CLASSIFY_OPTIONS = Constants.translator.dropdownOptions.customer.classify;
Before(setup);

TestCase('BMS-80. 案件:得意先マスタ作成:顧客情報:保存顧客:必須項目のみ', async () => {
    gondola.report(`Step 2. 「区分」で「顧客」を選択する。`);
    const requiredInfo = CustomerInfoData.CUSTOMER_REQUIRED_DATA;
    requiredInfo.overview.code += Utilities.getRandomText(10);
    await addCustomerPage.inputCustomerInfo(CustomerInfoData.CUSTOMER_REQUIRED_DATA);
    await addCustomerPage.saveCustomer();
    // Currently there's a bug with start date that doesn't allow us to enter a valid date,
    // therefore we can't save customer and failed the test
    gondola.report(`VP. 正常に保存した後、「区分」フィールドで変更できなくなること。`);
    await gondola.checkFalse(
        await addCustomerPage.isSelectorByLabelEnabled(CUSTOMER_CLASSIFY_TEXTFIELD_LABEL),
        'Classify dropdown should be disabled',
    );
});
