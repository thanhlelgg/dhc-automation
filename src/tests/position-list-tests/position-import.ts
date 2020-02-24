import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './positions-setup';
import listPositionPage from '../../pages/list-position-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';

TestModule('Positions - Import validation');

Before(setup);

TestCase('TMS-137. マスタ:役職一覧:インポート操作:ファイル選択', async () => {
    gondola.report(`Step 2.「インポートボタン 」ボタンをクリックする。`);
    await listPositionPage.clickButtonByIcon(ButtonIcon.UPLOAD);
    gondola.report(`VP. 役職のインポート操作画面に遷移すること。`);
    await gondola.checkTrue(
        await listPositionPage.doesImportModalDisplay(),
        'Import modal windows should be displayed',
    );
    gondola.report(`Step 3.ファイルを選択しなくて、「保存」ボタンをクリックする。`);
    await listPositionPage.clickButtonByIcon(ButtonIcon.CHECK);
    // TODO: update when requirement is ready
    gondola.report(`VP. 「。。。」というエラーが表示されること。`);
});

TestCase('TMS-138. マスタ:役職一覧:インポート操作:戻る', async () => {
    gondola.report(`Step 2.「インポートボタン 」ボタンをクリックする。`);
    await listPositionPage.clickButtonByIcon(ButtonIcon.UPLOAD);
    gondola.report(`VP. 役職のインポート操作画面に遷移すること。`);
    await gondola.checkTrue(
        await listPositionPage.doesImportModalDisplay(),
        'Import modal windows should be displayed',
    );
    gondola.report(`Step 3.「戻る」ボタンをクリックする。`);
    await listPositionPage.clickButtonByIcon(ButtonIcon.DOUBLE_LEFT);
    gondola.report(`VP. 役職一覧画面に遷移すること。`);
    await gondola.checkFalse(
        await listPositionPage.doesImportModalDisplay(false),
        'Import modal windows should not be displayed',
    );
});

TestCase('TMS-139. マスタ:役職一覧:インポート操作:戻る', async () => {
    gondola.report(`Step 2.「インポートボタン 」ボタンをクリックする。`);
    await listPositionPage.clickButtonByIcon(ButtonIcon.UPLOAD);
    gondola.report(`VP. 役職のインポート操作画面に遷移すること。`);
    await gondola.checkTrue(
        await listPositionPage.doesImportModalDisplay(),
        'Import modal windows should be displayed',
    );
    gondola.report(`Step 3.「サンプルファイルをDL」ボタンをクリックする。`);
    await listPositionPage.removeDownloadedFile(Constants.POSITION_FILENAME);
    await listPositionPage.clickButtonByIcon(ButtonIcon.DOWNLOAD);
    gondola.report(`VP. インポート用のサンプルファイルは正常にダウンロードされること。`);
    await gondola.checkTrue(
        await listPositionPage.isFileDownloadedCorrectly(Constants.POSITION_FILENAME),
        'Position template should be downloaded correctly',
    );
});

TestCase('TMS-140. マスタ:役職一覧:インポート操作:保存', async () => {
    const inputFilePath = Constants.POSITION_CSV_PATH;
    gondola.report(`Pre-condition 2. Remove position if already exists`);
    await listPositionPage.removePositionIfExistFromCSVFile(inputFilePath);
    gondola.report(`Step 2.「インポートボタン 」ボタンをクリックする。`);
    await listPositionPage.clickButtonByIcon(ButtonIcon.UPLOAD);
    gondola.report(`VP. 役職のインポート操作画面に遷移すること。`);
    await gondola.checkTrue(
        await listPositionPage.doesImportModalDisplay(),
        'Import modal windows should be displayed',
    );
    gondola.report(`Step 3. 有効なデータファイルを選択し、「保存」ボタンをクリックする。`);
    await listPositionPage.uploadFile(inputFilePath);
    await listPositionPage.clickButtonByIcon(ButtonIcon.CHECK);
    gondola.report(`VP. ファイルのデータは正常にインポートされ、役職一覧画面で表示されること。`);
    await gondola.checkTrue(
        await listPositionPage.isPositionImportedCorrectly(inputFilePath),
        'Position should be imported correctly',
    );
});
