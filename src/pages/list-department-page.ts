import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
@page
export class ListDepartmentPage extends GeneralPage {
    protected pageUrl = 'https://dhcbms.digitalhearts.com/departments';
    @locator
    protected departmentLink = "//div[@tabulator-field='cd']/a[text()='{0}']";

    @action('openCustomerByName')
    public async openDepartmentByCode(name: string): Promise<void> {
        await gondola.click(this.departmentLink.format(name));
    }

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListDepartmentPage();
