import projectInfo from '../data/project-info.json';

export class ProjectDetailInfo {
    detailName!: string;
    item!: string;
    debitCredit!: string;
    isTaxable!: boolean;
    taxId!: string;
    quantity!: string;
    unit!: string;
    unitPrice!: string;
    deliveryDate?: string;
    acceptedDate?: string;
    billingDate?: string;
}

export class ProjectOverviewInfo {
    projectName!: string;
    projectForm!: string;
    customerName!: string;
    department!: string;
    workerName!: string;
    startDate?: string;
    endDate?: string;
    scheduleStartDate?: string;
    scheduleEndDate?: string;
    accuracy!: string;
    status!: string;
    workingPlace!: string;
    exchangeId!: string;
    closingDate!: string;
    segment!: string;
    tag?: string;
    description?: string;
}

export class SingleResource {
    resourceDate!: string;
    countPM!: string;
    countLeader!: string;
    countTester!: string;
    countDesigner!: string;
    countExpert!: string;
    countReserve1!: string;
    countReserve2!: string;
    countReserve3!: string;
    countReserve4!: string;
    countReserve5!: string;
}

export class ProjectResourceInfo {
    labName!: string;
    workingStartTime!: string;
    workingEndTime!: string;
    resources!: SingleResource[];
}

export class ProjectResultBaseRecord {
    role!: string;
    planPeople?: number;
    planTime?: number;
    unitPriceWeekday!: string;
    unitPriceWeekdayOT!: string;
    unitPriceHoliday!: string;
    unitPriceWeekdayLate!: string;
    unitPriceWeekdayLateOT!: string;
    unitPriceHolidayLate!: string;
    isTaxable!: boolean;
    taxId!: string;
    note?: string;
    outputOrder?: string;
}

export class ProjectResultBaseInfo {
    item!: string;
    debitCredit!: string;
    records!: ProjectResultBaseRecord[];
}

export class ResultBaseUnitPrices {
    unitPriceWeekday!: string;
    unitPriceWeekdayOT!: string;
    unitPriceHoliday!: string;
    unitPriceWeekdayLate!: string;
    unitPriceWeekdayLateOT!: string;
    unitPriceHolidayLate!: string;
}

export class ProjectInfoData {
    public static OVERVIEW_FULL_DATA: ProjectOverviewInfo = Object.assign(
        new ProjectOverviewInfo(),
        projectInfo.projectOverview.fullData,
    );
    public static OVERVIEW_REQUIRED_ONLY: ProjectOverviewInfo = Object.assign(
        new ProjectOverviewInfo(),
        projectInfo.projectOverview.requiredOnly,
    );
    public static DETAIL_TWO_RECORDS: ProjectDetailInfo[] = projectInfo.projectDetail.twoRecords.map(item => {
        return Object.assign(new ProjectDetailInfo(), item);
    });

    public static DETAIL_ONE_RECORDS: ProjectDetailInfo[] = projectInfo.projectDetail.oneRecords.map(item => {
        return Object.assign(new ProjectDetailInfo(), item);
    });

    public static RESOURCE_FULL_DATA: ProjectResourceInfo = Object.assign(
        new ProjectResourceInfo(),
        projectInfo.projectResource.fullData,
    );
    public static RESULT_BASE_TWO_RECORDS: ProjectResultBaseInfo = {
        item: projectInfo.projectResultBase.item,
        debitCredit: projectInfo.projectResultBase.debitCredit,
        records: [projectInfo.projectResultBase.record1, projectInfo.projectResultBase.record2],
    };

    public static RESULT_BASE_ONE_RECORD: ProjectResultBaseInfo = {
        item: projectInfo.projectResultBase.item,
        debitCredit: projectInfo.projectResultBase.debitCredit,
        records: [projectInfo.projectResultBase.record1],
    };

    public static RESULT_BASE_ONE_EMPTY_RECORD: ProjectResultBaseInfo = {
        item: projectInfo.projectResultBase.item,
        debitCredit: projectInfo.projectResultBase.debitCredit,
        records: [projectInfo.projectResultBase.emptyRecord],
    };

    public static RESULT_BASE_UNIT_PRICES: ResultBaseUnitPrices = Object.assign(
        new ResultBaseUnitPrices(),
        projectInfo.projectResultBase.unitPrices,
    );
    public static RESULT_BASE_UNIT_PRICES_EMPTY: ResultBaseUnitPrices = Object.assign(
        new ResultBaseUnitPrices(),
        projectInfo.projectResultBase.emptyUnitPrices,
    );
}
