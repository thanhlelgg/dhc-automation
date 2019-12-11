export class RecordFieldName {
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
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly nameAttr: string) {}

    toString(): string {
        return this.name;
    }
}
