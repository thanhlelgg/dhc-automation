interface IProjectResultBaseInfo {
    role: string;
    item: string;
    debitCredit: string;
    planPeople: number;
    planTime: number;
    unitPriceWeekday: string;
    unitPriceWeekdayOT: string;
    unitPriceHoliday: string;
    unitPriceWeekDayLate: string;
    unitPriceWeekdayLateOT: string;
    unitPriceHolidayLate: string;
    isTaxable: boolean;
    taxId: string;
    note?: string;
    outputOrder?: string;
}

export class ProjectResultBaseInfo {
    private projectResultBase: IProjectResultBaseInfo;

    constructor($projectResultBase: IProjectResultBaseInfo) {
        this.projectResultBase = $projectResultBase;
    }

    /**
     * Getter $role
     * @return {string}
     */
    public get $role(): string {
        return this.projectResultBase.role;
    }

    /**
     * Getter $item
     * @return {string}
     */
    public get $item(): string {
        return this.projectResultBase.item;
    }

    /**
     * Getter $debitCredit
     * @return {string}
     */
    public get $debitCredit(): string {
        return this.projectResultBase.debitCredit;
    }

    /**
     * Getter $planPeople
     * @return {number}
     */
    public get $planPeople(): number {
        return this.projectResultBase.planPeople;
    }

    /**
     * Getter $planTime
     * @return {number}
     */
    public get $planTime(): number {
        return this.projectResultBase.planTime;
    }

    /**
     * Getter $unitPriceWeekday
     * @return {string}
     */
    public get $unitPriceWeekday(): string {
        return this.projectResultBase.unitPriceWeekday;
    }

    /**
     * Getter $unitPriceWeekdayOT
     * @return {string}
     */
    public get $unitPriceWeekdayOT(): string {
        return this.projectResultBase.unitPriceWeekdayOT;
    }

    /**
     * Getter $unitPriceHoliday
     * @return {string}
     */
    public get $unitPriceHoliday(): string {
        return this.projectResultBase.unitPriceHoliday;
    }

    /**
     * Getter $unitPriceWeekDayLate
     * @return {string}
     */
    public get $unitPriceWeekDayLate(): string {
        return this.projectResultBase.unitPriceWeekDayLate;
    }

    /**
     * Getter $unitPriceWeekdayLateOT
     * @return {string}
     */
    public get $unitPriceWeekdayLateOT(): string {
        return this.projectResultBase.unitPriceWeekdayLateOT;
    }

    /**
     * Getter $unitPriceHolidayLate
     * @return {string}
     */
    public get $unitPriceHolidayLate(): string {
        return this.projectResultBase.unitPriceHolidayLate;
    }

    /**
     * Getter $isTaxable
     * @return {boolean}
     */
    public get $isTaxable(): boolean {
        return this.projectResultBase.isTaxable;
    }

    /**
     * Getter $taxId
     * @return {string}
     */
    public get $taxId(): string {
        return this.projectResultBase.taxId;
    }

    /**
     * Getter $note
     * @return {string | undefined}
     */
    public get $note(): string | undefined {
        return this.projectResultBase.note;
    }

    /**
     * Getter $outputOrder
     * @return {string | undefined}
     */
    public get $outputOrder(): string | undefined {
        return this.projectResultBase.outputOrder;
    }

    /**
     * Setter $role
     * @param {string} value
     */
    public set $role(value: string) {
        this.projectResultBase.role = value;
    }

    /**
     * Setter $item
     * @param {string} value
     */
    public set $item(value: string) {
        this.projectResultBase.item = value;
    }

    /**
     * Setter $debitCredit
     * @param {string} value
     */
    public set $debitCredit(value: string) {
        this.projectResultBase.debitCredit = value;
    }

    /**
     * Setter $planPeople
     * @param {number} value
     */
    public set $planPeople(value: number) {
        this.projectResultBase.planPeople = value;
    }

    /**
     * Setter $planTime
     * @param {number} value
     */
    public set $planTime(value: number) {
        this.projectResultBase.planTime = value;
    }

    /**
     * Setter $unitPriceWeekday
     * @param {string} value
     */
    public set $unitPriceWeekday(value: string) {
        this.projectResultBase.unitPriceWeekday = value;
    }

    /**
     * Setter $unitPriceWeekdayOT
     * @param {string} value
     */
    public set $unitPriceWeekdayOT(value: string) {
        this.projectResultBase.unitPriceWeekdayOT = value;
    }

    /**
     * Setter $unitPriceHoliday
     * @param {string} value
     */
    public set $unitPriceHoliday(value: string) {
        this.projectResultBase.unitPriceHoliday = value;
    }

    /**
     * Setter $unitPriceWeekDayLate
     * @param {string} value
     */
    public set $unitPriceWeekDayLate(value: string) {
        this.projectResultBase.unitPriceWeekDayLate = value;
    }

    /**
     * Setter $unitPriceWeekdayLateOT
     * @param {string} value
     */
    public set $unitPriceWeekdayLateOT(value: string) {
        this.projectResultBase.unitPriceWeekdayLateOT = value;
    }

    /**
     * Setter $unitPriceHolidayLate
     * @param {string} value
     */
    public set $unitPriceHolidayLate(value: string) {
        this.projectResultBase.unitPriceHolidayLate = value;
    }

    /**
     * Setter $isTaxable
     * @param {boolean} value
     */
    public set $isTaxable(value: boolean) {
        this.projectResultBase.isTaxable = value;
    }

    /**
     * Setter $taxId
     * @param {string} value
     */
    public set $taxId(value: string) {
        this.projectResultBase.taxId = value;
    }

    /**
     * Setter $note
     * @param {string | undefined} value
     */
    public set $note(value: string | undefined) {
        this.projectResultBase.note = value;
    }

    /**
     * Setter $outputOrder
     * @param {string | undefined} value
     */
    public set $outputOrder(value: string | undefined) {
        this.projectResultBase.outputOrder = value;
    }
}
