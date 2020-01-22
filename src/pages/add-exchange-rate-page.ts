import { locator, page, action } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import { TableHelper } from '../helper/table-helper';

@page
export class AddExchangeRatePage extends GeneralPage {
    protected pageUrl = `${Constants.BMS_BASE_URL}/exchange-rates/add`;
    @locator
    protected exchangesTable = '//table';
    protected tableHelper = new TableHelper(this.exchangesTable);

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('does exchange value display')
    public async doesExchangeValueDisplay(value: string, header: string): Promise<boolean> {
        return await this.tableHelper.doesRowValueExists(header, value);
    }
}
export default new AddExchangeRatePage();
