import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './positions-setup';
import addPositionPage from '../../pages/add-position-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import listPositionPage from '../../pages/list-position-page';

TestModule('Positions - Back button validation');

Before(setup);

TestCase('TMS-130. マスタ:役職作成:戻るボタン', async () => {
    gondola.report(`Step 2. 「戻る」ボタンをクリックする。`);
    await addPositionPage.clickButtonByIcon(ButtonIcon.BACK);
    gondola.report(`VP. 役職一覧画面に遷移すること。`);
    await gondola.checkTrue(await listPositionPage.isCurrentPage(), 'Should be navigated to position list');
});
