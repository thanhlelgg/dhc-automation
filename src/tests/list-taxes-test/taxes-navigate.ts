import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './list-taxes-setup';
import listTaxPage from '../../pages/list-tax-page';
import addTaxPage from '../../pages/add-tax-page';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';

TestModule('Tax page - Navigate page tests');

Before(setup);

TestCase('BMS-391. マスタ:税率一覧:画面遷移', async () => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「税」の「一覧」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListTaxPage();
    gondola.report('VP. 税率一覧の画面に移動すること。');
    await gondola.checkTrue(await listTaxPage.isCurrentPage(), 'Should be navigated to List tax page');
});

TestCase('BMS-392. マスタ:税率一覧:新規登録ボタン', async () => {
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「税」の「一覧」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListTaxPage();
    gondola.report('VP. 税率一覧の画面に移動すること。');
    await gondola.checkTrue(await listTaxPage.isCurrentPage(), 'Should be navigated to List tax page');
    gondola.report('Step 2. 新規登録ボタンをクリックする');
    await listTaxPage.clickButtonByIcon(ButtonIcon.ADD);
    gondola.report(`VP. 新規登録画面に遷移すること。`);
    await gondola.checkTrue(await addTaxPage.isCurrentPage(), 'Should be navigated to Add tax page');
});
