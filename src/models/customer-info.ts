import customerInfo from '../data/customer-info.json';
import customerInitialData from '../data/initial-data/customer-info.json';
import { JsonUtility } from '../common/utilities.js';
import { JsonProperty, JsonObject } from 'json2typescript';

@JsonObject('Overview')
export class Overview {
    @JsonProperty('code', String)
    code!: string;
    @JsonProperty('name', String)
    name!: string;
    @JsonProperty('repDepartment', String)
    repDepartment?: string = undefined;
    @JsonProperty('repName', String)
    repName?: string = undefined;
    @JsonProperty('lastBusinessDate', String)
    lastBusinessDate?: string = undefined;
    @JsonProperty('isDisable', Boolean)
    isDisable?: boolean;
    @JsonProperty('zipcode', String)
    zipcode?: string = undefined;
    @JsonProperty('address1', String)
    address1?: string = undefined;
    @JsonProperty('address2', String)
    address2?: string = undefined;
    @JsonProperty('tel', String)
    tel?: string = undefined;
    @JsonProperty('fax', String)
    fax?: string = undefined;
    @JsonProperty('mail', String)
    mail?: string = undefined;
    @JsonProperty('fee_payer', String)
    fee_payer?: string = undefined;
    @JsonProperty('roundCode', String)
    roundCode?: string = undefined;
    @JsonProperty('currency', String)
    currency?: string = undefined;
    @JsonProperty('closingDateGroup', String)
    closingDateGroup?: string = undefined;
    @JsonProperty('taxCalculationMethod', String)
    taxCalculationMethod?: string = undefined;
    @JsonProperty('advanceReceivedAuxCode', String)
    advanceReceivedAuxCode?: string = undefined;
    @JsonProperty('accountReceivableAuxCode', String)
    accountReceivableAuxCode?: string = undefined;
    @JsonProperty('salesAuxCd', String)
    salesAuxCd?: string = undefined;
    @JsonProperty('collectCycle', String)
    collectCycle?: string = undefined;
    @JsonProperty('collectCycleMonth', String)
    collectCycleMonth?: string = undefined;
    @JsonProperty('collectCycleDay', String)
    collectCycleDay?: string = undefined;
    @JsonProperty('paymentCycle', String)
    paymentCycle?: string = undefined;
    @JsonProperty('billingBankAccountNumber', String)
    billingBankAccountNumber?: string = undefined;
    @JsonProperty('note', String)
    note?: string = undefined;
    @JsonProperty('deliveryPlace', String)
    deliveryPlace?: string = undefined;
}

@JsonObject('UnitPrices')
export class UnitPrices {
    @JsonProperty('startDate', String)
    startDate!: string;
    @JsonProperty('endDate', String)
    endDate?: string = undefined;
    @JsonProperty('leader', Number)
    leader!: number;
    @JsonProperty('tester', Number)
    tester!: number;
    @JsonProperty('dispatch', Number)
    dispatch!: number;
}

@JsonObject('CustomerMagnifications')
export class CustomerMagnifications {
    @JsonProperty('startDate', String)
    startDate!: string;
    @JsonProperty('endDate', String)
    endDate?: string = undefined;
    @JsonProperty('overtime', Number)
    overtime!: number;
    @JsonProperty('lateNight', Number)
    lateNight!: number;
    @JsonProperty('lateNightOvertime', Number)
    lateNightOvertime!: number;
    @JsonProperty('holiday', Number)
    holiday!: number;
    @JsonProperty('holiday_late_night', Number)
    holiday_late_night!: number;
}

export class CustomerInfo {
    @JsonProperty('overview', Overview)
    overview!: Overview;
    @JsonProperty('unitPricesRecords')
    unitPricesRecords?: UnitPrices[] = undefined;
    @JsonProperty('customerMagnificationsRecords')
    customerMagnificationsRecords?: CustomerMagnifications[] = undefined;
}

export class CustomerInfoData {
    public static CUSTOMER_REQUIRED_DATA: CustomerInfo = {
        overview: customerInfo.overview.customer.requiredOnly,
        unitPricesRecords: [customerInfo.unitPrices.record1, customerInfo.unitPrices.record2],
        customerMagnificationsRecords: [
            customerInfo.customerMagnifications.record1,
            customerInfo.customerMagnifications.record2,
        ],
    };
    public static CUSTOMER_ALL_DATA: CustomerInfo = {
        overview: customerInfo.overview.customer.allFields,
        unitPricesRecords: [customerInfo.unitPrices.record1, customerInfo.unitPrices.record2],
        customerMagnificationsRecords: [
            customerInfo.customerMagnifications.record1,
            customerInfo.customerMagnifications.record2,
        ],
    };
    public static SUPPLIER_REQUIRED_DATA: CustomerInfo = {
        overview: customerInfo.overview.supplier.requiredOnly,
    };
    public static SUPPLIER_ALL_DATA: CustomerInfo = {
        overview: customerInfo.overview.supplier.allFields,
    };

    public static CUSTOMER_INITIAL_DATA: CustomerInfo[] = JsonUtility.deserializeArray(
        customerInitialData,
        CustomerInfo,
    );
}
