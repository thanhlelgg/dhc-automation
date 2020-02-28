import { TestModule, TestCase, gondola } from 'gondolajs';
import businessCustomerSetup from './list-customer-setup';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import listCustomerPage, { CustomerSearchResultColumn } from '../../pages/list-customer-page';
import addCustomerPage, { CustomerFieldName } from '../../pages/add-customer-page';
import { Constants } from '../../common/constants';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
TestModule('List customer page - Search customer by receivable subcode');

Before(businessCustomerSetup);

TestCase('BMS-459. マスタ:得意先検索:得意先コード', async () => {
    gondola.report(
        'Precondition 2. 以下の得意先を登録しておく。ー 売掛金補助コードが「abc」, ー 売掛金補助コードが「ABC」, ー 売掛金補助コードが「ABC」',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(
        CustomerFieldName.SUBCODE,
        Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_LOWER_STRING,
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(
        CustomerFieldName.SUBCODE,
        Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_UPPER_STRING,
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(
        CustomerFieldName.SUBCODE,
        Constants.SINGLE_BYTE_NUMBER_CUSTOMER_STRING,
    );

    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」の「顧客」の「得意先一覧」をクリックします。',
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoListCustomer();
    gondola.report('VP. 得意先一覧の画面に移動すること。');
    await gondola.checkTrue(await listCustomerPage.isCurrentPage(), 'Should be navigated to list customer page');
    gondola.report('Step 2. 売掛金補助コードで一部の検索条件を入力し、「検索」ボタンをクリックする。例：「１」を入力');
    await listCustomerPage.searchCustomer(CustomerSearchResultColumn.CUSTOMER_SUBCODE, Constants.NUMBER_ONE);
    let actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        Constants.NUMBER_ONE,
        SearchResultColumn.SUBCODE,
        false,
    );
    gondola.report(`VP. 売掛金補助コードが一部として入力した文字を含めている得意先が表示されないこと。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
    gondola.report(`Step 3. 売掛金補助コードで「abc」を入力し、「検索」ボタンをクリックする。`);
    await listCustomerPage.searchCustomer(
        CustomerSearchResultColumn.CUSTOMER_SUBCODE,
        Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_LOWER_STRING,
    );
    actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_LOWER_STRING,
        SearchResultColumn.SUBCODE,
        false,
    );
    gondola.report(
        `VP. 検索結果で完全一致する検索結果として売掛金補助コードが「abc」と「ABC」である得意先が表示されること。`,
    );
    await gondola.checkTrue(actualResult, 'Search result should be correct');
});
