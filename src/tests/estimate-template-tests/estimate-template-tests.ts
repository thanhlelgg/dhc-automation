import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';

import { Constants } from '../../common/constants';

import estimateTemplatePage from '../../pages/estimate-template-page';

TestModule('Estimate template - Test all functions');

Before(setup);

TestCase('BMS-229. BMS:マスタ:テンプレート:見積書:新規登録:ファイル未指定', async () => {
    gondola.report(`Step 2. ファイルを指定せずに、「新規登録」ボタンをクリックする。`);
    await estimateTemplatePage.clickSubmitButton();
    gondola.report(`VP. 「ファイルがセットされていません。」というエラーが表示されること。`);
    gondola.checkTrue(
        await estimateTemplatePage.doesAlertMessageDisplay(Constants.translator.alertMessage.fileHasNotBeenSet),
    );
});

TestCase('BMS-230. BMS:マスタ:テンプレート:見積書:新規登録:成功保存', async () => {
    gondola.report(`Pre-condition. Remove template file if exist`);
    await estimateTemplatePage.removeTemplateFileIfExist(Constants.ESTIMATE_FILENAME);
    gondola.report(`Step 2. 「ファイルを選択」ボタンをクリックし、ファイルを選択する。`);
    await estimateTemplatePage.uploadFile(Constants.ESTIMATE_XLS_PATH);
    gondola.report(`VP. 新規登録画面で選択したファイル名が反映されること。`);
    gondola.checkEqual(
        await estimateTemplatePage.getUploadedFileName(),
        Constants.ESTIMATE_FILENAME,
        'Uploaded file name is not displayed correctly',
    );
    gondola.report(`Step 3. 「新規登録」ボタンをクリックする。`);
    await estimateTemplatePage.clickSubmitButton();
    gondola.report(`VP. 指定のファイルが登録され、画面に表示されること。`);
    gondola.checkTrue(
        await estimateTemplatePage.doesTemplateExist(Constants.ESTIMATE_FILENAME),
        'Template should be uploaded correctly',
    );
});

TestCase('BMS-231. BMS:マスタ:テンプレート:見積書:ファイル名クリック', async () => {
    gondola.report(`Step 2. 登録したファイルの一覧で任意のファイル名をクリックする。`);
    await estimateTemplatePage.downloadTemplate(Constants.ESTIMATE_FILENAME);
    gondola.report(`VP. 対象のファイルがダウンロードされること。`);
    gondola.checkTrue(
        await estimateTemplatePage.checkTemplateDownloaded(Constants.ESTIMATE_FILENAME),
        'Template should be downloaded',
    );
});

TestCase('BMS-232. BMS:マスタ:テンプレート:見積書:削除ボタン', async () => {
    gondola.report(`Pre-condition. Upload template file if doesn't exist`);
    await estimateTemplatePage.uploadTemplateFileIfDoesNotExist(
        Constants.ESTIMATE_XLS_PATH,
        Constants.ESTIMATE_FILENAME,
    );
    gondola.report(`Step 2. 任意のファイル名の行で「削除」ボタンをクリックする。`);
    await estimateTemplatePage.removeTemplateFile(Constants.ESTIMATE_FILENAME);
    gondola.report(`VP. 確認アラートが表示されること。`);
    gondola.checkEqual(
        await estimateTemplatePage.getWindowsAlertMessage(),
        Constants.ESTIMATE_FILENAME + Constants.translator.alertMessage.agreeToDeleteType2,
        'Alert should be displayed correctly',
    );
    gondola.report(`Step 3. アラートで「OK」ボタンをクリックする。`);
    await estimateTemplatePage.clickWindowAlertMessage('OK');
    gondola.report(`VP. 一覧からファイルが削除されること。`);
    gondola.checkFalse(
        await estimateTemplatePage.doesTemplateExist(Constants.ESTIMATE_FILENAME),
        'Template should be removed correctly',
    );
});
