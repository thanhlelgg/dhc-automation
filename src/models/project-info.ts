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
    shipDate?: string;
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
    currencyId!: string;
    billingType!: string;
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

export class ProjectResultBaseInfo {
    role!: string;
    item!: string;
    debitCredit!: string;
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
    public static DETAIL_TWO_RECORDS: ProjectDetailInfo[] = Object.assign(
        new ProjectDetailInfo(),
        projectInfo.projectDetail.twoRecords,
    );
    public static RESOURCE_FULL_DATA: ProjectResourceInfo = Object.assign(
        new ProjectResourceInfo(),
        projectInfo.projectResource.fullData,
    );
    public static RESULT_BASE_TWO_RECORDS: ProjectResultBaseInfo[] = Object.assign(
        new ProjectResultBaseInfo(),
        projectInfo.projectResultBase.twoRecords,
    );
    public static RESULT_BASE_ONE_RECORD: ProjectResultBaseInfo[] = Object.assign(
        new ProjectResultBaseInfo(),
        projectInfo.projectResultBase.oneRecord,
    );
    public static RESULT_BASE_ONE_EMPTY_RECORD: ProjectResultBaseInfo[] = Object.assign(
        new ProjectResultBaseInfo(),
        projectInfo.projectResultBase.oneEmptyRecord,
    );
    public static RESULT_BASE_UNIT_PRICES: ResultBaseUnitPrices = Object.assign(
        new ResultBaseUnitPrices(),
        projectInfo.projectResultBase.unitPrices,
    );
    public static RESULT_BASE_UNIT_PRICES_EMPTY: ResultBaseUnitPrices = Object.assign(
        new ResultBaseUnitPrices(),
        projectInfo.projectResultBase.emptyUnitPrices,
    );
}
