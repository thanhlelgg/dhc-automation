import projectInfo from '../data/project-info.json';

export interface ProjectDetailInfo {
    detailName: string;
    item: string;
    debitCredit: string;
    isTaxable: boolean;
    taxId: string;
    quantity: string;
    unit: string;
    unitPrice: string;
    shipDate: string | null;
    deliveryDate: string | null;
    acceptedDate: string | null;
    billingDate: string | null;
}

export interface ProjectOverviewInfo {
    projectName: string;
    projectForm: string;
    customerName: string;
    department: string;
    workerName: string;
    startDate: string | null;
    endDate: string | null;
    scheduleStartDate: string | null;
    scheduleEndDate: string | null;
    accuracy: string;
    status: string;
    workingPlace: string;
    currencyId: string;
    billingType: string;
    closingDate: string;
    segment: string;
    tag: string | null;
    description: string | null;
}

export interface SingleResource {
    resourceDate: string;
    countPM: string;
    countLeader: string;
    countTester: string;
    countDesigner: string;
    countExpert: string;
    countReserve1: string;
    countReserve2: string;
    countReserve3: string;
    countReserve4: string;
    countReserve5: string;
}

export interface ProjectResourceInfo {
    labName: string;
    workingStartTime: string;
    workingEndTime: string;
    resources: SingleResource[];
}

export interface ProjectResultBaseInfo {
    role: string;
    item: string;
    debitCredit: string;
    planPeople: number | null;
    planTime: number | null;
    unitPriceWeekday: string;
    unitPriceWeekdayOT: string;
    unitPriceHoliday: string;
    unitPriceWeekdayLate: string;
    unitPriceWeekdayLateOT: string;
    unitPriceHolidayLate: string;
    isTaxable: boolean;
    taxId: string;
    note: string | null;
    outputOrder: string | null;
}

export class ProjectInfoData {
    public static OVERVIEW_FULL_DATA: ProjectOverviewInfo = projectInfo.projectOverview.fullData;
    public static OVERVIEW_REQUIRED_ONLY: ProjectOverviewInfo = projectInfo.projectOverview.requiredOnly;
    public static DETAIL_TWO_RECORDS: ProjectDetailInfo[] = projectInfo.projectDetail.twoRecords;
    public static RESOURCE_FULL_DATA: ProjectResourceInfo = projectInfo.projectResource.fullData;
    public static RESULT_BASE_TWO_RECORDS: ProjectResultBaseInfo[] = projectInfo.projectResultBase.twoRecords;
    public static RESULT_BASE_ONE_RECORD: ProjectResultBaseInfo[] = projectInfo.projectResultBase.oneRecord;
    public static RESULT_BASE_ONE_EMPTY_RECORD: ProjectResultBaseInfo[] = projectInfo.projectResultBase.oneEmptyRecord;
}
