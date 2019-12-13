import { gondola, TestCase, TestModule } from 'gondolajs';
import loginPage from '../../pages/login-page';
import addWorkerPage from '../../pages/add-worker-page';
import businessSystemPage from '../../pages/business-system-page';
import { Constants } from '../../common/constants';
import { WorkerInfoData } from '../../models/worker-info';
import listWorkerPage from '../../pages/list-worker-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Worker Successfully');

const WORKER_INFO_REQUIRED_ONLY = WorkerInfoData.WORKER_REQUIRED_DATA;
const WORKER_INFO_FULL = WorkerInfoData.WORKER_FULL_DATA;

Before(async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.adminUserName, Constants.adminPassword);

    gondola.report(`Step 1.新規従業員登録の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();
});

TestCase('BMS-143. BMS:案件:従業員マスタ作成:保存:必須項目のみ', async () => {
    gondola.report(`Step 2.必須項目で情報を入力する`);
    WORKER_INFO_REQUIRED_ONLY.workerCode = Utilities.getRandomText(7);
    await addWorkerPage.inputWorkerInformation(WORKER_INFO_REQUIRED_ONLY);

    gondola.report(`Step 3.保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(
        `VP. 正常に保存でき、従業員一覧画面には登録した従業員が表示され、登録された従業員の内容は正しく保存されること。`,
    );
    await businessSystemPage.gotoListWorker();
    await listWorkerPage.searchWorker(WORKER_INFO_REQUIRED_ONLY.workerCode);
    await gondola.checkControlExist(listWorkerPage.getWorkerLink(WORKER_INFO_REQUIRED_ONLY.workerCode));

    gondola.report('Verify content of new project are displayed correctly');

    await gondola.click(listWorkerPage.getWorkerLink(WORKER_INFO_REQUIRED_ONLY.workerCode));
    await gondola.checkEqual(
        await addWorkerPage.doesContentOfWorkerDisplayCorrect(WORKER_INFO_REQUIRED_ONLY),
        true,
        'One of content of worker displays incorrectly.',
    );
});

TestCase('BMS-144. BMS:案件:従業員マスタ作成:保存:全ての項目', async () => {
    gondola.report(`Step 2.必須項目で情報を入力する`);
    gondola.report(`Step 3.他の項目で情報を入力する`);
    WORKER_INFO_FULL.workerCode = Utilities.getRandomText(7);
    await addWorkerPage.inputWorkerInformation(WORKER_INFO_FULL);

    gondola.report(`Step 4.保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(
        `VP. 正常に保存でき、従業員一覧画面には登録した従業員が表示され、登録された従業員の内容は正しく保存されること。`,
    );
    await businessSystemPage.gotoListWorker();
    await listWorkerPage.searchWorker(WORKER_INFO_FULL.workerCode);
    await gondola.checkControlExist(listWorkerPage.getWorkerLink(WORKER_INFO_FULL.workerCode));

    gondola.report('Verify content of new project are displayed correctly');

    await gondola.click(listWorkerPage.getWorkerLink(WORKER_INFO_FULL.workerCode));
    await gondola.checkEqual(
        await addWorkerPage.doesContentOfWorkerDisplayCorrect(WORKER_INFO_FULL),
        true,
        'One of content of worker displays incorrectly.',
    );
});