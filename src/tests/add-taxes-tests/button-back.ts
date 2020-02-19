import { TestModule, TestCase, gondola } from 'gondolajs';
import taxesSetup from './taxes-setup';
import addTaxPage from '../../pages/add-tax-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import listTaxPage from '../../pages/list-tax-page';

TestModule('Add Taxes - Button back test');

Before(taxesSetup);

TestCase('BMS-226. マスタ:税率作成:表示名:文字数', async () => {
    gondola.report('Step 2. 「戻る」ボタンをクリックする。');
    await addTaxPage.clickButtonByIcon(ButtonIcon.BACK);
    gondola.report('VP. 税率一覧画面に遷移すること。');
    await gondola.checkTrue(await listTaxPage.isCurrentPage(), 'Should be navigated to List tax page');
});
