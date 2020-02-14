import { action, gondola, locator, page } from 'gondolajs';
import { Utilities } from '../common/utilities';
import { GeneralPage } from './general-page';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { Constants } from '../common/constants';
@page
export class ListProjectPage extends GeneralPage {
    protected pageUrl = `${Constants.BMS_BASE_URL}/`;
    @locator
    protected projectCode = { id: 'number' };
    @locator
    protected projectName = { id: 'name' };
    @locator
    protected customerName = { css: '.select2-selection' };
    // Locators for selectCustomer
    @locator
    private spanSelectCustomer = { xpath: "//select[@id='business-customer']/following-sibling::span" };
    @locator
    private tbSelectCustomer = { xpath: "//input[@class='select2-search__field']" };
    @locator
    private spanSelectedCustomer = { xpath: "//span[@id='select2-business-customer-container']" };
    @locator
    private btnClearSelectedCustomer = {
        xpath: "//span[@id='select2-business-customer-container']/span[@class='select2-selection__clear']",
    };
    private liCustomerResult = (name: string) =>
        `//ul[@id='select2-business-customer-results']/li[contains(text(), '${name}')]`;

    @locator
    protected status = { id: 'status' };
    @locator
    protected billingType = { id: 'billing-type' };
    @locator
    protected accuracy = { id: 'accuracy' };
    @locator
    protected tag = { id: 'tag' };
    @locator
    protected startDateStart = { id: 'start-date-start' };
    @locator
    protected startDateEnd = { id: 'start-date-end' };
    @locator
    protected endDateStart = { id: 'end-date-start' };
    @locator
    protected endDateEnd = { id: 'end-date-end' };
    @locator
    protected scheduleStartDateStart = { id: 'scheduled-start-date-start' };
    @locator
    protected scheduleStartDateEnd = { id: 'scheduled-start-date-end' };
    @locator
    protected scheduleEndDateStart = { id: 'scheduled-end-date-start' };
    @locator
    protected scheduleEndDateEnd = { id: 'scheduled-end-date-end' };
    @locator
    protected searchButton = "//button[@class='btn btn-info px-5 mr-2']";
    @locator
    protected addNewButton = `//a[contains(.,'${this.translator.fieldName.listProject.addNewButton}')]`;
    @locator
    protected ttsLinkByProjectId = `//div[div[@tabulator-field='number']/a[text()='{0}']]/div[@tabulator-field='tts']//a`;
    @locator
    protected editProjectLinkStr = `//div[@tabulator-field='number']/a[.='{0}']`;

    @locator
    protected resultsByProjectCode = `//div[@tabulator-field='number' and @role='gridcell']`;
    @locator
    protected resultsByProjectName = `//div[@tabulator-field='name' and @role='gridcell']`;
    @locator
    protected resultsByCustomer = `//div[@tabulator-field='business_customer' and @role='gridcell']`;
    @locator
    protected resultsByStatus = `//div[@tabulator-field='status' and @role='gridcell']`;
    @locator
    protected resultsByStartDate = `//div[@tabulator-field='start_date' and @role='gridcell']`;
    @locator
    protected resultsByEndDate = `//div[@tabulator-field='end_date' and @role='gridcell']`;
    @locator
    protected resultsByLab = `//div[@tabulator-field='lab_code' and @role='gridcell']`;

    @locator
    protected pageLink = `//ul[@class='pagination green']/li[.='{0}']`;
    @locator
    protected resultTable = `//div[@id='data-table']`;

    private async selectCustomer(customerName: string): Promise<void> {
        await gondola.click(this.spanSelectCustomer);
        await gondola.enter(this.tbSelectCustomer, customerName);
        await gondola.click(this.liCustomerResult(customerName));
    }

    public async clearSelectedCustomer(): Promise<void> {
        await gondola.click(this.btnClearSelectedCustomer);
        await gondola.click(this.spanSelectCustomer);
    }

    public async getCurrentSelectedCustomer(): Promise<string> {
        return await gondola.getText(this.spanSelectedCustomer);
    }

