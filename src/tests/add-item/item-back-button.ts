import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import listItemPage from '../../pages/list-item-page';

TestModule('Add Item - Back button validation');

Before(setup);

TestCase('BMS-207. BMS:マスタ:品目作成:戻るボタン', async () => {
    gondola.report(`Step 2.「戻る」ボタンをクリックする `);
    await addItemPage.goBack();
    gondola.report(`VP. 品目一覧画面に遷移すること。`);
    await gondola.checkTrue(await listItemPage.isCurrentPage(), 'Items page should be displayed.');
});
