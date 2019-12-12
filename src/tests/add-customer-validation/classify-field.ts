import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { CustomerInfoDate as CustomerInfoData } from '../../models/customer-info';
import { Utilities } from '../../common/utilities';

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

TestCase('BMS-80. 案件:得意先マスタ作成:顧客情報:区分:保存後の変更可能', async () => {
    gondola.report(
        `Step 2. 「区分」プルダウンで任意の選択肢を選択し、他の必須情報を入力し、「保存」ボタンをクリックする。`,
    );
    const requiredInfo = CustomerInfoData.CUSTOMER_REQUIRED_DATA;
    requiredInfo.overview.code += Utilities.getRandomText(10);
    await addCustomerPage.inputCustomerInfo(CustomerInfoData.CUSTOMER_REQUIRED_DATA);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 正常に保存した後、「区分」フィールドで変更できなくなること。`);
    await gondola.checkEqual(
        await addCustomerPage.isSelectorByLabelEnabled(CUSTOMER_CLASSIFY_TEXTFIELD_LABEL),
        false,
        'Classify dropdown should be disabled',
    );
});
