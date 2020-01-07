import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import listCustomerPage from '../../pages/list-customer-page';
import listSupplierPage from '../../pages/list-supplier-page';
import { CustomerInfoData } from '../../models/customer-info';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Verify adding customer successfully');

const CUSTOMER_CLASSIFY_TEXTFIELD_LABEL = Constants.translator.fieldName.addCustomer.classify;
const CUSTOMER_CLASSIFY_OPTIONS = Constants.translator.dropdownOptions.customer.classify;
const CUSTOMER_CODE_SEARCH_TEXTFIELD_LABEL = Constants.translator.fieldName.customerList.customerCode;

Before(setup);

TestCase('BMS-145. 案件:得意先マスタ作成:顧客情報:保存顧客:必須項目のみ', async () => {
    gondola.report(`Step 2. 「区分」で「顧客」を選択する。`);
    await addCustomerPage.selectSelectorByLabel(CUSTOMER_CLASSIFY_TEXTFIELD_LABEL, CUSTOMER_CLASSIFY_OPTIONS.client);
    gondola.report(`VP. 「顧客単価」と「割増」入力セッションが表示されること。`);
    gondola.checkTrue(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerMagnifications),
    );
    gondola.checkTrue(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerUnitPrices),
    );

    gondola.report(
        `Step 3. 「顧客情報」入力セッションで「取引先コード」、「取引先名」、「振込手数料負担」、「端数処理」、「取引通貨」、「締め日」、「税計算単位」、「個別請求口座番号」の有効な情報を入力する。`,
    );
    gondola.report(`Step 4. 顧客単価行を二つ追加し、顧客単価行で有効な情報を入力する。`);
    gondola.report(`Step 5. 割増行を二つ追加し、割増行で有効な情報を入力する。`);
    const requiredInfo = CustomerInfoData.CUSTOMER_REQUIRED_DATA;
    requiredInfo.overview.code += Utilities.getRandomText(10);
    await addCustomerPage.inputCustomerInfo(requiredInfo);
    gondola.report(`Step 6. 「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    await addCustomerPage.clickReturnButton();
    await listCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_SEARCH_TEXTFIELD_LABEL, requiredInfo.overview.code);
    await listCustomerPage.clickSearchButton();
    // Currently there's a bug with start date that doesn't allow us to enter a valid date,
    // therefore we can't save customer and failed the test
    await listCustomerPage.openCustomerByCode(requiredInfo.overview.code);
    gondola.report(
        `VP. 正常に保存でき、得意先一覧画面には登録した得意先が表示され、登録された得意先の内容は正しく保存されること。`,
    );
    await gondola.checkTrue(
        await addCustomerPage.doesCustomerDisplayCorrectly(requiredInfo),
        'Customer should be created correctly',
    );
});

TestCase('BMS-146. 案件:得意先マスタ作成:顧客情報:保存顧客:全ての項目', async () => {
    gondola.report(`Step 2. 「区分」で「顧客」を選択する。`);
    await addCustomerPage.selectSelectorByLabel(CUSTOMER_CLASSIFY_TEXTFIELD_LABEL, CUSTOMER_CLASSIFY_OPTIONS.client);
    gondola.report(`VP. 「顧客単価」と「割増」入力セッションが表示されること。`);
    gondola.checkTrue(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerMagnifications),
    );
    gondola.checkTrue(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerUnitPrices),
    );

    gondola.report(
        `Step 3. 「顧客情報」入力セッションで「取引先コード」、「取引先名」、「振込手数料負担」、「端数処理」、「取引通貨」、「締め日」、「税計算単位」、「個別請求口座番号」の有効な情報を入力する。`,
    );
    gondola.report(`Step 4. 「顧客情報」入力セッションの他の項目で有効な情報を入力する。`);
    gondola.report(`Step 5. 顧客単価行を二つ追加し、顧客単価行で有効な情報を入力する。`);
    gondola.report(`Step 6. 割増行を二つ追加し、割増行で有効な情報を入力する。`);
    const requiredInfo = CustomerInfoData.CUSTOMER_ALL_DATA;
    requiredInfo.overview.code += Utilities.getRandomText(10);
    await addCustomerPage.inputCustomerInfo(requiredInfo);
    gondola.report(`Step 7. 「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    await addCustomerPage.clickReturnButton();
    await listCustomerPage.enterTextFieldByLabel(CUSTOMER_CODE_SEARCH_TEXTFIELD_LABEL, requiredInfo.overview.code);
    await listCustomerPage.clickSearchButton();
    // Currently there's a bug with start date that doesn't allow us to enter a valid date,
    // therefore we can't save customer and failed the test
    await listCustomerPage.openCustomerByCode(requiredInfo.overview.code);
    gondola.report(
        `VP. 正常に保存でき、得意先一覧画面には登録した得意先が表示され、登録された得意先の内容は正しく保存されること。`,
    );
    await gondola.checkTrue(
        await addCustomerPage.doesCustomerDisplayCorrectly(requiredInfo),
        'Customer should be created correctly',
    );
});

