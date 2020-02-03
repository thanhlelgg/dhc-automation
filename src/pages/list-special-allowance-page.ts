import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
@page
export class ListSpecialAllowancePage extends GeneralPage {
    private pageUrl = `${Constants.ttsBaseUrl}/special-allowances`;
    protected specialAllowanceLink = "//div[@tabulator-field='name']/a[text()='{0}']";

    @action('openCustomerByName')
    public async openSpecialAllowanceByCode(name: string): Promise<void> {
        await gondola.click(this.specialAllowanceLink.format(name));
    }

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListSpecialAllowancePage();
