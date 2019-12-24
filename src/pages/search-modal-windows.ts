import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';

import { FilterType } from '../models/enum-class/filter-field-type';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { DatabaseHelper } from '../helper/database-helpers';
import '@src/string.extensions';

@page
export class SearchWindowModal extends GeneralPage {
    //#region Search
    protected searchResult = "(//div[@role='row']//div[contains(.,'{0}')])[1]";
    protected searchResultByTabulatorField = "//div[@class='tabulator-table']//div[@tabulator-field='{0}']";
    protected searchResultByTabulatorFieldAndIndex =
        "(//div[@class='tabulator-table']//div[@tabulator-field='{0}'])[{1}]";
    protected searchResultByTabulatorFieldAndText =
        "//div[@class='tabulator-table']//div[@tabulator-field='{0}' and contains(text(),'{1}')]";
    protected searchResultRow = "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div";
    protected searchResultRowByIndex = "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div[{0}]";
    protected searchResultColumnsByRowIndex =
        "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div[{0}]/div";
    @locator
    protected moduleTitle = "//h5[@class='modal-title' and text()='{0}']";
    //#endregion

    @action('doesSearchResultDisplay')
    public async doesSearchResultDisplay(itemName: string, type: SearchResultColumn): Promise<boolean> {
        const locator = Utilities.formatString(this.searchResultByTabulatorFieldAndText, type.tabulatorField, itemName);
        return await gondola.doesControlDisplay(locator);
    }

    @action('doesPartialSearchResultDisplayCorrectly')
    public async doesPartialSearchResultDisplayCorrectly(
        keyword: string,
        column: SearchResultColumn,
    ): Promise<boolean> {
        const results = await this.getAllItemsOneColumn(column);
        return Utilities.isFilterCorrect(keyword, results);
    }

    @action('selectRandomSearchResult')
    public async selectRandomSearchResult(type: SearchResultColumn): Promise<string> {
        await gondola.waitForElement(this.searchResultRow, Constants.LONG_TIMEOUT);
        const numberOfResult = await gondola.getElementCount(this.searchResultRow);
        const randomIdx = Utilities.getRandomNumber(1, numberOfResult);
        const locator = Utilities.formatString(
            this.searchResultByTabulatorFieldAndIndex,
            type.tabulatorField,
            randomIdx.toString(),
        );
        const selectedResult = await gondola.getText(locator);
        await gondola.click(locator);
        return selectedResult;
    }

    @action('selectSearchResult')
    public async selectSearchResult(itemName: string, type?: SearchResultColumn): Promise<void> {
        let locator;
        if (type === undefined) {
            locator = Utilities.formatString(this.searchResult, itemName);
        } else {
            locator = Utilities.formatString(this.searchResultByTabulatorFieldAndText, type.tabulatorField, itemName);
        }
        await gondola.waitUntilElementVisible(locator);
        await gondola.click(locator);
    }

    @action('filterResult')
    public async filterResult(value: string, type: FilterType): Promise<void> {
        const itemXpath = { id: type.searchFieldId };
        await gondola.waitUntilElementVisible(itemXpath, Constants.LONG_TIMEOUT);
        await gondola.enter(itemXpath, value);
    }

    /**
     * Get all result from a specific column
     * @param resultColumn `tabulator-field` attribute of the column as from a enum collection
     */
    public async getAllItemsOneColumn(resultColumn: SearchResultColumn): Promise<string[]> {
        const resultLocator = Utilities.formatString(this.searchResultByTabulatorField, resultColumn.tabulatorField);
        await gondola.waitUntilElementVisible(resultLocator, Constants.LONG_TIMEOUT);
        return await gondola.getElementsAttributes(resultLocator, 'innerText');
    }

    /**
     * Get a result from search page, if no index provided, select a random one
     * @param index
     * @returns a Map<string, string> that contains `tabulator-field` attribute as key and it's text as value
     */
    public async getOneResultItemAllColumns(index?: number): Promise<Map<string, string>> {
        const map = new Map<string, string>();
        if (index === undefined) {
            await gondola.waitUntilElementVisible(this.searchResultRow, Constants.LONG_TIMEOUT);
            const numberOfItems = await gondola.getElementCount(this.searchResultRow);
            index = Utilities.getRandomNumber(1, numberOfItems);
        }
        const itemRowLocator = Utilities.formatString(this.searchResultColumnsByRowIndex, index.toString());
        const numberOfAttributes = await gondola.getElementCount(itemRowLocator);
        for (let i = 1; i <= numberOfAttributes; i++) {
            const attributesLocator = itemRowLocator + `[${i}]`;
            const key = await gondola.getElementAttribute(attributesLocator, 'tabulator-field');
            const value = await gondola.getText(attributesLocator);
            map.set(key, value);
        }
        return map;
    }

