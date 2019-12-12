import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { CustomerInfo, Overview, UnitPrices, CustomerMagnifications } from '../models/customer-info';
import { RecordTable } from '../models/enum-class/recordTable';
import { RecordFieldName } from '../models/enum-class/recordFieldName';
import '@src/string.extensions';

@page
export class AddCustomerPage extends GeneralPage {
    @locator
    protected addUnitPricesRecordButton = { id: 'addRow' };
    @locator
    protected addCustomerMagnificationRecordButton = { id: 'magnifyAddRow' };

    fieldName = this.translator.fieldName.addCustomer;

    @action('save customer')
    public async saveCustomer(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('input customer info')
    public async inputCustomerInfo(customerInfo: CustomerInfo): Promise<void> {
        await this.inputCustomerOverview(customerInfo.overview);
        await this.inputUnitPrices(customerInfo.unitPricesRecords);
        await this.inputCustomerMagnifications(customerInfo.customerMagnificationsRecords);
    }

    @action('input customer overview')
    public async inputCustomerOverview(overviewInfo: Overview): Promise<void> {
        await this.selectSelectorByLabel(this.fieldName.classify, overviewInfo.classify);
        await this.enterTextFieldByLabel(this.fieldName.code, overviewInfo.code);
        await this.enterTextFieldByLabel(this.fieldName.name, overviewInfo.name);
        await this.enterTextFieldByLabel(
            this.fieldName.billingBankAccountNumber,
            overviewInfo.billingBankAccountNumber,
        );
    }

    @action('input unit prices')
    public async inputUnitPrices(unitPricesRecords: UnitPrices[]): Promise<void> {
        for (let i = 0; i < unitPricesRecords.length; i++) {
            const unitPrices = unitPricesRecords[i];
            if (!(await this.doesRecordFieldExist(RecordTable.CUSTOMER_UNIT_PRICES, i, RecordFieldName.START_DATE))) {
                await gondola.click(this.addUnitPricesRecordButton);
            }
            await this.enterRecordField(
                RecordTable.CUSTOMER_UNIT_PRICES,
                i,
                RecordFieldName.START_DATE,
                unitPrices.startDate,
            );
            if (unitPrices.endDate) {
                await this.enterRecordField(
                    RecordTable.CUSTOMER_UNIT_PRICES,
                    i,
                    RecordFieldName.END_DATE,
                    unitPrices.endDate,
                );
            }
            await this.enterRecordField(
                RecordTable.CUSTOMER_UNIT_PRICES,
                i,
                RecordFieldName.LEADER,
                unitPrices.leader.toString(),
            );
            await this.enterRecordField(
                RecordTable.CUSTOMER_UNIT_PRICES,
                i,
                RecordFieldName.TESTER,
                unitPrices.tester.toString(),
            );
            await this.enterRecordField(
                RecordTable.CUSTOMER_UNIT_PRICES,
                i,
                RecordFieldName.DISPATCH,
                unitPrices.dispatch.toString(),
            );
        }
    }

    @action('input customer magnifications')
    public async inputCustomerMagnifications(customerMagnificationsRecords: CustomerMagnifications[]): Promise<void> {
        for (let i = 0; i < customerMagnificationsRecords.length; i++) {
            const customerMagnifications = customerMagnificationsRecords[i];
            if (
                !(await this.doesRecordFieldExist(RecordTable.CUSTOMER_MAGNIFICATIONS, i, RecordFieldName.START_DATE))
            ) {
                await gondola.click(this.addUnitPricesRecordButton);
            }
            await this.enterRecordField(
                RecordTable.CUSTOMER_MAGNIFICATIONS,
                i,
                RecordFieldName.START_DATE,
                customerMagnifications.startDate,
            );
            if (customerMagnifications.endDate) {
                await this.enterRecordField(
                    RecordTable.CUSTOMER_MAGNIFICATIONS,
                    i,
                    RecordFieldName.END_DATE,
                    customerMagnifications.endDate,
                );
            }
            await this.enterRecordField(
                RecordTable.CUSTOMER_MAGNIFICATIONS,
                i,
                RecordFieldName.OVERTIME,
                customerMagnifications.overtime.toString(),
            );
            await this.enterRecordField(
                RecordTable.CUSTOMER_MAGNIFICATIONS,
                i,
                RecordFieldName.LATE_NIGHT,
                customerMagnifications.lateNight.toString(),
            );
            await this.enterRecordField(
                RecordTable.CUSTOMER_MAGNIFICATIONS,
                i,
                RecordFieldName.LATE_NIGHT_OVERTIME,
                customerMagnifications.lateNightOvertime.toString(),
            );
            await this.enterRecordField(
                RecordTable.CUSTOMER_MAGNIFICATIONS,
                i,
                RecordFieldName.HOLIDAY,
                customerMagnifications.holiday.toString(),
            );
            await this.enterRecordField(
                RecordTable.CUSTOMER_MAGNIFICATIONS,
                i,
                RecordFieldName.HOLIDAY_LATE_NIGHT,
                customerMagnifications.holiday_late_night.toString(),
            );
        }
    }
}
export default new AddCustomerPage();
