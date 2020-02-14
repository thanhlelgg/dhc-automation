export class RecordFieldName {
    // for add customer
    static readonly START_DATE = new RecordFieldName('START_DATE', 'start_date');
    static readonly END_DATE = new RecordFieldName('END_DATE', 'end_date');
    static readonly LEADER = new RecordFieldName('LEADER', 'leader');
    static readonly TESTER = new RecordFieldName('TESTER', 'tester');
    static readonly DISPATCH = new RecordFieldName('DISPATCH', 'dispatch');
    static readonly OVERTIME = new RecordFieldName('OVERTIME', 'overtime');
    static readonly LATE_NIGHT = new RecordFieldName('LATE_NIGHT', 'late_night');
    static readonly LATE_NIGHT_OVERTIME = new RecordFieldName('LATE_NIGHT_OVERTIME', 'late_night_overtime');
    static readonly HOLIDAY = new RecordFieldName('HOLIDAY', 'holiday');
    static readonly HOLIDAY_LATE_NIGHT = new RecordFieldName('HOLIDAY_LATE_NIGHT', 'holiday_late_night');

    // for add user
    static readonly APPLY_DATE_OF_POSITION_HISTORY = new RecordFieldName(
        'APPLY_DATE_OF_POSITION_HISTORY',
        'apply_date',
    );
    static readonly POSITION_OF_POSITION_HISTORY = new RecordFieldName('POSITION_OF_POSITION_HISTORY', 'position');
    static readonly PAYMENT_UNIT_PRICE = new RecordFieldName('PAYMENT_UNIT_PRICE', 'payment_unit_price');
    static readonly PAYMENT_LEADER_ALLOWANCE = new RecordFieldName(
        'PAYMENT_LEADER_ALLOWANCE',
        'payment_leader_allowance',
    );
    static readonly DATE_USER_LABOR_FORM_HISTORY = new RecordFieldName('DATE_USER_LABOR_FORM_HISTORY', 'date');
    static readonly TYPE_USER_LABOR_FORM_HISTORY = new RecordFieldName('TYPE_USER_LABOR_FORM_HISTORY', 'type');
    static readonly DATE_USER_JOIN_COMPANY_HISTORY = new RecordFieldName('DATE_USER_JOIN_COMPANY_HISTORY', 'date');
    static readonly STATUS_USER_JOIN_COMPANY_HISTORY = new RecordFieldName(
        'STATUS_USER_JOIN_COMPANY_HISTORY',
        'status',
    );
    static readonly JOIN_DATE_USER_INSURANCE_HISTORY = new RecordFieldName(
        'JOIN_DATE_USER_HEALTH_INSURANCE_HISTORY',
        'join_date',
    );
    static readonly STOP_DATE_USER_INSURANCE_HISTORY = new RecordFieldName(
        'STOP_DATE_USER_HEALTH_INSURANCE_HISTORY',
        'stop_date',
    );
    static readonly STATUS_USER_UNEMPLOYMENT_INSURANCE_HISTORY = new RecordFieldName(
        'STATUS_USER_UNEMPLOYMENT_INSURANCE_HISTORY',
        'status',
    );
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly nameAttr: string) {}

    toString(): string {
        return this.name;
    }
}
