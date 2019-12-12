import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { ProjectDetailInfo, ProjectOverviewInfo, ProjectResultBaseInfo, SingleResource } from '../models/project-info';
import { FilterType } from '../models/enum-class/filter-field-type';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { DatabaseHelper } from '../helper/database-helpers';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import { ResultsBaseField } from '../models/enum-class/project-results-base-field';
import { CustomerMagnifications } from '../entity/CustomerMagnifications';
import { ElementType } from '../models/enum-class/element-type';
import '@src/string.extensions';

@page
export class AddProjectPage extends GeneralPage {
    //#region project result
    @locator
    protected subTitleProjectResult = `//div[.='${this.translator.sectionName.volumeDetail}']`;
    protected roleCheckboxStr = "//div[contains(@class, 'custom-checkbox')]/label[text()='{0}']";
    protected roleCheckboxInput = "//div[label[text()='{0}']]//input[@type='checkbox']";
    protected roleLabels = "//div[@id='project-result-bases']/div/label";
    protected roleLabelByIndex = "(//div[@id='project-result-bases']/div/label)[{0}]";
    protected roleRowStr = "//tr[contains(.,'{0}')]";
    protected roleBillingDetailsLine = "//tbody[@id='result-base-details']/tr[td[text()='{0}']]";
    protected searchItemByRoleStr = "//tr[contains(.,'{0}')]//input[@class='search-items  form-control']";
    protected debitCreditByRoleStr = "//tr[contains(.,'{0}')]//select[contains(@id, 'debit-credit-group-id')]";
    protected planPeopleByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'plan-people')]";
    protected planTimeByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'plan-time')]";
    protected planTotalTimeByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'plan-totalt-ime')]";
    protected unitPriceWeekdayByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday')]";
    protected unitPriceWeekdayOTByRoleStr =
        "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-overtime')]";
    protected unitPriceHolidayByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-holiday')]";
    protected unitPriceWeekdayLateByRoleStr =
        "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-late')]";
    protected unitPriceWeekdayLateOTByRoleStr =
        "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-late-overtime')]";
    protected unitPriceHolidayLateByRoleStr =
        "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-holiday-late')]";
    protected isTaxableByRoleStr =
        "//tr[contains(.,'{0}')]//input[contains(@id, 'is-taxable')]//ancestor::div[@class='custom-control custom-checkbox']";
    protected isTaxableByRoleCheckbox = "//tr[contains(.,'{0}')]//input[contains(@id, 'is-taxable')]";
    protected taxIdByRoleStr = "//tr[contains(.,'{0}')]//select[contains(@id, 'tax-id')]";
    protected noteByRoleStr = "//tr[contains(.,'{0}')]//textarea[contains(@id, 'note')]";
    protected outputOrderbyRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'output-order')]";
    protected resultsBaseColumnName = "//div[@id='project-result-bases']//th[@scope='col' and text()='{0}']";
    @locator
    protected projectResultSection = { id: 'project-result-bases' };
    @locator
    protected invalidFeedbackProjectResultsBase =
        "//tr[td[text()='{0}']]//{1}[contains(@name, '{2}')]/following-sibling::div";
    @locator
    protected textFieldProjectResultsBase = "//tr[td[text()='{0}']]//{1}[contains(@name, '{2}')]";
    //#endregion

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
    protected itemFilter = "//input[@id='modal-items-filter']";
    @locator
    protected itemTable = { id: 'modal-items-table' };
    @locator
    protected modalWindowByName = "//div[@class='modal-content' and .//h5[text()='{0}']]";
    @locator
    protected modalWindowLoading =
        "//div[@class='modal-content' and .//h5[text()='{0}']]//div[contains(@id, 'loading')]";
    //#endregion

    @locator
    protected projectCode = { id: 'number' };
    @locator
    protected projectName = { id: 'name' };
    @locator
    protected projectForm = "//select[@name='project_form']";

    //#region Search customer
    @locator
    protected searchCustomerField = { id: 'search-business-customers' };
    @locator
    protected searchCustomerButton = { id: 'search-business-customers-button' };
    @locator
    protected customerTable = { id: 'modal-business-customers-table' };
    //#endregion

    //#region search department
    @locator
    protected searchDepartmentField = { id: 'search-departments' };
    @locator
    protected departmentTable = { id: 'modal-departments-table' };
    //#endregion

    //#region search worker
    @locator
    protected searchWorkerField = { id: 'search-workers' };
    //#endregion

    //#region dates
    @locator
    protected datePicker = { id: 'ui-datepicker-div' };
    @locator
    protected datePickerDay = "//td[@data-handler='selectDay' and contains(@class,'current-day')]/a";
    @locator
    protected datePickerSelectedDay = "//td[@data-handler='selectDay']";
    @locator
    protected datePickerMonth = { css: '.ui-datepicker-month' };
    @locator
    protected datePickerYear = { css: '.ui-datepicker-year' };
    @locator
    protected datePickerDayByIndex = "(//td[@data-handler='selectDay'])[{0}]";
    @locator
    protected startDate = { name: 'start_date' };
    @locator
    protected endDate = { name: 'end_date' };
    @locator
    protected scheduleStartDate = { name: 'scheduled_start_date' };
    @locator
    protected scheduleEndDate = { name: 'scheduled_end_date' };
    //#endregion

    //#region Overview
    @locator
    protected accuracy = "//select[@name='accuracy']";
    @locator
    protected status = "//select[@name='status']";
    @locator
    protected workingPlace = "//select[@name='place']";
    @locator
    protected currencyId = "//select[@name='currency_id']";
    @locator
    protected billingType = "//select[@name='billing_type']";
    @locator
    protected closingDate = "//select[@name='closing_date']";
    @locator
    protected tagItem = "//span[contains(@class,'badge-secondary') and text()='{0}']";
    @locator
    protected removeTag = "//span[contains(@class,'badge-secondary') and text()='{0}']/span[@data-role='remove']";
    @locator
    protected tag = "//input[@id='tag']//preceding-sibling::div//input";
    @locator
    protected tagContent = "//input[@id='tag']";
    @locator
    protected description = { id: 'description' };
    //#endregion

    //#region search Segment
    @locator
    protected searchSegmentField = { id: 'search-segments' };
    @locator
    protected segmentTable = { id: 'modal-segments-table' };
    //#endregion

    //#region project detail
    @locator
    protected addProjectDetailBtn = { id: 'project-details-add-row' };
    protected removeIconByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//a[@class='remove-project-details']";
    protected detailNameByRowStr =
        "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[name]') and not(contains(@name, 'item'))]";
    protected searchItemByRowStr =
        "//div[.='{0}']/ancestor::div[@role='row']//input[@class='search-items  form-control']";
    protected debitCreditByRowStr =
        "//div[.='{0}']/ancestor::div[@role='row']//select[contains(@name, '[debit_credit_group_id]')]";
    protected isTaxableByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@id, 'is-taxable')]";
    protected taxIdByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//select[contains(@name, '[tax_id]')]";
    protected quantityByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[quantity]')]";
    protected unitByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[unit]')]";
    protected unitPriceByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[unit_price]')]";
    protected shipDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'ship_date')]";
    protected deliveryDateByRowStr =
        "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'delivery_date')]";
    protected acceptedDateByRowStr =
        "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'accepted_date')]";
    protected billingDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'billing_date')]";
    //#endregion

    //#region resource
    @locator
    protected searchLabField = { id: 'search-labs' };
    @locator
    protected workStartTime = { id: 'work_start_time_in_utc' };
    @locator
    protected workEndTime = { id: 'work_end_time_in_utc' };
    @locator
    protected addResourceButton = { id: 'project-resources-add-row' };
    protected removeResourceButtonByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//a[@href='javascript:;']";
    protected resourceDateByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@class='date-picker form-control']";
    protected countPMByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-0-count')]";
    protected countLeaderByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-1-count')]";
    protected countTesterByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-2-count')]";
    protected countDesignerByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-3-count')]";
    protected countExpertByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-4-count')]";
    protected countReserve1ByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-5-count')]";
    protected countReserve2ByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-6-count')]";
    protected countReserve3ByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-7-count')]";
    protected countReserve4ByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-8-count')]";
    protected countReserve5ByRowStr =
        "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-9-count')]";
    //#endregion

    //#region project ordered detail
    protected addProjectOrderedDetailBtn = "//div[@id='project-ordered-detail']/button";
    protected projectOrderedNameStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[name]') and not(contains(@name, 'item'))]";
    protected projectOrderedSearchItemStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[item][name]')]";
    protected projectOrderedDebitCreditStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//select[contains(@name, '[debit_credit_group_id]')]";
    protected projectOrderedIsTaxableStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//div[@class='custom-control custom-checkbox']";
    protected projectOrderedTaxIdStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//select[contains(@name, '[tax_id]')]";
    protected projectOrderedQuantityStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[quantity]')]";
    protected projectOrderedUnitStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[unit]')]";
    protected projectOrderedUnitPriceStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[unit_price]')]";
    protected projectOrderedNoteStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//textarea[contains(@name, '[note]')]";
    protected projectOrderedDeliveryDateStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[delivery_date]')]";
    protected projectOrderedRecordDateStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[record_date]')]";
    protected projectOrderedBillingDateStr =
        "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[billing_date]')]";
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

    public async selectRandomCustomer(): Promise<string> {
        await gondola.click(this.searchCustomerField);
        return await this.selectRandomSearchResult(SearchResultColumn.CODE);
    }

    @action('searchCustomerByName')
    public async selectCustomerByName(customerName: string): Promise<void> {
        await gondola.click(this.searchCustomerField);
        await this.filterResult(customerName, FilterType.CUSTOMER_NAME);
        await this.selectSearchResult(customerName, SearchResultColumn.NAME);
    }

    @action('searchCustomerByCode')
    public async selectCustomerByCode(customerCode: string | undefined): Promise<void> {
        if (!customerCode) {
            throw new Error('Customer code is not available');
        }
        if (!(await gondola.awaitClick(this.searchCustomerField))) {
            await gondola.executeClick(this.searchCustomerField);
        }

        await this.filterResult(customerCode, FilterType.CUSTOMER_CODE);
        await this.selectSearchResult(customerCode, SearchResultColumn.CODE);
    }

    @action('searchDepartment')
    public async selectDepartment(department: string, byColumn?: SearchResultColumn): Promise<void> {
        await gondola.click(this.searchDepartmentField);
        await this.filterResult(department, FilterType.DEPARTMENT);
        await this.selectSearchResult(department, byColumn);
    }

    @action('searchWorker')
    public async selectWorker(worker: string, byColumn?: SearchResultColumn): Promise<void> {
        await gondola.click(this.searchWorkerField);
        await this.filterResult(worker, FilterType.WORKER);
        await this.selectSearchResult(worker, byColumn);
    }

    @action('searchSegment')
    public async selectSegment(segment: string, byColumn?: SearchResultColumn): Promise<void> {
        await gondola.click(this.searchSegmentField);
        await this.filterResult(segment, FilterType.SEGMENTS);
        await this.selectSearchResult(segment, byColumn);
    }

    @action('clickResultsBaseItemTextfield')
    public async clickResultsBaseItemTextfield(role: string): Promise<void> {
        const searchItemXpath = Utilities.formatString(this.searchItemByRoleStr, role);
        await gondola.click(searchItemXpath);
    }

    @action('getResultsBaseItemTextfieldValue')
    public async getResultsBaseItemTextfieldValue(role: string): Promise<string> {
        const searchItemXpath = Utilities.formatString(this.searchItemByRoleStr, role);
        return await gondola.getControlProperty(searchItemXpath, 'value');
    }

    @action('searchItem')
    public async searchItem(item: string, index: any, position: string): Promise<void> {
        let searchItemXpath = Utilities.formatString(this.searchItemByRoleStr, index);
        if (position === 'detail') {
            searchItemXpath = Utilities.formatString(this.searchItemByRowStr, index);
        }

        await gondola.click(searchItemXpath);
        await gondola.waitUntilElementVisible(this.itemFilter, Constants.LONG_TIMEOUT);
        await gondola.enter(this.itemFilter, item);
        await this.selectSearchResult(item);
    }

    @action('searchLab')
    public async searchLab(lab: string, byColumn?: SearchResultColumn): Promise<void> {
        await gondola.click(this.searchLabField);
        await this.filterResult(lab, FilterType.LAB);
        await this.selectSearchResult(lab, byColumn);
    }

    @action('checkProjectFormOptions')
    public async checkProjectFormOptions(options: string[]): Promise<boolean> {
        return await gondola.areOptionsExists(this.projectForm, options);
    }

    @action('checkProjectFormOptions')
    public async checkResultsBaseTaxOptions(role: string, options: string[]): Promise<boolean> {
        return await gondola.areOptionsExists(this.taxIdByRoleStr.format(role), options);
    }

    @action('selectProjectForm')
    public async selectProjectForm(option: string): Promise<void> {
        await gondola.select(this.projectForm, option);
    }

    @action('isProjectResultSectionDisplayed')
    public async isProjectResultSectionDisplayed(): Promise<boolean> {
        return await gondola.doesControlDisplay(this.projectResultSection);
    }

    @action('inputProjectOverviewInfo')
    public async inputProjectOverviewInfo(projectOverview: ProjectOverviewInfo): Promise<void> {
        await gondola.enter(this.projectName, projectOverview.projectName);
        await gondola.select(this.projectForm, projectOverview.projectForm);
        await this.selectCustomerByName(projectOverview.customerName);
        await this.selectDepartment(projectOverview.department);
        await this.selectWorker(projectOverview.workerName);
        if (projectOverview.startDate) {
            await gondola.controlPopupAndEnterText(this.startDate, projectOverview.startDate);
        }
        if (projectOverview.endDate) {
            await gondola.controlPopupAndEnterText(this.endDate, projectOverview.endDate);
        }
        if (projectOverview.scheduleStartDate) {
            await gondola.controlPopupAndEnterText(this.scheduleStartDate, projectOverview.scheduleStartDate);
        }
        if (projectOverview.scheduleEndDate) {
            await gondola.controlPopupAndEnterText(this.scheduleEndDate, projectOverview.scheduleEndDate);
        }
        await gondola.select(this.accuracy, projectOverview.accuracy);
        await gondola.select(this.status, projectOverview.status);
        await gondola.select(this.workingPlace, projectOverview.workingPlace);
        await gondola.select(this.currencyId, projectOverview.currencyId);
        await gondola.select(this.billingType, projectOverview.billingType);
        await gondola.select(this.closingDate, projectOverview.closingDate);
        await this.selectSegment(projectOverview.segment);
        if (projectOverview.tag) {
            await gondola.controlPopupAndEnterText(this.tag, projectOverview.tag);
        }
        if (projectOverview.description) {
            await gondola.controlPopupAndEnterText(this.description, projectOverview.description);
        }
    }

    public async setStatusResultBasesRoleCheckbox(role: string, check: boolean): Promise<void> {
        const checkBoxInputXpath = this.roleCheckboxInput.format(role);
        await this.setStateCustomizeCheckbox(this.roleCheckboxStr.format(role), check, checkBoxInputXpath);
    }

    @action('does debit credits options exists')
    public async doesDebitCreditsOptionsExist(role: string, options: string[]): Promise<boolean> {
        const locator = Utilities.formatString(this.debitCreditByRoleStr, role);
        return await this.doesSelectorOptionsExist(locator, options);
    }

    @action('set taxable checkbox state')
    public async setTaxableState(role: string, check: boolean): Promise<void> {
        const checkBoxInputXpath = Utilities.formatString(this.isTaxableByRoleStr, role);
        await this.setStateCustomizeCheckbox(checkBoxInputXpath, check);
    }

    @action('is tax dropdown enabled')
    public async isTaxDropdownEnabled(role: string): Promise<boolean> {
        const isDisabled = await gondola.getControlProperty(
            Utilities.formatString(this.taxIdByRoleStr, role),
            'disabled',
        );
        return !(isDisabled === 'true');
    }

    @action('inputProjectResultBases')
    public async inputProjectResultBases(projectResultBases: ProjectResultBaseInfo[]): Promise<void> {
        const formExist = await gondola.doesControlExist(this.subTitleProjectResult);
        if (formExist) {
            for (const projectResultBase of projectResultBases) {
                await this.setStatusResultBasesRoleCheckbox(projectResultBase.role, true);
                await this.searchItem(projectResultBase.item, projectResultBase.role, 'result bases');
                await gondola.select(
                    Utilities.formatString(this.debitCreditByRoleStr, projectResultBase.role),
                    projectResultBase.debitCredit,
                );
                await gondola.enter(
                    Utilities.formatString(this.planPeopleByRoleStr, projectResultBase.role),
                    projectResultBase.planPeople + '',
                );
                await gondola.enter(
                    Utilities.formatString(this.planTimeByRoleStr, projectResultBase.role),
                    projectResultBase.planTime + '',
                );
                // check plan total time
                const totalTime =
                    projectResultBase.planTime && projectResultBase.planPeople
                        ? projectResultBase.planTime * projectResultBase.planPeople
                        : null;
                await this.checkPlanTotalTime(
                    totalTime,
                    Utilities.formatString(this.planTotalTimeByRoleStr, projectResultBase.role),
                );
                await gondola.controlPopupAndEnterText(
                    Utilities.formatString(this.unitPriceWeekdayByRoleStr, projectResultBase.role),
                    projectResultBase.unitPriceWeekday,
                );
                await gondola.enter(
                    Utilities.formatString(this.unitPriceWeekdayOTByRoleStr, projectResultBase.role),
                    projectResultBase.unitPriceWeekdayOT,
                );
                await gondola.enter(
                    Utilities.formatString(this.unitPriceHolidayByRoleStr, projectResultBase.role),
                    projectResultBase.unitPriceHoliday,
                );
                await gondola.enter(
                    Utilities.formatString(this.unitPriceWeekdayLateByRoleStr, projectResultBase.role),
                    projectResultBase.unitPriceWeekdayLate,
                );
                await gondola.enter(
                    Utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, projectResultBase.role),
                    projectResultBase.unitPriceWeekdayLateOT,
                );
                await gondola.enter(
                    Utilities.formatString(this.unitPriceHolidayLateByRoleStr, projectResultBase.role),
                    projectResultBase.unitPriceHolidayLate,
                );
                await this.setTaxableState(projectResultBase.role, projectResultBase.isTaxable);
                if (projectResultBase.isTaxable) {
                    await gondola.select(
                        Utilities.formatString(this.taxIdByRoleStr, projectResultBase.role),
                        projectResultBase.taxId,
                    );
                }

                if (projectResultBase.note) {
                    await gondola.enter(
                        Utilities.formatString(this.noteByRoleStr, projectResultBase.role),
                        projectResultBase.note,
                    );
                }
                if (projectResultBase.outputOrder) {
                    await gondola.enter(
                        Utilities.formatString(this.outputOrderbyRoleStr, projectResultBase.role),
                        projectResultBase.outputOrder,
                    );
                }
            }
        }
    }

    @action('addProjectDetails')
    public async addProjectDetails(projectDetails: ProjectDetailInfo[]): Promise<void> {
        let idx = 1;
        for (const projectDetail of projectDetails) {
            await gondola.click(this.addProjectDetailBtn);
            await gondola.enter(Utilities.formatString(this.detailNameByRowStr, idx + ''), projectDetail.detailName);
            await this.searchItem(projectDetail.item, idx + '', 'detail');
            await gondola.select(Utilities.formatString(this.debitCreditByRowStr, idx + ''), projectDetail.debitCredit);
            await gondola.setState(Utilities.formatString(this.isTaxableByRowStr, idx + ''), projectDetail.isTaxable);
            await gondola.select(Utilities.formatString(this.taxIdByRowStr, idx + ''), projectDetail.taxId);
            await gondola.enter(Utilities.formatString(this.quantityByRowStr, idx + ''), projectDetail.quantity);
            await gondola.enter(Utilities.formatString(this.unitByRowStr, idx + ''), projectDetail.unit);
            await gondola.enter(Utilities.formatString(this.unitPriceByRowStr, idx + ''), projectDetail.unitPrice);
            if (projectDetail.shipDate) {
                await gondola.enter(Utilities.formatString(this.shipDateByRowStr, idx + ''), projectDetail.shipDate);
            }
            if (projectDetail.deliveryDate) {
                await gondola.enter(
                    Utilities.formatString(this.deliveryDateByRowStr, idx + ''),
                    projectDetail.deliveryDate,
                );
            }
            if (projectDetail.acceptedDate) {
                await gondola.enter(
                    Utilities.formatString(this.acceptedDateByRowStr, idx + ''),
                    projectDetail.acceptedDate,
                );
            }
            if (projectDetail.billingDate) {
                await gondola.enter(
                    Utilities.formatString(this.billingDateByRowStr, idx + ''),
                    projectDetail.billingDate,
                );
            }
            idx++;
        }
    }

    @action('inputProjectResource')
    public async inputProjectResource(lab: string, workStartTime: string, workEndTime: string): Promise<void> {
        await this.searchLab(lab);
        await gondola.enter(this.workStartTime, workStartTime);
        await gondola.enter(this.workEndTime, workEndTime);
    }

    @action('addResourceRows')
    public async addResourceRows(projectResources: SingleResource[]): Promise<void> {
        for (let i = 1; i <= projectResources.length; i++) {
            const projectResource = projectResources[i - 1];
            await gondola.click(this.addResourceButton);
            await gondola.enter(
                Utilities.formatString(this.resourceDateByRowStr, i + ''),
                projectResource.resourceDate,
            );
            await gondola.enter(Utilities.formatString(this.countPMByRowStr, i + ''), projectResource.countPM);
            await gondola.enter(Utilities.formatString(this.countLeaderByRowStr, i + ''), projectResource.countLeader);
            await gondola.enter(Utilities.formatString(this.countTesterByRowStr, i + ''), projectResource.countTester);
            await gondola.enter(
                Utilities.formatString(this.countDesignerByRowStr, i + ''),
                projectResource.countDesigner,
            );
            await gondola.enter(Utilities.formatString(this.countExpertByRowStr, i + ''), projectResource.countExpert);
            await gondola.enter(
                Utilities.formatString(this.countReserve1ByRowStr, i + ''),
                projectResource.countReserve1,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve2ByRowStr, i + ''),
                projectResource.countReserve2,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve3ByRowStr, i + ''),
                projectResource.countReserve3,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve4ByRowStr, i + ''),
                projectResource.countReserve4,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve5ByRowStr, i + ''),
                projectResource.countReserve5,
            );
        }
    }

    @action('wait for search window fully loaded')
    public async waitForLoadingIconDisappear(modalName: string): Promise<void> {
        const locator = Utilities.formatString(this.modalWindowLoading, modalName);
        await gondola.waitUntilElementNotVisible(locator, Constants.LONG_TIMEOUT);
    }

    @action('clickOutsideOfWindowModal')
    public async clickOutsideOfWindowModal(modalName: string): Promise<void> {
        const locator = Utilities.formatString(this.modalWindowByName, modalName);
        await this.waitForLoadingIconDisappear(modalName);
        await gondola.performClick(locator, Constants.SLIGHTLY_RIGHT_OFFSET);
    }

    @action('saveNewProject')
    public async saveNewProject(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('getProjectCode')
    public async getProjectCode(): Promise<string> {
        const projectCode = await gondola.getControlProperty(this.projectCode, 'value');
        return projectCode;
    }

    @action('checkPlanTotalTime')
    public async checkPlanTotalTime(expectedTotalTime: number | null, locator: any): Promise<void> {
        await gondola.click(locator);
        const totalTime = await gondola.getControlProperty(locator, 'value');
        await gondola.checkEqual(totalTime, expectedTotalTime + '');
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

    @action('doesProjectNameDisplayCorrect')
    public async doesProjectNameDisplayCorrect(projectName: string): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.projectName);
        return Utilities.isTextEqual(currentName, projectName);
    }

    @action('doesProjectFormDisplayCorrect')
    public async doesProjectFormDisplayCorrect(projectForm: string): Promise<boolean> {
        const currentProjectForm = await gondola.getSelectedOption(this.projectForm);
        return Utilities.isTextEqual(currentProjectForm, projectForm);
    }

    @action('doesProjectCustomerDisplayCorrect')
    public async doesProjectCustomerDisplayCorrect(customerStr: string, isMatchEntire: boolean): Promise<boolean> {
        const currentCustomer = await this.getTextBoxValue(this.searchCustomerField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentCustomer, customerStr);
        } else {
            return currentCustomer.includes(customerStr);
        }
    }

    @action('doesProjectDepartmentDisplayCorrect')
    public async doesProjectDepartmentDisplayCorrect(departmentStr: string, isMatchEntire: boolean): Promise<boolean> {
        const currentDepartment = await this.getTextBoxValue(this.searchDepartmentField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentDepartment, departmentStr);
        } else {
            return currentDepartment.includes(departmentStr);
        }
    }

    @action('doesProjectWorkerDisplayCorrect')
    public async doesProjectWorkerDisplayCorrect(workerStr: string, isMatchEntire: boolean): Promise<boolean> {
        const currentWorker = await this.getTextBoxValue(this.searchWorkerField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentWorker, workerStr);
        } else {
            return currentWorker.includes(workerStr);
        }
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

    @action('doesProjectDatesDisplayCorrect')
    public async doesProjectDatesDisplayCorrect(
        startDate: string | null,
        endDate: string | null,
        scheduleStartDate: string | null,
        scheduleEndDate: string | null,
    ): Promise<boolean> {
        gondola.report('verify date: start date, end date, schedule start date, schedule end date');
        const currentStartDate = await this.getTextBoxValue(this.startDate);
        if (!startDate) {
            startDate = '';
        }
        const doesStartDateDisplayCorrect = Utilities.isTextEqual(currentStartDate, startDate);

        const currentEndDate = await this.getTextBoxValue(this.endDate);
        if (!endDate) {
            endDate = '';
        }
        const doesEndDateDisplayCorrect = Utilities.isTextEqual(currentEndDate, endDate);

        const currentScheduleStartDate = await this.getTextBoxValue(this.scheduleStartDate);
        if (!scheduleStartDate) {
            scheduleStartDate = '';
        }
        const doesScheduleStartDateDisplayCorrect = Utilities.isTextEqual(currentScheduleStartDate, scheduleStartDate);

        const currentScheduleEndDate = await this.getTextBoxValue(this.scheduleEndDate);
        if (!scheduleEndDate) {
            scheduleEndDate = '';
        }
        const doesScheduleEndDateDisplayCorrect = Utilities.isTextEqual(currentScheduleEndDate, scheduleEndDate);

        return (
            doesStartDateDisplayCorrect &&
            doesEndDateDisplayCorrect &&
            doesScheduleStartDateDisplayCorrect &&
            doesScheduleEndDateDisplayCorrect
        );
    }

    @action('doesProjectAccuracyDisplayCorrect')
    public async doesProjectAccuracyDisplayCorrect(accuracy: string): Promise<boolean> {
        const currentAccuracy = await gondola.getSelectedOption(this.accuracy);
        return Utilities.isTextEqual(currentAccuracy, accuracy);
    }

    @action('doesProjectStatusDisplayCorrect')
    public async doesProjectStatusDisplayCorrect(status: string): Promise<boolean> {
        const currentStatus = await gondola.getSelectedOption(this.status);
        return Utilities.isTextEqual(currentStatus, status);
    }

    @action('doesProjectWorkingPlaceDisplayCorrect')
    public async doesProjectWorkingPlaceDisplayCorrect(workingPlace: string): Promise<boolean> {
        const currentWorkingPlace = await gondola.getSelectedOption(this.workingPlace);
        return Utilities.isTextEqual(currentWorkingPlace, workingPlace);
    }

    @action('doesCurrencyIdDisplayCorrect')
    public async doesCurrencyIdDisplayCorrect(currencyId: string): Promise<boolean> {
        const currentCurrencyId = await gondola.getSelectedOption(this.currencyId);
        return Utilities.isTextEqual(currentCurrencyId, currencyId);
    }

    @action('doesBillingTypeDisplayCorrect')
    public async doesBillingTypeDisplayCorrect(billingType: string): Promise<boolean> {
        const currentBillingType = await gondola.getSelectedOption(this.billingType);
        return Utilities.isTextEqual(currentBillingType, billingType);
    }

    @action('doesClosingDateDisplayCorrect')
    public async doesClosingDateDisplayCorrect(closingDate: string): Promise<boolean> {
        const currentClosingDate = await gondola.getSelectedOption(this.closingDate);
        return Utilities.isTextEqual(currentClosingDate, closingDate);
    }

    @action('doesProjectTagsDisplayCorrect')
    public async doesProjectTagsDisplayCorrect(tag: string | null): Promise<boolean> {
        const currentTag = await this.getTextBoxValue(this.tagContent);
        if (!tag) {
            tag = '';
        }
        return Utilities.isTextEqual(currentTag, tag);
    }

    @action('doesProjectDescriptionDisplayCorrect')
    public async doesProjectDescriptionDisplayCorrect(description: string | null): Promise<boolean> {
        const currentTag = await this.getTextBoxValue(this.description);
        if (!description) {
            description = '';
        }
        return Utilities.isTextEqual(currentTag, description);
    }

    @action('doesProjectOverviewDisplayCorrect')
    public async doesProjectOverviewDisplayCorrect(projectOverview: ProjectOverviewInfo): Promise<boolean> {
        gondola.report('Verify content of project overview');
        FlagsCollector.collectTruth(
            'Project name should be correct',
            await this.doesProjectNameDisplayCorrect(projectOverview.projectName),
        );
        FlagsCollector.collectTruth(
            'Project form should be correct',
            await this.doesProjectFormDisplayCorrect(projectOverview.projectForm),
        );
        FlagsCollector.collectTruth(
            'Project customer name should be correct',
            await this.doesProjectCustomerDisplayCorrect(projectOverview.customerName, false),
        );
        FlagsCollector.collectTruth(
            'Project department should be correct',
            await this.doesProjectDepartmentDisplayCorrect(projectOverview.department, false),
        );
        FlagsCollector.collectTruth(
            'Project worker name should be correct',
            await this.doesProjectWorkerDisplayCorrect(projectOverview.workerName, false),
        );

        FlagsCollector.collectTruth(
            'Project dates should be correct',
            await this.doesProjectDatesDisplayCorrect(
                projectOverview.startDate,
                projectOverview.endDate,
                projectOverview.scheduleStartDate,
                projectOverview.scheduleEndDate,
            ),
        );

        FlagsCollector.collectTruth(
            'Project Accuracy should be correct',
            await this.doesProjectAccuracyDisplayCorrect(projectOverview.accuracy),
        );
        FlagsCollector.collectTruth(
            'Project Status should be correct',
            await this.doesProjectStatusDisplayCorrect(projectOverview.status),
        );
        FlagsCollector.collectTruth(
            'Project Working place should be correct',
            await this.doesProjectWorkingPlaceDisplayCorrect(projectOverview.workingPlace),
        );
        FlagsCollector.collectTruth(
            'Project Currency id should be correct',
            await this.doesCurrencyIdDisplayCorrect(projectOverview.currencyId),
        );
        FlagsCollector.collectTruth(
            'Project Billing type should be correct',
            await this.doesBillingTypeDisplayCorrect(projectOverview.billingType),
        );
        FlagsCollector.collectTruth(
            'Project Closing date should be correct',
            await this.doesClosingDateDisplayCorrect(projectOverview.closingDate),
        );

        FlagsCollector.collectTruth(
            'Project Segment should be correct',
            await this.doesProjectSegmentDisplayCorrect(projectOverview.segment, false),
        );

        FlagsCollector.collectTruth(
            'Project Tags should be correct',
            await this.doesProjectTagsDisplayCorrect(projectOverview.tag),
        );
        FlagsCollector.collectTruth(
            'Project Description should be correct',
            await this.doesProjectDescriptionDisplayCorrect(projectOverview.description),
        );
        return FlagsCollector.verifyFlags();
    }

    @action('doesTimeOfProjectResultBaseDisplayCorrect')
    public async doesTimeOfProjectResultBaseDisplayCorrect(
        role: string,
        planTime: number | null,
        planPeople: number | null,
        totalTime: number | null,
    ): Promise<boolean> {
        const expectedPlanPeople = planPeople ? planPeople.toString() : '';
        const doesPeopleDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.planPeopleByRoleStr, role)),
            expectedPlanPeople,
        );
        const expectedPlanTime = planTime ? planTime.toString() : '';
        const doesTimeDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.planTimeByRoleStr, role)),
            expectedPlanTime,
        );
        const expectedTotalTime = totalTime ? totalTime.toString() : '';
        const doesTotalTimeDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.planTotalTimeByRoleStr, role)),
            expectedTotalTime,
        );
        return doesPeopleDisplayCorrect && doesTimeDisplayCorrect && doesTotalTimeDisplayCorrect;
    }

    @action('doesUnitPricesOfProjectResultBaseDisplayCorrect')
    public async doesUnitPricesOfProjectResultBaseDisplayCorrect(
        role: string,
        priceWeekday: string,
        priceWeekdayOT: string,
        priceWeekdayLate: string,
        priceWeekdayLateOT: string,
        priceHoliday: string,
        priceHolidayLate: string,
    ): Promise<boolean> {
        const isPriceWeekdayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayByRoleStr, role)),
            priceWeekday,
        );
        const isPriceWeekdayOTCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayOTByRoleStr, role)),
            priceWeekdayOT,
        );
        const isPriceWeekdayLateOTCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, role)),
            priceWeekdayLateOT,
        );
        const isPriceHolidayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceHolidayByRoleStr, role)),
            priceHoliday,
        );
        const isPriceWeekdayLateCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayLateByRoleStr, role)),
            priceWeekdayLate,
        );
        const isPriceHolidayLateCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceHolidayLateByRoleStr, role)),
            priceHolidayLate,
        );
        return (
            isPriceWeekdayCorrect &&
            isPriceWeekdayOTCorrect &&
            isPriceWeekdayLateCorrect &&
            isPriceWeekdayLateOTCorrect &&
            isPriceHolidayCorrect &&
            isPriceHolidayLateCorrect
        );
    }

    @action('doesTaxOfProjectResultBaseDisplayCorrect')
    public async doesTaxComponentDisplayCorrect(
        isTaxable: boolean,
        taxId: string,
        role?: string,
        index?: string,
    ): Promise<boolean> {
        let doesTaxDisplayCorrect = true;
        let isChecked = false;
        let currentTaxId = '';
        if (role !== undefined) {
            isChecked = await this.getCheckboxValue(Utilities.formatString(this.isTaxableByRoleCheckbox, role));
            currentTaxId = await gondola.getSelectedOption(Utilities.formatString(this.taxIdByRoleStr, role));
        }
        if (index !== undefined) {
            isChecked = await this.getCheckboxValue(Utilities.formatString(this.isTaxableByRowStr, index + ''));
            currentTaxId = await gondola.getSelectedOption(Utilities.formatString(this.taxIdByRowStr, index + ''));
        }

        if (isChecked !== isTaxable) {
            doesTaxDisplayCorrect = false;
        }

        if (isChecked) {
            doesTaxDisplayCorrect = Utilities.isTextEqual(currentTaxId, taxId);
        }

        return doesTaxDisplayCorrect;
    }

    @action('doesContentOfProjectResultBasesDisplayCorrect')
    public async doesContentOfProjectResultBasesDisplayCorrect(
        projectResultBases: ProjectResultBaseInfo[],
    ): Promise<boolean> {
        let index = 0;
        for (const projectResultBaseRow of projectResultBases) {
            gondola.report('Verify content of project result base, role: ' + projectResultBaseRow.role);
            FlagsCollector.collectTruth(
                `Record ${index}: Role should be selected`,
                (
                    await this.getTextBoxValue(
                        Utilities.formatString(this.searchItemByRoleStr, projectResultBaseRow.role),
                    )
                ).includes(projectResultBaseRow.item),
            );
            FlagsCollector.collectEqual(
                `Record ${index}: Debit credit should be selected`,
                await gondola.getSelectedOption(
                    Utilities.formatString(this.debitCreditByRoleStr, projectResultBaseRow.role),
                ),
                projectResultBaseRow.debitCredit,
            );
            const totalTime =
                projectResultBaseRow.planTime && projectResultBaseRow.planPeople
                    ? projectResultBaseRow.planTime * projectResultBaseRow.planPeople
                    : 0;
            FlagsCollector.collectTruth(
                `Record ${index}: Time should be correct`,
                await this.doesTimeOfProjectResultBaseDisplayCorrect(
                    projectResultBaseRow.role,
                    projectResultBaseRow.planTime,
                    projectResultBaseRow.planPeople,
                    totalTime,
                ),
            );

            FlagsCollector.collectTruth(
                `Record ${index}: Unit price should be correct`,
                await this.doesUnitPricesOfProjectResultBaseDisplayCorrect(
                    projectResultBaseRow.role,
                    projectResultBaseRow.unitPriceWeekday,
                    projectResultBaseRow.unitPriceWeekdayOT,
                    projectResultBaseRow.unitPriceWeekdayLate,
                    projectResultBaseRow.unitPriceWeekdayLateOT,
                    projectResultBaseRow.unitPriceHoliday,
                    projectResultBaseRow.unitPriceHolidayLate,
                ),
            );

            FlagsCollector.collectTruth(
                `Record ${index}: Tax should be correct`,
                await this.doesTaxComponentDisplayCorrect(
                    projectResultBaseRow.isTaxable,
                    projectResultBaseRow.taxId,
                    projectResultBaseRow.role,
                ),
            );

            const currentNote = await this.getTextBoxValue(
                Utilities.formatString(this.noteByRoleStr, projectResultBaseRow.role),
            );
            const expectedNote = projectResultBaseRow.note ? projectResultBaseRow.note : '';
            FlagsCollector.collectEqual(`Record ${index}: Note should be correct`, currentNote, expectedNote);

            const currentOutputOrder = await this.getTextBoxValue(
                Utilities.formatString(this.outputOrderbyRoleStr, projectResultBaseRow.role),
            );
            const expectedOutputOrder = projectResultBaseRow.outputOrder ? projectResultBaseRow.outputOrder : '';
            FlagsCollector.collectEqual(
                `Record ${index}: Output order should be correct`,
                currentOutputOrder,
                expectedOutputOrder,
            );
            index++;
        }
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('doesProjectDetailDatesDisplayCorrect')
    public async doesProjectDetailDatesDisplayCorrect(
        rowIndex: string,
        shipDate: string | null,
        deliveryDate: string | null,
        acceptedDate: string | null,
        billingDate: string | null,
    ): Promise<boolean> {
        const currentShipDate = await this.getTextBoxValue(Utilities.formatString(this.shipDateByRowStr, rowIndex));
        if (!shipDate) {
            shipDate = '';
        }
        FlagsCollector.collectEqual('Ship date should be correct', shipDate, currentShipDate);

        const currentDeliveryDate = await this.getTextBoxValue(
            Utilities.formatString(this.deliveryDateByRowStr, rowIndex),
        );
        if (!deliveryDate) {
            deliveryDate = '';
        }
        FlagsCollector.collectEqual('Delivery date should be correct', deliveryDate, currentDeliveryDate);

        const currentAcceptedDate = await this.getTextBoxValue(
            Utilities.formatString(this.acceptedDateByRowStr, rowIndex),
        );
        if (!acceptedDate) {
            acceptedDate = '';
        }
        FlagsCollector.collectEqual('Delivery date should be correct', acceptedDate, currentAcceptedDate);

        const currentBillingDate = await this.getTextBoxValue(
            Utilities.formatString(this.billingDateByRowStr, rowIndex),
        );
        if (!billingDate) {
            billingDate = '';
        }
        FlagsCollector.collectEqual('Delivery date should be correct', billingDate, currentBillingDate);

        return FlagsCollector.verifyFlags();
    }

    @action('doesContentOfProjectDetailsDisplayCorrect')
    public async doesContentOfProjectDetailsDisplayCorrect(projectDetails: ProjectDetailInfo[]): Promise<boolean> {
        for (let i = 1; i <= projectDetails.length; i++) {
            const projectDetailRow = projectDetails[i - 1];
            gondola.report('Verify content of project detail, row: ' + i);
            FlagsCollector.collectEqual(
                `Record ${i}. Detail name should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.detailNameByRowStr, i + '')),
                projectDetailRow.detailName,
            );

            FlagsCollector.collectTruth(
                `Record ${i}. Search item should be correct`,
                (await this.getTextBoxValue(Utilities.formatString(this.searchItemByRowStr, i + ''))).includes(
                    projectDetailRow.item,
                ),
            );

            FlagsCollector.collectEqual(
                `Record ${i}. Debit credit should be selected`,
                await gondola.getSelectedOption(Utilities.formatString(this.debitCreditByRowStr, i + '')),
                projectDetailRow.debitCredit,
            );

            FlagsCollector.collectTruth(
                `Record ${i}. Tax Component should be correct`,
                await this.doesTaxComponentDisplayCorrect(
                    projectDetailRow.isTaxable,
                    projectDetailRow.taxId,
                    undefined,
                    i + '',
                ),
            );

            FlagsCollector.collectEqual(
                `Record ${i}. Quantity should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.quantityByRowStr, i + '')),
                projectDetailRow.quantity,
            );

            FlagsCollector.collectEqual(
                `Record ${i}. Unit should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.unitByRowStr, i + '')),
                projectDetailRow.unit,
            );

            FlagsCollector.collectEqual(
                `Record ${i}. Unit price should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.unitPriceByRowStr, i + '')),
                projectDetailRow.unitPrice,
            );

            FlagsCollector.collectTruth(
                `Record ${i}. Project detail date should be correct`,
                await this.doesProjectDetailDatesDisplayCorrect(
                    i + '',
                    projectDetailRow.shipDate,
                    projectDetailRow.deliveryDate,
                    projectDetailRow.acceptedDate,
                    projectDetailRow.billingDate,
                ),
            );
        }
        return FlagsCollector.verifyFlags();
    }

    @action('doesProjectLabDisplayCorrect')
    public async doesProjectLabDisplayCorrect(labStr: string, isMatchEntire: boolean): Promise<boolean> {
        const currentLab = await this.getTextBoxValue(this.searchLabField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentLab, labStr);
        } else {
            return currentLab.includes(labStr);
        }
    }

    @action('doesProjectWorkingTimeDisplayCorrect')
    public async doesProjectWorkingTimeDisplayCorrect(startTime: string, endTime: string): Promise<boolean> {
        const doesStartTimeDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(this.workStartTime),
            startTime,
        );
        const doesEndTimeDisplayCorrect = Utilities.isTextEqual(await this.getTextBoxValue(this.workEndTime), endTime);
        return doesStartTimeDisplayCorrect && doesEndTimeDisplayCorrect;
    }

    @action('doesContentOfProjectResourcesDisplayCorrect')
    public async doesContentOfProjectResourcesDisplayCorrect(
        labName: string,
        workStartTime: string,
        workEndTime: string,
        projectResources: SingleResource[],
    ): Promise<boolean> {
        gondola.report('verify lab name');
        FlagsCollector.collectTruth(
            'Project lab should be correct',
            await this.doesProjectLabDisplayCorrect(labName, false),
        );

        gondola.report('verify working time');
        FlagsCollector.collectTruth(
            'Working time should be correct',
            await this.doesProjectWorkingTimeDisplayCorrect(workStartTime, workEndTime),
        );

        for (let i = 1; i <= projectResources.length; i++) {
            const projectResourceRow = projectResources[i - 1];
            gondola.report('Verify content of resource, row: ' + i);
            FlagsCollector.collectEqual(
                `Record ${i}. Resource date should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.resourceDateByRowStr, i + '')),
                projectResourceRow.resourceDate,
            );

            gondola.report('verify number of each roles: PM, leader, designer, expert, tester, reserve');
            FlagsCollector.collectEqual(
                `Record ${i}. PM count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countPMByRowStr, i + '')),
                projectResourceRow.countPM,
            );

            FlagsCollector.collectEqual(
                `Record ${i}. Leader count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countLeaderByRowStr, i + '')),
                projectResourceRow.countLeader,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Tester count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countTesterByRowStr, i + '')),
                projectResourceRow.countTester,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Designer count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countDesignerByRowStr, i + '')),
                projectResourceRow.countDesigner,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Expert count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countExpertByRowStr, i + '')),
                projectResourceRow.countExpert,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Reserver 1 count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countReserve1ByRowStr, i + '')),
                projectResourceRow.countReserve1,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Reserver 2 count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countReserve2ByRowStr, i + '')),
                projectResourceRow.countReserve2,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Reserver 3 count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countReserve3ByRowStr, i + '')),
                projectResourceRow.countReserve3,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Reserver 4 count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countReserve4ByRowStr, i + '')),
                projectResourceRow.countReserve4,
            );
            FlagsCollector.collectEqual(
                `Record ${i}. Reserver 5 count should be correct`,
                await this.getTextBoxValue(Utilities.formatString(this.countReserve5ByRowStr, i + '')),
                projectResourceRow.countReserve5,
            );
        }
        return FlagsCollector.verifyFlags();
    }

    @action('click outside date picker')
    public async clickOutsideDatePicker(): Promise<void> {
        await gondola.performClick(this.datePicker, Constants.SLIGHTLY_RIGHT_OFFSET);
    }

    @action('does date picker display')
    public async doesDatePickerDisplay(positive = true): Promise<boolean> {
        if (!positive) {
            await gondola.waitUntilElementNotVisible(this.datePicker, Constants.SHORT_TIMEOUT);
        }
        return await gondola.doesControlDisplay(this.datePicker);
    }

    @action('select random date')
    public async selectRandomDate(): Promise<string> {
        const numberOfDays = await gondola.getElementCount(this.datePickerDay);
        const randomDay = Utilities.getRandomNumber(1, numberOfDays);
        const locator = Utilities.formatString(this.datePickerDayByIndex, randomDay.toString());
        const selectedDate = await this.getSelectedDate(randomDay.toString());
        await gondola.click(locator);
        return selectedDate;
    }

    @action('get selected date')
    public async getSelectedDate(day?: string): Promise<string> {
        const month = (await gondola.getText(this.datePickerMonth)).replace(/^\D+/g, '');
        const year = await gondola.getText(this.datePickerYear);
        if (!day) {
            day = await gondola.getText(this.datePickerSelectedDay);
        }
        return Utilities.getDateString(day, month, year, Constants.NORMAL_DATE_FORMAT);
    }

    @action('get closing date as number')
    public async getClosingDateAsNumber(): Promise<string> {
        const selectedDate = await this.getSelectedOptionByLabel(Constants.translator.fieldName.addProject.closingDate);
        return selectedDate === Constants.japaneseEndDate ? '31' : selectedDate;
    }

    @action('does tag display')
    public async doesTagDisplay(tagName: string, expecting = true): Promise<boolean> {
        const locator = Utilities.formatString(this.tagItem, tagName);
        if (expecting) {
            await gondola.waitForElement(locator, Constants.VERY_SHORT_TIMEOUT);
        } else {
            await gondola.waitForDisappear(locator, Constants.VERY_SHORT_TIMEOUT);
        }
        return await gondola.doesControlExist(locator);
    }

    @action('remove tag item')
    public async removeTagItem(tagName: string): Promise<void> {
        const locator = Utilities.formatString(this.removeTag, tagName);
        await gondola.waitForElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(locator);
    }

    @action('does tag unique')
    public async doesTagUnique(tagName: string): Promise<boolean> {
        const locator = Utilities.formatString(this.tagItem, tagName);
        const numberOfTags = await gondola.getElementCount(locator);
        return numberOfTags === 1;
    }

    @action('get random role label')
    public async getRandomRoleLabel(): Promise<string> {
        const numberOfRoles = await gondola.getElementCount(this.roleLabels);
        const locator = Utilities.formatString(
            this.roleLabelByIndex,
            Utilities.getRandomNumber(1, numberOfRoles).toString(),
        );

        return await gondola.getText(locator);
    }

    @action('does billing details line display')
    public async doesRoleBillingDetailsLineDisplay(roleName: string, expected = true): Promise<boolean> {
        const locator = Utilities.formatString(this.roleBillingDetailsLine, roleName);
        if (expected) {
            gondola.waitUntilElementVisible(locator, Constants.SHORT_TIMEOUT);
        } else {
            gondola.waitUntilElementNotVisible(locator, Constants.SHORT_TIMEOUT);
        }
        return await gondola.doesControlDisplay(locator);
    }

    @action('get invalid feedback from project result base')
    public async getInvalidFeedBackProjectResultsBase(
        role: string,
        nameAttribute: ResultsBaseField,
        elementType = ElementType.TEXTFIELD,
    ): Promise<string> {
        const locator = Utilities.formatString(
            this.invalidFeedbackProjectResultsBase,
            role,
            elementType.type,
            nameAttribute.nameAttribute,
        );
        if (!(await gondola.doesControlExist(locator))) {
            return '';
        }
        return await gondola.getText(locator);
    }

    @action('does result base column required')
    public async doesResultsBaseColumnRequired(columnName: string): Promise<boolean> {
        const locator = Utilities.formatString(this.resultsBaseColumnName, columnName);
        return await this.doesControlRequired(locator);
    }

    @action('enter project result base text field')
    public async enterProjectResultBaseTextfield(
        role: string,
        attrName: ResultsBaseField,
        text: string,
        type = ElementType.TEXTFIELD,
    ): Promise<void> {
        const locator = this.textFieldProjectResultsBase.format(role, type.type, attrName.nameAttribute);
        await gondola.enter(locator, text);
    }

    @action('enter project result base text field')
    public async isProjectResultBaseTextFieldReadOnly(
        role: string,
        attrName: ResultsBaseField,
        type = ElementType.TEXTFIELD,
    ): Promise<boolean> {
        const locator = this.textFieldProjectResultsBase.format(role, type.type, attrName.nameAttribute);
        const isReadonly = await gondola.getControlProperty(locator, 'readonly');
        return isReadonly === 'true';
    }

    @action('get project result base text field')
    public async getProjectResultBaseTextfield(
        role: string,
        attrName: ResultsBaseField,
        waitForTextTimeout?: number,
        type = ElementType.TEXTFIELD,
    ): Promise<string> {
        const locator = this.textFieldProjectResultsBase.format(role, type.type, attrName.nameAttribute);
        if (waitForTextTimeout) {
            await gondola.waitUntilTextAvailable(locator, waitForTextTimeout);
        }
        return await gondola.getControlProperty(locator, 'value');
    }

    @action('get project result base validation')
    public async getProjectResultBaseTextfieldValidationMessage(
        role: string,
        attrName: ResultsBaseField,
        type = ElementType.TEXTFIELD,
    ): Promise<string> {
        const locator = this.textFieldProjectResultsBase.format(role, type.type, attrName.nameAttribute);
        return await gondola.getValidationMessage(locator);
    }

    public async isUnitPriceCalculatedCorrectly(
        role: string,
        unitPrice: CustomerMagnifications,
        basePrice: number,
    ): Promise<boolean> {
        const dataMapping = new Map<ResultsBaseField, number>();
        dataMapping.set(ResultsBaseField.UNIT_PRICE_WEEKDAY, basePrice);
        dataMapping.set(ResultsBaseField.UNIT_PRICE_WEEKDAY_OVERTIME, Math.floor(basePrice * unitPrice.overtime));
        dataMapping.set(ResultsBaseField.UNIT_PRICE_HOLIDAY, Math.floor(basePrice * unitPrice.holiday));
        dataMapping.set(ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE, Math.floor(basePrice * unitPrice.late_night));
        dataMapping.set(
            ResultsBaseField.UNIT_PRICE_WEEKDAY_LATE_OVERTIME,
            Math.floor(basePrice * unitPrice.late_night_overtime),
        );
        dataMapping.set(ResultsBaseField.UNIT_PRICE_HOLIDAY_LATE, Math.floor(basePrice * unitPrice.holiday_late_night));
        for (const [key, value] of dataMapping) {
            FlagsCollector.collectEqual(
                `Unit price ${key.toString()} should be displayed correctly`,
                value.toString(),
                await this.getProjectResultBaseTextfield(role, key, Constants.SHORT_TIMEOUT),
            );
        }
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }
}
export default new AddProjectPage();
