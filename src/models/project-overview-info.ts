export interface IProjectOverviewInfo {
    projectName: string;
    projectForm: string;
    customerName: string;
    department: string;
    workerName: string;
    startDate?: string;
    endDate?: string;
    scheduleStartDate?: string;
    scheduleEndDate?: string;
    accuracy: string;
    status: string;
    workingPlace: string;
    currencyId: string;
    billingType: string;
    closingDate: string;
    segment: string;
    tag?: string;
    description?: string;
}

export class ProjectOverviewInfo {

    private projectOverview: IProjectOverviewInfo;

    constructor($projectOverview: IProjectOverviewInfo) {
        this.projectOverview = $projectOverview;
    }

    /**
    * Getter $projectName
    * @return {string}
    */
    public get $projectName(): string {
        return this.projectOverview.projectName;
    }

    /**
     * Getter $projectForm
     * @return {string}
     */
    public get $projectForm(): string {
        return this.projectOverview.projectForm;
    }

    /**
     * Getter $customerName
     * @return {string}
     */
    public get $customerName(): string {
        return this.projectOverview.customerName;
    }

    /**
     * Getter $department
     * @return {string}
     */
    public get $department(): string {
        return this.projectOverview.department;
    }

    /**
     * Getter $workerName
     * @return {string}
     */
    public get $workerName(): string {
        return this.projectOverview.workerName;
    }

    /**
     * Getter $startDate
     * @return {string | undefined}
     */
    public get $startDate(): string | undefined {
        return this.projectOverview.startDate;
    }

    /**
     * Getter $endDate
     * @return {string | undefined}
     */
    public get $endDate(): string | undefined {
        return this.projectOverview.endDate;
    }

    /**
     * Getter $scheduleStartDate
     * @return {string | undefined}
     */
    public get $scheduleStartDate(): string | undefined {
        return this.projectOverview.scheduleStartDate;
    }

    /**
     * Getter $scheduleEndDate
     * @return {string | undefined}
     */
    public get $scheduleEndDate(): string | undefined {
        return this.projectOverview.scheduleEndDate;
    }

    /**
     * Getter $accuracy
     * @return {string}
     */
    public get $accuracy(): string {
        return this.projectOverview.accuracy;
    }

    /**
     * Getter $status
     * @return {string}
     */
    public get $status(): string {
        return this.projectOverview.status;
    }

    /**
     * Getter $workingPlace
     * @return {string}
     */
    public get $workingPlace(): string {
        return this.projectOverview.workingPlace;
    }

    /**
     * Getter $currencyId
     * @return {string}
     */
    public get $currencyId(): string {
        return this.projectOverview.currencyId;
    }

    /**
     * Getter $billingType
     * @return {string}
     */
    public get $billingType(): string {
        return this.projectOverview.billingType;
    }

    /**
     * Getter $closingDate
     * @return {string}
     */
    public get $closingDate(): string {
        return this.projectOverview.closingDate;
    }

    /**
     * Getter $segment
     * @return {string}
     */
    public get $segment(): string {
        return this.projectOverview.segment;
    }

    /**
     * Getter $tag
     * @return {string | undefined}
     */
    public get $tag(): string | undefined {
        return this.projectOverview.tag;
    }

    /**
     * Getter $description
     * @return {string | undefined}
     */
    public get $description(): string | undefined {
        return this.projectOverview.description;
    }

    /**
     * Setter $projectName
     * @param {string} value
     */
    public set $projectName(value: string) {
        this.projectOverview.projectName = value;
    }

    /**
     * Setter $projectForm
     * @param {string} value
     */
    public set $projectForm(value: string) {
        this.projectOverview.projectForm = value;
    }

    /**
     * Setter $customerName
     * @param {string} value
     */
    public set $customerName(value: string) {
        this.projectOverview.customerName = value;
    }

    /**
     * Setter $department
     * @param {string} value
     */
    public set $department(value: string) {
        this.projectOverview.department = value;
    }

    /**
     * Setter $workerName
     * @param {string} value
     */
    public set $workerName(value: string) {
        this.projectOverview.workerName = value;
    }

    /**
     * Setter $startDate
     * @param {string | undefined} value
     */
    public set $startDate(value: string | undefined) {
        this.projectOverview.startDate = value;
    }

    /**
     * Setter $endDate
     * @param {string | undefined} value
     */
    public set $endDate(value: string | undefined) {
        this.projectOverview.endDate = value;
    }

    /**
     * Setter $scheduleStartDate
     * @param {string | undefined} value
     */
    public set $scheduleStartDate(value: string | undefined) {
        this.projectOverview.scheduleStartDate = value;
    }

    /**
     * Setter $scheduleEndDate
     * @param {string | undefined} value
     */
    public set $scheduleEndDate(value: string | undefined) {
        this.projectOverview.scheduleEndDate = value;
    }

    /**
     * Setter $accuracy
     * @param {string} value
     */
    public set $accuracy(value: string) {
        this.projectOverview.accuracy = value;
    }

    /**
     * Setter $status
     * @param {string} value
     */
    public set $status(value: string) {
        this.projectOverview.status = value;
    }

    /**
     * Setter $workingPlace
     * @param {string} value
     */
    public set $workingPlace(value: string) {
        this.projectOverview.workingPlace = value;
    }

    /**
     * Setter $currencyId
     * @param {string} value
     */
    public set $currencyId(value: string) {
        this.projectOverview.currencyId = value;
    }

    /**
     * Setter $billingType
     * @param {string} value
     */
    public set $billingType(value: string) {
        this.projectOverview.billingType = value;
    }

    /**
     * Setter $closingDate
     * @param {string} value
     */
    public set $closingDate(value: string) {
        this.projectOverview.closingDate = value;
    }

    /**
     * Setter $segment
     * @param {string} value
     */
    public set $segment(value: string) {
        this.projectOverview.segment = value;
    }

    /**
     * Setter $tag
     * @param {string | undefined} value
     */
    public set $tag(value: string | undefined) {
        this.projectOverview.tag = value;
    }

    /**
     * Setter $description
     * @param {string | undefined} value
     */
    public set $description(value: string | undefined) {
        this.projectOverview.description = value;
    }

}
