import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { WorkerInfo } from '../models/worker-info';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { DatabaseHelper } from '../helper/database-helpers';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
@page
export class AddWorkerPage extends GeneralPage {
    @locator
    protected workerCode = "//input[@id='cd']";
    @locator
    protected workerName = "//input[@id='name']";
    @locator
    protected departmentName = "//input[@id='department_name']";
    @locator
    protected isRetired = "//input[@id='is‐retired']";
    @locator
    protected note = "//textarea[@id='note']";
    @locator
    protected backButton = `//a[contains(.,'${this.translator.backButton}')]`;

    //#region Search department modal
    @locator
    protected searchKeyInputField = "//input[@id='department_cd']";
    protected specifiedSearchResultRow = "//div[@id='departmentList']//a[contains(.,'{0}')][1]";
    protected searchResultRow =
        "//a[@class='list-group-item list-group-item-action' and not(contains(@hidden, 'hidden'))]";
    protected resultNameColumn = "//div[@id='departmentList']//a[contains(.,'{0}')][1]//div[@class='row']/div[2]";
    protected closeButton = "//button[@class='close']";
    protected searchResultByCode = "//a[@class='list-group-item list-group-item-action']//div[@class='col-sm-4']";
    protected searchResultByName = "//a[@class='list-group-item list-group-item-action']//div[@class='col-sm-8']";
    protected searchResultRowByIndex =
        "//a[@class='list-group-item list-group-item-action' and not(contains(@hidden, 'hidden'))][{0}]";
    protected searchResultColumnsByRowIndex =
        "//a[@class='list-group-item list-group-item-action' and not(contains(@hidden, 'hidden'))][{0}]//div[@class='row']/div";
    protected modalWindowByName = "//div[@class='modal-content' and .//h5[text()='{0}']]";
    //#endregion

    @action('select random search result')
    public async selectRandomSearchResult(): Promise<string> {
        await gondola.waitForElement(this.searchResultRow, Constants.LONG_TIMEOUT);
        const numberOfResult = await gondola.getElementCount(this.searchResultRow);
        const randomIdx = Utilities.getRandomNumber(1, numberOfResult);
        const locator = Utilities.formatString(this.searchResultRowByIndex, randomIdx.toString());
        const selectedResult = await gondola.getText(locator);
        await gondola.click(locator);
        return selectedResult;
    }

    @action('select search result')
    public async selectSearchResult(searchStr: string | undefined): Promise<string> {
        let resultRowLocator;
        let departmentNameLocator;
        if (searchStr === undefined) {
            throw new Error('Department name is not valid');
        } else {
            resultRowLocator = Utilities.formatString(this.specifiedSearchResultRow, searchStr);
            departmentNameLocator = Utilities.formatString(this.resultNameColumn, searchStr);
        }

        const departmentName = await gondola.getText(departmentNameLocator);
        await gondola.waitUntilElementVisible(resultRowLocator);
        await gondola.click(resultRowLocator);
        return departmentName.trim();
    }

    @action('filter result')
    public async filterResult(value: string): Promise<void> {
        await gondola.waitUntilElementVisible(this.searchKeyInputField, Constants.LONG_TIMEOUT);
        await gondola.enter(this.searchKeyInputField, value);
    }

    @action('search specified department')
    public async searchSpecifiedDepartment(searchKey: string): Promise<string> {
        await gondola.click(this.departmentName);
        await this.filterResult(searchKey);
        return await this.selectSearchResult(searchKey);
    }

    @action('input worker information')
    public async inputWorkerInformation(workerInfo: WorkerInfo): Promise<void> {
        await gondola.waitUntilElementVisible(this.workerCode);
        await gondola.enter(this.workerCode, workerInfo.workerCode);
        await gondola.enter(this.workerName, workerInfo.workerName);
        if (workerInfo.department) {
            await this.searchSpecifiedDepartment(workerInfo.department);
        }
        await gondola.setState(this.isRetired, workerInfo.isRetired);
        if (workerInfo.note) {
            await gondola.enter(this.note, workerInfo.note);
        }
    }

