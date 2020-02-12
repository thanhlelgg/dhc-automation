import { TestCase, TestModule } from 'gondolajs';

import setup from './add-worker-setup';

TestModule('Add Worker - Worker screen navigation');

TestCase('BMS-433. BMS:マスタ:従業員作成:画面遷移', async () => {
    await setup();
});
