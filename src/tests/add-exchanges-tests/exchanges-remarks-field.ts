import { TestModule, TestCase, gondola } from 'gondolajs';
import preconditionSetup from './precodition-setup';
import addExchangePage from '../../pages/add-exchange-page';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';

const EXCHANGE_REMARKS_TEXTFIELD_LABEL = Constants.translator.fieldName.addExchange.remarks;

TestModule('Add exchange page - Exchange remarks field validation');

Before(preconditionSetup);

TestCase('BMS-361. マスタ:通貨作成:通貨備考:文字数', async () => {
    gondola.report('Step 2. 「通貨備考」で1024桁の数値を入力し、「保存」ボタンをクリックする。');
    const maximumNOC = 1024;
    await addExchangePage.enterTextAreaByLabel(EXCHANGE_REMARKS_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addExchangePage.saveExchange();
    gondola.report(`VP. 入力したフィールドの下にエラー「1024文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_REMARKS_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );
    gondola.report(`Step 3.「通貨備考」で1025桁以上の数値を入力し、「保存」ボタンをクリックする。`);
    await addExchangePage.enterTextAreaByLabel(
        EXCHANGE_REMARKS_TEXTFIELD_LABEL,
        Utilities.getRandomText(maximumNOC + 1),
    );
    await addExchangePage.saveExchange();
    gondola.report(`VP. 入力したフィールドの下にエラー「1024文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addExchangePage.getInvalidFeedBack(EXCHANGE_REMARKS_TEXTFIELD_LABEL),
        maximumNOC + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});
