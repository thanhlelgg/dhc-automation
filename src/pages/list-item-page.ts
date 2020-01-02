import { action, gondola, locator, page } from 'gondolajs';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { GeneralPage } from './general-page';
@page
export class ListItemPage extends GeneralPage {
    private pageUrl = `${Constants.bmsBaseUrl}/items`;
    @locator
    protected itemCode = "//input[@id='cd']";
    @locator
    protected itemName = "//input[@id='name']";
    @locator
    protected segmentCode = "//input[@id='segment-code']";
    @locator
    protected segmentName = "//input[@id='segment-name']";
    @locator
    protected searchButton = "//button[@class='btn btn-info px-5 mr-2']";
    @locator
    @locator
    protected editItemLinkStr = `//div[@tabulator-field='cd']/a[.='{0}']`;
    @locator
    protected dataTable = "//div[@id='data-table']";

    @action('search item')
    public async searchItem(filter: {
        itemCode?: string;
        itemName?: string;
        managementSection?: string;
        displayTarget?: string;
        segmentCode?: string;
        segmentName?: string;
    }): Promise<void> {
        if (filter.itemCode) {
            await gondola.enter(this.itemCode, filter.itemCode);
        }
        if (filter.itemName) {
            await gondola.enter(this.itemName, filter.itemName);
        }
        if (filter.managementSection) {
            await gondola.enter(this.segmentCode, filter.managementSection);
        }
        if (filter.displayTarget) {
            await gondola.enter(this.segmentName, filter.displayTarget);
        }
        if (filter.segmentCode) {
        }

        // click search
        await gondola.click(this.searchButton);
        await gondola.waitUntilStalenessOfElement(this.dataTable, Constants.VERY_SHORT_TIMEOUT);
    }

    @action('get item link')
    public getItemLink(itemCode: string): string {
        return Utilities.formatString(this.editItemLinkStr, itemCode);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListItemPage();
