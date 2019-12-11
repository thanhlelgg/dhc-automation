export class ResultsBaseField {
    static readonly ITEM_NAME = new ResultsBaseField('ITEM_NAME', '[item][name]');
    static readonly ITEM_ID = new ResultsBaseField('ITEM_NAME', '[item_id');
    static readonly PLAN_PEOPLE = new ResultsBaseField('PLAN_PEOPLE', '[plan_people]');
    static readonly PLAN_TIME = new ResultsBaseField('PLAN_TIME', '[plan_time]');
    static readonly TOTAL_TIME = new ResultsBaseField('TOTAL_TIME', '[plan_totalt_ime]');
    static readonly UNIT_PRICE_WEEKDAY = new ResultsBaseField('UNIT_PRICE_WEEKDAY', '[unit_price_weekday]');
    static readonly UNIT_PRICE_WEEKDAY_OVERTIME = new ResultsBaseField(
        'UNIT_PRICE_WEEKDAY_OVERTIME',
        '[unit_price_weekday_overtime]',
    );
    static readonly UNIT_PRICE_HOLIDAY = new ResultsBaseField('UNIT_PRICE_HOLIDAY', '[unit_price_holiday]');
    static readonly UNIT_PRICE_WEEKDAY_LATE = new ResultsBaseField(
        'UNIT_PRICE_WEEKDAY_LATE',
        '[unit_price_weekday_late]',
    );
    static readonly UNIT_PRICE_WEEKDAY_LATE_OVERTIME = new ResultsBaseField(
        'UNIT_PRICE_WEEKDAY_LATE_OVERTIME',
        '[unit_price_weekday_late_overtime]',
    );
    static readonly UNIT_PRICE_HOLIDAY_LATE = new ResultsBaseField(
        'UNIT_PRICE_HOLIDAY_LATE',
        '[unit_price_holiday_late]',
    );
    static readonly TAX_ID = new ResultsBaseField('TAX_ID', '[tax_id]');
    static readonly NOTE = new ResultsBaseField('NOTE', '[note]');
    static readonly OUTPUT_ORDER = new ResultsBaseField('OUTPUT_ORDER', '[output_order]');
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly nameAttribute: string) {}

    toString(): string {
        return this.name;
    }
}
