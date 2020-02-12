import { TestCase, TestModule } from 'gondolajs';

import setup from './setup';

TestModule('Add Working place - Screen navigation');

TestCase('BMS-434. TMS:マスタ:ラボ管理作成:画面遷移', async () => {
    await setup();
});