    /**
     * Get all result from all columns
     * @param index
     * @returns a two dimensions array which store all search results
     */
    public async getAllResultsAllColumns(): Promise<string[][]> {
        const result: string[][] = [];
        await gondola.waitUntilElementVisible(this.searchResultRow, Constants.LONG_TIMEOUT);
        const numberOfItems = await gondola.getElementCount(this.searchResultRow);
        for (let index = 1; index <= numberOfItems; index++) {
            const allColumns: string[] = [];
            const itemRowLocator = Utilities.formatString(this.searchResultColumnsByRowIndex, index.toString());
            const numberOfAttributes = await gondola.getElementCount(itemRowLocator);
            for (let i = 1; i <= numberOfAttributes; i++) {
                const attributesLocator = itemRowLocator + `[${i}]`;
                allColumns.push(await gondola.getText(attributesLocator));
            }
            result.push(allColumns);
        }
        return result;
    }

    @action('filterCustomerAndVerifyResult')
    public async filterCustomerAndVerifyResult(
        customerInfo: Map<string, string>,
        partialSearch = false,
    ): Promise<boolean> {
        //Get and process input data
        let customerCode = Utilities.getMapValue(customerInfo, SearchResultColumn.CODE.tabulatorField);
        let customerName = Utilities.getMapValue(customerInfo, SearchResultColumn.NAME.tabulatorField);
        let customerRepName = Utilities.getMapValue(customerInfo, SearchResultColumn.REP_NAME.tabulatorField);
        if (partialSearch) {
            customerCode = Utilities.getRandomPartialCharacters(customerCode);
            customerName = Utilities.getRandomPartialCharacters(customerName);
            customerRepName = Utilities.getRandomPartialCharacters(customerRepName);
        }

        // Filter data
        await this.filterResult(customerCode, FilterType.CUSTOMER_CODE);
        await this.filterResult(customerName, FilterType.CUSTOMER_NAME);
        await this.filterResult(customerRepName, FilterType.CUSTOMER_REP_NAME);

        // Verify result
        const customerCodeResults = await this.getAllItemsOneColumn(SearchResultColumn.CODE);
        const isCustomerCodeFiltered = Utilities.isFilterCorrect(customerCode, customerCodeResults);
        const customerNameResults = await this.getAllItemsOneColumn(SearchResultColumn.NAME);
        const isCustomerNameFiltered = Utilities.isFilterCorrect(customerName, customerNameResults);
        const customerRepNameResults = await this.getAllItemsOneColumn(SearchResultColumn.REP_NAME);
        const isCustomerRepNameFiltered = Utilities.isFilterCorrect(customerRepName, customerRepNameResults);
        return isCustomerCodeFiltered && isCustomerNameFiltered && isCustomerRepNameFiltered;
    }

    @action('filterDepartmentsAndVerifyResult')
    public async filterDepartmentsAndVerifyResult(
        customerInfo: Map<string, string>,
        partialSearch = false,
    ): Promise<boolean> {
        //Get and process input data
        let departmentCode = Utilities.getMapValue(customerInfo, SearchResultColumn.CODE.tabulatorField);
        let departmentName = Utilities.getMapValue(customerInfo, SearchResultColumn.NAME.tabulatorField);
        if (partialSearch) {
            departmentCode = Utilities.getRandomPartialCharacters(departmentCode);
            departmentName = Utilities.getRandomPartialCharacters(departmentName);
        }

        //Filter with data from all columns, checking if at least one column matches inputted data
        for (const input of [departmentCode, departmentName]) {
            let isMatched = false;
            await this.filterResult(input, FilterType.DEPARTMENT);
            const allResults = await this.getAllResultsAllColumns();

            if (Utilities.isFilterMultipleColumnCorrect(input, allResults)) {
                isMatched = true;
                break;
            }

            if (!isMatched) {
                console.log(`Filtering for ${input} is not working correctly`);
                return false;
            }
        }
        return true;
    }

    @action('filterWorkersAndVerifyResult')
    public async filterWorkersAndVerifyResult(
        customerInfo: Map<string, string>,
        partialSearch = false,
    ): Promise<boolean> {
        //Get and process input data
        let workerCode = Utilities.getMapValue(customerInfo, SearchResultColumn.CODE.tabulatorField);
        let workerName = Utilities.getMapValue(customerInfo, SearchResultColumn.NAME.tabulatorField);
        if (partialSearch) {
            workerCode = Utilities.getRandomPartialCharacters(workerCode);
            workerName = Utilities.getRandomPartialCharacters(workerName);
        }

        //Filter with data from all columns, checking if at least one column matches inputted data
        for (const input of [workerCode, workerName]) {
            let isMatched = false;
            await this.filterResult(input, FilterType.WORKER);
            const allResults = await this.getAllResultsAllColumns();

            if (Utilities.isFilterMultipleColumnCorrect(input, allResults)) {
                isMatched = true;
                break;
            }

            if (!isMatched) {
                console.log(`Filtering for ${input} is not working correctly`);
                return false;
            }
        }
        return true;
    }

