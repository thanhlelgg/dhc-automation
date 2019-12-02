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
        if (position === 'detail') {
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
    public async inputProjectResultBases(projectResultBases: any[]): Promise<void> {
        const formExist = await gondola.doesControlExist(this.subTitleProjectResult);
        if (formExist) {
            for (let i = 0; i <= projectResultBases.length - 1; i++) {
                var projectResultBase = new ProjectResultBaseInfo(projectResultBases[i]);
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
                    projectResultBase.getTotalPlanTime(),
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
                    projectResultBase.$unitPriceWeekdayLate,
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
    }

    @action('addProjectDetails')
    public async addProjectDetails(projectDetails: any[]): Promise<void> {
        for (let i = 1; i <= projectDetails.length; i++) {
            var projectDetail = new ProjectDetailInfo(projectDetails[i - 1]);
            await gondola.click(this.addProjectDetailBtn);
            await gondola.enter(Utilities.formatString(this.detailNamebyRowStr, i + ''), projectDetail.$detailName);
            await this.searchItem(projectDetail.$item, i + '', 'detail');
            await gondola.select(Utilities.formatString(this.debitCreditByRowStr, i + ''), projectDetail.$debitCredit);
            await gondola.setState(Utilities.formatString(this.isTaxableByRowStr, i + ''), projectDetail.$isTaxable);
            await gondola.select(Utilities.formatString(this.taxIdByRowStr, i + ''), projectDetail.$taxId);
            await gondola.enter(Utilities.formatString(this.quantityByRowStr, i + ''), projectDetail.$quantity);
            await gondola.enter(Utilities.formatString(this.unitByRowStr, i + ''), projectDetail.$unit);
            await gondola.enter(Utilities.formatString(this.unitPriceByRowStr, i + ''), projectDetail.$unitPrice);
            if (projectDetail.$shipDate !== undefined && projectDetail.$shipDate !== null) {
                await gondola.enter(Utilities.formatString(this.shipDateByRowStr, i + ''), projectDetail.$shipDate);
            }
            if (projectDetail.$deliveryDate !== undefined && projectDetail.$deliveryDate !== null) {
                await gondola.enter(
                    Utilities.formatString(this.deliveryDateByRowStr, i + ''),
                    projectDetail.$deliveryDate,
                );
            }
            if (projectDetail.$acceptedDate !== undefined && projectDetail.$acceptedDate !== null) {
                await gondola.enter(
                    Utilities.formatString(this.acceptedDateByRowStr, i + ''),
                    projectDetail.$acceptedDate,
                );
            }
            if (projectDetail.$billingDate !== undefined && projectDetail.$billingDate !== null) {
                await gondola.enter(
                    Utilities.formatString(this.billingDateByRowStr, i + ''),
                    projectDetail.$billingDate,
                );
            }
        }
    }

    @action('inputProjectResource')
    public async inputProjectResource(lab: string, workStartTime: string, workEndTime: string): Promise<void> {
        await this.searchLab(lab);
        await gondola.enter(this.workStartTime, workStartTime);
        await gondola.enter(this.workEndTime, workEndTime);
    }

    @action('addResourceRows')
    public async addResourceRows(projectResources: any[]): Promise<void> {
        for (let i = 1; i <= projectResources.length; i++) {
            var projectResource = new ProjectResourceInfo(projectResources[i - 1]);
            await gondola.click(this.addResourceButton);
            await gondola.enter(
                Utilities.formatString(this.resourceDateByRowStr, i + ''),
                projectResource.$resourceDate,
            );
            await gondola.enter(Utilities.formatString(this.countPMByRowStr, i + ''), projectResource.$countPM);
            await gondola.enter(Utilities.formatString(this.countLeaderByRowStr, i + ''), projectResource.$countLeader);
            await gondola.enter(Utilities.formatString(this.countTesterByRowStr, i + ''), projectResource.$countTester);
            await gondola.enter(
                Utilities.formatString(this.countDesignerByRowStr, i + ''),
                projectResource.$countDesigner,
            );
            await gondola.enter(Utilities.formatString(this.countExpertByRowStr, i + ''), projectResource.$countExpert);
            await gondola.enter(
                Utilities.formatString(this.countReserve1ByRowStr, i + ''),
                projectResource.$countReserve1,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve2ByRowStr, i + ''),
                projectResource.$countReserve2,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve3ByRowStr, i + ''),
                projectResource.$countReserve3,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve4ByRowStr, i + ''),
                projectResource.$countReserve4,
            );
            await gondola.enter(
                Utilities.formatString(this.countReserve5ByRowStr, i + ''),
                projectResource.$countReserve5,
            );
        }
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

    @action('checkPlanTotalTime')
    public async checkPlanTotalTime(expectedTotalTime: number, locator: any): Promise<void> {
        await gondola.click(locator);
        const totalTime = await gondola.getControlProperty(locator, 'value');
        await gondola.checkEqual(totalTime, expectedTotalTime + '');
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

    @action('doesProjectNameDisplayCorrect')
    public async doesProjectNameDisplayCorrect(projectName: string): Promise<boolean> {
        let currentName = await this.getTextBoxValue(this.projectName);
        return Utilities.isTextEqual(currentName, projectName);
    }

    @action('doesProjectFormDisplayCorrect')
    public async doesProjectFormDisplayCorrect(projectForm: string): Promise<boolean> {
        let currentProjectForm = await this.getSelectedOption(this.projectForm);
        return Utilities.isTextEqual(currentProjectForm, projectForm);
    }

    @action('doesProjectCustomerDisplayCorrect')
    public async doesProjectCustomerDisplayCorrect(customerStr: string, isMatchEntire: boolean): Promise<boolean> {
        let currentCustomer = await this.getTextBoxValue(this.searchCustomerField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentCustomer, customerStr);
        } else {
            return currentCustomer.includes(customerStr);
        }
    }

    @action('doesProjectDepartmentDisplayCorrect')
    public async doesProjectDepartmentDisplayCorrect(departmentStr: string, isMatchEntire: boolean): Promise<boolean> {
        let currentDepartment = await this.getTextBoxValue(this.searchDepartmentField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentDepartment, departmentStr);
        } else {
            return currentDepartment.includes(departmentStr);
        }
    }

    @action('doesProjectWorkerDisplayCorrect')
    public async doesProjectWorkerDisplayCorrect(workerStr: string, isMatchEntire: boolean): Promise<boolean> {
        let currentWorker = await this.getTextBoxValue(this.searchWorkerField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentWorker, workerStr);
        } else {
            return currentWorker.includes(workerStr);
        }
    }

    @action('doesProjectSegmentDisplayCorrect')
    public async doesProjectSegmentDisplayCorrect(segmentStr: string, isMatchEntire: boolean): Promise<boolean> {
        let currentSegment = await this.getTextBoxValue(this.searchSegmentField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentSegment, segmentStr);
        } else {
            return currentSegment.includes(segmentStr);
        }
    }

    @action('doesProjectDatesDisplayCorrect')
    public async doesProjectDatesDisplayCorrect(
        startDate?: string,
        endDate?: string,
        scheduleStartDate?: string,
        scheduleEndDate?: string,
    ): Promise<boolean> {
        gondola.report('verify date: start date, end date, schedule start date, schedule end date');
        let doesStartDateDisplayCorrect = true;
        let currentStartDate = await this.getTextBoxValue(this.startDate);
        if (startDate !== null && startDate !== undefined) {
            doesStartDateDisplayCorrect = Utilities.isTextEqual(currentStartDate, startDate);
        } else {
            doesStartDateDisplayCorrect = Utilities.isTextEqual(currentStartDate, '');
        }

        let doesEndDateDisplayCorrect = true;
        let currentEndDate = await this.getTextBoxValue(this.endDate);
        if (endDate !== null && endDate !== undefined) {
            doesEndDateDisplayCorrect = Utilities.isTextEqual(currentEndDate, endDate);
        } else {
            doesEndDateDisplayCorrect = Utilities.isTextEqual(currentEndDate, '');
        }

        let doesScheduleStartDateDisplayCorrect = true;
        let currentScheduleStartDate = await this.getTextBoxValue(this.scheduleStartDate);
        if (scheduleStartDate !== null && scheduleStartDate !== undefined) {
            doesScheduleStartDateDisplayCorrect = Utilities.isTextEqual(currentScheduleStartDate, scheduleStartDate);
        } else {
            doesScheduleStartDateDisplayCorrect = Utilities.isTextEqual(currentScheduleStartDate, '');
        }

        let doesScheduleEndDateDisplayCorrect = true;
        let currentScheduleEndDate = await this.getTextBoxValue(this.scheduleEndDate);
        if (scheduleEndDate !== null && scheduleEndDate !== undefined) {
            doesScheduleEndDateDisplayCorrect = Utilities.isTextEqual(currentScheduleEndDate, scheduleEndDate);
        } else {
            doesScheduleEndDateDisplayCorrect = Utilities.isTextEqual(currentScheduleEndDate, '');
        }

        return (
            doesStartDateDisplayCorrect &&
            doesEndDateDisplayCorrect &&
            doesScheduleStartDateDisplayCorrect &&
            doesScheduleEndDateDisplayCorrect
        );
    }

    @action('doesProjectAccuracyDisplayCorrect')
    public async doesProjectAccuracyDisplayCorrect(accuracy: string) {
        let currentAccuracy = await this.getSelectedOption(this.accuracy);
        return Utilities.isTextEqual(currentAccuracy, accuracy);
    }

    @action('doesProjectStatusDisplayCorrect')
    public async doesProjectStatusDisplayCorrect(status: string) {
        let currentStatus = await this.getSelectedOption(this.status);
        return Utilities.isTextEqual(currentStatus, status);
    }

    @action('doesProjectWorkingPlaceDisplayCorrect')
    public async doesProjectWorkingPlaceDisplayCorrect(workingPlace: string) {
        let currentWorkingPlace = await this.getSelectedOption(this.workingPlace);
        return Utilities.isTextEqual(currentWorkingPlace, workingPlace);
    }

    @action('doesCurrencyIdDisplayCorrect')
    public async doesCurrencyIdDisplayCorrect(currencyId: string): Promise<boolean> {
        let currentCurrencyId = await this.getSelectedOption(this.currencyId);
        return Utilities.isTextEqual(currentCurrencyId, currencyId);
    }

    @action('doesBillingTypeDisplayCorrect')
    public async doesBillingTypeDisplayCorrect(billingType: string): Promise<boolean> {
        let currentBillingType = await this.getSelectedOption(this.billingType);
        return Utilities.isTextEqual(currentBillingType, billingType);
    }

    @action('doesClosingDateDisplayCorrect')
    public async doesClosingDateDisplayCorrect(closingDate: string): Promise<boolean> {
        let currentClosingDate = await this.getSelectedOption(this.closingDate);
        return Utilities.isTextEqual(currentClosingDate, closingDate);
    }

    @action('doesProjectTagsDisplayCorrect')
    public async doesProjectTagsDisplayCorrect(tag?: string): Promise<boolean> {
        let doesTagDisplayCorrect = true;
        let currentTag = await this.getTextBoxValue(this.tagContent);
        if (tag !== null && tag !== undefined) {
            doesTagDisplayCorrect = Utilities.isTextEqual(currentTag, tag);
        } else {
            doesTagDisplayCorrect = Utilities.isTextEqual(currentTag, '');
        }
        return doesTagDisplayCorrect;
    }

    @action('doesProjectDescriptionDisplayCorrect')
    public async doesProjectDescriptionDisplayCorrect(description?: string): Promise<boolean> {
        let doesDescriptionDisplayCorrect = true;
        let currentTag = await this.getTextBoxValue(this.description);
        if (description !== null && description !== undefined) {
            doesDescriptionDisplayCorrect = Utilities.isTextEqual(currentTag, description);
        } else {
            doesDescriptionDisplayCorrect = Utilities.isTextEqual(currentTag, '');
        }
        return doesDescriptionDisplayCorrect;
    }

    @action('doesProjectOverviewDisplayCorrect')
    public async doesProjectOverviewDisplayCorrect(projectOverview: ProjectOverviewInfo): Promise<boolean> {
        gondola.report('Verify content of project overview');
        let doesContentDisplayCorrect = true;
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectNameDisplayCorrect(projectOverview.$projectName);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectFormDisplayCorrect(projectOverview.$projectForm);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectCustomerDisplayCorrect(
                projectOverview.$customerName,
                false,
            );
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectDepartmentDisplayCorrect(
                projectOverview.$department,
                false,
            );
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectWorkerDisplayCorrect(projectOverview.$workerName, false);
        }

        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectDatesDisplayCorrect(
                projectOverview.$startDate,
                projectOverview.$endDate,
                projectOverview.$scheduleStartDate,
                projectOverview.$scheduleEndDate,
            );
        }

        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectAccuracyDisplayCorrect(projectOverview.$accuracy);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectStatusDisplayCorrect(projectOverview.$status);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectWorkingPlaceDisplayCorrect(projectOverview.$workingPlace);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesCurrencyIdDisplayCorrect(projectOverview.$currencyId);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesBillingTypeDisplayCorrect(projectOverview.$billingType);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesClosingDateDisplayCorrect(projectOverview.$closingDate);
        }

        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectSegmentDisplayCorrect(projectOverview.$segment, false);
        }

        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectTagsDisplayCorrect(projectOverview.$tag);
        }
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectDescriptionDisplayCorrect(projectOverview.$description);
        }

        return doesContentDisplayCorrect;
    }

    @action('doesTimeOfProjectResultBaseDisplayCorrect')
    public async doesTimeOfProjectResultBaseDisplayCorrect(
        role: string,
        planTime: number,
        planPeople: number,
        totalTime: number,
    ): Promise<boolean> {
        var doesPeopleDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.planPeopleByRoleStr, role)),
            planPeople + '',
        );

        var doesTimeDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.planTimeByRoleStr, role)),
            planTime + '',
        );

        var doesTotalTimeDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.planTotalTimeByRoleStr, role)),
            totalTime + '',
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
        var isPriceWeekdayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayByRoleStr, role)),
            priceWeekday,
        );
        var isPriceWeekdayOTCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayOTByRoleStr, role)),
            priceWeekdayOT,
        );
        var isPriceWeekdayLateOTCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, role)),
            priceWeekdayLateOT,
        );
        var isPriceHolidayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceHolidayByRoleStr, role)),
            priceHoliday,
        );
        var isPriceWeekdayLateCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(Utilities.formatString(this.unitPriceWeekdayLateByRoleStr, role)),
            priceWeekdayLate,
        );
        var isPriceHolidayLateCorrect = Utilities.isTextEqual(
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
        var doesTaxDisplayCorrect = true;
        var isChecked = false;
        var currentTaxId = '';
        if (role !== undefined) {
            isChecked = await this.getCheckboxValue(Utilities.formatString(this.isTaxableByRoleCheckbox, role));
            currentTaxId = await this.getSelectedOption(Utilities.formatString(this.taxIdByRoleStr, role));
        }
        if (index !== undefined) {
            isChecked = await this.getCheckboxValue(Utilities.formatString(this.isTaxableByRowStr, index + ''));
            currentTaxId = await this.getSelectedOption(Utilities.formatString(this.taxIdByRowStr, index + ''));
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
    public async doesContentOfProjectResultBasesDisplayCorrect(projectResultBases: any[]): Promise<boolean> {
        var doesContentDisplayCorrect = true;
        for (let i = 0; i <= projectResultBases.length - 1; i++) {
            var projectResultBaseRow = new ProjectResultBaseInfo(projectResultBases[i]);
            gondola.report('Verify content of project result base, role: ' + projectResultBaseRow.$role);
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = (
                    await this.getTextBoxValue(
                        Utilities.formatString(this.searchItemByRoleStr, projectResultBaseRow.$role),
                    )
                ).includes(projectResultBaseRow.$item);
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getSelectedOption(
                        Utilities.formatString(this.debitCreditByRoleStr, projectResultBaseRow.$role),
                    ),
                    projectResultBaseRow.$debitCredit,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = await this.doesTimeOfProjectResultBaseDisplayCorrect(
                    projectResultBaseRow.$role,
                    projectResultBaseRow.$planTime,
                    projectResultBaseRow.$planPeople,
                    projectResultBaseRow.getTotalPlanTime(),
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = await this.doesUnitPricesOfProjectResultBaseDisplayCorrect(
                    projectResultBaseRow.$role,
                    projectResultBaseRow.$unitPriceWeekday,
                    projectResultBaseRow.$unitPriceWeekdayOT,
                    projectResultBaseRow.$unitPriceWeekdayLate,
                    projectResultBaseRow.$unitPriceWeekdayLateOT,
                    projectResultBaseRow.$unitPriceHoliday,
                    projectResultBaseRow.$unitPriceHolidayLate,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = await this.doesTaxComponentDisplayCorrect(
                    projectResultBaseRow.$isTaxable,
                    projectResultBaseRow.$taxId,
                    projectResultBaseRow.$role,
                );
            }

            if (doesContentDisplayCorrect) {
                let currentNote = await this.getTextBoxValue(
                    Utilities.formatString(this.notebyRoleStr, projectResultBaseRow.$role),
                );
                if (projectResultBaseRow.$note !== null && projectResultBaseRow.$note !== undefined) {
                    doesContentDisplayCorrect = Utilities.isTextEqual(currentNote, projectResultBaseRow.$note);
                } else {
                    doesContentDisplayCorrect = Utilities.isTextEqual(currentNote, '');
                }
            }

            if (doesContentDisplayCorrect) {
                let currentOutputOrder = await this.getTextBoxValue(
                    Utilities.formatString(this.outputOrderbyRoleStr, projectResultBaseRow.$role),
                );
                if (projectResultBaseRow.$outputOrder !== null && projectResultBaseRow.$outputOrder !== undefined) {
                    doesContentDisplayCorrect = Utilities.isTextEqual(
                        currentOutputOrder,
                        projectResultBaseRow.$outputOrder,
                    );
                } else {
                    doesContentDisplayCorrect = Utilities.isTextEqual(currentOutputOrder, '');
                }
            }
        }
        return doesContentDisplayCorrect;
    }

    @action('doesProjectDetailDatesDisplayCorrect')
    public async doesProjectDetailDatesDisplayCorrect(
        rowIndex: string,
        shipDate?: string,
        deliveryDate?: string,
        acceptedDate?: string,
        billingDate?: string,
    ): Promise<boolean> {
        let doesShipDateDisplayCorrect = true;
        let currentShipDate = await this.getTextBoxValue(Utilities.formatString(this.shipDateByRowStr, rowIndex));
        if (shipDate !== null && shipDate !== undefined) {
            doesShipDateDisplayCorrect = Utilities.isTextEqual(currentShipDate, shipDate);
        } else {
            doesShipDateDisplayCorrect = Utilities.isTextEqual(currentShipDate, '');
        }

        let doesDeliveryDateDisplayCorrect = true;
        let currentDeliveryDate = await this.getTextBoxValue(
            Utilities.formatString(this.deliveryDateByRowStr, rowIndex),
        );
        if (deliveryDate !== null && deliveryDate !== undefined) {
            doesDeliveryDateDisplayCorrect = Utilities.isTextEqual(currentDeliveryDate, deliveryDate);
        } else {
            doesDeliveryDateDisplayCorrect = Utilities.isTextEqual(currentDeliveryDate, '');
        }

        let doesAcceptedDateDisplayCorrect = true;
        let currentAcceptedDate = await this.getTextBoxValue(
            Utilities.formatString(this.acceptedDateByRowStr, rowIndex),
        );
        if (acceptedDate !== null && acceptedDate !== undefined) {
            doesAcceptedDateDisplayCorrect = Utilities.isTextEqual(currentAcceptedDate, acceptedDate);
        } else {
            doesAcceptedDateDisplayCorrect = Utilities.isTextEqual(currentAcceptedDate, '');
        }

        let doesBillingDateDisplayCorrect = true;
        let currentBillingDate = await this.getTextBoxValue(Utilities.formatString(this.billingDateByRowStr, rowIndex));
        if (billingDate !== null && billingDate !== undefined) {
            doesBillingDateDisplayCorrect = Utilities.isTextEqual(currentBillingDate, billingDate);
        } else {
            doesBillingDateDisplayCorrect = Utilities.isTextEqual(currentBillingDate, '');
        }
        return (
            doesShipDateDisplayCorrect &&
            doesDeliveryDateDisplayCorrect &&
            doesAcceptedDateDisplayCorrect &&
            doesBillingDateDisplayCorrect
        );
    }

    @action('doesContentOfProjectDetailsDisplayCorrect')
    public async doesContentOfProjectDetailsDisplayCorrect(projectDetails: any[]): Promise<boolean> {
        var doesContentDisplayCorrect = true;
        for (let i = 1; i <= projectDetails.length; i++) {
            var projectDetailRow = new ProjectDetailInfo(projectDetails[i - 1]);
            gondola.report('Verify content of project detail, row: ' + i);
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.detailNamebyRowStr, i + '')),
                    projectDetailRow.$detailName,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = (
                    await this.getTextBoxValue(Utilities.formatString(this.searchItemByRowStr, i + ''))
                ).includes(projectDetailRow.$item);
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getSelectedOption(Utilities.formatString(this.debitCreditByRowStr, i + '')),
                    projectDetailRow.$debitCredit,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = await this.doesTaxComponentDisplayCorrect(
                    projectDetailRow.$isTaxable,
                    projectDetailRow.$taxId,
                    undefined,
                    i + '',
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.quantityByRowStr, i + '')),
                    projectDetailRow.$quantity,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.unitByRowStr, i + '')),
                    projectDetailRow.$unit,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.unitPriceByRowStr, i + '')),
                    projectDetailRow.$unitPrice,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = await this.doesProjectDetailDatesDisplayCorrect(
                    i + '',
                    projectDetailRow.$shipDate,
                    projectDetailRow.$deliveryDate,
                    projectDetailRow.$acceptedDate,
                    projectDetailRow.$billingDate,
                );
            }
        }
        return doesContentDisplayCorrect;
    }

    @action('doesProjectLabDisplayCorrect')
    public async doesProjectLabDisplayCorrect(labStr: string, isMatchEntire: boolean): Promise<boolean> {
        let currentLab = await this.getTextBoxValue(this.searchLabField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentLab, labStr);
        } else {
            return currentLab.includes(labStr);
        }
    }

    @action('doesProjectWorkingTimeDisplayCorrect')
    public async doesProjectWorkingTimeDisplayCorrect(startTime: string, endTime: string) {
        let doesStartTimeDisplayCorrect = Utilities.isTextEqual(
            await this.getTextBoxValue(this.workStartTime),
            startTime,
        );
        let doesEndTimeDisplayCorrect = Utilities.isTextEqual(await this.getTextBoxValue(this.workEndTime), endTime);
        return doesStartTimeDisplayCorrect && doesEndTimeDisplayCorrect;
    }

    @action('doesContentOfProjectResourcesDisplayCorrect')
    public async doesContentOfProjectResourcesDisplayCorrect(
        labName: string,
        workStartTime: string,
        workEndTime: string,
        projectResources: any[],
    ): Promise<boolean> {
        var doesContentDisplayCorrect = true;
        gondola.report('verify lab name');
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectLabDisplayCorrect(labName, false);
        }

        gondola.report('verify working time');
        if (doesContentDisplayCorrect) {
            doesContentDisplayCorrect = await this.doesProjectWorkingTimeDisplayCorrect(workStartTime, workEndTime);
        }

        for (let i = 1; i <= projectResources.length; i++) {
            var projectResourceRow = new ProjectResourceInfo(projectResources[i - 1]);
            gondola.report('Verify content of resource, row: ' + i);
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.resourceDateByRowStr, i + '')),
                    projectResourceRow.$resourceDate,
                );
            }

            gondola.report('verify number of each roles: PM, leader, designer, expert, tester, reserve');
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countPMByRowStr, i + '')),
                    projectResourceRow.$countPM,
                );
            }

            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countLeaderByRowStr, i + '')),
                    projectResourceRow.$countLeader,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countTesterByRowStr, i + '')),
                    projectResourceRow.$countTester,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countDesignerByRowStr, i + '')),
                    projectResourceRow.$countDesigner,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countExpertByRowStr, i + '')),
                    projectResourceRow.$countExpert,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countReserve1ByRowStr, i + '')),
                    projectResourceRow.$countReserve1,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countReserve2ByRowStr, i + '')),
                    projectResourceRow.$countReserve2,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countReserve3ByRowStr, i + '')),
                    projectResourceRow.$countReserve3,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countReserve4ByRowStr, i + '')),
                    projectResourceRow.$countReserve4,
                );
            }
            if (doesContentDisplayCorrect) {
                doesContentDisplayCorrect = Utilities.isTextEqual(
                    await this.getTextBoxValue(Utilities.formatString(this.countReserve5ByRowStr, i + '')),
                    projectResourceRow.$countReserve5,
                );
            }
        }
        return doesContentDisplayCorrect;
    }
}
export default new AddProjectPage();
