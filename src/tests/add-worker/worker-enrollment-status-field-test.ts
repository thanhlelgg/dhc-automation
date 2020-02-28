import { gondola, TestCase, TestModule } from 'gondolajs';
import addWorkerPage from '../../pages/add-worker-page';
import setup from './add-worker-setup';

TestModule('Add Worker - Enrollment status field');

Before(setup);

TestCase('BMS-106. BMS:案件:従業員マスタ作成:在籍状況:選択肢', async () => {
    gondola.report(`Step 2. 「在籍状況」チェックボックスで選択肢を確認する`);
    gondola.report(`VP. 「在籍状況」の選択肢が一つあり、「退職済」を含めていること。`);
    const actualResult = await addWorkerPage.doesCheckboxLabelExist('退職済');
    await gondola.checkTrue(actualResult, 'Checkbox label does not exist');
});
