import customerInfo from '../data/customer-info.json';
import customerInitialData from '../data/initial-data/customer-info.json';

export class Overview {
    code!: string;
    name!: string;
    repDepartment?: string = undefined;
    repName?: string = undefined;
    lastBusinessDate?: string = undefined;
    isDisable?: boolean;
    zipcode?: string = undefined;
    address1?: string = undefined;
    address2?: string = undefined;
    tel?: string = undefined;
    fax?: string = undefined;
    mail?: string = undefined;
    fee_payer?: string = undefined;
    roundCode?: string = undefined;
    currency?: string = undefined;
    closingDateGroup?: string = undefined;
    taxCalculationMethod?: string = undefined;
    advanceReceivedAuxCode?: string = undefined;
    accountReceivableAuxCode?: string = undefined;
    salesAuxCd?: string = undefined;
    collectCycle?: string = undefined;
    collectCycleMonth?: string = undefined;
    collectCycleDay?: string = undefined;
    paymentCycle?: string = undefined;
    billingBankAccountNumber?: string = undefined;
    note?: string = undefined;
    deliveryPlace?: string = undefined;
}

export class UnitPrices {
    startDate!: string;
    endDate?: string = undefined;
    leader!: number;
    tester!: number;
    dispatch!: number;
}

export class CustomerMagnifications {
    startDate!: string;
    endDate?: string = undefined;
    overtime!: number;
    lateNight!: number;
    lateNightOvertime!: number;
    holiday!: number;
    holiday_late_night!: number;
}

export class CustomerInfo {
    overview!: Overview;
    unitPricesRecords?: UnitPrices[];
    customerMagnificationsRecords?: CustomerMagnifications[];
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

    public static CUSTOMER_INITIAL_DATA: CustomerInfo[] = customerInitialData.map(item => {
        const customerData: CustomerInfo = {
            overview: item.overview,
            unitPricesRecords: item.unitPricesRecords,
            customerMagnificationsRecords: item.customerMagnificationsRecords,
        };
        return customerData;
    });
}
