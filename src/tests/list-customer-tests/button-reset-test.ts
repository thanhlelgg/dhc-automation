import { TestModule, Data, gondola } from 'gondolajs';
import addCustomerPage from '../../pages/add-customer-page';
import businessSystemPage from '../../pages/business-system-page';
import listCustomerPage, { CustomerSearchResultColumn } from '../../pages/list-customer-page';
import preconditionSetup from './list-customer-precondition-setup';
TestModule('List customer page - button reset test');

const CUSTOMER_SEARCH_FIELD = Object.values(CustomerSearchResultColumn);

Before(preconditionSetup);

Data(CUSTOMER_SEARCH_FIELD).TestCase('BMS-462. マスタ:得意先検索:リセットボタン', async (current: any) => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」の「顧客」の「得意先一覧」をクリックします。',
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoListCustomer();
    gondola.report('VP. 得意先一覧の画面に移動すること。');
    await gondola.checkTrue(await listCustomerPage.isCurrentPage(), 'Should be navigated to list customer page');
    await gondola.report('Step 2. 任意の検索条件を入力し、「検索」ボタンをクリックする。');
    await listCustomerPage.searchCustomerFieldByField(current);
    await gondola.report('Step 3. リセットボタンをクリックする。');
    await listCustomerPage.clickResetButton();
    await gondola.report('VP. 検索条件無の検索一覧結果に遷移すること。');
    await gondola.checkTrue(
        await listCustomerPage.isCurrentPage(),
        'Should move to list customer without search conditional',
    );
});
