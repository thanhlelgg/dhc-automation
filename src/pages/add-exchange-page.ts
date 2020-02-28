import { action, gondola, page } from 'gondolajs';
import '@src/string.extensions';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import { ButtonIcon } from '../models/enum-class/button-icon';
import { ExchangeInfo } from '../models/exchange-info';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import businessSystemPage from './business-system-page';

@page
export class AddExchangePage extends GeneralPage {
    protected pageUrl = `${Constants.BMS_BASE_URL}/exchanges/add`;
    fieldName = Constants.translator.fieldName.addExchange;

    @action('input code name symbol info')
    public async inputCodeNameSymbolInfo(exchangeInfo: ExchangeInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.code, exchangeInfo.code);
        await this.enterTextFieldByLabel(this.fieldName.currencyName, exchangeInfo.currencyName);
        await this.enterTextFieldByLabel(this.fieldName.currencySymbol, exchangeInfo.currencySymbol);
    }

    @action('input unit remarks info')
    public async inputUnitRemarksInfo(exchangeInfo: ExchangeInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.currencyUnit, exchangeInfo.currencyUnit);
        await this.enterTextAreaByLabel(this.fieldName.remarks, exchangeInfo.remarks);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('save exchange')
    public async saveExchange(): Promise<void> {
        await this.clickButtonByIcon(ButtonIcon.SAVE);
    }

    @action('does exchange display correctly')
    public async doesExchangeDisplayCorrectly(exchangeInfo: ExchangeInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Exchange code should be displayed correctly',
            exchangeInfo.code,
            await this.getTextFieldValueByLabel(this.fieldName.code),
        );
        FlagsCollector.collectEqual(
            'Exchange currency name should be displayed correctly',
            exchangeInfo.currencyName,
            await this.getTextFieldValueByLabel(this.fieldName.currencyName),
        );
        FlagsCollector.collectEqual(
            'Exchange currency unit should be displayed correctly',
            exchangeInfo.currencyUnit,
            await this.getTextFieldValueByLabel(this.fieldName.currencyUnit),
        );
        FlagsCollector.collectEqual(
            'Exchange currency symbol should be displayed correctly',
            exchangeInfo.currencySymbol,
            await this.getTextFieldValueByLabel(this.fieldName.currencySymbol),
        );
        FlagsCollector.collectEqual(
            'Exchange remarks should be displayed correctly',
            exchangeInfo.remarks,
            await this.getTextAreaValueByLabel(this.fieldName.remarks),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('go to list exchange rate page')
    public async gotoListExchangeRatePage(): Promise<void> {
        await gondola.navigate(Constants.BMS_BASE_URL);
        await businessSystemPage.gotoListExchangeRatePage();
    }
}
export default new AddExchangePage();
