export class SearchResultColumn {
    static readonly CODE = new SearchResultColumn('CODE', 'cd');
    static readonly NAME = new SearchResultColumn('NAME', 'name');
    static readonly REP_NAME = new SearchResultColumn('REP_NAME', 'rep_name');
    static readonly FULL_CODE = new SearchResultColumn('FULL_CODE', 'code');
    static readonly BREADCRUMBS_TEXT = new SearchResultColumn('BREADCRUMBS_TEXT', 'breadcrumbs_text');
    static readonly UNIT_PRICE = new SearchResultColumn('UNIT_PRICE', 'unit_price');
    static readonly IS_TAXABLE = new SearchResultColumn('IS_TAXABLE', 'is_taxable');

    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly tabulatorField: string) {}

    toString(): string {
        return this.name;
    }
}
