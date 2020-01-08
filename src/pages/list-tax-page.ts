import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';

@page
export class ListTaxPage extends GeneralPage {
    private pageUrl = `${Constants.bmsBaseUrl}/taxs`;
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
