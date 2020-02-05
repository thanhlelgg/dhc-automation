import { TestModule, TestCase, gondola } from 'gondolajs';
import businessCustomerSetup from './list-customer-setup';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import addCustomerPage from '../../pages/add-customer-page';
import { Constants } from '../../common/constants';
import listCustomerPage from '../../pages/list-customer-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';
import { CustomerFieldName } from '../../helper/flags-collector';

TestModule('List customer page - Search customer by name');

Before(businessCustomerSetup);

TestCase('BMS-455. マスタ:得意先検索:得意先コード', async () => {
    gondola.report(
        'Precondition 2. 以下の得意先を登録しておく。ー 得意先名が「abc」, ー 得意先名が「ABC」,ー 得意先名が「１２３」,ー 得意先名が「123」,ー 得意先名が「ひひ」,ー 得意先名が「びび」,ー 得意先名が「ぴぴ」',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(
        CustomerFieldName.CUSTOMER_NAME,
        Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_LOWER_STRING,
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(
        CustomerFieldName.CUSTOMER_NAME,
        Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_UPPER_STRING,
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(
        CustomerFieldName.CUSTOMER_NAME,
        Constants.SINGLE_BYTE_NUMBER_CUSTOMER_STRING,
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(
        CustomerFieldName.CUSTOMER_NAME,
        Constants.SINGLE_BYTE_NUMBER_JAPANESE_CUSTOMER_STRING,
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(CustomerFieldName.CUSTOMER_NAME, Constants.HI_HI_STRING);
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(CustomerFieldName.CUSTOMER_NAME, Constants.BI_BI_STRING);
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await addCustomerPage.createCustomerWithSpecificValue(CustomerFieldName.CUSTOMER_NAME, Constants.PI_PI_STRING);

    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」の「顧客」の「得意先一覧」をクリックします。',
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoListCustomer();
    gondola.report('VP. 得意先一覧の画面に移動すること。');
    await gondola.checkTrue(await listCustomerPage.isCurrentPage(), 'Should be navigated to list customer page');
    gondola.report('Step 2. 得意先名で一部の検索条件を入力し、「検索」ボタンをクリックする。例：「１」を入力');
    await listCustomerPage.searchCustomer({ customerName: Constants.NUMBER_ONE });
    let actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        Constants.NUMBER_ONE,
        SearchResultColumn.NAME,
        true,
    );
    gondola.report(`VP. 得意先名が部分一致する得意先が表示されること。例：「１２３」と「123」が表示`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
    gondola.report('Step 3. 得意先名で「１２３」を入力し、「検索」ボタンをクリックする。');
    await listCustomerPage.searchCustomer({ customerName: Constants.SINGLE_BYTE_NUMBER_JAPANESE_CUSTOMER_STRING });
    actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        Constants.SINGLE_BYTE_NUMBER_JAPANESE_CUSTOMER_STRING,
        SearchResultColumn.NAME,
        false,
    );
    gondola.report(`VP. 検索結果で得意先名が「１２３」と「123」である得意先が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
    gondola.report('Step 4. 得意先名で「abc」を入力し、「検索」ボタンをクリックする。');
    await listCustomerPage.searchCustomer({ customerName: Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_LOWER_STRING });
    actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        Constants.SINGLE_BYTE_ALPHABET_CUSTOMER_LOWER_STRING,
        SearchResultColumn.NAME,
        false,
    );
    gondola.report(`VP. 検索結果で得意先名が「abc」と「ABC」である得意先が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
    gondola.report('Step 5. 得意先名で「ひひ」を入力し、「検索」ボタンをクリックする。');
    await listCustomerPage.searchCustomer({ customerName: Constants.HI_HI_STRING });
    actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        Constants.HI_HI_STRING,
        SearchResultColumn.NAME,
        false,
    );
    gondola.report(`VP. 検索結果で得意先名が「ひひ」と「びび」と「ぴぴ」である得意先が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
});
