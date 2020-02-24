import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';

TestModule('Add Customer - Customer dropdown fields validation');

const CUSTOMER_ROUND_CODE_DROPDOWN_LABEL = Constants.translator.fieldName.addCustomer.roundCode;
const CUSTOMER_FEE_PAYER_DROPDOWN_LABEL = Constants.translator.fieldName.addCustomer.fee_payer;
const CUSTOMER_CURRENCY_DROPDOWN_LABEL = Constants.translator.fieldName.addCustomer.currency;
const CUSTOMER_CLOSING_DATE_GROUP_DROPDOWN_LABEL = Constants.translator.fieldName.addCustomer.closingDateGroup;
const CUSTOMER_TAX_CALC_METHOD_DROPDOWN_LABEL = Constants.translator.fieldName.addCustomer.taxCalcMethod;
Before(setup);

TestCase('BMS-90. 案件:得意先マスタ作成:顧客情報:振込手数料負担:選択肢', async () => {
    gondola.report(`Step 2. 「振込手数料負担」プルダウンで選択肢を確認する。`);
    gondola.report(`VP. 「振込手数料負担」プルダウンには選択肢が二つあり、「取引先」、「当社」を含んでいること。`);
    const feePayerOptions = Object.values(Constants.translator.dropdownOptions.customer.fee_payer);
    await gondola.checkTrue(
        await addCustomerPage.doesSelectorByLabelOptionsExist(CUSTOMER_FEE_PAYER_DROPDOWN_LABEL, feePayerOptions),
        'Dropdown should be displayed correctly',
    );
});

TestCase('BMS-91. 案件:得意先マスタ作成:顧客情報:端数処理:選択肢', async () => {
    gondola.report(`Step 2. 「端数処理」プルダウンで選択肢を確認する。`);
    gondola.report(
        `VP. 「端数処理」プルダウンには選択肢が三つあり、「四捨五入」、「切り捨て」、「切り上げ」を含んでいること。`,
    );
    const roundCodeOptions = Object.values(Constants.translator.dropdownOptions.customer.roundCode);
    await gondola.checkTrue(
        await addCustomerPage.doesSelectorByLabelOptionsExist(CUSTOMER_ROUND_CODE_DROPDOWN_LABEL, roundCodeOptions),
        'Dropdown should be displayed correctly',
    );
});

TestCase('BMS-92. 案件:得意先マスタ作成:顧客情報:取引通貨:選択肢', async () => {
    gondola.report(`Step 2. 「取引通貨」プルダウンで選択肢を確認する。`);
    gondola.report(
        `VP. 「取引通貨」プルダウンには選択肢が「JPY - 日本円(￥)」と通貨マスタよりのデータで、初期値は「JPY - 日本円(￥)」であること。`,
    );
    const currencyOptions = Object.values(Constants.translator.dropdownOptions.customer.currency);
    await gondola.checkTrue(
        await addCustomerPage.doesSelectorByLabelOptionsExist(CUSTOMER_CURRENCY_DROPDOWN_LABEL, currencyOptions),
        'Dropdown should be displayed correctly',
    );
});

TestCase('BMS-93. 案件:得意先マスタ作成:顧客情報:締め日:選択肢', async () => {
    gondola.report(`Step 2. 「締め日」プルダウンで選択肢を確認する。`);
    gondola.report(`VP. 「締め日」プルダウンには選択肢が31つあり、1～30および「末」を含んでいること。`);
    const closingDateGroup = Object.values(Constants.CLOSING_DATES);
    await gondola.checkTrue(
        await addCustomerPage.doesSelectorByLabelOptionsExist(
            CUSTOMER_CLOSING_DATE_GROUP_DROPDOWN_LABEL,
            closingDateGroup,
        ),
        'Dropdown should be displayed correctly',
    );
});

TestCase('BMS-94. 案件:得意先マスタ作成:顧客情報:税計算単位:選択肢', async () => {
    gondola.report(`Step 2. 「税計算単位」プルダウンで選択肢を確認する。`);
    gondola.report(
        `VP. 「税計算単位」プルダウンには選択肢が三つあり、「請求書単位」、「納品書単位」、「納品明細単位」を含んでいること。`,
    );
    const taxCalcMethodOptions = Object.values(Constants.translator.dropdownOptions.customer.taxCalcMethod);
    await gondola.checkTrue(
        await addCustomerPage.doesSelectorByLabelOptionsExist(
            CUSTOMER_TAX_CALC_METHOD_DROPDOWN_LABEL,
            taxCalcMethodOptions,
        ),
        'Dropdown should be displayed correctly',
    );
});
