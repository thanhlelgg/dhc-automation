import { action, gondola, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import '@src/string.extensions';
import { Utilities } from '../common/utilities';

@page
export class ListTaxPage extends GeneralPage {
    private pageUrl = `${Constants.BMS_BASE_URL}/taxes`;
    protected taxLink = "//div[@tabulator-field='code']/a[text()='{0}']";
    protected deleteButton = "//a[text()='{0}']/../..//div[@tabulator-field='delete']//a";
    @action('openCustomerByName')
    public async openTaxByCode(name: string): Promise<void> {
        await gondola.click(this.taxLink.format(name));
    }

    @action('verify if delete button is enabled')
    public async isTTSLinkDisabled(projectId: string): Promise<boolean> {
        const locator = Utilities.formatString(this.deleteButton, projectId);
        return (await gondola.getControlProperty(locator, 'class')).indexOf('disabled') >= 0;
    }

    @action('click on delete button')
    public async clickOnDeleteButton(projectId: string): Promise<void> {
        const locator = Utilities.formatString(this.deleteButton, projectId);
        await gondola.scrollToElement(locator);
        await gondola.click(locator);
    }

    @action('isCurrentPage')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('checkControlExist')
    public async checkControlExist(): Promise<void> {
        await gondola.checkControlNotExist(this.deleteButton);
    }
}
export default new ListTaxPage();
