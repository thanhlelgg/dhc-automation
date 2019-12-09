export class ResultsBaseTextfield {
    static readonly ITEM_NAME = new ResultsBaseTextfield('ITEM_NAME', '[item][name]');
    static readonly ITEM_ID = new ResultsBaseTextfield('ITEM_NAME', '[item_id');
    static readonly PLAN_PEOPLE = new ResultsBaseTextfield('PLAN_PEOPLE', '[plan_people]');
    static readonly PLAN_TIME = new ResultsBaseTextfield('PLAN_TIME', '[plan_time]');
    static readonly TOTAL_TIME = new ResultsBaseTextfield('TOTAL_TIME', '[plan_totalt_ime]');
    static readonly UNIT_PRICE_WEEKDAY = new ResultsBaseTextfield('UNIT_PRICE_WEEKDAY', '[unit_price_weekday]');
    static readonly UNIT_PRICE_WEEKDAY_OVERTIME = new ResultsBaseTextfield(
        'UNIT_PRICE_WEEKDAY_OVERTIME',
        '[unit_price_weekday_overtime]',
    );
    static readonly UNIT_PRICE_HOLIDAY = new ResultsBaseTextfield('UNIT_PRICE_HOLIDAY', '[unit_price_holiday]');
    static readonly UNIT_PRICE_WEEKDAY_LATE = new ResultsBaseTextfield(
        'UNIT_PRICE_WEEKDAY_LATE',
        '[unit_price_weekday_late]',
    );
    static readonly UNIT_PRICE_WEEKDAY_LATE_OVERTIME = new ResultsBaseTextfield(
        'UNIT_PRICE_WEEKDAY_LATE_OVERTIME',
        '[unit_price_weekday_late_overtime]',
    );
    static readonly UNIT_PRICE_HOLIDAY_LATE = new ResultsBaseTextfield(
        'UNIT_PRICE_HOLIDAY_LATE',
        '[unit_price_holiday_late]',
    );
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly nameAttribute: string) {}

    toString(): string {
        return this.name;
    }
}
