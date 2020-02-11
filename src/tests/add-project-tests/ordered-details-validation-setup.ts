import { gondola } from 'gondolajs';
import projectDetailsPage from '../../pages/project-details-page';
import basicSetup from './ordered-details-setup';

export default async function setup(): Promise<void> {
    await basicSetup();
    gondola.report(`Step 7. 「追加」ボタンをクリック`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    gondola.report(`VP. 入力行が追加されること`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be displayed',
    );
}
