import customerInfo from '../data/customer-info.json';

export interface CustomerInfo {
    overview: Overview;
    unitPricesRecords?: UnitPrices[];
    customerMagnificationsRecords?: CustomerMagnifications[];
}

export interface Overview {
    code: string;
    name: string;
    repDepartment?: string;
    repName?: string;
    lastBusinessDate?: string;
    isDisable?: boolean;
    zipcode?: string;
    address1?: string;
    address2?: string;
    tel?: string;
    fax?: string;
    mail?: string;
    fee_payer: string;
    roundCode: string;
    currency: string;
    closingDateGroup: string;
    taxCalculationMethod?: string;
    advanceReceivedAuxCode?: string;
    accountReceivableAuxCode?: string;
    salesAuxCd?: string;
    collectCycle?: string;
    paymentCycle?: string;
    billingBankAccountNumber?: string;
    note?: string;
    deliveryPlace?: string;
}

export interface UnitPrices {
    startDate: string;
    endDate?: string;
    leader: number;
    tester: number;
    dispatch: number;
}

export interface CustomerMagnifications {
    startDate: string;
    endDate?: string;
    overtime: number;
    lateNight: number;
    lateNightOvertime: number;
    holiday: number;
    holiday_late_night: number;
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
}
