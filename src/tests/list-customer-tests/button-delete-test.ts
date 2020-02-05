import { TestModule, TestCase, gondola } from 'gondolajs';
import precoditionSetup from './list-customer-precodition-setup';
import addCustomerPage from '../../pages/add-customer-page';
import businessSystemPage from '../../pages/business-system-page';
import listCustomerPage from '../../pages/list-customer-page';
import { CustomerInfoData } from '../../models/customer-info';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { ProjectInfoData } from '../../models/project-info';
import addProjectPage from '../../pages/add-project-page';

const PROJECT_DETAIL_DATA = ProjectInfoData.DETAIL_ONE_RECORD;
const AGREE_TO_DELETE = Constants.translator.alertMessage.agreeToDelete;

TestModule('List customer page - button delete test');

Before(precoditionSetup);

TestCase('BMS-513. マスタ:得意先検索:削除ボタン:削除対象の得意先の案件未作成の場合', async () => {
    const requiredInfo = CustomerInfoData.CUSTOMER_ALL_DATA;
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」の「顧客」の「得意先一覧」をクリックします。',
    );
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoListCustomer();
    gondola.report('VP. 得意先一覧の画面に移動すること。');
    await gondola.checkTrue(await listCustomerPage.isCurrentPage(), 'Should be navigated to list customer page');
    await gondola.report('Step 2. 前提条件の得意先行で削除ボタンをクリックする。');
    listCustomerPage.clickOnDeleteButton(requiredInfo.overview.code);
    gondola.report('VP. 確認アラート画面が表示されること。');
    await listCustomerPage.waitForAlert();
    gondola.checkEqual(
        await listCustomerPage.getPopupText(),
        AGREE_TO_DELETE,
        'Alert message should be displayed correctly',
    );
    gondola.report('Step 3. アラート画面で確認する');
    await listCustomerPage.clickPopup('ok');
    gondola.report('VP. 正常に削除できること。');
    await gondola.checkFalse(
        await listCustomerPage.doesDeleteButtonDisplay(requiredInfo.overview.code),
        'Delete button should not exist',
    );
});

TestCase('BMS-512. マスタ:得意先検索:削除ボタン:削除対象の得意先の案件作成済の場合', async () => {
    gondola.report('Precondiotion 2. 削除対象の得意先の案件を作成しておく。');
    const requiredInfo = CustomerInfoData.CUSTOMER_ALL_DATA;
    await addCustomerPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
    const projectOveriew = ProjectInfoData.OVERVIEW_REQUIRED_ONLY;
    projectOveriew.customerName = requiredInfo.overview.name;
    await addProjectPage.inputProjectOverviewInfo(projectOveriew);
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);
    await addProjectPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」の「顧客」の「得意先一覧」をクリックします。',
    );
    await addProjectPage.gotoBusinessSystem();
    await businessSystemPage.gotoListCustomer();
    gondola.report('VP. 得意先一覧の画面に移動すること。');
    await gondola.checkTrue(await listCustomerPage.isCurrentPage(), 'Should be navigated to list customer page');
    gondola.report('Step 2. 前提条件の得意先行で削除ボタンをクリックする。');
    await listCustomerPage.clickOnDeleteButton(requiredInfo.overview.code);
    gondola.report('VP. 確認アラート画面が表示されること。');
    await listCustomerPage.waitForAlert();
    gondola.checkEqual(
        await listCustomerPage.getPopupText(),
        AGREE_TO_DELETE,
        'Alert message should be displayed correctly',
    );
    gondola.report('Step 3. アラート画面で確認する');
    await listCustomerPage.clickPopup('ok');
    gondola.report(
        'VP. 削除はできない、エラー「(得意先コード) 得意先名 は案件情報で使用されているため削除できません。」が表示されること。',
    );
    await gondola.checkTrue(
        await listCustomerPage.doesDeleteFailMessageDisplay(requiredInfo.overview.code, requiredInfo.overview.name),
        'Alert message should be displayed correctly',
    );
});
