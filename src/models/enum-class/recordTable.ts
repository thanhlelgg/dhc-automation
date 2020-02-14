export class RecordTable {
    static readonly CUSTOMER_MAGNIFICATIONS = new RecordTable('customer_magnifications', 'customer_magnifications');
    static readonly CUSTOMER_UNIT_PRICES = new RecordTable('customer_unit_prices', 'customer_unit_prices');

    // for add user
    static readonly USER_POSITION_HISTORY = new RecordTable('user_position_history', 'user_position_history');
    static readonly USER_LABOR_FORM_HISTORY = new RecordTable('user_labor_form_history', 'user_labor_form_history');
    static readonly USER_JOIN_COMPANY_HISTORY = new RecordTable(
        'user_join_company_history',
        'user_join_company_history',
    );
    static readonly USER_HEALTH_INSURANCE_HISTORY = new RecordTable(
        'user_health_insurance_history',
        'user_health_insurance_history',
    );
    static readonly USER_PENSION_FUND_HISTORY = new RecordTable(
        'user_pension_fund_history',
        'user_pension_fund_history',
    );
    static readonly USER_CARE_INSURANCE_HISTORY = new RecordTable(
        'user_care_insurance_history',
        'user_care_insurance_history',
    );
    static readonly USER_UNEMPLOYMENT_INSURANCE_HISTORY = new RecordTable(
        'user_unemployment_insurance_history',
        'user_unemployment_insurance_history',
    );
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly nameAttr: string) {}

    toString(): string {
        return this.name;
    }
}
