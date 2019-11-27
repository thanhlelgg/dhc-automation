import { action, gondola, locator, page } from "gondolajs";
import { generalPage } from "./general-page";
import { utilities } from "../common/utilities";
import { constants } from "../common/constants";
import { ProjectOverviewInfo } from "../models/project-overview-info";
import { ProjectResultBaseInfo } from "../models/project-result-base-info";
import { ProjectDetailInfo } from "../models/project-detail-info";
import { ProjectResourceInfo } from "../models/project-resource-info";
@page
export class projectPage extends generalPage {
    protected itemStr = "(//div[@role='row']//div[contains(.,'{0}')])[1]";

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
    protected unitPriceWeekdayOTByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-overtime')]";
    protected unitPriceHolidayByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-holiday')]";
    protected unitPriceWeekdayLateByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-late')]";
    protected unitPriceWeekdayLateOTByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-weekday-late-overtime')]";
    protected unitPriceHolidayLateByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'unit-price-holiday-late')]";
    protected isTaxableByRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'is-taxable')]//ancestor::div[@class='custom-control custom-checkbox']";
    protected isTaxableByRoleCheckbox = "//tr[contains(.,'{0}')]//input[contains(@id, 'is-taxable')]";
    protected taxIdByRoleStr = "//tr[contains(.,'{0}')]//select[contains(@id, 'tax-id')]";
    protected notebyRoleStr = "//tr[contains(.,'{0}')]//textarea[contains(@id, 'note')]";
    protected outputOrderbyRoleStr = "//tr[contains(.,'{0}')]//input[contains(@id, 'output-order')]";
    //#endregion

    //#region Search
    @locator
    protected itemFilter = "//input[@id='modal-items-filter']";
    @locator
    protected itemTable = { id: "modal-items-table" };
    //#endregion

    @locator
    protected projectCode = { id: "number" };
    @locator
    protected projectName = { id: "name" };
    @locator
    protected projectForm = "//select[@name='project_form']";

    //#region Search customer
    @locator
    protected searchCustomerField = { id: "search-business-customers" };
    @locator
    protected customerCodeFilter = { id: "modal-business-customers-filter-code" };
    @locator
    protected customerNameFilter = { id: "modal-business-customers-filter-name" };
    @locator
    protected customerRepNameFilter = { id: "modal-business-customers-filter-rep-name" };
    @locator
    protected customerTable = { id: "modal-business-customers-table" };
    //#endregion

    //#region search department
    @locator
    protected searchDepartmentField = { id: "search-departments" };
    @locator
    protected departmentFilter = { id: "modal-departments-filter" };
    @locator
    protected departmentTable = { id: "modal-departments-table" };
    //#endregion

    //#region search worker
    @locator
    protected searchWorkerField = { id: "search-workers" };
    @locator
    protected workerFilter = { id: "modal-workers-filter" };
    //#endregion

    //#region dates
    @locator
    protected startDate = { name: "start_date" };
    @locator
    protected endDate = { name: "end_date" };
    @locator
    protected scheduleStartDate = { name: "scheduled_start_date" };
    @locator
    protected scheduleEndDate = { name: "scheduled_end_date" };
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
    protected searchSegmentField = { id: "search-segments" };
    @locator
    protected segmentFilter = { id: "modal-segments-filter" };
    @locator
    protected segmentTable = { id: "modal-segments-table" };
    //#endregion

    @locator
    // protected tag = "//input[@id='tag']//preceding-sibling::div//input";
    protected tag = "//input[@id='tag']";
    @locator
    protected description = { id: "description" };

    //#region project detail
    @locator
    protected addProjectDetailBtn = { id: "project-details-add-row" };
    protected removeIconByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//a[@class='remove-project-details']";
    protected detailNamebyRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[name]') and not(contains(@name, 'item'))]";
    protected searchItemByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[@class='search-items  form-control']";
    protected debitCreditByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//select[contains(@name, '[debit_credit_group_id]')]";
    protected isTaxableByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@id, 'is-taxable')]";
    protected taxIdByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//select[contains(@name, '[tax_id]')]";
    protected quantityByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[quantity]')]";
    protected unitByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[unit]')]";
    protected unitPriceByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, '[unit_price]')]";
    protected shipDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'ship_date')]";
    protected deliveryDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'delivery_date')]";
    protected acceptedDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'accepted_date')]";
    protected billingDateByRowStr = "//div[.='{0}']/ancestor::div[@role='row']//input[contains(@name, 'billing_date')]";
    //#endregion

    //#region resource
    @locator
    protected searchLabField = { id: "search-labs" };
    @locator
    protected labFilter = { id: "modal-labs-filter" };
    @locator
    protected workStartTime = { id: "work_start_time_in_utc" };
    @locator
    protected workEndTime = { id: "work_end_time_in_utc" };
    @locator
    protected addResourceButton = { id: "project-resources-add-row" };
    protected removeResourceButtonByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//a[@href='javascript:;']";
    protected resourceDateByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[@class='date-picker form-control']";
    protected countPMByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-0-count')]";
    protected countLeaderByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-1-count')]";
    protected countTesterByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-2-count')]";
    protected countDesignerByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-3-count')]";
    protected countExpertByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-4-count')]";
    protected countReserve1ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-5-count')]";
    protected countReserve2ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-6-count')]";
    protected countReserve3ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-7-count')]";
    protected countReserve4ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-8-count')]";
    protected countReserve5ByRowStr = "//div[@id='project-resources']//div[@class='tabulator-table']/div[{0}]//input[contains(@id,'project-resource-headcounts-9-count')]";
    //#endregion

    @locator
    protected saveButton = { css: ".btn-info" };

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

    //#region project result bases
    @locator
    protected projectResultSection = { id: "project-result-bases" };
    //#endregion

    @action("selectItem")
    public async selectItem(itemName: string) {
        let itemXpath = utilities.formatString(this.itemStr, itemName);
        await gondola.click(itemXpath);
    }

    @action("searchCustomerByName")
    public async searchCustomerByName(customerName: string) {
        await gondola.click(this.searchCustomerField);
        await this.waitControlExist(this.customerNameFilter, 120);
        await gondola.enter(this.customerNameFilter, customerName);
        await this.selectItem(customerName);
    }

    @action("searchCustomerByCode")
    public async searchCustomerByCode(customerCode: string) {
        await gondola.click(this.searchCustomerField);
        await this.waitControlExist(this.customerCodeFilter, 120);
        await gondola.enter(this.customerCodeFilter, customerCode);
        await this.selectItem(customerCode);
    }

    @action("searchDepartment")
    public async searchDepartment(department: string) {
        await gondola.click(this.searchDepartmentField);
        await this.waitControlExist(this.departmentFilter, 120);
        await gondola.enter(this.departmentFilter, department);
        await this.selectItem(department);
    }

    @action("searchWorker")
    public async searchWorker(worker: string) {
        await gondola.click(this.searchWorkerField);
        await this.waitControlExist(this.workerFilter, 120);
        await gondola.enter(this.workerFilter, worker);
        await this.selectItem(worker);
    }

    @action("searchSegment")
    public async searchSegment(segment: string) {
        await gondola.click(this.searchSegmentField);
        await this.waitControlExist(this.segmentFilter, 120);
        await gondola.enter(this.segmentFilter, segment);
        await this.selectItem(segment);
    }

    @action("searchItem")
    public async searchItem(item: string, index: any, position: string) {
        let searchItemXpath = utilities.formatString(this.searchItemByRoleStr, index);
        if (position == "detail") {
            searchItemXpath = utilities.formatString(this.searchItemByRowStr, index);
        }

        await gondola.click(searchItemXpath);
        await this.waitControlExist(this.itemFilter, 120);
        await gondola.enter(this.itemFilter, item);
        await this.selectItem(item);
    }

    @action("searchLab")
    public async searchLab(lab: string) {
        await gondola.click(this.searchLabField);
        await this.waitControlExist(this.labFilter, 60);
        await gondola.enter(this.labFilter, lab);
        await this.selectItem(lab);
    }

    @action("checkProjectForm")
    public async checkProjectFormOptions(options: string[]): Promise<boolean> {
        return await (gondola as any).areOptionsExists(this.projectForm, options);
    }

    @action("selectProjectForm")
    public async selectProjectForm(option: string) {
        await gondola.select(this.projectForm, option);
    }

    @action("isProjectResultSectionDisplayed")
    public async isProjectResultSectionDisplayed(): Promise<boolean> {
        return await (gondola as any).doesControlDisplay(this.projectResultSection);
    }

    @action("inputProjectOverview")
    public async inputProjectOverview(projectOverview: ProjectOverviewInfo) {
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

    @action("inputProjectResultBases")
    public async inputProjectResultBases(projectResultBase: ProjectResultBaseInfo) {
        let formExist = await gondola.doesControlExist(this.subTitleProjectResult);
        if (formExist) {
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
            if (projectResultBase.$isTaxable) {
                await gondola.select(utilities.formatString(this.taxIdByRoleStr, projectResultBase.$role), projectResultBase.$taxId);
            }

            if (projectResultBase.$note !== undefined && projectResultBase.$note !== null) {
                await gondola.enter(utilities.formatString(this.notebyRoleStr, projectResultBase.$role), projectResultBase.$note);
            }
            if (projectResultBase.$outputOrder !== undefined && projectResultBase.$outputOrder !== null) {
                await gondola.enter(utilities.formatString(this.outputOrderbyRoleStr, projectResultBase.$role), projectResultBase.$outputOrder);
            }

        }
    }

    @action("addProjectDetails")
    public async addProjectDetails(index: any, projectDetail: ProjectDetailInfo) {
        await gondola.click(this.addProjectDetailBtn);
        await gondola.enter(utilities.formatString(this.detailNamebyRowStr, index), projectDetail.$detailName);
        await this.searchItem(projectDetail.$item, index, "detail");
        await gondola.select(utilities.formatString(this.debitCreditByRowStr, index), projectDetail.$debitCredit);
        await gondola.setState(utilities.formatString(this.isTaxableByRowStr, index), projectDetail.$isTaxable);
        await gondola.select(utilities.formatString(this.taxIdByRowStr, index), projectDetail.$taxId);
        await gondola.enter(utilities.formatString(this.quantityByRowStr, index), projectDetail.$quantity);
        await gondola.enter(utilities.formatString(this.unitByRowStr, index), projectDetail.$unit);
        await gondola.enter(utilities.formatString(this.unitPriceByRowStr, index), projectDetail.$unitPrice);
        if (projectDetail.$shipDate !== undefined && projectDetail.$shipDate !== null) {
            await gondola.enter(utilities.formatString(this.shipDateByRowStr, index), projectDetail.$shipDate);
        }
        if (projectDetail.$deliveryDate !== undefined && projectDetail.$deliveryDate !== null) {
            await gondola.enter(utilities.formatString(this.deliveryDateByRowStr, index), projectDetail.$deliveryDate);
        }
        if (projectDetail.$acceptedDate !== undefined && projectDetail.$acceptedDate !== null) {
            await gondola.enter(utilities.formatString(this.acceptedDateByRowStr, index), projectDetail.$acceptedDate);
        }
        if (projectDetail.$billingDate !== undefined && projectDetail.$billingDate !== null) {
            await gondola.enter(utilities.formatString(this.billingDateByRowStr, index), projectDetail.$billingDate);
        }
    }

    @action("inputProjectResource")
    public async inputProjectResource(lab: string, workStartTime: string, workEndTime: string) {
        await this.searchLab(lab);
        await gondola.enter(this.workStartTime, workStartTime);
        await gondola.enter(this.workEndTime, workEndTime);
    }

    @action("addResourceRow")
    public async addResourceRow(index: any, projectResource: ProjectResourceInfo) {
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
    public async saveNewProject() {
        await gondola.click(this.saveButton);
    }

    @action("getProjectCode")
    public async getProjectCode() {
        let projectCode = await gondola.getControlProperty(this.projectCode, "value");
        return projectCode;
    }

    @action("getPlanTotalTime")
    public async checkPlanTotalTime(planTime: number, planPeople: number, locator: any) {
        await gondola.click(locator);
        let totalTime = await gondola.getControlProperty(locator, "value");
        await gondola.checkEqual(totalTime, (planTime * planPeople) + "");
    }

    @action("verifyContentOfProjectOverview")
    public async verifyContentOfProjectOverview(projectOverview: ProjectOverviewInfo) {
        gondola.report("verify project name");
        await gondola.checkEqual(await this.getTextBoxValue(this.projectName), projectOverview.$projectName);

        gondola.report("verify project form");
        var projectForm = await this.getSelectedOption(this.projectForm);
        await gondola.checkEqual(projectForm, projectOverview.$projectForm);

        gondola.report("verify project customer");
        var customerStr = await this.getTextBoxValue(this.searchCustomerField);
        await gondola.checkEqual(customerStr.includes(projectOverview.$customerName), true);

        gondola.report("verify project department");
        var departmentStr = await this.getTextBoxValue(this.searchDepartmentField);
        await gondola.checkEqual(departmentStr.includes(projectOverview.$department), true);

        gondola.report("verify worker");
        var workerStr = await this.getTextBoxValue(this.searchWorkerField);
        await gondola.checkEqual(workerStr.includes(projectOverview.$workerName), true);

        gondola.report("verify start date");
        if (projectOverview.$startDate !== null && projectOverview.$startDate !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.startDate), projectOverview.$startDate);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.startDate), "");
        }

        gondola.report("verify end date");
        if (projectOverview.$endDate !== null && projectOverview.$endDate !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.endDate), projectOverview.$endDate);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.endDate), "");
        }

        gondola.report("verify schedule start date");
        if (projectOverview.$scheduleStartDate !== null && projectOverview.$scheduleStartDate !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.scheduleStartDate), projectOverview.$scheduleStartDate);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.scheduleStartDate), "");
        }

        gondola.report("verify schedule end date");
        if (projectOverview.$scheduleEndDate !== null && projectOverview.$scheduleEndDate !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.scheduleEndDate), projectOverview.$scheduleEndDate);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.scheduleEndDate), "");
        }

        gondola.report("verify accuracy");
        var accuracy = await this.getSelectedOption(this.accuracy);
        await gondola.checkEqual(accuracy, projectOverview.$accuracy);

        gondola.report("verify status");
        var status = await this.getSelectedOption(this.status);
        await gondola.checkEqual(status, projectOverview.$status);

        gondola.report("verify working place");
        var workingPlace = await this.getSelectedOption(this.workingPlace);
        await gondola.checkEqual(workingPlace, projectOverview.$workingPlace);

        gondola.report("verify currency id");
        var currencyId = await this.getSelectedOption(this.currencyId);
        await gondola.checkEqual(currencyId, projectOverview.$currencyId);

        gondola.report("verify billing type");
        var billingType = await this.getSelectedOption(this.billingType);
        await gondola.checkEqual(billingType, projectOverview.$billingType);

        gondola.report("verify closing date");
        var closingDate = await this.getSelectedOption(this.closingDate);
        await gondola.checkEqual(closingDate, projectOverview.$closingDate);

        // gondola.report("verify segment");
        // var segment = await this.getTextBoxValue(this.segmentFilter);
        // await gondola.checkEqual(segment.includes(projectOverview.$segment), true);

        gondola.report("verify tags");
        if (projectOverview.$tag !== null && projectOverview.$tag !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.tag), projectOverview.$tag);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.tag), "");
        }

        gondola.report("verify description");
        if (projectOverview.$description !== null && projectOverview.$description !== undefined) {
            await gondola.checkEqual(await this.getTextBoxValue(this.description), projectOverview.$description);
        } else {
            await gondola.checkEqual(await this.getTextBoxValue(this.description), "");
        }

    }

    @action("verifyContentOfProjectResultBases")
    public async verifyContentOfProjectResultBases(projectResultBases: any[]) {
        for (let i = 0; i <= projectResultBases.length - 1; i++) {
            var projectResultBaseRow = new ProjectResultBaseInfo(projectResultBases[i]);
            gondola.report("verify selected item");
            var item = await this.getTextBoxValue(utilities.formatString(this.searchItemByRoleStr, projectResultBaseRow.$role));
            await gondola.checkEqual(item.includes(projectResultBaseRow.$item), true);

            gondola.report("verify debit credit type");
            var debitCredit = await this.getSelectedOption(utilities.formatString(this.debitCreditByRoleStr, projectResultBaseRow.$role));
            await gondola.checkEqual(debitCredit, projectResultBaseRow.$debitCredit);

            gondola.report("verify plan people");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.planPeopleByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$planPeople + "");

            gondola.report("verify plan time");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.planTimeByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$planTime + "");

            gondola.report("verify plan total time");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.planTotalTimeByRoleStr, projectResultBaseRow.$role)), (projectResultBaseRow.$planTime * projectResultBaseRow.$planPeople) + "");

            gondola.report("verify pricing");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitPriceWeekdayByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$unitPriceWeekday);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitPriceWeekdayOTByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$unitPriceWeekdayOT);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitPriceWeekdayLateOTByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$unitPriceWeekdayLateOT);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitPriceHolidayByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$unitPriceHoliday);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitPriceWeekdayLateByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$unitPriceWeekDayLate);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitPriceHolidayLateByRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$unitPriceHolidayLate);

            gondola.report("verify tax");
            var isTax = await this.getCheckboxValue(utilities.formatString(this.isTaxableByRoleCheckbox, projectResultBaseRow.$role));
            await gondola.checkEqual(isTax, projectResultBaseRow.$isTaxable);

            if (isTax) {
                var taxId = await this.getSelectedOption(utilities.formatString(this.taxIdByRoleStr, projectResultBaseRow.$role));
                await gondola.checkEqual(taxId, projectResultBaseRow.$taxId);
            }

            gondola.report("verify note");
            if (projectResultBaseRow.$note !== null && projectResultBaseRow.$note !== undefined) {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.notebyRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$note);
            } else {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.notebyRoleStr, projectResultBaseRow.$role)), "");
            }

            gondola.report("verify order");
            if (projectResultBaseRow.$outputOrder !== null && projectResultBaseRow.$outputOrder !== undefined) {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.outputOrderbyRoleStr, projectResultBaseRow.$role)), projectResultBaseRow.$outputOrder);
            } else {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.outputOrderbyRoleStr, projectResultBaseRow.$role)), "");
            }
        }
    }

    @action("verifyContentOfProjectDetails")
    public async verifyContentOfProjectDetails(projectDetails: any[]){
        for (let i = 1; i <= projectDetails.length; i++) {
            var projectDetailRow = new ProjectDetailInfo(projectDetails[i - 1]);
            gondola.report("verify detail name");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.detailNamebyRowStr, i + "")), projectDetailRow.$detailName);

            gondola.report("verify selected item");
            var item = await this.getTextBoxValue(utilities.formatString(this.searchItemByRowStr, i + ""));
            await gondola.checkEqual(item.includes(projectDetailRow.$item), true);

            gondola.report("verify debit credit type");
            var debitCredit = await this.getSelectedOption(utilities.formatString(this.debitCreditByRowStr, i + ""));
            await gondola.checkEqual(debitCredit, projectDetailRow.$debitCredit);

            gondola.report("verify tax");
            var isTax = await this.getCheckboxValue(utilities.formatString(this.isTaxableByRowStr, i + ""));
            await gondola.checkEqual(isTax, projectDetailRow.$isTaxable);

            if (isTax) {
                var taxId = await this.getSelectedOption(utilities.formatString(this.taxIdByRowStr, i + ""));
                await gondola.checkEqual(taxId, projectDetailRow.$taxId);
            }

            gondola.report("verify quantity & pricing");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.quantityByRowStr, i + "")), projectDetailRow.$quantity);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitByRowStr, i + "")), projectDetailRow.$unit);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.unitPriceByRowStr, i + "")), projectDetailRow.$unitPrice);

            gondola.report("verify ship date");
            if (projectDetailRow.$shipDate !== null && projectDetailRow.$shipDate !== undefined) {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.shipDateByRowStr, i + "")), projectDetailRow.$shipDate);
            } else {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.shipDateByRowStr, i + "")), "");
            }

            gondola.report("verify delivery date");
            if (projectDetailRow.$deliveryDate !== null && projectDetailRow.$deliveryDate !== undefined) {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.deliveryDateByRowStr, i + "")), projectDetailRow.$deliveryDate);
            } else {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.deliveryDateByRowStr, i + "")), "");
            }

            gondola.report("verify accepted date");
            if (projectDetailRow.$acceptedDate !== null && projectDetailRow.$acceptedDate !== undefined) {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.acceptedDateByRowStr, i + "")), projectDetailRow.$acceptedDate);
            } else {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.acceptedDateByRowStr, i + "")), "");
            }

            gondola.report("verify billing date");
            if (projectDetailRow.$billingDate !== null && projectDetailRow.$billingDate !== undefined) {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.billingDateByRowStr, i + "")), projectDetailRow.$billingDate);
            } else {
                await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.billingDateByRowStr, i + "")), "");
            }
        }
    }

    @action("verifyContentOfProjectResources")
    public async verifyContentOfProjectResources(labName: string, workStartTime: string, workEndTime: string, projectResources: any[]){
        gondola.report("verify lab name");
        var lab = await this.getTextBoxValue(this.searchLabField);
        await gondola.checkEqual(lab.includes(labName), true);

        gondola.report("verify working time");
        await gondola.checkEqual(await this.getTextBoxValue(this.workStartTime), workStartTime);
        await gondola.checkEqual(await this.getTextBoxValue(this.workEndTime), workEndTime);

        for (let i = 1; i <= projectResources.length; i++) {
            var projectResourceRow = new ProjectResourceInfo(projectResources[i - 1]);
            gondola.report("verify resource date");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.resourceDateByRowStr, i + "")), projectResourceRow.$resourceDate);

            gondola.report("verify number of each roles: PM, leader, designer, expert, tester, reserve");
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countPMByRowStr, i + "")), projectResourceRow.$countPM);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countLeaderByRowStr, i + "")), projectResourceRow.$countLeader);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countTesterByRowStr, i + "")), projectResourceRow.$countTester);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countDesignerByRowStr, i + "")), projectResourceRow.$countDesigner);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countExpertByRowStr, i + "")), projectResourceRow.$countExpert);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countReserve1ByRowStr, i + "")), projectResourceRow.$countReserve1);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countReserve2ByRowStr, i + "")), projectResourceRow.$countReserve2);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countReserve3ByRowStr, i + "")), projectResourceRow.$countReserve3);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countReserve4ByRowStr, i + "")), projectResourceRow.$countReserve4);
            await gondola.checkEqual(await this.getTextBoxValue(utilities.formatString(this.countReserve5ByRowStr, i + "")), projectResourceRow.$countReserve5);
        }
    }
}
export default new projectPage();
