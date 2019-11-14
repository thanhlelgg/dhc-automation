import { action, gondola, locator, page } from "gondolajs";
import { generalPage } from "./generalPage";
import { utilities } from "../common/utilities";
import { constants } from "../common/constants";
@page
export class projectPage extends generalPage{
    protected itemStr = "(//div[@role='row']//div[contains(.,'{0}')])[1]";

    // project result 
    @locator
    protected subTitleProjectResult = {xpath: "//div[.='出来高明細']"};

    //protected roleCheckboxStr = "//div[@id='project-result-bases']/div[contains(.,'{0}')]//input[@type='checkbox']/preceding-sibling::input";
    protected roleCheckboxStr = "//div[@id='project-result-bases']/div[contains(.,'{0}')]";
    protected roleRowStr = "//tr[contains(.,'{0}')]";
    protected searchItemByRoleStr = "//tr[contains(.,'{0}')]//input[@class='search-items  form-control']";
    protected debitCreditByRoleStr = "//tr[contains(.,'{0}')]//select[contains(@id, 'debit-credit-group-id')]";
    protected planPeopleByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'plan-people')]";
    protected planTimeByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'plan-time')]";
    protected planTotalTimeByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'plan-totalt-ime')]";
    protected unitPriceWeekdayByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday')]";
    protected unitPriceWeekdayOTByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-overtime')]";
    protected unitPriceHolidayByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-holiday')]";
    protected unitPriceWeekdayLateByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-late')]";
    protected unitPriceWeekdayLateOTByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-late-overtime')]";
    protected unitPriceHolidayLateByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-holiday-late')]";
    protected isTaxableByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'is-taxable')]//ancestor::div[@class='custom-control custom-checkbox']";
    protected taxIdByRoleStr = "//tr[contains(.,'{0}')]//select[contains(@id, 'tax-id')]";
    protected notebyRoleStr = "//tr[contains(.,'{0}')]//textarea[contains(@id, 'note')]";
    protected outputOrderbyRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'output-order')]";

    // search item
    @locator
    protected itemFilter = {xpath: "//input[@id='modal-items-filter']"};
    @locator 
    protected itemTable = {id: "modal-items-table"};

    @locator
    protected projectCode = {id: "number"};
    @locator
    protected projectName = {id: "name"};
    @locator
    protected projectForm = {name: "project_form"};
    // search customer
    @locator
    protected searchCustomerField = {id: "search-business-customers"};
    @locator
    protected customerCodeFilter = {id: "modal-business-customers-filter-code"};
    @locator
    protected customerNameFilter = {id: "modal-business-customers-filter-name"};
    @locator
    protected customerRepNameFilter = {id: "modal-business-customers-filter-rep-name"};
    @locator
    protected customerTable = {id: "modal-business-customers-table"};
    // search department
    @locator
    protected searchDepartmentField = {id: "search-departments"};
    @locator
    protected departmentFilter = {id: "modal-departments-filter"};
    @locator
    protected departmentTable = {id: "modal-departments-table"};
    // search worker
    @locator
    protected searchWorkerField = {id: "search-workers"};
    @locator
    protected workerFilter = {id: "modal-workers-filter"};

    // dates
    @locator
    protected startDate = {name: "start_date"};
    @locator
    protected endDate = {name: "end_date"};
    @locator
    protected scheduleStartDate = {name: "scheduled_start_date"};
    @locator
    protected scheduleEndDate = {name: "scheduled_end_date"};
    
    @locator
    protected accuracy = {name: "accuracy"};
    @locator
    protected status = {name: "status"};
    @locator
    protected place = {name: "place"};
    @locator
    protected currencyId = {name: "currency_id"};
    @locator
    protected billingType = {name: "billing_type"};
    @locator
    protected closingDate = {name: "closing_date"};

    // search Segment
    @locator
    protected searchSegmentField = {id: "search-segments"};
    @locator
    protected segmentFilter = {id: "modal-segments-filter"};
    @locator
    protected segmentTable = {id: "modal-segments-table"};

    @locator
    protected tag = {id: "tag"};
    @locator
    protected description = {id: "description"};

    // project detail
    @locator
    protected addProjectDetailBtn = {id: "project-details-add-row"};

    protected removeIconByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//a[@class='remove-project-details']";
    protected detailNamebyRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[@id='project-details-i-name']";
    protected searchItemByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[@class='search-items  form-control']";
    protected debitCreditByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//select[@id='project-details-i-debit-credit-group-id']";
    protected isTaxableByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@id, 'is-taxable')]";
    protected taxIdByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//select[@id='project-details-i-tax-id']";
    protected quantityByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[@id='project-details-i-quantity']";
    protected unitByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[@id='project-details-i-unit']";
    protected unitPriceByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[@id='project-details-i-unit-price']";
    protected shipDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'ship_date')]";
    protected deliveryDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'delivery_date')]";
    protected acceptedDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'accepted_date')]";
    protected billingDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'billing_date')]";

    // resource
    @locator
    protected searchLabField = {id: "search-labs"};
    @locator
    protected labFilter = {id: "modal-labs-filter"};
    @locator
    protected workStartTime = {id: "work_start_time_in_utc"};
    @locator
    protected workEndTime = {id: "work_end_time_in_utc"};
    @locator
    protected addResourceButton = {id: "project-resources-add-row"};

    protected removeResourceButtonByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//a[@href='javascript:;']";
    protected resourceDateByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@class='date-picker form-control']";
    protected countPMByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-0-count']";
    protected countLeaderByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-1-count']";
    protected countTesterByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-2-count']";
    protected countDesignerByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-3-count']";
    protected countExpertByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-4-count']";
    protected countReserve1ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-5-count']";
    protected countReserve2ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-6-count']";
    protected countReserve3ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-7-count']";
    protected countReserve4ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-8-count']";
    protected countReserve5ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@id='project-resources-i-project-resource-headcounts-9-count']";

    // save button
    @locator
    protected saveButton = {css: ".btn-info"};

    // project ordered detail
    protected subTitleProjectOrderedDetail = {xpath: "//div[.='非稼働明細']"};
    protected addProjectOrderedDetailBtn = {xpath: "//div[@id='project-ordered-detail']/button"};
    protected projectOrderedNameStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[name]') and not(contains(@name, 'item'))]";
    protected projectOrderedSearchItemStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[item][name]')]";
    protected projectOrderedDebitCreditStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//select[contains(@name, '[debit_credit_group_id]')]";
    protected projectOrderedIsTaxableStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//div[@class='custom-control custom-checkbox']";
    protected projectOrderedTaxIdStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//select[contains(@name, '[tax_id]')]";
    protected projectOrderedQuantityStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[quantity]')]";
    protected projectOrderedUnitStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[unit]')]";
    protected projectOrderedUnitPriceStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[unit_price]')]";
    protected projectOrderedNoteStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//textarea[contains(@name, '[note]')]";
    protected projectOrderedDeliveryDateStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[delivery_date]')]";
    protected projectOrderedRecordDateStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[record_date]')]";
    protected projectOrderedBillingDateStr = "//tbody[@data-project-ordered-detail='rowMain']//tr[{0}]//input[contains(@name, '[billing_date]')]";

    @action("selectItem")
    public async selectItem(itemName: string){
        let itemXpath = {xpath: utilities.formatString(this.itemStr, itemName)};
        await gondola.click(itemXpath);
    }

    @action("searchCustomerByName")
    public async searchCustomerByName(customerName: string){
        await gondola.click(this.searchCustomerField);
        await this.waitControlExist(this.customerNameFilter, 60);
        await gondola.enter(this.customerNameFilter, customerName);
        await this.selectItem(customerName);
    }

    @action("searchCustomerByCode")
    public async searchCustomerByCode(customerCode: string){
        await gondola.click(this.searchCustomerField);
        await this.waitControlExist(this.customerCodeFilter, 60);
        await gondola.enter(this.customerCodeFilter, customerCode);
        await this.selectItem(customerCode);
    }

    @action("searchDepartment")
    public async searchDepartment(department: string){
        await gondola.click(this.searchDepartmentField);
        await this.waitControlExist(this.departmentFilter, 60);
        await gondola.enter(this.departmentFilter, department);
        await this.selectItem(department);
    }

    @action("searchWorker")
    public async searchWorker(worker: string){
        await gondola.click(this.searchWorkerField);
        await this.waitControlExist(this.workerFilter, 60);
        await gondola.enter(this.workerFilter, worker);
        await this.selectItem(worker);
    }

    @action("searchSegment")
    public async searchSegment(segment: string){
        await gondola.click(this.searchSegmentField);
        await this.waitControlExist(this.segmentFilter, 60);
        await gondola.enter(this.segmentFilter, segment);
        await this.selectItem(segment);
    }

    @action("searchItem")
    public async searchItem(item: string, index: any, position: string){
        let searchItemXpath = {xpath: utilities.formatString(this.searchItemByRoleStr, index)};
        if (position == "detail"){
            searchItemXpath = {xpath: utilities.formatString(this.searchItemByRowStr, index)};
        } 
        
        await gondola.click(searchItemXpath);
        await this.waitControlExist(this.itemFilter, 60);
        await gondola.enter(this.itemFilter, item);
        await this.selectItem(item);
    }

    @action("searchLab")
    public async searchLab(lab: string){
        await gondola.click(this.searchLabField);
        await this.waitControlExist(this.labFilter, 60);
        await gondola.enter(this.labFilter, lab);
        await this.selectItem(lab);
    }

    @action("inputProjectOverview")
    public async inputProjectOverview(projectName: string, projectForm: string, customerName: string, department: string, workerName: string,
        startDate: string, endDate: string, scheduleStartDate: string, scheduleEndDate: string, accuracy: string, status: string, place: string,
        currencyId: string, billingType: string, closingDate: string, segment: string, tag: string, description: string){
        await gondola.enter(this.projectName, projectName);
        await gondola.select(this.projectForm, projectForm);
        await this.searchCustomerByName(customerName);
        await this.searchDepartment(department);
        await this.searchWorker(workerName);
        await this.enterText(this.startDate, startDate);
        await this.enterText(this.endDate, endDate);
        await this.enterText(this.scheduleStartDate, scheduleStartDate);
        await this.enterText(this.scheduleEndDate, scheduleEndDate);
        await gondola.select(this.accuracy, accuracy);
        await gondola.select(this.status, status);
        await gondola.select(this.place, place);
        await gondola.select(this.currencyId, currencyId);
        await gondola.select(this.billingType, billingType);
        await gondola.select(this.closingDate, closingDate);
        await this.searchSegment(segment);
        await gondola.enter(this.tag, tag);
        await gondola.enter(this.description, description);
    }

    @action("inputProjectResultBases")
    public async inputProjectResultBases(role: string, item: string, debitCredit: string, planPeople: number, planTime: number,
        planTotalTime: string, unitPriceWeekday: string, unitPriceWeekdayOT: string, unitPriceHoliday: string, unitPriceWeekDayLate: string,
        unitPriceWeekdayLateOT: string, unitPriceHolidayLate: string, isTaxable: boolean, taxId: string, note: string, outputOrder: string){
        let formExist = await gondola.doesControlExist(this.subTitleProjectResult);
        if (formExist){
            let checkBoxXpath = {xpath: utilities.formatString(this.roleCheckboxStr, role)};
            await gondola.click(checkBoxXpath);
            await this.searchItem(item, role, "result bases");
            await gondola.select({xpath: utilities.formatString(this.debitCreditByRoleStr, role)}, debitCredit);
            await gondola.enter({xpath: utilities.formatString(this.planPeopleByRoleStr, role)}, planPeople + "");
            await gondola.enter({xpath: utilities.formatString(this.planTimeByRoleStr, role)}, planTime + "");
            // check plan total time
            await this.checkPlanTotalTime(planTime, planPeople, {xpath: utilities.formatString(this.planTotalTimeByRoleStr, role)});
            await this.enterText({xpath: utilities.formatString(this.unitPriceWeekdayByRoleStr, role)}, unitPriceWeekday);
            await gondola.enter({xpath: utilities.formatString(this.unitPriceWeekdayOTByRoleStr, role)}, unitPriceWeekdayOT);
            await gondola.enter({xpath: utilities.formatString(this.unitPriceHolidayByRoleStr, role)}, unitPriceHoliday);
            await gondola.enter({xpath: utilities.formatString(this.unitPriceWeekdayLateByRoleStr, role)}, unitPriceWeekDayLate);
            await gondola.enter({xpath: utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, role)}, unitPriceWeekdayLateOT);
            await gondola.enter({xpath: utilities.formatString(this.unitPriceHolidayLateByRoleStr, role)}, unitPriceHolidayLate);
            await gondola.setState({xpath: utilities.formatString(this.isTaxableByRoleStr, role)}, isTaxable);
            if (isTaxable){
                await gondola.select({xpath: utilities.formatString(this.taxIdByRoleStr, role)}, taxId);
            }
            await gondola.enter({xpath: utilities.formatString(this.notebyRoleStr, role)}, note);
            await gondola.enter({xpath: utilities.formatString(this.outputOrderbyRoleStr, role)}, outputOrder);

        }
    }

    @action("addProjectDetails")
    public async addProjectDetails(index : any, detailName: string, item: string, debitCredit: string, isTaxable: boolean, taxId: string,
        quantity: string, unit: string, unitPrice: string, shipDate: string, deliveryDate: string, acceptedDate: string, billingDate: string){
        await gondola.click(this.addProjectDetailBtn);
        await gondola.enter({xpath: utilities.formatString(this.detailNamebyRowStr, index)}, detailName);
        await this.searchItem(item, index, "detail");
        await gondola.select({xpath: utilities.formatString(this.debitCreditByRowStr, index)}, debitCredit);
        await gondola.setState({xpath: utilities.formatString(this.isTaxableByRowStr, index)}, isTaxable);
        await gondola.select({xpath: utilities.formatString(this.taxIdByRowStr, index)}, taxId);
        await gondola.enter({xpath: utilities.formatString(this.quantityByRowStr, index)}, quantity);
        await gondola.enter({xpath: utilities.formatString(this.unitByRowStr, index)}, unit);
        await gondola.enter({xpath: utilities.formatString(this.unitPriceByRowStr, index)}, unitPrice);
        await gondola.enter({xpath: utilities.formatString(this.shipDateByRowStr, index)}, shipDate);
        await gondola.enter({xpath: utilities.formatString(this.deliveryDateByRowStr, index)}, deliveryDate);
        await gondola.enter({xpath: utilities.formatString(this.acceptedDateByRowStr, index)}, acceptedDate);
        await gondola.enter({xpath: utilities.formatString(this.billingDateByRowStr, index)}, billingDate);
    }

    @action("inputProjectResource")
    public async inputProjectResource(lab: string, workStartTime: string, workEndTime: string){
        await this.searchLab(lab);
        await gondola.enter(this.workStartTime, workStartTime);
        await gondola.enter(this.workEndTime, workEndTime);
    }

    @action("addResourceRow")
    public async addResourceRow(index: any, resourceDate: string, countPM: string, countLeader: string, countTester: string, countDesigner: string,
        countExpert: string, countReserve1: string, countReserve2: string, countReserve3: string, countReserve4: string, countReserve5: string){
        await gondola.click(this.addResourceButton);
        await gondola.enter({xpath: utilities.formatString(this.resourceDateByRowStr, index)}, resourceDate);
        await gondola.enter({xpath: utilities.formatString(this.countPMByRowStr, index)}, countPM);
        await gondola.enter({xpath: utilities.formatString(this.countLeaderByRowStr, index)}, countLeader);
        await gondola.enter({xpath: utilities.formatString(this.countTesterByRowStr, index)}, countTester);
        await gondola.enter({xpath: utilities.formatString(this.countDesignerByRowStr, index)}, countDesigner);
        await gondola.enter({xpath: utilities.formatString(this.countExpertByRowStr, index)}, countExpert);
        await gondola.enter({xpath: utilities.formatString(this.countReserve1ByRowStr, index)}, countReserve1);
        await gondola.enter({xpath: utilities.formatString(this.countReserve2ByRowStr, index)}, countReserve2);
        await gondola.enter({xpath: utilities.formatString(this.countReserve3ByRowStr, index)}, countReserve3);
        await gondola.enter({xpath: utilities.formatString(this.countReserve4ByRowStr, index)}, countReserve4);
        await gondola.enter({xpath: utilities.formatString(this.countReserve5ByRowStr, index)}, countReserve5);
    }

    @action("saveNewProject")
    public async saveNewProject(){
        await gondola.click(this.saveButton);
    }

    @action("getProjectCode")
    public async getProjectCode(){
        let projectCode = await gondola.getControlProperty(this.projectCode, "value");
        return projectCode;
    }

    @action("getPlanTotalTime")
    public async checkPlanTotalTime(planTime: number, planPeople: number, locator: any){
        await gondola.click(locator);
        let totalTime = await gondola.getControlProperty(locator, "value");
        await gondola.checkEqual(totalTime, (planTime * planPeople) + "");
    }

}
export default new projectPage();