TestCase('BMS-147. 案件:得意先マスタ作成:顧客情報:保存仕入先:必須項目のみ', async () => {
    gondola.report(`Step 2. 「区分」で「仕入先」を選択する。`);
    await addCustomerPage.selectSelectorByLabel(CUSTOMER_CLASSIFY_TEXTFIELD_LABEL, CUSTOMER_CLASSIFY_OPTIONS.supplier);
    gondola.report(`VP. 「顧客単価」と「割増」入力セッションが表示されないこと。`);
    //BUG: currently we can't select customer type
    gondola.checkFalse(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerMagnifications),
    );
    gondola.checkFalse(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerUnitPrices),
    );

    gondola.report(
        `Step 3. 「顧客情報」入力セッションで「取引先コード」、「取引先名」、「振込手数料負担」、「端数処理」、「取引通貨」、「締め日」、「税計算単位」、「個別請求口座番号」の有効な情報を入力する。`,
    );
    const requiredInfo = CustomerInfoData.SUPPLIER_REQUIRED_DATA;
    requiredInfo.overview.code += Utilities.getRandomText(10);
    await addCustomerPage.inputCustomerInfo(requiredInfo);
    gondola.report(`Step 4. 「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    await addCustomerPage.clickReturnButton();
    await listSupplierPage.clickPagingLastPage();
    await listSupplierPage.openSupplierByCode(requiredInfo.overview.code);
    gondola.report(
        `VP. 正常に保存でき、得意先一覧画面には登録した得意先が表示され、登録された得意先の内容は正しく保存されること。`,
    );
    await gondola.checkTrue(
        await addCustomerPage.doesCustomerDisplayCorrectly(requiredInfo),
        'Customer should be created correctly',
    );
});

TestCase('BMS-148. 案件:得意先マスタ作成:顧客情報:保存仕入先:全ての項目', async () => {
    gondola.report(`Step 2. 「区分」で「仕入先」を選択する。`);
    await addCustomerPage.selectSelectorByLabel(CUSTOMER_CLASSIFY_TEXTFIELD_LABEL, CUSTOMER_CLASSIFY_OPTIONS.supplier);
    gondola.report(`VP. 「顧客単価」と「割増」入力セッションが表示されないこと。`);
    gondola.checkFalse(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerMagnifications),
    );
    gondola.checkFalse(
        await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerUnitPrices),
    );

    gondola.report(
        `Step 3. 「顧客情報」入力セッションで「取引先コード」、「取引先名」、「振込手数料負担」、「端数処理」、「取引通貨」、「締め日」の有効な情報を入力する。`,
    );
    gondola.report(`Step 4.「顧客情報」入力セッションの他の項目で有効な情報を入力する。`);
    const requiredInfo = CustomerInfoData.SUPPLIER_ALL_DATA;
    requiredInfo.overview.code += Utilities.getRandomText(10);
    await addCustomerPage.inputCustomerInfo(requiredInfo);
    gondola.report(`Step 5. 「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    await addCustomerPage.clickReturnButton();
    await listSupplierPage.clickPagingLastPage();
    await listSupplierPage.openSupplierByCode(requiredInfo.overview.code);
    gondola.report(
        `VP. 正常に保存でき、得意先一覧画面には登録した得意先が表示され、登録された得意先の内容は正しく保存されること。`,
    );
    await gondola.checkTrue(
        await addCustomerPage.doesCustomerDisplayCorrectly(requiredInfo),
        'Customer should be created correctly',
    );
});
