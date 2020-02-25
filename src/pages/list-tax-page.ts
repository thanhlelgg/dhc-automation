import { action, gondola, page, locator } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import '@src/string.extensions';
import { TableHelper } from '../helper/table-helper';
import TableType from '../models/enum-class/table-type';

@page
export class ListTaxPage extends GeneralPage {
    @locator
    protected taxTable = "//div[@id='data-table']";
    protected tableHelper = new TableHelper(this.taxTable, TableType.TABULAR_DIV);
    private pageUrl = `${Constants.BMS_BASE_URL}/taxes`;
    @locator
    protected taxLink = "//div[@tabulator-field='code']/a[text()='{0}']";
    @locator
    protected deleteButton = "//a[text()='{0}']/../..//div[@tabulator-field='delete']//a";
    @locator
    protected deleteSuccessMessage = `//div[@role='alert' and text()='${Constants.translator.alertMessage.deleteSuccessMessage}']`;
    @locator
    protected deleteFailMessage = `//div[@role='alert' and text()='${Constants.translator.alertMessage.deleteFailMessage}']`;

    @action('wait for alert')
    public async waitForAlert(): Promise<void> {
        await gondola.waitForAlert();
    }

    @action('does delete button display')
    public async doesDeleteButtonDisplay(projectId: string): Promise<boolean> {
        const locator = this.deleteButton.format(projectId);
        return await gondola.doesControlExist(locator);
    }

    @action('does delete success message display')
    public doesDeleteSuccessMessageDisplay(projectId: string): Promise<boolean> {
        return this.doesAlertDisplay(this.deleteSuccessMessage, projectId);
    }

    @action('does delete fail message display')
    public doesDeleteFailMessageDisplay(projectId: string): Promise<boolean> {
        return this.doesAlertDisplay(this.deleteFailMessage, projectId);
    }

    @action('click on delete button')
    public async clickOnDeleteButton(projectId: string): Promise<void> {
        const locator = this.deleteButton.format(projectId);
        await gondola.click(locator);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('open tax by name')
    public async openTaxByName(value: string): Promise<void> {
        await this.tableHelper.clickCellLinkByText(Constants.translator.tableColumnName.taxesList.name, value);
    }
}
export default new ListTaxPage();
