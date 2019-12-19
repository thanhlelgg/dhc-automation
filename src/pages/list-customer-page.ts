import { action, gondola, locator, page } from 'gondolajs';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { GeneralPage } from './general-page';
@page
export class ListCustomerPage extends GeneralPage {
    @locator
    protected customerLink = "//div[@tabulator-field='顧客コード']/a[text()='{0}']";

    @action('openCustomerByName')
    public async openCustomerByCode(name: string): Promise<void> {
        await gondola.click(this.customerLink.format(name));
    }
}
export default new ListCustomerPage();
