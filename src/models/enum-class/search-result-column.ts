export class SearchResultColumn {
    static readonly CODE = new SearchResultColumn('CODE', 'cd');
    static readonly NAME = new SearchResultColumn('NAME', 'name');
    static readonly SUPPLIERS = new SearchResultColumn('SUPPLIERS', 'suppliers');
    static readonly STATUS = new SearchResultColumn('STATUS', 'status');
    static readonly ACCURACY = new SearchResultColumn('ACCURACY', 'accuracy');
    static readonly REP_NAME = new SearchResultColumn('REP_NAME', 'rep_name');
    static readonly FULL_CODE = new SearchResultColumn('FULL_CODE', 'code');
    static readonly BREADCRUMBS_TEXT = new SearchResultColumn('BREADCRUMBS_TEXT', 'breadcrumbs_text');
    static readonly UNIT_PRICE = new SearchResultColumn('UNIT_PRICE', 'unit_price');
    static readonly IS_TAXABLE = new SearchResultColumn('IS_TAXABLE', 'is_taxable');
    static readonly SUBCODE = new SearchResultColumn('SUBCODE', 'subcode');
    static readonly AID_CODE = new SearchResultColumn('AID_CODE', 'aid_code');
    static readonly IS_DISABLE = new SearchResultColumn('IS_DISABLE', 'is_disable');
    static readonly CLOSING_DATE = new SearchResultColumn('CLOSING_DATE', 'closing_date');

    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly tabulatorField: string) {}

    toString(): string {
        return this.name;
    }
}
