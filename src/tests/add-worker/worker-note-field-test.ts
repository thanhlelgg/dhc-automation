import { gondola, TestCase, TestModule } from 'gondolajs';
import addWorkerPage from '../../pages/add-worker-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import setup from './add-worker-setup';

TestModule('Add Worker - Worker note field validation');

const WORKER_NOTE_FIELD_NAME = Constants.translator.fieldName.addWorker.note;
const TEXT_1024_CHARACTERS = Utilities.getRandomText(1024);
const TEXT_1025_CHARACTERS = Utilities.getRandomText(1025);

Before(setup);

TestCase('BMS-107. BMS:案件:従業員マスタ作成:備考:文字数', async () => {
    gondola.report(`Step 2.「備考」で1024文字を入力し、保存する`);
    await addWorkerPage.enterTextAreaByLabel(WORKER_NOTE_FIELD_NAME, TEXT_1024_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP. 入力フィールドの下にエラー「1024文字以内で入力してください」が表示されないこと。`);
    //BUG: no feedback was present
    let actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_NOTE_FIELD_NAME);
    await gondola.checkEqual(actualFeedback, '', 'Invalid feedback message should be not displayed');

    gondola.report(`Step 3.「備考」で1025文字以上を入力し、保存する`);
    await addWorkerPage.enterTextAreaByLabel(WORKER_NOTE_FIELD_NAME, TEXT_1025_CHARACTERS);
    await addWorkerPage.saveNewWorker();
    gondola.report(`VP.入力フィールドの下にエラー「1024文字以内で入力してください」が表示されること。`);
    actualFeedback = await addWorkerPage.getInvalidFeedBack(WORKER_NOTE_FIELD_NAME);
    await gondola.checkEqual(
        actualFeedback,
        Constants.EXCEEDED_NOC_ERROR_MESSAGE_1024,
        'Invalid feedback message should be correct',
    );
});
