import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './list-taxes-setup';
import listTaxPage from '../../pages/list-tax-page';
import { Constants } from '../../common/constants';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import addProjectPage from '../../pages/add-project-page';
import { ProjectInfoData } from '../../models/project-info';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Utilities } from '../../common/utilities';
import addTaxPage from '../../pages/add-tax-page';
import { TaxInfoData } from '../../models/tax-info';

const PROJECT_DETAIL_DATA = ProjectInfoData.DETAIL_ONE_RECORD;
const AGREE_TO_DELETE = Constants.translator.alertMessage.agreeToDelete;

TestModule('Tax page - Delete button tests');

Before(setup);

TestCase('BMS-393. マスタ:税率一覧:削除ボタン:削除ボタン:削除対象の税率の案件作成済の場合', async () => {
    TaxInfoData.TAX_FULL_DATA.name = Utilities.getRandomText(4);
    ProjectInfoData.DETAIL_ONE_RECORD[0].taxId = TaxInfoData.TAX_FULL_DATA.name;
    gondola.report('Precondition 2. 削除対象の税率の案件を作成しておく。');
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddTaxPage();
    await addTaxPage.enterTaxInformation(TaxInfoData.TAX_FULL_DATA);
    await addTaxPage.saveTax();
    await addTaxPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddProjectPage();
    const projectOveriew = ProjectInfoData.OVERVIEW_FULL_DATA;
    await addProjectPage.inputProjectOverviewInfo(projectOveriew);
    await addProjectPage.addProjectDetails(PROJECT_DETAIL_DATA);
    await addProjectPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「税」の「一覧」をクリックします。',
    );
    await addProjectPage.gotoBusinessSystem();
    await businessSystemPage.gotoListTaxPage();
    gondola.report('VP. 税率一覧の画面に移動すること。');
    await gondola.checkTrue(await listTaxPage.isCurrentPage(), 'Should be navigated to List tax page');
    gondola.report('Step 2. 前提条件の税行で削除ボタンをクリックする');
    await listTaxPage.clickOnDeleteButton(TaxInfoData.TAX_FULL_DATA.name);
    gondola.report('VP. 確認アラート画面が表示されること。');
    await listTaxPage.waitForAlert();
    await gondola.checkEqual(
        await listTaxPage.getPopupText(),
        AGREE_TO_DELETE,
        'Alert message should be displayed correctly',
    );
    gondola.report('Step 3. アラート画面で確認する');
    await listTaxPage.clickPopup('ok');
    gondola.report('VP. 削除はできない、エラー「この税率で案件情報があるため削除できません」が表示されること。');
    await gondola.checkTrue(
        await listTaxPage.doesDeleteFailMessageDisplay(TaxInfoData.TAX_FULL_DATA.name),
        'Alert message should be displayed correctly',
    );
});

TestCase('BMS-394. マスタ:税率一覧:削除ボタン:削除対象の税率の案件未作成の場合', async () => {
    TaxInfoData.TAX_FULL_DATA.name = Utilities.getRandomText(4);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddTaxPage();
    await addTaxPage.enterTaxInformation(TaxInfoData.TAX_FULL_DATA);
    await addTaxPage.saveTax();
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「税」の「一覧」をクリックします。',
    );
    await addTaxPage.gotoBusinessSystem();
    await businessSystemPage.gotoListTaxPage();
    gondola.report('VP. 税率一覧の画面に移動すること。');
    await gondola.checkTrue(await listTaxPage.isCurrentPage(), 'Should be navigated to List tax page');
    gondola.report('Step 2. 前提条件の税行で削除ボタンをクリックする');
    await listTaxPage.clickOnDeleteButton(TaxInfoData.TAX_FULL_DATA.name);
    gondola.report('VP. 確認アラート画面が表示されること。');
    await listTaxPage.waitForAlert();
    gondola.checkEqual(
        await listTaxPage.getPopupText(),
        AGREE_TO_DELETE,
        'Alert message should be displayed correctly',
    );
    gondola.report('Step 3. アラート画面で確認する');
    await listTaxPage.clickPopup('ok');
    gondola.report('VP. 正常に削除できること。');
    await gondola.checkTrue(
        await listTaxPage.doesDeleteSuccessMessageDisplay(TaxInfoData.TAX_FULL_DATA.name),
        'Alert message should be displayed correctly',
    );
    await gondola.checkFalse(
        await listTaxPage.doesDeleteButtonDisplay(TaxInfoData.TAX_FULL_DATA.name),
        'Delete button should not exist',
    );
});
