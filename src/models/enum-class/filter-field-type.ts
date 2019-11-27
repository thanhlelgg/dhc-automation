export class FilterType {
    static readonly CUSTOMER_CODE = new FilterType('CUSTOMER_CODE', 'modal-business-customers-filter-code');
    static readonly CUSTOMER_NAME = new FilterType('CUSTOMER_NAME', 'modal-business-customers-filter-name');
    static readonly CUSTOMER_REP_NAME = new FilterType('CUSTOMER_REP_NAME', 'modal-business-customers-filter-rep-name');
    static readonly DEPARTMENT = new FilterType('DEPARTMENT', 'modal-departments-filter');
    static readonly WORKER = new FilterType('WORKER', 'modal-workers-filter');
    static readonly SEGMENTS = new FilterType('SEGMENTS', 'modal-segments-filter');
    static readonly LAB = new FilterType('LAB', 'modal-labs-filter');
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly searchFieldId: string) {}

    toString(): string {
        return this.name;
    }
}
