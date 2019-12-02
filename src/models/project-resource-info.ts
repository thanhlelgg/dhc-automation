interface IProjectResourceInfo {
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

export class ProjectResourceInfo {
    private projectResource: IProjectResourceInfo;

    constructor($projectResource: IProjectResourceInfo) {
        this.projectResource = $projectResource;
    }

    /**
     * Getter $resourceDate
     * @return {string}
     */
    public get $resourceDate(): string {
        return this.projectResource.resourceDate;
    }

    /**
     * Getter $countPM
     * @return {string}
     */
    public get $countPM(): string {
        return this.projectResource.countPM;
    }

    /**
     * Getter $countLeader
     * @return {string}
     */
    public get $countLeader(): string {
        return this.projectResource.countLeader;
    }

    /**
     * Getter $countTester
     * @return {string}
     */
    public get $countTester(): string {
        return this.projectResource.countTester;
    }

    /**
     * Getter $countDesigner
     * @return {string}
     */
    public get $countDesigner(): string {
        return this.projectResource.countDesigner;
    }

    /**
     * Getter $countExpert
     * @return {string}
     */
    public get $countExpert(): string {
        return this.projectResource.countExpert;
    }

    /**
     * Getter $countReserve1
     * @return {string}
     */
    public get $countReserve1(): string {
        return this.projectResource.countReserve1;
    }

    /**
     * Getter $countReserve2
     * @return {string}
     */
    public get $countReserve2(): string {
        return this.projectResource.countReserve2;
    }

    /**
     * Getter $countReserve3
     * @return {string}
     */
    public get $countReserve3(): string {
        return this.projectResource.countReserve3;
    }

    /**
     * Getter $countReserve4
     * @return {string}
     */
    public get $countReserve4(): string {
        return this.projectResource.countReserve4;
    }

    /**
     * Getter $countReserve5
     * @return {string}
     */
    public get $countReserve5(): string {
        return this.projectResource.countReserve5;
    }

    /**
     * Setter $resourceDate
     * @param {string} value
     */
    public set $resourceDate(value: string) {
        this.projectResource.resourceDate = value;
    }

    /**
     * Setter $countPM
     * @param {string} value
     */
    public set $countPM(value: string) {
        this.projectResource.countPM = value;
    }

    /**
     * Setter $countLeader
     * @param {string} value
     */
    public set $countLeader(value: string) {
        this.projectResource.countLeader = value;
    }

    /**
     * Setter $countTester
     * @param {string} value
     */
    public set $countTester(value: string) {
        this.projectResource.countTester = value;
    }

    /**
     * Setter $countDesigner
     * @param {string} value
     */
    public set $countDesigner(value: string) {
        this.projectResource.countDesigner = value;
    }

    /**
     * Setter $countExpert
     * @param {string} value
     */
    public set $countExpert(value: string) {
        this.projectResource.countExpert = value;
    }

    /**
     * Setter $countReserve1
     * @param {string} value
     */
    public set $countReserve1(value: string) {
        this.projectResource.countReserve1 = value;
    }

    /**
     * Setter $countReserve2
     * @param {string} value
     */
    public set $countReserve2(value: string) {
        this.projectResource.countReserve2 = value;
    }

    /**
     * Setter $countReserve3
     * @param {string} value
     */
    public set $countReserve3(value: string) {
        this.projectResource.countReserve3 = value;
    }

    /**
     * Setter $countReserve4
     * @param {string} value
     */
    public set $countReserve4(value: string) {
        this.projectResource.countReserve4 = value;
    }

    /**
     * Setter $countReserve5
     * @param {string} value
     */
    public set $countReserve5(value: string) {
        this.projectResource.countReserve5 = value;
    }
}
