import { TestModule, TestCase, gondola } from 'gondolajs';
import businessCustomerSetup from './list-customer-setup';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import listCustomerPage from '../../pages/list-customer-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import addCustomerPage from '../../pages/add-customer-page';

TestModule('List customer page - Navigate page tests');

Before(businessCustomerSetup);

TestCase('BMS-457. マスタ:得意先検索:画面遷移', async () => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」の「顧客」の「得意先一覧」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListCustomer();
    gondola.report('VP. 得意先一覧の画面に移動すること。');
    await gondola.checkTrue(await listCustomerPage.isCurrentPage(), 'Should be navigated to list customer page');
});

TestCase('BMS-463. マスタ:得意先検索:新規登録ボタン', async () => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」の「顧客」の「得意先一覧」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListCustomer();
    gondola.report('VP. 得意先一覧の画面に移動すること。');
    await gondola.checkTrue(await listCustomerPage.isCurrentPage(), 'Should be navigated to list customer page');
    gondola.report('Step 2. 新規登録ボタンをクリックする。');
    await listCustomerPage.clickButtonByIcon(ButtonIcon.ADD);
    gondola.report(`VP. 新規得意先登録画面へ遷移すること。`);
    await gondola.checkTrue(await addCustomerPage.isCurrentPage(), 'Should be navigated to add customer page');
});
