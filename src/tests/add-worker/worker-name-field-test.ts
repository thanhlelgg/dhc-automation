import { gondola, TestCase, TestModule } from 'gondolajs';
import addWorkerPage from '../../pages/add-worker-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import setup from './add-worker-setup';

TestModule('Add Worker - Worker name field validation');

const WORKER_NAME_FIELD_NAME = Constants.translator.fieldName.addWorker.name;

Before(setup);

TestCase('BMS-103. BMS:案件:従業員マスタ作成:従業員名:入力確認', async () => {
    gondola.report(`Step 2.「従業員名」で入力しなくて、保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須です」が表示されること。`);
    const actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_NAME_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.FIELD_REQUIRED_ERROR_MESSAGE,
        'Invalid feedback message should be correct',
    );
    gondola.report(`Step 3.「従業員名」で64文字を入力し、「保存」ボタンをクリックする。`);
    const maxNOC = 64;
    await addWorkerPage.enterTextFieldByLabel(WORKER_NAME_FIELD_NAME, Utilities.getRandomText(maxNOC));
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addWorkerPage.getInvalidFeedBack(WORKER_NAME_FIELD_NAME),
        '',
        'Invalid feedback message should be not displayed.',
    );

    gondola.report(`Step 4. 「従業員名」で65文字以上を入力し、「保存」ボタンをクリックする。`);
    await addWorkerPage.enterTextFieldByLabel(WORKER_NAME_FIELD_NAME, Utilities.getRandomText(maxNOC + 1));
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    await gondola.checkNotEqual(
        await addWorkerPage.getInvalidFeedBack(WORKER_NAME_FIELD_NAME),
        maxNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback message should be correct.',
    );
});
