import customerInfo from '../data/customer-info.json';

export interface CustomerInfo {
    overview: Overview;
    unitPricesRecords: UnitPrices[];
    customerMagnificationsRecords: CustomerMagnifications[];
}

export interface Overview {
    classify: string;
    code: string;
    name: string;
    billingBankAccountNumber: string;
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

export class CustomerInfoDate {
    public static CUSTOMER_REQUIRED_DATA: CustomerInfo = {
        overview: customerInfo.overview.requiredOnly,
        unitPricesRecords: [customerInfo.unitPrices.record1],
        customerMagnificationsRecords: [customerInfo.customerMagnifications.record1],
    };
}
