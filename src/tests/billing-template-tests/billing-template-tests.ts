import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';

import { Constants } from '../../common/constants';

import deliveryTemplatePage from '../../pages/delivery-template-page';

TestModule('Billing template - Test all functions');

Before(setup);

TestCase('BMS-239. BMS:マスタ:テンプレート:請求書:新規登録:ファイル未指定', async () => {
    gondola.report(`Step 2. ァイルを指定せずに、「新規登録」ボタンをクリックする。`);
    await deliveryTemplatePage.clickSubmitButton();
    gondola.report(`VP. 「ファイルがセットされていません。」というエラーが表示されること。`);
    gondola.checkTrue(
        await deliveryTemplatePage.doesAlertMessageDisplay(Constants.translator.alertMessage.fileHasNotBeenSet),
    );
});

TestCase('BMS-240. BMS:マスタ:テンプレート:請求書:新規登録:成功保存', async () => {
    gondola.report(`Pre-condition. Remove template file if exist`);
    await deliveryTemplatePage.removeTemplateFileIfExist(Constants.BILLING_FILENAME);
    gondola.report(`Step 2. 「ファイルを選択」ボタンをクリックし、ファイルを選択する。`);
    await deliveryTemplatePage.uploadFile(Constants.BILLING_XLS_PATH);
    gondola.report(`VP. 新規登録画面で選択したファイル名が反映されること。`);
    gondola.checkEqual(
        await deliveryTemplatePage.getUploadedFileName(),
        Constants.BILLING_FILENAME,
        'Uploaded file name is not displayed correctly',
    );
    gondola.report(`Step 3. 「新規登録」ボタンをクリックする。`);
    await deliveryTemplatePage.clickSubmitButton();
    gondola.report(`VP. 指定のファイルが登録され、画面に表示されること。`);
    gondola.checkTrue(
        await deliveryTemplatePage.doesTemplateExist(Constants.BILLING_FILENAME),
        'Template should be uploaded correctly',
    );
});

TestCase('BMS-241. BMS:マスタ:テンプレート:請求書:ファイル名クリック', async () => {
    gondola.report(`Step 2. 登録したファイルの一覧で任意のファイル名をクリックする。`);
    await deliveryTemplatePage.downloadTemplate(Constants.BILLING_FILENAME);
    gondola.report(`VP. 対象のファイルがダウンロードされること。`);
    gondola.checkTrue(
        await deliveryTemplatePage.checkTemplateDownloaded(Constants.BILLING_FILENAME),
        'Template should be downloaded',
    );
});

TestCase('BMS-242. BMS:マスタ:テンプレート:請求書:削除ボタン', async () => {
    gondola.report(`Pre-condition. Upload template file if doesn't exist`);
    await deliveryTemplatePage.uploadTemplateFileIfDoesNotExist(Constants.BILLING_XLS_PATH, Constants.BILLING_FILENAME);
    gondola.report(`Step 2. 任意のファイル名の行で「削除」ボタンをクリックする。`);
    await deliveryTemplatePage.removeTemplateFile(Constants.BILLING_FILENAME);
    gondola.report(`VP. 確認アラートが表示されること。`);
    gondola.checkEqual(
        await deliveryTemplatePage.getWindowsAlertMessage(),
        Constants.BILLING_FILENAME + Constants.translator.alertMessage.agreeToDeleteType2,
        'Alert should be displayed correctly',
    );
    gondola.report(`Step 3. アラートで「OK」ボタンをクリックする。`);
    await deliveryTemplatePage.clickWindowAlertMessage('OK');
    gondola.report(`VP. 一覧からファイルが削除されること。`);
    gondola.checkFalse(
        await deliveryTemplatePage.doesTemplateExist(Constants.BILLING_FILENAME),
        'Template should be removed correctly',
    );
});