    @action('save new worker')
    public async saveNewWorker(): Promise<void> {
        await gondola.waitUntilStalenessOfElement(this.saveButton, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(this.saveButton);
    }

    @action('does departments display correct')
    public async doesDepartmentsDisplayCorrect(): Promise<boolean> {
        const expectedActiveDepartments = await DatabaseHelper.getActiveDepartments();
        const expectedDepartmentCodes: string[] = [];
        expectedActiveDepartments.forEach(department => {
            if (department.cd) {
                expectedDepartmentCodes.push(department.cd);
            }
        });
        await this.scrollToRandomResult(expectedActiveDepartments.length);
        const actualDisplayingDepartmentCodes = await this.getAllItemsOneColumn(SearchResultColumn.CODE.tabulatorField);
        return Utilities.isSubset(expectedDepartmentCodes, actualDisplayingDepartmentCodes);
    }

    @action('filter departments and verify result')
    public async filterDepartmentsAndVerifyResult(
        departmentInfo: Map<string, string>,
        partialSearch = false,
    ): Promise<boolean> {
        //Get and process input data
        let departmentCode = Utilities.getMapValue(departmentInfo, SearchResultColumn.CODE.tabulatorField);
        let departmentName = Utilities.getMapValue(departmentInfo, SearchResultColumn.NAME.tabulatorField);
        if (partialSearch) {
            departmentCode = Utilities.getRandomPartialCharacters(departmentCode);
            departmentName = Utilities.getRandomPartialCharacters(departmentName);
        }

        //Filter with data from all columns, checking if at least one column matches inputted data
        for (const input of [departmentCode, departmentName]) {
            let isMatched = false;
            await this.filterResult(input);
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

    @action('get all columns of all result items')
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

    @action('get one column of all result items')
    public async getAllItemsOneColumn(resultColumn: string): Promise<string[]> {
        let resultLocator = '';
        if (resultColumn === SearchResultColumn.CODE.tabulatorField) {
            resultLocator = this.searchResultByCode;
        }
        if (resultColumn === SearchResultColumn.NAME.tabulatorField) {
            resultLocator = this.searchResultByName;
        }
        await gondola.waitUntilElementVisible(resultLocator, Constants.LONG_TIMEOUT);
        return await gondola.getElementsAttributes(resultLocator, 'innerText');
    }

    @action('scroll to random result')
    public async scrollToRandomResult(numberOfDatabaseRecords: number): Promise<void> {
        await gondola.waitForElement(this.searchResultRow, Constants.LONG_TIMEOUT);
        await gondola.waitUntilStalenessOfElement(this.searchResultRow, Constants.VERY_SHORT_TIMEOUT);
        const numberOfDisplayingResults = await gondola.getElementCount(this.searchResultRow);
        if (numberOfDatabaseRecords === 0 || numberOfDisplayingResults === 0) {
            return;
        }
        let maximumScroll = Math.floor(numberOfDatabaseRecords / numberOfDisplayingResults);
        maximumScroll = maximumScroll > Constants.LIMIT_SCROLL_TIMES ? Constants.LIMIT_SCROLL_TIMES : maximumScroll;
        const scrollTime = Utilities.getRandomNumber(1, maximumScroll);
        for (let i = 1; i <= scrollTime; i++) {
            const lastIndex = await gondola.getElementCount(this.searchResultRow);
            const locator = Utilities.formatString(this.searchResultRowByIndex, lastIndex.toString());
            await gondola.scrollToElement(locator);
        }
    }

    @action('get all columns of one result item')
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
            let key = await gondola.getElementAttribute(attributesLocator, 'class');
            if (key === 'col-sm-4') {
                key = SearchResultColumn.CODE.tabulatorField;
            } else if (key === 'col-sm-8') {
                key = SearchResultColumn.NAME.tabulatorField;
            }
            const value = await gondola.getText(attributesLocator);
            map.set(key, value);
        }
        return map;
    }

    @action('does worker name display correct')
    public async doesWorkerNameDisplayCorrect(workerName: string): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.workerName);
        return Utilities.isTextEqual(currentName, workerName);
    }

    @action('does department display correct')
    public async doesDepartmentDisplayCorrect(department: string | null): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.departmentName);
        return Utilities.isTextEqual(currentName, department ? department : '');
    }

    @action('does enrollment status display correct')
    public async doesEnrollmentStatusDisplayCorrect(isRetired: boolean): Promise<boolean> {
        const isChecked = await this.getCheckboxValue(this.isRetired, false);
        return isChecked === isRetired;
    }

    @action('does note display correct')
    public async doesNoteDisplayCorrect(note: string | null): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.note);
        return Utilities.isTextEqual(currentName, note ? note : '');
    }

    @action('does content of worker displays correct')
    public async doesContentOfWorkerDisplayCorrect(worker: WorkerInfo): Promise<boolean> {
        gondola.report('Verify content of project overview');
        FlagsCollector.collectTruth(
            'Worker name should be correct',
            await this.doesWorkerNameDisplayCorrect(worker.workerName),
        );
        FlagsCollector.collectTruth(
            'Department should be correct',
            await this.doesDepartmentDisplayCorrect(worker.department),
        );
        FlagsCollector.collectTruth(
            'Enrollment status should be correct',
            await this.doesEnrollmentStatusDisplayCorrect(worker.isRetired),
        );
        FlagsCollector.collectTruth('Worker note should be correct', await this.doesNoteDisplayCorrect(worker.note));

        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('click outside of window modal')
    public async clickOutsideOfWindowModal(modalName: string): Promise<void> {
        const locator = Utilities.formatString(this.modalWindowByName, modalName);
        await gondola.waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.performClick(locator, Constants.SLIGHTLY_RIGHT_OFFSET);
    }
}
export default new AddWorkerPage();
