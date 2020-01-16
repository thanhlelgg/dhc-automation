import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Customer - Customer note field validation');

const CUSTOMER_NOTE_TEXTAREA_LABEL = Constants.translator.fieldName.addCustomer.note;
Before(setup);

TestCase('BMS-101. 案件:得意先マスタ作成:顧客情報:備考 :文字数', async () => {
    gondola.report(`Step 2.「備考」で1024文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 1024;
    await addCustomerPage.enterTextAreaByLabel(CUSTOMER_NOTE_TEXTAREA_LABEL, Utilities.getRandomText(maximumNOC));
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力したフィールドの下にエラー「1024文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_NOTE_TEXTAREA_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report(`Step 3.「備考」で1025文字以上を入力し、「保存」ボタンをクリックする。`);
    await addCustomerPage.enterTextAreaByLabel(CUSTOMER_NOTE_TEXTAREA_LABEL, Utilities.getRandomText(maximumNOC + 1));
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力したフィールドの下にエラー「1024文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addCustomerPage.getInvalidFeedBack(CUSTOMER_NOTE_TEXTAREA_LABEL),
        maximumNOC.toString() + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});
