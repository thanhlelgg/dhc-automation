interface IProjectDetailInfo {
    detailName: string;
    item: string;
    debitCredit: string;
    isTaxable: boolean;
    taxId: string;
    quantity: string;
    unit: string;
    unitPrice: string;
    shipDate?: string;
    deliveryDate?: string;
    acceptedDate?: string;
    billingDate?: string;
}

export class ProjectDetailInfo {

    private projectDetail: IProjectDetailInfo;

    constructor($projectDetail: IProjectDetailInfo) {
        this.projectDetail = $projectDetail;
    }

    /**
     * Getter $detailName
     * @return {string}
     */
    public get $detailName(): string {
        return this.projectDetail.detailName;
    }

    /**
     * Getter $item
     * @return {string}
     */
    public get $item(): string {
        return this.projectDetail.item;
    }

    /**
     * Getter $debitCredit
     * @return {string}
     */
    public get $debitCredit(): string {
        return this.projectDetail.debitCredit;
    }

    /**
     * Getter $isTaxable
     * @return {boolean}
     */
    public get $isTaxable(): boolean {
        return this.projectDetail.isTaxable;
    }

    /**
     * Getter $taxId
     * @return {string}
     */
    public get $taxId(): string {
        return this.projectDetail.taxId;
    }

    /**
     * Getter $quantity
     * @return {string}
     */
    public get $quantity(): string {
        return this.projectDetail.quantity;
    }

    /**
     * Getter $unit
     * @return {string}
     */
    public get $unit(): string {
        return this.projectDetail.unit;
    }

    /**
     * Getter $unitPrice
     * @return {string}
     */
    public get $unitPrice(): string {
        return this.projectDetail.unitPrice;
    }

    /**
     * Getter $shipDate
     * @return {string | undefined}
     */
    public get $shipDate(): string | undefined {
        return this.projectDetail.shipDate;
    }

    /**
     * Getter $deliveryDate
     * @return {string | undefined}
     */
    public get $deliveryDate(): string | undefined {
        return this.projectDetail.deliveryDate;
    }

    /**
     * Getter $acceptedDate
     * @return {string | undefined}
     */
    public get $acceptedDate(): string | undefined {
        return this.projectDetail.acceptedDate;
    }

    /**
     * Getter $billingDate
     * @return {string | undefined}
     */
    public get $billingDate(): string | undefined {
        return this.projectDetail.billingDate;
    }

    /**
     * Setter $detailName
     * @param {string} value
     */
    public set $detailName(value: string) {
        this.projectDetail.detailName = value;
    }

    /**
     * Setter $item
     * @param {string} value
     */
    public set $item(value: string) {
        this.projectDetail.item = value;
    }

    /**
     * Setter $debitCredit
     * @param {string} value
     */
    public set $debitCredit(value: string) {
        this.projectDetail.debitCredit = value;
    }

    /**
     * Setter $isTaxable
     * @param {boolean} value
     */
    public set $isTaxable(value: boolean) {
        this.projectDetail.isTaxable = value;
    }

    /**
     * Setter $taxId
     * @param {string} value
     */
    public set $taxId(value: string) {
        this.projectDetail.taxId = value;
    }

    /**
     * Setter $quantity
     * @param {string} value
     */
    public set $quantity(value: string) {
        this.projectDetail.quantity = value;
    }

    /**
     * Setter $unit
     * @param {string} value
     */
    public set $unit(value: string) {
        this.projectDetail.unit = value;
    }

    /**
     * Setter $unitPrice
     * @param {string} value
     */
    public set $unitPrice(value: string) {
        this.projectDetail.unitPrice = value;
    }

    /**
     * Setter $shipDate
     * @param {string | undefined} value
     */
    public set $shipDate(value: string | undefined) {
        this.projectDetail.shipDate = value;
    }

    /**
     * Setter $deliveryDate
     * @param {string | undefined} value
     */
    public set $deliveryDate(value: string | undefined) {
        this.projectDetail.deliveryDate = value;
    }

    /**
     * Setter $acceptedDate
     * @param {string | undefined} value
     */
    public set $acceptedDate(value: string | undefined) {
        this.projectDetail.acceptedDate = value;
    }

    /**
     * Setter $billingDate
     * @param {string | undefined} value
     */
    public set $billingDate(value: string | undefined) {
        this.projectDetail.billingDate = value;
    }
}