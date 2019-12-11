export class RecordTable {
    static readonly CUSTOMER_MAGNIFICATIONS = new RecordTable('customer_magnifications', 'customer_magnifications');
    static readonly CUSTOMER_UNIT_PRICES = new RecordTable('customer_unit_prices', 'customer_unit_prices');

    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly nameAttr: string) {}

    toString(): string {
        return this.name;
    }
}