    @action('filterItemsAndVerifyResult')
    public async filterItemsAndVerifyResult(
        customerInfo: Map<string, string>,
        partialSearch = false,
    ): Promise<boolean> {
        //Get and process input data
        let itemCode = Utilities.getMapValue(customerInfo, SearchResultColumn.CODE.tabulatorField);
        let itemName = Utilities.getMapValue(customerInfo, SearchResultColumn.NAME.tabulatorField);
        let itemUnitPrice = Utilities.getMapValue(customerInfo, SearchResultColumn.UNIT_PRICE.tabulatorField);
        let itemIsTaxable = Utilities.getMapValue(customerInfo, SearchResultColumn.IS_TAXABLE.tabulatorField);
        if (partialSearch) {
            itemCode = Utilities.getRandomPartialCharacters(itemCode);
            itemName = Utilities.getRandomPartialCharacters(itemName);
            itemUnitPrice = Utilities.getRandomPartialCharacters(itemUnitPrice);
            itemIsTaxable = Utilities.getRandomPartialCharacters(itemIsTaxable);
        }

        //Filter with data from all columns, checking if at least one column matches inputted data
        for (const input of [itemCode, itemName, itemUnitPrice, itemIsTaxable]) {
            let isMatched = false;
            await this.filterResult(input, FilterType.ITEMS);
            const allResults = await this.getAllResultsAllColumns();

            if (Utilities.isFilterMultipleColumnCorrect(input, allResults)) {
                isMatched = true;
                break;
            }

            if (!isMatched) {
                gondola.report(`Filtering for ${input} is not working correctly`);
                return false;
            }
        }
        return true;
    }

    @action('filterSegmentsAndVerifyResult')
    public async filterSegmentsAndVerifyResult(
        customerInfo: Map<string, string>,
        partialSearch = false,
    ): Promise<boolean> {
        //Get and process input data
        let segmentBreadcrumbs = Utilities.getMapValue(
            customerInfo,
            SearchResultColumn.BREADCRUMBS_TEXT.tabulatorField,
        );
        let segmentName = Utilities.getMapValue(customerInfo, SearchResultColumn.NAME.tabulatorField);
        let segmentCode = Utilities.getMapValue(customerInfo, SearchResultColumn.FULL_CODE.tabulatorField);

        if (partialSearch) {
            segmentBreadcrumbs = Utilities.getRandomPartialCharacters(segmentBreadcrumbs);
            segmentCode = Utilities.getRandomPartialCharacters(segmentCode);
            segmentName = Utilities.getRandomPartialCharacters(segmentName);
        }

        //Filter with data from all columns, checking if at least one column matches inputted data
        for (const input of [segmentBreadcrumbs, segmentCode, segmentName]) {
            let isMatched = false;
            await this.filterResult(input, FilterType.SEGMENTS);
            const allResults = await this.getAllResultsAllColumns();

            if (Utilities.isFilterMultipleColumnCorrect(input, allResults)) {
                isMatched = true;
                break;
            }

            if (!isMatched) {
                console.log(`Filtering for ${input} is not working correctly`);
                return false;
            }
        }
        return true;
    }

    @action('doesLabsDisplayCorrect')
    public async doesLabsDisplayCorrect(inHouse = false): Promise<boolean> {
        const expectedLabs = await DatabaseHelper.getLabs(inHouse);
        const expectedLabCodes: string[] = [];
        expectedLabs.forEach(lab => {
            if (lab.code) {
                expectedLabCodes.push(lab.code);
            }
        });
        await this.scrollToRandomResult(expectedLabs.length);
        const actualDisplayingLabCodes = await this.getAllItemsOneColumn(SearchResultColumn.FULL_CODE);
        return Utilities.isSubset(expectedLabCodes, actualDisplayingLabCodes);
    }

    @action('doesBusinessCustomerDisplayCorrect')
    public async doesBusinessCustomerDisplayCorrect(): Promise<boolean> {
        const expectedActiveBusinessCustomers = await DatabaseHelper.getActiveBusinessCustomers();
        const expectedBusinessCustomerCodes: string[] = [];
        expectedActiveBusinessCustomers.forEach(businessCustomer => {
            if (businessCustomer.cd) {
                expectedBusinessCustomerCodes.push(businessCustomer.cd);
            }
        });
        await this.scrollToRandomResult(expectedActiveBusinessCustomers.length);
        const actualDisplayingBusinessCustomerCodes = await this.getAllItemsOneColumn(SearchResultColumn.CODE);
        return Utilities.isSubset(expectedBusinessCustomerCodes, actualDisplayingBusinessCustomerCodes);
    }

