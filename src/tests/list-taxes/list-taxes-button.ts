import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './taxes-setup';
import listTaxPage from '../../pages/list-tax-page';
import addTaxPage from '../../pages/add-tax-page';
import { Constants } from '../../common/constants';

const AGREE_TO_DELETE = Constants.translator.alertMessage.agreeToDelete;
const COULD_NOT_DELETE = Constants.translator.alertMessage.couldNotDelete;

TestModule('Tax page - tax page button');

Before(setup);

TestCase('BMS-392. マスタ:税率一覧:新規登録ボタン', async () => {
    gondola.report('Step 2. 新規登録ボタンをクリックする');
    await listTaxPage.clickAddButton();
    gondola.report(`VP. 新規登録画面に遷移すること。`);
    await gondola.checkTrue(await addTaxPage.isCurrentPage(), 'Should be navigated to Add tax page');
});

TestCase('BMS-393. マスタ:税率一覧:削除ボタン:削除ボタン:削除対象の税率の案件作成済の場合', async () => {
    gondola.report('Step 2. 前提条件の税行で削除ボタンをクリックする');
    await listTaxPage.clickOnDeleteButton('10%');
    gondola.report('VP. 確認アラート画面が表示されること。');
    await gondola.waitForAlert();
    gondola.checkEqual(await gondola.getPopupText(), AGREE_TO_DELETE, 'alert message should be displayed correctly');
    gondola.report('Step 3. アラート画面で確認する');
    await gondola.clickPopup('ok');
    gondola.report('VP. 削除はできない、エラー「この税率で案件情報があるため削除できません」が表示されること。');
    await gondola.waitForAlert();
    await gondola.checkEqual(await gondola.getPopupText(), COULD_NOT_DELETE, 'alert should be displayed correctly');
});

TestCase('BMS-394. マスタ:税率一覧:削除ボタン:削除対象の税率の案件未作成の場合', async () => {
    gondola.report('Step 2. 前提条件の税行で削除ボタンをクリックする');
    await listTaxPage.clickOnDeleteButton('10%');
    gondola.report('VP. 確認アラート画面が表示されること。');
    await gondola.waitForAlert();
    gondola.checkEqual(await gondola.getPopupText(), AGREE_TO_DELETE, 'alert message should be displayed correctly');
    gondola.report('Step 3. アラート画面で確認する');
    await gondola.clickPopup('ok');
    gondola.report('VP. 正常に削除できること。');
    await gondola.waitForAlert();
});
