import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';

TestModule('Add Customer - Classify field validation');

const CUSTOMER_CLASSIFY_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.classify;
const CUSTOMER_CLASSIFY_OPTIONS = Constants.translator.dropdownOptions.customer.classify;
Before(setup);

TestCase('BMS-79. 案件:得意先マスタ作成:顧客情報:区分:選択肢', async () => {
    gondola.report(`Step 2. 「区分」プルダウンの初期値を確認する。`);
    gondola.report(`VP. 「区分」の初期値は「顧客」であること。`);
    await gondola.checkEqual(
        await addCustomerPage.getSelectedOptionByLabel(CUSTOMER_CLASSIFY_TEXTFIELD_LABEL),
        CUSTOMER_CLASSIFY_OPTIONS.client,
        'Default option should be displayed correctly',
    );

    gondola.report(`Step 3. 「区分」プルダウンで選択肢を確認する。`);

    gondola.report(
        `VP. 「区分」は必須項目であり、「区分」プルダウンには選択肢が二つあり、「顧客」、「仕入先」を含んでいること。`,
    );
    await gondola.checkEqual(
        await addCustomerPage.doesSelectorByLabelOptionsExist(
            CUSTOMER_CLASSIFY_TEXTFIELD_LABEL,
            Object.values(CUSTOMER_CLASSIFY_OPTIONS),
        ),
        true,
        'Default option should be displayed correctly',
    );
});
