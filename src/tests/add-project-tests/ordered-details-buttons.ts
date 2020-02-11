import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-setup';
import projectDetailsPage from '../../pages/project-details-page';

TestModule('Add Project - Ordered details - Buttons validation');

Before(setup);

TestCase('BMS-272. BMS:案件:案件編集:非稼働明細:追加ボタン', async () => {
    gondola.report(`Step 7. 「追加」ボタンをクリック`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    gondola.report(`VP. 入力行が追加されること`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be displayed',
    );
});

TestCase('BMS-273. BMS:案件:案件編集:非稼働明細:追加ボタン', async () => {
    gondola.report(`Step 7. 「追加」ボタンをクリック`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    gondola.report(`VP. 入力行が追加されること`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be displayed',
    );

    gondola.report(`Step 8. 「削除」ボタンをクリック`);
    await projectDetailsPage.deleteOrderedDetailsRow();
    gondola.report(`VP. 明細行が削除される`);
    await gondola.checkFalse(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be deleted',
    );
});
