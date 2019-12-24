import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './add-segment-setup';
import addSegmentPage from '../../pages/add-segment-page';
import listSegmentPage from '../../pages/list-segment-page';

TestModule('Add Segment - Back button test');

Before(setup);

TestCase('BMS-218. マスタ:セグメント作成:戻るボタン', async () => {
    gondola.report(`Step 2.「戻る」ボタンをクリックする。`);
    await addSegmentPage.clickReturnButton();
    gondola.report(`VP. セグメント一覧画面に遷移すること。`);
    gondola.checkTrue(await listSegmentPage.isCurrentPage(), 'List segment page should be displayed');
});
