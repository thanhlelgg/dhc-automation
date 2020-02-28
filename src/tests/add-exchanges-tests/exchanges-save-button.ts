import { TestModule, TestCase, gondola } from 'gondolajs';
import exchangeSetup from './add-exchanges-setup';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import addExchangePage from '../../pages/add-exchange-page';
import { ExchangeInfoData } from '../../models/exchange-info';
import listExchangePage from '../../pages/list-exchange-page';
import { Utilities } from '../../common/utilities';
import listExchangeRatePage from '../../pages/list-exchange-rate-page';
import addExchangeRatePage from '../../pages/add-exchange-rate-page';
import addCustomerPage from '../../pages/add-customer-page';
import { Constants } from '../../common/constants';

const EXCHANGE_FULL_DATA = ExchangeInfoData.EXCHANGE_FULL_DATA;
const EXCHANGE_RECORDS_DATA = ExchangeInfoData.EXCHANGE_RECORDS_DATA[0];
const EXCHANGE_CODE_FIELD = Constants.translator.tableColumnName.exchangeRateList.code;

TestModule('Add Exchange - Save button validation');

Before(exchangeSetup);

TestCase('BMS-365. マスタ:通貨作成:保存ボタン:全項目', async () => {
    EXCHANGE_FULL_DATA.code = Utilities.getRandomText(4);
    EXCHANGE_FULL_DATA.currencyName = Utilities.getRandomText(4);
    EXCHANGE_FULL_DATA.currencyUnit = Utilities.getRandomNumberByLength(4).toString();
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「為替」の「通貨登録」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    gondola.report('VP. 新規通貨作成の画面に移動すること。');
    await gondola.checkTrue(await addExchangePage.isCurrentPage(), 'Should be navigated to add exchange page');
    gondola.report('Step 2. 必須項目（「コード(略称)」「通貨名」「通貨記号」）で有効な情報を入力する。');
    await addExchangePage.inputCodeNameSymbolInfo(EXCHANGE_FULL_DATA);
    gondola.report('Step 3. 他の項目で有効な情報を入力する。');
    await addExchangePage.inputUnitRemarksInfo(EXCHANGE_FULL_DATA);
    gondola.report('Step 4. 「保存」ボタンをクリックする。');
    await addExchangePage.saveExchange();
    gondola.report(
        'VP 1. 正常に保存でき、通貨一覧画面には登録した通貨が表示され、登録された通貨の内容は正しく保存されること。',
    );
    await listExchangePage.openExchangeByCode(EXCHANGE_FULL_DATA.code);
    await gondola.checkTrue(await addExchangePage.doesExchangeDisplayCorrectly(EXCHANGE_FULL_DATA));
    gondola.report('VP 2. 登録した通貨は: BMS>マスタ>為替相場一覧に表示される');
    await addExchangePage.gotoListExchangeRatePage();
    await gondola.checkTrue(
        await listExchangeRatePage.checkCurrencyNameExist(EXCHANGE_FULL_DATA.currencyName),
        'Currency name should exist',
    );
    gondola.report('VP 3. 登録した通貨は: BMS>マスタ>為替相場登録画面に表示される');
    await listExchangeRatePage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangeRatePage();
    await gondola.checkTrue(
        await addExchangeRatePage.doesExchangeValueDisplay(EXCHANGE_FULL_DATA.code, EXCHANGE_CODE_FIELD),
        'New exchange should be displayed correctly',
    );
    gondola.report('VP 4. 登録した通貨は: BMS>マスタ>顧客登録画面の取引通貨のプルダウンに表示される');
    await addExchangeRatePage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await gondola.checkTrue(
        await addCustomerPage.checkCurrencyExist(EXCHANGE_FULL_DATA.getCurrencyOption()),
        'Currency should exist',
    );
});

TestCase('BMS-363. マスタ:通貨作成:保存ボタン:必須項目のみ', async () => {
    EXCHANGE_RECORDS_DATA.code = Utilities.getRandomText(4);
    EXCHANGE_RECORDS_DATA.currencyName = Utilities.getRandomText(4);
    gondola.report(
        'Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「為替」の「通貨登録」をクリックします。',
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangePage();
    gondola.report('VP. 新規通貨作成の画面に移動すること。');
    await gondola.checkTrue(await addExchangePage.isCurrentPage(), 'Should be navigated to add exchange page');
    gondola.report('Step 2. 必須項目（「コード(略称)」「通貨名」「通貨記号」）で有効な情報を入力する。');
    await addExchangePage.inputCodeNameSymbolInfo(EXCHANGE_RECORDS_DATA);
    //BUG: save failed because "currency unit", which is a required field, is empty
    gondola.report('Step 3. 「保存」ボタンをクリックする。');
    await addExchangePage.saveExchange();
    gondola.report(
        'VP 1. 正常に保存でき、通貨一覧画面には登録した通貨が表示され、登録された通貨の内容は正しく保存されること。',
    );
    await listExchangePage.openExchangeByCode(EXCHANGE_RECORDS_DATA.code);
    gondola.checkTrue(await addExchangePage.doesExchangeDisplayCorrectly(EXCHANGE_RECORDS_DATA));
    gondola.report('VP 2. 登録した通貨は: BMS>マスタ>為替相場一覧に表示される');
    await addExchangePage.gotoListExchangeRatePage();
    await gondola.checkTrue(
        await listExchangeRatePage.checkCurrencyNameExist(EXCHANGE_RECORDS_DATA.currencyName),
        'Currency name should exist',
    );
    gondola.report('VP 3. 登録した通貨は: BMS>マスタ>為替相場登録画面に表示される');
    await listExchangeRatePage.gotoBusinessSystem();
    await businessSystemPage.gotoAddExchangeRatePage();
    await gondola.checkTrue(
        await addExchangeRatePage.doesExchangeValueDisplay(EXCHANGE_FULL_DATA.code, EXCHANGE_CODE_FIELD),
        'New exchange should be displayed correctly',
    );
    gondola.report('VP 4. 登録した通貨は: BMS>マスタ>顧客登録画面の取引通貨のプルダウンに表示される');
    await addExchangeRatePage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    await gondola.checkTrue(
        await addCustomerPage.checkCurrencyExist(EXCHANGE_FULL_DATA.getCurrencyOption()),
        'Currency should exist',
    );
});