    @action('doesDepartmentsDisplayCorrect')
    public async doesDepartmentsDisplayCorrect(): Promise<boolean> {
        const expectedActiveDepartments = await DatabaseHelper.getActiveDepartments();
        const expectedDepartmentCodes: string[] = [];
        expectedActiveDepartments.forEach(department => {
            if (department.cd) {
                expectedDepartmentCodes.push(department.cd);
            }
        });
        await this.scrollToRandomResult(expectedActiveDepartments.length);
        const actualDisplayingDepartmentCodes = await this.getAllItemsOneColumn(SearchResultColumn.CODE);
        return Utilities.isSubset(expectedDepartmentCodes, actualDisplayingDepartmentCodes);
    }

    @action('doesWorkersDisplayCorrect')
    public async doesWorkersDisplayCorrect(): Promise<boolean> {
        const expectedActiveWorkers = await DatabaseHelper.getActiveWorkers();
        const expectedWorkerCodes: string[] = [];
        expectedActiveWorkers.forEach(worker => {
            if (worker.cd) {
                expectedWorkerCodes.push(worker.cd);
            }
        });
        await this.scrollToRandomResult(expectedActiveWorkers.length);
        const actualDisplayingWorkerCodes = await this.getAllItemsOneColumn(SearchResultColumn.CODE);
        return Utilities.isSubset(expectedWorkerCodes, actualDisplayingWorkerCodes);
    }

    @action('doesItemsDisplayCorrect')
    public async doesItemsDisplayCorrect(): Promise<boolean> {
        const expectedActiveItems = await DatabaseHelper.getActiveItems();
        const expectedItemCodes: string[] = [];
        expectedActiveItems.forEach(item => {
            if (item.cd) {
                expectedItemCodes.push(item.cd);
            }
        });
        await this.scrollToRandomResult(expectedActiveItems.length);
        const actualDisplayingItemCodes = await this.getAllItemsOneColumn(SearchResultColumn.CODE);
        return Utilities.isSubset(expectedItemCodes, actualDisplayingItemCodes);
    }

    @action('doesSegmentsDisplayCorrect')
    public async doesSegmentsDisplayCorrect(): Promise<boolean> {
        const expectedActiveSegments = await DatabaseHelper.getActiveSegments();
        const expectedSegmentCodes: string[] = [];
        expectedActiveSegments.forEach(segment => {
            if (segment.code) {
                expectedSegmentCodes.push(segment.code);
            }
        });
        await this.scrollToRandomResult(expectedActiveSegments.length);
        const actualDisplayingSegmentCodes = await this.getAllItemsOneColumn(SearchResultColumn.FULL_CODE);
        return Utilities.isSubset(expectedSegmentCodes, actualDisplayingSegmentCodes);
    }

    @action('waitForTableUpdated')
    public async waitForTableUpdated(): Promise<void> {
        await gondola.waitUntilStalenessOfElement(this.searchResultRow);
    }

    @action('scrollToRandomResult')
    public async scrollToRandomResult(numberOfDatabaseRecords: number): Promise<void> {
        await gondola.waitForElement(this.searchResultRow, Constants.LONG_TIMEOUT);
        const numberOfDisplayingResults = await gondola.getElementCount(this.searchResultRow);
        if (numberOfDatabaseRecords === 0 || numberOfDisplayingResults === 0) {
            return;
        }
        let maximumScroll = Math.floor(numberOfDatabaseRecords / numberOfDisplayingResults);
        maximumScroll = maximumScroll > Constants.LIMIT_SCROLL_TIMES ? Constants.LIMIT_SCROLL_TIMES : maximumScroll;
        const scrollTime = Utilities.getRandomNumber(1, maximumScroll);
        for (let i = 1; i <= scrollTime; i++) {
            await gondola.waitUntilStalenessOfElement(this.searchResultRow, Constants.VERY_SHORT_TIMEOUT);
            const lastIndex = await gondola.getElementCount(this.searchResultRow);
            const locator = Utilities.formatString(this.searchResultRowByIndex, lastIndex.toString());
            await gondola.scrollToElement(locator);
        }
    }

    @action('doesModalTitleDisplay')
    public async doesModalTitleDisplay(name: string, expected = true): Promise<boolean> {
        const locator = Utilities.formatString(this.moduleTitle, name);
        if (expected) {
            await gondola.waitUntilElementVisible(locator, Constants.MEDIUM_TIMEOUT);
        } else {
            await gondola.waitUntilElementNotVisible(locator, Constants.SHORT_TIMEOUT);
        }
        return await gondola.doesControlDisplay(locator);
    }
}
export default new SearchWindowModal();
