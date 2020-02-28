import { locator, page, action } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import { TableHelper } from '../helper/table-helper';
import TableType from '../models/enum-class/table-type';

@page
export class ListExchangePage extends GeneralPage {
    protected pageUrl = `${Constants.BMS_BASE_URL}/exchanges`;
    @locator
    protected exchangeTable = "//div[@id='data-table']";
    protected tableHelper = new TableHelper(this.exchangeTable, TableType.TABULAR_DIV);
    protected tableColumnName = Constants.translator.columnName.exchangeInfor;

    @action('open exchange by code')
    public async openExchangeByCode(code: string): Promise<void> {
        await this.tableHelper.clickCellLinkByText(this.tableColumnName.code, code);
    }

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListExchangePage();
