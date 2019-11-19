import { action, gondola, locator, page } from "gondolajs";
import { generalPage } from "./general-page";
import { utilities } from "../common/utilities";
import { constants } from "../common/constants";
import { ProjectOverviewInfo } from "../models/project-overview-info";
import { ProjectResultBaseInfo } from "../models/project-result-base-info";
import { ProjectDetailInfo } from "../models/project-detail-info";
import { ProjectResourceInfo } from "../models/project-resource-info";
@page
export class projectPage extends generalPage{
    protected itemStr = "(//div[@role='row']//div[contains(.,'{0}')])[1]";

    //#region project result 
    @locator
    protected subTitleProjectResult = "//div[.='出来高明細']";
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
    //#endregion
    
    //#region Search
    @locator
    protected itemFilter = "//input[@id='modal-items-filter']";
    @locator 
    protected itemTable = {id: "modal-items-table"};
    //#endregion

    @locator
    protected projectCode = {id: "number"};
    @locator
    protected projectName = {id: "name"};
    @locator
    protected projectForm = {name: "project_form"};

    //#region Search customer
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
    //#endregion

    //#region search department
    @locator
    protected searchDepartmentField = {id: "search-departments"};
    @locator
    protected departmentFilter = {id: "modal-departments-filter"};
    @locator
    protected departmentTable = {id: "modal-departments-table"};
    //#endregion

    //#region search worker
    @locator
    protected searchWorkerField = {id: "search-workers"};
    @locator
    protected workerFilter = {id: "modal-workers-filter"};
    //#endregion

    //#region dates
    @locator
    protected startDate = {name: "start_date"};
    @locator
    protected endDate = {name: "end_date"};
    @locator
    protected scheduleStartDate = {name: "scheduled_start_date"};
    @locator
    protected scheduleEndDate = {name: "scheduled_end_date"};
    //#endregion
    
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

    //#region search Segment
    @locator
    protected searchSegmentField = {id: "search-segments"};
    @locator
    protected segmentFilter = {id: "modal-segments-filter"};
    @locator
    protected segmentTable = {id: "modal-segments-table"};
    //#endregion

    @locator
    protected tag = "//input[@id='tag']//preceding-sibling::div//input";
    @locator
    protected description = {id: "description"};

    //#region project detail
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
    //#endregion

    //#region resource
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
    //#endregion

    @locator
    protected saveButton = {css: ".btn-info"};

    //#region project ordered detail
    protected subTitleProjectOrderedDetail = "//div[.='非稼働明細']";
    protected addProjectOrderedDetailBtn = "//div[@id='project-ordered-detail']/button";
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
    //#endregion
    
