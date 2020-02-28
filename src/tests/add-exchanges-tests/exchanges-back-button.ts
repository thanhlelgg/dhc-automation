import { gondola, TestCase, TestModule } from 'gondolajs';
import preconditionSetup from './precodition-setup';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import addExchangePage from '../../pages/add-exchange-page';
import listExchangePage from '../../pages/list-exchange-page';

TestModule('Add Exchanges - Back button validation');

Before(preconditionSetup);

TestCase('BMS-362. マスタ:通貨作成:戻るボタン', async () => {
    gondola.report('Step 2. 「戻る」ボタンをクリックする。');
    await addExchangePage.clickButtonByIcon(ButtonIcon.BACK);
    gondola.report('VP. 一覧画面に遷移すること。');
    await gondola.checkTrue(await listExchangePage.isCurrentPage(), 'Should be navigated to exchanges list');
});
