import { Constants } from '../../common/constants';

export class CustomerSearchResultColumn {
    static readonly CUSTOMER_CODE = new CustomerSearchResultColumn(
        Constants.translator.fieldName.listCustomer.searchField.customerCode,
        'customer_code',
    );
    static readonly CUSTOMER_NAME = new CustomerSearchResultColumn(
        Constants.translator.fieldName.listCustomer.searchField.customerName,
        'customer_name',
    );
    static readonly CUSTOMER_CLOSING_DATE = new CustomerSearchResultColumn(
        Constants.translator.fieldName.listCustomer.searchField.closingDate,
        'customer_closing_date',
    );
    static readonly CUSTOMER_IS_DISBALE = new CustomerSearchResultColumn(
        Constants.translator.fieldName.listCustomer.searchField.displayTarget,
        'customer_is_disable',
    );
    static readonly CUSTOMER_AID_CODE = new CustomerSearchResultColumn(
        Constants.translator.fieldName.listCustomer.searchField.aidCode,
        'customer_aid_code',
    );
    static readonly CUSTOMER_SUBCODE = new CustomerSearchResultColumn(
        Constants.translator.fieldName.listCustomer.searchField.subCode,
        'customer_subcode',
    );
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly tabulatorField: string) {}

    toString(): string {
        return this.name;
    }
}
