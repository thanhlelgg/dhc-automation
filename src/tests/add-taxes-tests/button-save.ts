import { TestModule, TestCase, gondola } from 'gondolajs';
import taxesSetup from './taxes-setup';
import addTaxPage from '../../pages/add-tax-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { TaxInfoData } from '../../models/tax-info';
import listTaxPage from '../../pages/list-tax-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Taxes - Button back test');

Before(taxesSetup);

TestCase('BMS-227. マスタ:税率作成:表示名:文字数', async () => {
    TaxInfoData.TAX_FULL_DATA.name = Utilities.getRandomText(4);
    gondola.report('Step 2. 「表示名」、「税率」、「表示順」で有効な情報を入力する。');
    gondola.report('Step 3. 他の項目で有効な情報を入力する。');
    await addTaxPage.enterTaxInformation(TaxInfoData.TAX_FULL_DATA);
    gondola.report('Step 4. 「保存」ボタンをクリックする。');
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        'VP. 正常に保存でき、税率一覧画面には登録した税率が表示され、登録された税率の内容は正しく保存されること。',
    );
    await addTaxPage.gotoListTaxPage();
    await listTaxPage.openTaxByName(TaxInfoData.TAX_FULL_DATA.name);
    await gondola.checkTrue(
        await addTaxPage.doesTaxDisplayCorrectly(TaxInfoData.TAX_FULL_DATA),
        'Tax info should be displayed correctly',
    );
});
