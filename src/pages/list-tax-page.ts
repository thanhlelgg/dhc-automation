import { action, gondola, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import '@src/string.extensions';

@page
export class ListTaxPage extends GeneralPage {
    private pageUrl = `${Constants.BMS_BASE_URL}/taxs`;
    protected taxLink = "//div[@tabulator-field='code']/a[text()='{0}']";

    @action('openCustomerByName')
    public async openTaxByCode(name: string): Promise<void> {
        await gondola.click(this.taxLink.format(name));
    }

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListTaxPage();
