import { locator, page, action } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import { TableHelper } from '../helper/table-helper';
import TableType from '../models/enum-class/table-type';

@page
export class ListExchangeRatePage extends GeneralPage {
    @locator
    protected exchangeTable = "//div[@id='data-table']";
    protected tableHelper = new TableHelper(this.exchangeTable, TableType.TABULAR_DIV);
    protected pageUrl = `${Constants.BMS_BASE_URL}/exchange-rates`;

    @action('check currency name exist')
    public async checkCurrencyNameExist(currencyName: string): Promise<boolean> {
        return await this.tableHelper.doesHeaderValueExist(currencyName);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListExchangeRatePage();