    @action("selectItem")
    public async selectItem(itemName: string){
        let itemXpath = utilities.formatString(this.itemStr, itemName);
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
        let searchItemXpath = utilities.formatString(this.searchItemByRoleStr, index);
        if (position == "detail"){
            searchItemXpath = utilities.formatString(this.searchItemByRowStr, index);
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
    public async inputProjectOverview(projectOverview: ProjectOverviewInfo){
        await gondola.enter(this.projectName, projectOverview.$projectName);
        await gondola.select(this.projectForm, projectOverview.$projectForm);
        await this.searchCustomerByName(projectOverview.$customerName);
        await this.searchDepartment(projectOverview.$department);
        await this.searchWorker(projectOverview.$workerName);
        if (projectOverview.$startDate !== undefined && projectOverview.$startDate !== null){
            await this.enterText(this.startDate, projectOverview.$startDate);
        }
        if (projectOverview.$endDate !== undefined && projectOverview.$endDate !== null){
            await this.enterText(this.endDate, projectOverview.$endDate);
        }
        if (projectOverview.$scheduleStartDate !== undefined && projectOverview.$scheduleStartDate !== null){
            await this.enterText(this.scheduleStartDate, projectOverview.$scheduleStartDate);
        }
        if (projectOverview.$scheduleEndDate !== undefined && projectOverview.$scheduleEndDate !== null){
            await this.enterText(this.scheduleEndDate, projectOverview.$scheduleEndDate);
        }
        await gondola.select(this.accuracy, projectOverview.$accuracy);
        await gondola.select(this.status, projectOverview.$status);
        await gondola.select(this.place, projectOverview.$workingPlace);
        await gondola.select(this.currencyId, projectOverview.$currencyId);
        await gondola.select(this.billingType, projectOverview.$billingType);
        await gondola.select(this.closingDate, projectOverview.$closingDate);
        await this.searchSegment(projectOverview.$segment);
        if (projectOverview.$tag !== undefined && projectOverview.$tag !== null){
            await this.enterText(this.tag, projectOverview.$tag);
        }
        if (projectOverview.$description !== undefined && projectOverview.$description !== null){
            await this.enterText(this.description, projectOverview.$description);
        }
    }

    @action("inputProjectResultBases")
    public async inputProjectResultBases(projectResultBase: ProjectResultBaseInfo){
        let formExist = await gondola.doesControlExist(this.subTitleProjectResult);
        if (formExist){
            let checkBoxXpath = utilities.formatString(this.roleCheckboxStr, projectResultBase.$role);
            await gondola.click(checkBoxXpath);
            await this.searchItem(projectResultBase.$item, projectResultBase.$role, "result bases");
            await gondola.select(utilities.formatString(this.debitCreditByRoleStr, projectResultBase.$role), projectResultBase.$debitCredit);
            await gondola.enter(utilities.formatString(this.planPeopleByRoleStr, projectResultBase.$role), projectResultBase.$planPeople + "");
            await gondola.enter(utilities.formatString(this.planTimeByRoleStr, projectResultBase.$role), projectResultBase.$planTime + "");
            // check plan total time
            await this.checkPlanTotalTime(projectResultBase.$planTime, projectResultBase.$planPeople, utilities.formatString(this.planTotalTimeByRoleStr, projectResultBase.$role));
            await this.enterText(utilities.formatString(this.unitPriceWeekdayByRoleStr, projectResultBase.$role), projectResultBase.$unitPriceWeekday);
            await gondola.enter(utilities.formatString(this.unitPriceWeekdayOTByRoleStr, projectResultBase.$role), projectResultBase.$unitPriceWeekdayOT);
            await gondola.enter(utilities.formatString(this.unitPriceHolidayByRoleStr, projectResultBase.$role), projectResultBase.$unitPriceHoliday);
            await gondola.enter(utilities.formatString(this.unitPriceWeekdayLateByRoleStr, projectResultBase.$role), projectResultBase.$unitPriceWeekDayLate);
            await gondola.enter(utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, projectResultBase.$role), projectResultBase.$unitPriceWeekdayLateOT);
            await gondola.enter(utilities.formatString(this.unitPriceHolidayLateByRoleStr, projectResultBase.$role), projectResultBase.$unitPriceHolidayLate);
            await gondola.setState(utilities.formatString(this.isTaxableByRoleStr, projectResultBase.$role), projectResultBase.$isTaxable);
            if (projectResultBase.$isTaxable){
                await gondola.select(utilities.formatString(this.taxIdByRoleStr, projectResultBase.$role), projectResultBase.$taxId);
            }

            if (projectResultBase.$note !== undefined && projectResultBase.$note !== null){
                await gondola.enter(utilities.formatString(this.notebyRoleStr, projectResultBase.$role), projectResultBase.$note);
            }
            if (projectResultBase.$outputOrder !== undefined && projectResultBase.$outputOrder !== null){
                await gondola.enter(utilities.formatString(this.outputOrderbyRoleStr, projectResultBase.$role), projectResultBase.$outputOrder);
            }
            
        }
    }

    @action("addProjectDetails")
    public async addProjectDetails(index : any, projectDetail : ProjectDetailInfo){
        await gondola.click(this.addProjectDetailBtn);
        await gondola.enter(utilities.formatString(this.detailNamebyRowStr, index), projectDetail.$detailName);
        await this.searchItem(projectDetail.$item, index, "detail");
        await gondola.select(utilities.formatString(this.debitCreditByRowStr, index), projectDetail.$debitCredit);
        await gondola.setState(utilities.formatString(this.isTaxableByRowStr, index), projectDetail.$isTaxable);
        await gondola.select(utilities.formatString(this.taxIdByRowStr, index), projectDetail.$taxId);
        await gondola.enter(utilities.formatString(this.quantityByRowStr, index), projectDetail.$quantity);
        await gondola.enter(utilities.formatString(this.unitByRowStr, index), projectDetail.$unit);
        await gondola.enter(utilities.formatString(this.unitPriceByRowStr, index), projectDetail.$unitPrice);
        if (projectDetail.$shipDate !== undefined && projectDetail.$shipDate !== null){
            await gondola.enter(utilities.formatString(this.shipDateByRowStr, index), projectDetail.$shipDate);
        }
        if (projectDetail.$deliveryDate !== undefined && projectDetail.$deliveryDate !== null){
            await gondola.enter(utilities.formatString(this.deliveryDateByRowStr, index), projectDetail.$deliveryDate);
        }
        if (projectDetail.$acceptedDate !== undefined && projectDetail.$acceptedDate !== null){
            await gondola.enter(utilities.formatString(this.acceptedDateByRowStr, index), projectDetail.$acceptedDate);
        }
        if (projectDetail.$billingDate !== undefined && projectDetail.$billingDate !== null){
            await gondola.enter(utilities.formatString(this.billingDateByRowStr, index), projectDetail.$billingDate);
        }
    }

    @action("inputProjectResource")
    public async inputProjectResource(lab: string, workStartTime: string, workEndTime: string){
        await this.searchLab(lab);
        await gondola.enter(this.workStartTime, workStartTime);
        await gondola.enter(this.workEndTime, workEndTime);
    }

    @action("addResourceRow")
    public async addResourceRow(index: any, projectResource: ProjectResourceInfo){
        await gondola.click(this.addResourceButton);
        await gondola.enter(utilities.formatString(this.resourceDateByRowStr, index), projectResource.$resourceDate);
        await gondola.enter(utilities.formatString(this.countPMByRowStr, index), projectResource.$countPM);
        await gondola.enter(utilities.formatString(this.countLeaderByRowStr, index), projectResource.$countLeader);
        await gondola.enter(utilities.formatString(this.countTesterByRowStr, index), projectResource.$countTester);
        await gondola.enter(utilities.formatString(this.countDesignerByRowStr, index), projectResource.$countDesigner);
        await gondola.enter(utilities.formatString(this.countExpertByRowStr, index), projectResource.$countExpert);
        await gondola.enter(utilities.formatString(this.countReserve1ByRowStr, index), projectResource.$countReserve1);
        await gondola.enter(utilities.formatString(this.countReserve2ByRowStr, index), projectResource.$countReserve2);
        await gondola.enter(utilities.formatString(this.countReserve3ByRowStr, index), projectResource.$countReserve3);
        await gondola.enter(utilities.formatString(this.countReserve4ByRowStr, index), projectResource.$countReserve4);
        await gondola.enter(utilities.formatString(this.countReserve5ByRowStr, index), projectResource.$countReserve5);
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
