import { page, action, locator, gondola } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { FilterType } from '../models/enum-class/filter-field-type';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { DatabaseHelper } from '../helper/database-helpers';

@page
export class RegistrationPage extends GeneralPage {
    //#region search Segment
    @locator
    protected searchSegmentField = { id: 'search-segments' };
    @locator
    protected segmentTable = { id: 'modal-segments-table' };
    //#endregion

    //#region Search
    protected searchResult = "(//div[@role='row']//div[contains(.,'{0}')])[1]";
    protected searchResultRow = "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div";
    protected searchResultRowByIndex = "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div[{0}]";
    protected searchResultByTabulatorFieldAndText =
        "//div[@class='tabulator-table']//div[@tabulator-field='{0}' and contains(text(),'{1}')]";
    protected searchResultColumnsByRowIndex =
        "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div[{0}]/div";
    protected searchResultByTabulatorField = "//div[@class='tabulator-table']//div[@tabulator-field='{0}']";

    // #endregion

    /**
     * Get all result from a specific column
     * @param resultColumn `tabulator-field` attribute of the column as from a enum collection
     */
    public async getAllItemsOneColumn(resultColumn: SearchResultColumn): Promise<string[]> {
        const resultLocator = Utilities.formatString(this.searchResultByTabulatorField, resultColumn.tabulatorField);
        await gondola.waitUntilElementVisible(resultLocator, Constants.LONG_TIMEOUT);
        return await gondola.getElementsAttributes(resultLocator, 'innerText');
    }

    @action('filterResult')
    public async filterResult(value: string, type: FilterType): Promise<void> {
        const itemXpath = { id: type.searchFieldId };
        await gondola.waitUntilElementVisible(itemXpath, Constants.LONG_TIMEOUT);
        await gondola.enter(itemXpath, value);
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

    @action('searchSegment')
    public async selectSegment(segment: string, byColumn?: SearchResultColumn): Promise<void> {
        await gondola.click(this.searchSegmentField);
        await this.filterResult(segment, FilterType.SEGMENTS);
        await this.selectSearchResult(segment, byColumn);
    }

    @action('doesProjectSegmentDisplayCorrect')
    public async doesProjectSegmentDisplayCorrect(segmentStr: string, isMatchEntire: boolean): Promise<boolean> {
        const currentSegment = await this.getTextBoxValue(this.searchSegmentField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentSegment, segmentStr);
        } else {
            return currentSegment.includes(segmentStr);
        }
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
}
