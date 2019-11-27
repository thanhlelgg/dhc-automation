import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { ProjectOverviewInfo } from '../models/project-overview-info';
import { ProjectResultBaseInfo } from '../models/project-result-base-info';
import { ProjectDetailInfo } from '../models/project-detail-info';
import { ProjectResourceInfo } from '../models/project-resource-info';
import { FilterType } from '../models/enum-class/filter-field-type';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { DatabaseHelper } from '../helper/database-helpers';

@page
export class AddProjectPage extends GeneralPage {
    protected searchResult = "(//div[@role='row']//div[contains(.,'{0}')])[1]";
    protected searchResultByTabulatorField = "//div[@class='tabulator-table']//div[@tabulator-field='{0}']";
    protected searchResultByTabulatorFieldAndText =
        "//div[@class='tabulator-table']//div[@tabulator-field='{0}' and .='{1}']";
    protected searchResultRow = "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div";
    protected searchResultRowByIndex = "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div[{0}]";
    protected searchResultColumnsByRowIndex =
        "//div[@class='tabulator-table' and not(contains(@style, 'hidden'))]/div[{0}]/div";
    //#region project result
    @locator
    protected subTitleProjectResult = `//div[.='${this.translator.sectionName.volumeDetail}']`;
    //protected roleCheckboxStr = "//div[@id='project-result-bases']/div[contains(.,'{0}')]//input[@type='checkbox']/preceding-sibling::input";
    protected roleCheckboxStr = "//div[@id='project-result-bases']/div[contains(.,'{0}')]";
    protected roleRowStr = "//tr[contains(.,'{0}')]";
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
    protected notebyRoleStr = "//tr[contains(.,'{0}')]//textarea[contains(@id, 'note')]";
    protected outputOrderbyRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'output-order')]";
    //#endregion

    //#region Search
    @locator
    protected itemFilter = "//input[@id='modal-items-filter']";
    @locator
    protected itemTable = { id: 'modal-items-table' };
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
    protected startDate = { name: 'start_date' };
    @locator
    protected endDate = { name: 'end_date' };
    @locator
    protected scheduleStartDate = { name: 'scheduled_start_date' };
    @locator
    protected scheduleEndDate = { name: 'scheduled_end_date' };
    //#endregion

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

    //#region search Segment
    @locator
    protected searchSegmentField = { id: 'search-segments' };
    @locator
    protected segmentTable = { id: 'modal-segments-table' };
    //#endregion

    @locator
    protected tag = "//input[@id='tag']//preceding-sibling::div//input";
    protected tagContent = "//input[@id='tag']";
    @locator
    protected description = { id: 'description' };

    //#region project detail
    @locator
    protected addProjectDetailBtn = { id: 'project-details-add-row' };
    protected removeIconByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//a[@class='remove-project-details']";
    protected detailNamebyRowStr =
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

    @locator
    protected saveButton = { css: '.btn-info' };

    //#region project ordered detail
    protected subTitleProjectOrderedDetail = "//div[.='非稼働明細']";
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

    //#region project result bases
    @locator
    protected projectResultSection = { id: 'project-result-bases' };
    //#endregion

    @action('doesSearchResultDisplay')
    public async doesSearchResultDisplay(itemName: string, type: SearchResultColumn): Promise<boolean> {
        const locator = Utilities.formatString(this.searchResultByTabulatorFieldAndText, type.tabulatorField, itemName);
        return await (gondola as any).isDisplayed(locator);
    }

    @action('doesPartialSearchResultDisplayCorrectly')
    public async doesPartialSearchResultDisplayCorrectly(
        keyword: string,
        column: SearchResultColumn,
    ): Promise<boolean> {
        const results = await this.getAllItemsOneColumn(column);
        return Utilities.isFilterCorrect(keyword, results);
    }

    @action('selectSearchResult')
    public async selectSearchResult(itemName: string | undefined, type?: SearchResultColumn): Promise<void> {
        let locator;
        // we handle undefined in here so we won't have to handle it on the test case level
        if (itemName === undefined) {
            throw new Error('Item name is not valid');
        }
        if (type === undefined) {
            locator = Utilities.formatString(this.searchResult, itemName);
        } else {
            locator = Utilities.formatString(this.searchResultByTabulatorFieldAndText, type.tabulatorField, itemName);
        }
        await this.waitControlExist(locator);
        await gondola.click(locator);
    }

    @action('filterResult')
    public async filterResult(value: string, type: FilterType): Promise<void> {
        const itemXpath = { id: type.searchFieldId };
        await this.waitControlExist(itemXpath, Constants.LONG_TIMEOUT);
        await gondola.enter(itemXpath, value);
    }

    /**
     * Get all result from a specific column
     * @param resultColumn `tabulator-field` attribute of the column as from a enum collection
     */
    public async getAllItemsOneColumn(resultColumn: SearchResultColumn): Promise<string[]> {
        const resultLocator = Utilities.formatString(this.searchResultByTabulatorField, resultColumn.tabulatorField);
        await this.waitControlExist(resultLocator, Constants.LONG_TIMEOUT);
        return await (gondola as any).getElementsAttributes(resultLocator, 'innerText');
    }

    /**
     * Get a result from search page, if not index provided, select a random one
     * @param index
     * @returns a Map<string, string> that contains `tabulator-field` attribute as key and it's text as value
     */
    public async getOneResultItemAllColumns(index?: number): Promise<Map<string, string>> {
        const map = new Map<string, string>();
        if (index === undefined) {
            await this.waitControlExist(this.searchResultRow, Constants.LONG_TIMEOUT);
            const numberOfItems = await gondola.getElementCount(this.searchResultRow);
            index = Utilities.getRandomNumber(1, numberOfItems);
        }
        const itemRowLocator = Utilities.formatString(this.searchResultColumnsByRowIndex, index.toString());
        const numberOfAttributes = await gondola.getElementCount(itemRowLocator);
        for (let i = 1; i <= numberOfAttributes; i++) {
            const attributesLocator = itemRowLocator + `[${i}]`;
            const key = await (gondola as any).getElementAttribute(attributesLocator, 'tabulator-field');
            const value = await gondola.getText(attributesLocator);
            map.set(key, value);
        }
        return map;
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

        // Filter with department code and verify result
        await this.filterResult(departmentCode, FilterType.DEPARTMENT);
        const departmentCodeResults = await this.getAllItemsOneColumn(SearchResultColumn.CODE);
        const isDepartmentCodeFiltered = Utilities.isFilterCorrect(departmentCode, departmentCodeResults);

        // Filter with department name and verify result
        await this.filterResult(departmentName, FilterType.DEPARTMENT);
        const departmentNameResults = await this.getAllItemsOneColumn(SearchResultColumn.NAME);
        const isDepartmentNameFiltered = Utilities.isFilterCorrect(departmentName, departmentNameResults);

        return isDepartmentCodeFiltered && isDepartmentNameFiltered;
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

        // Filter with worker code and verify result
        await this.filterResult(workerCode, FilterType.WORKER);
        const workerCodeResults = await this.getAllItemsOneColumn(SearchResultColumn.CODE);
        const isWorkerCodeFiltered = Utilities.isFilterCorrect(workerCode, workerCodeResults);

        // Filter with worker name and verify result
        await this.filterResult(workerName, FilterType.WORKER);
        const workerNameResults = await this.getAllItemsOneColumn(SearchResultColumn.NAME);
        const isWorkerNameFiltered = Utilities.isFilterCorrect(workerName, workerNameResults);

        return isWorkerCodeFiltered && isWorkerNameFiltered;
    }

    @action('searchCustomerByName')
    public async searchCustomerByName(customerName: string): Promise<void> {
        await gondola.click(this.searchCustomerField);
        await this.filterResult(customerName, FilterType.CUSTOMER_NAME);
        await this.selectSearchResult(customerName, SearchResultColumn.NAME);
    }

    @action('searchCustomerByCode')
    public async searchCustomerByCode(customerCode: string): Promise<void> {
        await gondola.click(this.searchCustomerField);
        await this.filterResult(customerCode, FilterType.CUSTOMER_CODE);
        await this.selectSearchResult(customerCode, SearchResultColumn.CODE);
    }

    @action('searchDepartment')
    public async searchDepartment(department: string): Promise<void> {
        await gondola.click(this.searchDepartmentField);
        await this.filterResult(department, FilterType.DEPARTMENT);
        await this.selectSearchResult(department, SearchResultColumn.NAME);
    }

    @action('searchWorker')
    public async searchWorker(worker: string): Promise<void> {
        await gondola.click(this.searchWorkerField);
        await this.filterResult(worker, FilterType.WORKER);
        await this.selectSearchResult(worker, SearchResultColumn.NAME);
    }

    @action('searchSegment')
    public async searchSegment(segment: string): Promise<void> {
        await gondola.click(this.searchSegmentField);
        await this.filterResult(segment, FilterType.SEGMENTS);
        await this.selectSearchResult(segment, SearchResultColumn.SEGMENTS_CODE);
    }

    @action('searchItem')
    public async searchItem(item: string, index: any, position: string): Promise<void> {
        let searchItemXpath = Utilities.formatString(this.searchItemByRoleStr, index);
        if (position == 'detail') {
            searchItemXpath = Utilities.formatString(this.searchItemByRowStr, index);
        }

        await gondola.click(searchItemXpath);
        await this.waitControlExist(this.itemFilter, Constants.LONG_TIMEOUT);
        await gondola.enter(this.itemFilter, item);
        await this.selectSearchResult(item);
    }

    @action('searchLab')
    public async searchLab(lab: string): Promise<void> {
        await gondola.click(this.searchLabField);
        await this.filterResult(lab, FilterType.LAB);
        await this.selectSearchResult(lab);
    }

    @action('checkProjectForm')
    public async checkProjectFormOptions(options: string[]): Promise<boolean> {
        return await (gondola as any).areOptionsExists(this.projectForm, options);
    }

    @action('selectProjectForm')
    public async selectProjectForm(option: string): Promise<void> {
        await gondola.select(this.projectForm, option);
    }

    @action('isProjectResultSectionDisplayed')
    public async isProjectResultSectionDisplayed(): Promise<boolean> {
        return await (gondola as any).doesControlDisplay(this.projectResultSection);
    }

    @action('inputProjectOverview')
    public async inputProjectOverview(projectOverview: ProjectOverviewInfo): Promise<void> {
        await gondola.enter(this.projectName, projectOverview.$projectName);
        await gondola.select(this.projectForm, projectOverview.$projectForm);
        await this.searchCustomerByName(projectOverview.$customerName);
        await this.searchDepartment(projectOverview.$department);
        await this.searchWorker(projectOverview.$workerName);
        if (projectOverview.$startDate !== undefined && projectOverview.$startDate !== null) {
            await this.enterText(this.startDate, projectOverview.$startDate);
        }
        if (projectOverview.$endDate !== undefined && projectOverview.$endDate !== null) {
            await this.enterText(this.endDate, projectOverview.$endDate);
        }
        if (projectOverview.$scheduleStartDate !== undefined && projectOverview.$scheduleStartDate !== null) {
            await this.enterText(this.scheduleStartDate, projectOverview.$scheduleStartDate);
        }
        if (projectOverview.$scheduleEndDate !== undefined && projectOverview.$scheduleEndDate !== null) {
            await this.enterText(this.scheduleEndDate, projectOverview.$scheduleEndDate);
        }
        await gondola.select(this.accuracy, projectOverview.$accuracy);
        await gondola.select(this.status, projectOverview.$status);
        await gondola.select(this.workingPlace, projectOverview.$workingPlace);
        await gondola.select(this.currencyId, projectOverview.$currencyId);
        await gondola.select(this.billingType, projectOverview.$billingType);
        await gondola.select(this.closingDate, projectOverview.$closingDate);
        await this.searchSegment(projectOverview.$segment);
        if (projectOverview.$tag !== undefined && projectOverview.$tag !== null) {
            await this.enterText(this.tag, projectOverview.$tag);
        }
        if (projectOverview.$description !== undefined && projectOverview.$description !== null) {
            await this.enterText(this.description, projectOverview.$description);
        }
    }

    @action('inputProjectResultBases')
    public async inputProjectResultBases(projectResultBase: ProjectResultBaseInfo): Promise<void> {
        const formExist = await gondola.doesControlExist(this.subTitleProjectResult);
        if (formExist) {
            const checkBoxXpath = Utilities.formatString(this.roleCheckboxStr, projectResultBase.$role);
            await gondola.click(checkBoxXpath);
            await this.searchItem(projectResultBase.$item, projectResultBase.$role, 'result bases');
            await gondola.select(
                Utilities.formatString(this.debitCreditByRoleStr, projectResultBase.$role),
                projectResultBase.$debitCredit,
            );
            await gondola.enter(
                Utilities.formatString(this.planPeopleByRoleStr, projectResultBase.$role),
                projectResultBase.$planPeople + '',
            );
            await gondola.enter(
                Utilities.formatString(this.planTimeByRoleStr, projectResultBase.$role),
                projectResultBase.$planTime + '',
            );
            // check plan total time
            await this.checkPlanTotalTime(
                projectResultBase.$planTime,
                projectResultBase.$planPeople,
                Utilities.formatString(this.planTotalTimeByRoleStr, projectResultBase.$role),
            );
            await this.enterText(
                Utilities.formatString(this.unitPriceWeekdayByRoleStr, projectResultBase.$role),
                projectResultBase.$unitPriceWeekday,
            );
            await gondola.enter(
                Utilities.formatString(this.unitPriceWeekdayOTByRoleStr, projectResultBase.$role),
                projectResultBase.$unitPriceWeekdayOT,
            );
            await gondola.enter(
                Utilities.formatString(this.unitPriceHolidayByRoleStr, projectResultBase.$role),
                projectResultBase.$unitPriceHoliday,
            );
            await gondola.enter(
                Utilities.formatString(this.unitPriceWeekdayLateByRoleStr, projectResultBase.$role),
                projectResultBase.$unitPriceWeekDayLate,
            );
            await gondola.enter(
                Utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, projectResultBase.$role),
                projectResultBase.$unitPriceWeekdayLateOT,
            );
            await gondola.enter(
                Utilities.formatString(this.unitPriceHolidayLateByRoleStr, projectResultBase.$role),
                projectResultBase.$unitPriceHolidayLate,
            );
            await gondola.setState(
                Utilities.formatString(this.isTaxableByRoleStr, projectResultBase.$role),
                projectResultBase.$isTaxable,
            );
            if (projectResultBase.$isTaxable) {
                await gondola.select(
                    Utilities.formatString(this.taxIdByRoleStr, projectResultBase.$role),
                    projectResultBase.$taxId,
                );
            }

            if (projectResultBase.$note !== undefined && projectResultBase.$note !== null) {
                await gondola.enter(
                    Utilities.formatString(this.notebyRoleStr, projectResultBase.$role),
                    projectResultBase.$note,
                );
            }
            if (projectResultBase.$outputOrder !== undefined && projectResultBase.$outputOrder !== null) {
                await gondola.enter(
                    Utilities.formatString(this.outputOrderbyRoleStr, projectResultBase.$role),
                    projectResultBase.$outputOrder,
                );
            }
        }
    }

    @action('addProjectDetails')
    public async addProjectDetails(index: any, projectDetail: ProjectDetailInfo): Promise<void> {
        await gondola.click(this.addProjectDetailBtn);
        await gondola.enter(Utilities.formatString(this.detailNamebyRowStr, index), projectDetail.$detailName);
        await this.searchItem(projectDetail.$item, index, 'detail');
        await gondola.select(Utilities.formatString(this.debitCreditByRowStr, index), projectDetail.$debitCredit);
        await gondola.setState(Utilities.formatString(this.isTaxableByRowStr, index), projectDetail.$isTaxable);
        await gondola.select(Utilities.formatString(this.taxIdByRowStr, index), projectDetail.$taxId);
        await gondola.enter(Utilities.formatString(this.quantityByRowStr, index), projectDetail.$quantity);
        await gondola.enter(Utilities.formatString(this.unitByRowStr, index), projectDetail.$unit);
        await gondola.enter(Utilities.formatString(this.unitPriceByRowStr, index), projectDetail.$unitPrice);
        if (projectDetail.$shipDate !== undefined && projectDetail.$shipDate !== null) {
            await gondola.enter(Utilities.formatString(this.shipDateByRowStr, index), projectDetail.$shipDate);
        }
        if (projectDetail.$deliveryDate !== undefined && projectDetail.$deliveryDate !== null) {
            await gondola.enter(Utilities.formatString(this.deliveryDateByRowStr, index), projectDetail.$deliveryDate);
        }
        if (projectDetail.$acceptedDate !== undefined && projectDetail.$acceptedDate !== null) {
            await gondola.enter(Utilities.formatString(this.acceptedDateByRowStr, index), projectDetail.$acceptedDate);
        }
        if (projectDetail.$billingDate !== undefined && projectDetail.$billingDate !== null) {
            await gondola.enter(Utilities.formatString(this.billingDateByRowStr, index), projectDetail.$billingDate);
        }
    }

    @action('inputProjectResource')
    public async inputProjectResource(lab: string, workStartTime: string, workEndTime: string): Promise<void> {
        await this.searchLab(lab);
        await gondola.enter(this.workStartTime, workStartTime);
        await gondola.enter(this.workEndTime, workEndTime);
    }

    @action('addResourceRow')
    public async addResourceRow(index: any, projectResource: ProjectResourceInfo): Promise<void> {
        await gondola.click(this.addResourceButton);
        await gondola.enter(Utilities.formatString(this.resourceDateByRowStr, index), projectResource.$resourceDate);
        await gondola.enter(Utilities.formatString(this.countPMByRowStr, index), projectResource.$countPM);
        await gondola.enter(Utilities.formatString(this.countLeaderByRowStr, index), projectResource.$countLeader);
        await gondola.enter(Utilities.formatString(this.countTesterByRowStr, index), projectResource.$countTester);
        await gondola.enter(Utilities.formatString(this.countDesignerByRowStr, index), projectResource.$countDesigner);
        await gondola.enter(Utilities.formatString(this.countExpertByRowStr, index), projectResource.$countExpert);
        await gondola.enter(Utilities.formatString(this.countReserve1ByRowStr, index), projectResource.$countReserve1);
        await gondola.enter(Utilities.formatString(this.countReserve2ByRowStr, index), projectResource.$countReserve2);
        await gondola.enter(Utilities.formatString(this.countReserve3ByRowStr, index), projectResource.$countReserve3);
        await gondola.enter(Utilities.formatString(this.countReserve4ByRowStr, index), projectResource.$countReserve4);
        await gondola.enter(Utilities.formatString(this.countReserve5ByRowStr, index), projectResource.$countReserve5);
    }

    @action('clickOutsideOfWindowModal')
    public async clickOutsideOfWindowModal(): Promise<void> {
        // await gondola.click(this.saveButton);
        await (gondola as any).performClick(this.saveButton);
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

    @action('getPlanTotalTime')
    public async checkPlanTotalTime(planTime: number, planPeople: number, locator: any): Promise<void> {
        await gondola.click(locator);
        const totalTime = await gondola.getControlProperty(locator, 'value');
        await gondola.checkEqual(totalTime, planTime * planPeople + '');
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

    @action('scrollToRandomResult')
    public async scrollToRandomResult(numberOfDatabaseRecords: number): Promise<void> {
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
            await (gondola as any).scrollToElement(locator);
        }
    }

    @action('verifyContentOfProjectOverview')
    public async verifyContentOfProjectOverview(projectOverview: ProjectOverviewInfo) {
        gondola.report('Verify content of project overview');
        await gondola.checkEqual(await this.getTextBoxValue(this.projectName), projectOverview.$projectName);

        var projectForm = await this.getSelectedOption(this.projectForm);
        await gondola.checkEqual(projectForm, projectOverview.$projectForm);

        var customerStr = await this.getTextBoxValue(this.searchCustomerField);
        await gondola.checkEqual(customerStr.includes(projectOverview.$customerName), true);

        var departmentStr = await this.getTextBoxValue(this.searchDepartmentField);
        await gondola.checkEqual(departmentStr.includes(projectOverview.$department), true);

        var workerStr = await this.getTextBoxValue(this.searchWorkerField);
        await gondola.checkEqual(workerStr.includes(projectOverview.$workerName), true);

        gondola.report('verify date: start date, end date, schedule start date, schedule end date');
        if (projectOverview.$startDate !== null && projectOverview.$startDate !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.startDate), projectOverview.$startDate);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.startDate), '');
        }

        if (projectOverview.$endDate !== null && projectOverview.$endDate !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.endDate), projectOverview.$endDate);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.endDate), '');
        }

        if (projectOverview.$scheduleStartDate !== null && projectOverview.$scheduleStartDate !== undefined) {
            await gondola.checkEqual(
                await this.getTextBoxValue(this.scheduleStartDate),
                projectOverview.$scheduleStartDate,
            );
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.scheduleStartDate), '');
        }

        if (projectOverview.$scheduleEndDate !== null && projectOverview.$scheduleEndDate !== undefined) {
            await gondola.checkEqual(
                await this.getTextBoxValue(this.scheduleEndDate),
                projectOverview.$scheduleEndDate,
            );
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.scheduleEndDate), '');
        }

        var accuracy = await this.getSelectedOption(this.accuracy);
        await gondola.checkEqual(accuracy, projectOverview.$accuracy);

        var status = await this.getSelectedOption(this.status);
        await gondola.checkEqual(status, projectOverview.$status);

        var workingPlace = await this.getSelectedOption(this.workingPlace);
        await gondola.checkEqual(workingPlace, projectOverview.$workingPlace);

        var currencyId = await this.getSelectedOption(this.currencyId);
        await gondola.checkEqual(currencyId, projectOverview.$currencyId);

        var billingType = await this.getSelectedOption(this.billingType);
        await gondola.checkEqual(billingType, projectOverview.$billingType);

        var closingDate = await this.getSelectedOption(this.closingDate);
        await gondola.checkEqual(closingDate, projectOverview.$closingDate);

        var segment = await this.getTextBoxValue(this.searchSegmentField);
        await gondola.checkEqual(segment.includes(projectOverview.$segment), true);

        if (projectOverview.$tag !== null && projectOverview.$tag !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.tagContent), projectOverview.$tag);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.tagContent), '');
        }

        if (projectOverview.$description !== null && projectOverview.$description !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.description), projectOverview.$description);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.description), '');
        }
    }

    @action('verifyContentOfProjectResultBases')
    public async verifyContentOfProjectResultBases(projectResultBases: any[]) {
        for (let i = 0; i <= projectResultBases.length - 1; i++) {
            var projectResultBaseRow = new ProjectResultBaseInfo(projectResultBases[i]);
            gondola.report('Verify content of project result base, role: ' + projectResultBaseRow.$role);
            var item = await this.getTextBoxValue(
                Utilities.formatString(this.searchItemByRoleStr, projectResultBaseRow.$role),
            );
            await gondola.checkEqual(item.includes(projectResultBaseRow.$item), true);

            var debitCredit = await this.getSelectedOption(
                Utilities.formatString(this.debitCreditByRoleStr, projectResultBaseRow.$role),
            );
            await gondola.checkEqual(debitCredit, projectResultBaseRow.$debitCredit);

            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.planPeopleByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$planPeople + '',
            );

            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.planTimeByRoleStr, projectResultBaseRow.$role)),
                projectResultBaseRow.$planTime + '',
            );

            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.planTotalTimeByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$planTime * projectResultBaseRow.$planPeople + '',
            );

            gondola.report('Verify pricing');
            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.unitPriceWeekdayByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$unitPriceWeekday,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.unitPriceWeekdayOTByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$unitPriceWeekdayOT,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$unitPriceWeekdayLateOT,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.unitPriceHolidayByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$unitPriceHoliday,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.unitPriceWeekdayLateByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$unitPriceWeekDayLate,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(
                    Utilities.formatString(this.unitPriceHolidayLateByRoleStr, projectResultBaseRow.$role),
                ),
                projectResultBaseRow.$unitPriceHolidayLate,
            );

            var isTax = await this.getCheckboxValue(
                Utilities.formatString(this.isTaxableByRoleCheckbox, projectResultBaseRow.$role),
            );
            await gondola.checkEqual(isTax, projectResultBaseRow.$isTaxable);

            if (isTax) {
                var taxId = await this.getSelectedOption(
                    Utilities.formatString(this.taxIdByRoleStr, projectResultBaseRow.$role),
                );
                await gondola.checkEqual(taxId, projectResultBaseRow.$taxId);
            }

            if (projectResultBaseRow.$note !== null && projectResultBaseRow.$note !== undefined) {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.notebyRoleStr, projectResultBaseRow.$role)),
                    projectResultBaseRow.$note,
                );
            } else {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.notebyRoleStr, projectResultBaseRow.$role)),
                    '',
                );
            }

            if (projectResultBaseRow.$outputOrder !== null && projectResultBaseRow.$outputOrder !== undefined) {
                await gondola.checkEqual(
                    await this.getTextBoxValue(
                        Utilities.formatString(this.outputOrderbyRoleStr, projectResultBaseRow.$role),
                    ),
                    projectResultBaseRow.$outputOrder,
                );
            } else {
                await gondola.checkEqual(
                    await this.getTextBoxValue(
                        Utilities.formatString(this.outputOrderbyRoleStr, projectResultBaseRow.$role),
                    ),
                    '',
                );
            }
        }
    }

    @action('verifyContentOfProjectDetails')
    public async verifyContentOfProjectDetails(projectDetails: any[]) {
        for (let i = 1; i <= projectDetails.length; i++) {
            var projectDetailRow = new ProjectDetailInfo(projectDetails[i - 1]);
            gondola.report('Verify content of project detail, row: ' + i);
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.detailNamebyRowStr, i + '')),
                projectDetailRow.$detailName,
            );

            var item = await this.getTextBoxValue(Utilities.formatString(this.searchItemByRowStr, i + ''));
            await gondola.checkEqual(item.includes(projectDetailRow.$item), true);

            var debitCredit = await this.getSelectedOption(Utilities.formatString(this.debitCreditByRowStr, i + ''));
            await gondola.checkEqual(debitCredit, projectDetailRow.$debitCredit);

            var isTax = await this.getCheckboxValue(Utilities.formatString(this.isTaxableByRowStr, i + ''));
            await gondola.checkEqual(isTax, projectDetailRow.$isTaxable);

            if (isTax) {
                var taxId = await this.getSelectedOption(Utilities.formatString(this.taxIdByRowStr, i + ''));
                await gondola.checkEqual(taxId, projectDetailRow.$taxId);
            }

            gondola.report('verify quantity & pricing');
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.quantityByRowStr, i + '')),
                projectDetailRow.$quantity,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.unitByRowStr, i + '')),
                projectDetailRow.$unit,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.unitPriceByRowStr, i + '')),
                projectDetailRow.$unitPrice,
            );

            if (projectDetailRow.$shipDate !== null && projectDetailRow.$shipDate !== undefined) {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.shipDateByRowStr, i + '')),
                    projectDetailRow.$shipDate,
                );
            } else {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.shipDateByRowStr, i + '')),
                    '',
                );
            }

            if (projectDetailRow.$deliveryDate !== null && projectDetailRow.$deliveryDate !== undefined) {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.deliveryDateByRowStr, i + '')),
                    projectDetailRow.$deliveryDate,
                );
            } else {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.deliveryDateByRowStr, i + '')),
                    '',
                );
            }

            if (projectDetailRow.$acceptedDate !== null && projectDetailRow.$acceptedDate !== undefined) {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.acceptedDateByRowStr, i + '')),
                    projectDetailRow.$acceptedDate,
                );
            } else {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.acceptedDateByRowStr, i + '')),
                    '',
                );
            }

            if (projectDetailRow.$billingDate !== null && projectDetailRow.$billingDate !== undefined) {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.billingDateByRowStr, i + '')),
                    projectDetailRow.$billingDate,
                );
            } else {
                await gondola.checkEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.billingDateByRowStr, i + '')),
                    '',
                );
            }
        }
    }

    @action('verifyContentOfProjectResources')
    public async verifyContentOfProjectResources(
        labName: string,
        workStartTime: string,
        workEndTime: string,
        projectResources: any[],
    ) {
        gondola.report('verify lab name');
        var lab = await this.getTextBoxValue(this.searchLabField);
        await gondola.checkEqual(lab.includes(labName), true);

        gondola.report('verify working time');
        await gondola.checkEqual(await this.getTextBoxValue(this.workStartTime), workStartTime);
        await gondola.checkEqual(await this.getTextBoxValue(this.workEndTime), workEndTime);

        for (let i = 1; i <= projectResources.length; i++) {
            var projectResourceRow = new ProjectResourceInfo(projectResources[i - 1]);
            gondola.report('Verify content of resource, row: ' + i);
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.resourceDateByRowStr, i + '')),
                projectResourceRow.$resourceDate,
            );

            gondola.report('verify number of each roles: PM, leader, designer, expert, tester, reserve');
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countPMByRowStr, i + '')),
                projectResourceRow.$countPM,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countLeaderByRowStr, i + '')),
                projectResourceRow.$countLeader,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countTesterByRowStr, i + '')),
                projectResourceRow.$countTester,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countDesignerByRowStr, i + '')),
                projectResourceRow.$countDesigner,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countExpertByRowStr, i + '')),
                projectResourceRow.$countExpert,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countReserve1ByRowStr, i + '')),
                projectResourceRow.$countReserve1,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countReserve2ByRowStr, i + '')),
                projectResourceRow.$countReserve2,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countReserve3ByRowStr, i + '')),
                projectResourceRow.$countReserve3,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countReserve4ByRowStr, i + '')),
                projectResourceRow.$countReserve4,
            );
            await gondola.checkEqual(
                await this.getTextBoxValue(Utilities.formatString(this.countReserve5ByRowStr, i + '')),
                projectResourceRow.$countReserve5,
            );
        }
    }
}
export default new AddProjectPage();
