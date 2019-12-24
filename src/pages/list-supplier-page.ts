import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
@page
export class ListSupplierPage extends GeneralPage {
    @locator
    protected supplierLink = "//div[@tabulator-field='仕入先コード']/a[text()='{0}']";

    @action('openCustomerByName')
    public async openSupplierByCode(name: string): Promise<void> {
        const locator = this.supplierLink.format(name);
        await gondola.waitUntilStalenessOfElement(locator);
        await gondola.scrollToElement(locator);
        await gondola.click(locator);
    }
}
export default new ListSupplierPage();