    @action('search project')
    public async searchProject(filter: {
        projectCode?: string;
        projectName?: string;
        customerName?: string;
        status?: string;
        billingType?: string;
        accuracy?: string;
        tag?: string;
        startDateStart?: string;
        startDateEnd?: string;
        endDateStart?: string;
        endDateEnd?: string;
        scheduleStartDateStart?: string;
        scheduleStartDateEnd?: string;
        scheduleEndDateStart?: string;
        scheduleEndDateEnd?: string;
    }): Promise<void> {
        if (filter.projectCode) {
            await gondola.enter(this.projectCode, filter.projectCode);
        }
        if (filter.projectName) {
            await gondola.enter(this.projectName, filter.projectName);
        }
        if (filter.customerName) {
            await this.selectCustomer(filter.customerName);
        }
        if (filter.status) {
            await gondola.selectOptionByText(this.status, filter.status);
        }
        if (filter.billingType) {
            await gondola.selectOptionByText(this.billingType, filter.billingType);
        }
        if (filter.accuracy) {
            await gondola.selectOptionByText(this.accuracy, filter.accuracy);
        }
        if (filter.tag) {
            await gondola.enter(this.tag, filter.tag);
        }
        if (filter.startDateStart) {
            await gondola.enter(this.startDateStart, filter.startDateStart);
        }
        if (filter.startDateEnd) {
            await gondola.enter(this.startDateEnd, filter.startDateEnd);
        }
        if (filter.endDateStart) {
            await gondola.enter(this.endDateStart, filter.endDateStart);
        }
        if (filter.endDateEnd) {
            await gondola.enter(this.endDateEnd, filter.endDateEnd);
        }
        if (filter.scheduleStartDateStart) {
            await gondola.enter(this.scheduleStartDateStart, filter.scheduleStartDateStart);
        }
        if (filter.scheduleStartDateEnd) {
            await gondola.enter(this.scheduleStartDateEnd, filter.scheduleStartDateEnd);
        }
        if (filter.scheduleEndDateStart) {
            await gondola.enter(this.scheduleEndDateStart, filter.scheduleEndDateStart);
        }
        if (filter.scheduleEndDateEnd) {
            await gondola.enter(this.scheduleEndDateEnd, filter.scheduleEndDateEnd);
        }
        // click search
        await gondola.click(this.searchButton);
        await gondola.waitUntilStalenessOfElement(this.resultTable);
    }

    @action('get project link')
    public getProjectLink(projectCode: string): string {
        return Utilities.formatString(this.editProjectLinkStr, projectCode);
    }

    @action('open project by code')
    public async openProject(projectCode: string): Promise<void> {
        await gondola.scrollToElement(this.getProjectLink(projectCode));
        await gondola.click(this.getProjectLink(projectCode));
    }

    @action('verify if TTS link is enabled')
    public async isTTSLinkDisabled(projectId: string): Promise<boolean> {
        const locator = Utilities.formatString(this.ttsLinkByProjectId, projectId);
        return (await gondola.getControlProperty(locator, 'class')).indexOf('disabled') >= 0;
    }

    @action('click On TTS link button')
    public async clickOnTTSLinkButton(projectId: string): Promise<void> {
        const locator = Utilities.formatString(this.ttsLinkByProjectId, projectId);
        await gondola.scrollToElement(locator);
        await gondola.click(locator);
    }

    @action('go to add new project page')
    public async gotoAddNewProjectPage(): Promise<void> {
        await gondola.click(this.addNewButton);
    }

    @action('verify search results by one column')
    public async verifySearchResultsByOneColumn(
        input: string,
        resultColumn: SearchResultColumn,
        isPartialSearch: boolean,
    ): Promise<boolean> {
        const numOfRecord = await this.getNumberOfSearchResultRecords();
        if (numOfRecord === 0) {
            return true;
        } else {
            const allResults = await this.getResultsOfAllPagesOnOneColumn(resultColumn);
            return Utilities.isSearchResultCorrect(input, allResults, isPartialSearch);
        }
    }

    @action('get results on one column')
    public async getResultsOnOneColumn(resultColumn: SearchResultColumn): Promise<string[]> {
        let resultLocator = '';
        switch (resultColumn) {
            case SearchResultColumn.CODE:
                resultLocator = this.resultsByProjectCode;
                break;
            case SearchResultColumn.NAME:
                resultLocator = this.resultsByProjectName;
                break;
            case SearchResultColumn.SUPPLIERS:
                resultLocator = this.resultsByCustomer;
                break;
            case SearchResultColumn.STATUS:
                resultLocator = this.resultsByStatus;
                break;
        }

        await gondola.waitUntilElementVisible(resultLocator, Constants.LONG_TIMEOUT);
        return await gondola.getElementsAttributes(resultLocator, 'innerText');
    }

    @action('get all results of all pages on one column')
    public async getResultsOfAllPagesOnOneColumn(resultColumn: SearchResultColumn): Promise<string[]> {
        const numOfPage = await this.getNumberOfSearchResultPages();
        const numOfRecord = await this.getNumberOfSearchResultRecords();
        let results: string[] = [];
        if (numOfRecord === 0) {
            return results;
        } else {
            for (let i = 1; i <= numOfPage; i++) {
                const resultsInPage = await this.getResultsOnOneColumn(resultColumn);
                results = results.concat(resultsInPage);

                // click next page
                if (i !== numOfPage) {
                    gondola.click(this.pageLink.format(i + 1 + ''));
                    await gondola.waitUntilStalenessOfElement(this.searchResultText);
                }
            }

            return results;
        }
    }
}
export default new ListProjectPage();
