import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { CustomerInfo, Overview, UnitPrices, CustomerMagnifications } from '../models/customer-info';
import { RecordTable } from '../models/enum-class/recordTable';
import { RecordFieldName } from '../models/enum-class/recordFieldName';
import '@src/string.extensions';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import { Constants } from '../common/constants';

@page
export class AddCustomerPage extends GeneralPage {
    @locator
    protected addUnitPricesRecordButton = { id: 'addRow' };
    @locator
    protected addCustomerMagnificationRecordButton = { id: 'magnifyAddRow' };
    @locator
    protected paymentCycleDaily = "//input[@id='collect_cycle_daily_day']";
    @locator
    protected paymentCycleMonth = "//input[@id='collect_cycle_month']";
    @locator
    protected paymentCycleMonthlyDay = "//input[@id='collect_cycle_monthly_day']";

    fieldName = this.translator.fieldName.addCustomer;
    placeHolder = this.translator.fieldPlaceHolder.addCustomer;

    @action('save customer')
    public async saveCustomer(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('input customer info')
    public async inputCustomerInfo(customerInfo: CustomerInfo): Promise<void> {
        await this.inputCustomerOverview(customerInfo.overview);
        if (customerInfo.unitPricesRecords) {
            await this.inputUnitPrices(customerInfo.unitPricesRecords);
        }
        if (customerInfo.customerMagnificationsRecords) {
            await this.inputCustomerMagnifications(customerInfo.customerMagnificationsRecords);
        }
    }

    @action('input customer overview')
    public async inputCustomerOverview(overviewInfo: Overview): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.code, overviewInfo.code);
        await this.enterTextFieldByLabel(this.fieldName.name, overviewInfo.name);
        await this.enterTextfieldByPlaceholder(this.placeHolder.repDepartment, overviewInfo.repDepartment);
        await this.enterTextfieldByPlaceholder(this.placeHolder.repName, overviewInfo.repName);
        await this.enterTextFieldByLabel(this.fieldName.lastBusinessDate, overviewInfo.lastBusinessDate);
        await this.setStateCheckboxByLabel(this.fieldName.isDisabled, overviewInfo.isDisable);
        await this.enterTextfieldByPlaceholder(this.placeHolder.zipcode, overviewInfo.zipcode);
        await this.enterTextfieldByPlaceholder(this.placeHolder.address1, overviewInfo.address1);
        await this.enterTextfieldByPlaceholder(this.placeHolder.address2, overviewInfo.address2);
        await this.enterTextFieldByLabel(this.fieldName.tel, overviewInfo.tel);
        await this.enterTextFieldByLabel(this.fieldName.fax, overviewInfo.fax);
        await this.enterTextFieldByLabel(this.fieldName.mail, overviewInfo.mail);
        await this.selectSelectorByLabel(this.fieldName.fee_payer, overviewInfo.fee_payer);
        await this.selectSelectorByLabel(this.fieldName.roundCode, overviewInfo.roundCode);
        await this.selectSelectorByLabel(this.fieldName.currency, overviewInfo.currency);
        await this.selectSelectorByLabel(this.fieldName.closingDateGroup, overviewInfo.closingDateGroup);
        await this.selectSelectorByLabel(this.fieldName.taxCalcMethod, overviewInfo.taxCalculationMethod);
        await this.enterTextFieldByLabel(this.fieldName.advanceReceivedAuxCode, overviewInfo.advanceReceivedAuxCode);
        await this.enterTextFieldByLabel(
            this.fieldName.accountReceivableAuxCode,
            overviewInfo.accountReceivableAuxCode,
        );
        await this.enterTextFieldByLabel(this.fieldName.salesAuxCode, overviewInfo.salesAuxCd);
        await this.enterTextFieldByLabel(this.fieldName.deliveryPlace, overviewInfo.deliveryPlace);
        await this.selectRadioButtonByLabel(this.fieldName.collectCycle, overviewInfo.collectCycle);
        if (overviewInfo.collectCycle === this.translator.radioButtonOptions.addCustomer.collectCycle.daily) {
            await gondola.waitUntilElementVisible(this.paymentCycleDaily, Constants.MEDIUM_TIMEOUT);
            await gondola.enter(this.paymentCycleDaily, overviewInfo.collectCycleDay);
        }
        if (overviewInfo.collectCycle === this.translator.radioButtonOptions.addCustomer.collectCycle.monthly) {
            await gondola.waitUntilElementVisible(this.paymentCycleMonthlyDay, Constants.MEDIUM_TIMEOUT);
            await gondola.enter(this.paymentCycleMonthlyDay, overviewInfo.collectCycleDay);
            await gondola.waitUntilElementVisible(this.paymentCycleMonth, Constants.MEDIUM_TIMEOUT);
            await gondola.enter(this.paymentCycleMonth, overviewInfo.collectCycleMonth);
        }
        await this.selectRadioButtonByLabel(this.fieldName.paymentCycle, overviewInfo.paymentCycle);
        await this.enterTextFieldByLabel(
            this.fieldName.billingBankAccountNumber,
            overviewInfo.billingBankAccountNumber,
        );
        await this.enterTextAreaByLabel(this.fieldName.note, overviewInfo.note);
    }

    @action('verify customer overview')
    public async doesCustomerOverviewDisplayCorrectly(overviewInfo: Overview): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Code should be displayed correctly',
            overviewInfo.code,
            await this.getTextFieldValueByLabel(this.fieldName.code),
        );
        FlagsCollector.collectEqual(
            'Name should be displayed correctly',
            overviewInfo.name,
            await this.getTextFieldValueByLabel(this.fieldName.name),
        );
        FlagsCollector.collectEqual(
            'Representative department should be displayed correctly',
            overviewInfo.repDepartment,
            await this.getTextfieldValueByPlaceholder(this.placeHolder.repDepartment),
        );
        FlagsCollector.collectEqual(
            'Representative name should be displayed correctly',
            overviewInfo.repName,
            await this.getTextfieldValueByPlaceholder(this.placeHolder.repName),
        );
        FlagsCollector.collectEqual(
            'Last business date should be displayed correctly',
            overviewInfo.lastBusinessDate,
            await this.getTextFieldValueByLabel(this.fieldName.lastBusinessDate),
        );
        FlagsCollector.collectEqual(
            'Is disabled checkbox should be displayed correctly',
            overviewInfo.isDisable,
            await this.getCheckboxStateByLabel(this.fieldName.isDisabled),
        );
        FlagsCollector.collectEqual(
            'Zipcode should be displayed correctly',
            overviewInfo.zipcode,
            await this.getTextfieldValueByPlaceholder(this.placeHolder.zipcode),
        );
        FlagsCollector.collectEqual(
            'Address 1 should be displayed correctly',
            overviewInfo.address1,
            await this.getTextfieldValueByPlaceholder(this.placeHolder.address1),
        );
        FlagsCollector.collectEqual(
            'Address 2 should be displayed correctly',
            overviewInfo.address2,
            await this.getTextfieldValueByPlaceholder(this.placeHolder.address2),
        );
        FlagsCollector.collectEqual(
            'TEL should be displayed correctly',
            overviewInfo.tel,
            await this.getTextFieldValueByLabel(this.fieldName.tel),
        );
        FlagsCollector.collectEqual(
            'FAX should be displayed correctly',
            overviewInfo.fax,
            await this.getTextFieldValueByLabel(this.fieldName.fax),
        );
        FlagsCollector.collectEqual(
            'Mail should be displayed correctly',
            overviewInfo.mail,
            await this.getTextFieldValueByLabel(this.fieldName.mail),
        );
        FlagsCollector.collectEqual(
            'Fee payer should be displayed correctly',
            overviewInfo.fee_payer,
            await this.getSelectedOptionByLabel(this.fieldName.fee_payer),
        );
        FlagsCollector.collectEqual(
            'Round code should be displayed correctly',
            overviewInfo.roundCode,
            await this.getSelectedOptionByLabel(this.fieldName.roundCode),
        );
        FlagsCollector.collectEqual(
            'Currency should be displayed correctly',
            overviewInfo.currency,
            await this.getSelectedOptionByLabel(this.fieldName.currency),
        );
        FlagsCollector.collectEqual(
            'Closing date group should be displayed correctly',
            overviewInfo.closingDateGroup,
            await this.getSelectedOptionByLabel(this.fieldName.closingDateGroup),
        );
        FlagsCollector.collectEqualLazy(
            'Tax calculation method should be displayed correctly',
            overviewInfo.taxCalculationMethod,
            this.getSelectedOptionByLabel.bind(this),
            this.fieldName.taxCalcMethod,
        );
        FlagsCollector.collectEqualLazy(
            'Advance received Aux code should be displayed correctly',
            overviewInfo.advanceReceivedAuxCode,
            this.getTextFieldValueByLabel.bind(this),
            this.fieldName.advanceReceivedAuxCode,
        );
        FlagsCollector.collectEqualLazy(
            'Account receivable aux code should be displayed correctly',
            overviewInfo.accountReceivableAuxCode,
            this.getTextFieldValueByLabel.bind(this),
            this.fieldName.accountReceivableAuxCode,
        );
        FlagsCollector.collectEqualLazy(
            'Sales Aux code should be displayed correctly',
            overviewInfo.salesAuxCd,
            this.getTextFieldValueByLabel.bind(this),
            this.fieldName.salesAuxCode,
        );
        if (overviewInfo.deliveryPlace) {
            FlagsCollector.collectEqualLazy(
                'Delivery place should be displayed correctly',
                overviewInfo.deliveryPlace,
                this.getTextFieldValueByLabel.bind(this),
                this.fieldName.deliveryPlace,
            );
        }

        FlagsCollector.collectEqualLazy(
            `Radio button ${overviewInfo.collectCycle} should be selected`,
            overviewInfo.collectCycle ? true : undefined,
            this.isRadioButtonByLabelSelected.bind(this),
            this.fieldName.collectCycle,
            overviewInfo.collectCycle,
        );
        if (overviewInfo.collectCycle === this.translator.radioButtonOptions.addCustomer.collectCycle.daily) {
            FlagsCollector.collectEqual(
                `Payment cycle day ${overviewInfo.collectCycleDay} should be displayed correctly`,
                overviewInfo.collectCycleDay,
                await this.getTextBoxValue(this.paymentCycleDaily),
            );
        }
        if (overviewInfo.collectCycle === this.translator.radioButtonOptions.addCustomer.collectCycle.monthly) {
            FlagsCollector.collectEqual(
                `Payment cycle month ${overviewInfo.collectCycleDay} should be displayed correctly`,
                overviewInfo.collectCycleMonth,
                await this.getTextBoxValue(this.paymentCycleMonth),
            );
            FlagsCollector.collectEqual(
                `Payment cycle day ${overviewInfo.collectCycleDay} should be displayed correctly`,
                overviewInfo.collectCycleDay,
                await this.getTextBoxValue(this.paymentCycleMonthlyDay),
            );
        }

        if (overviewInfo.paymentCycle) {
            FlagsCollector.collectEqualLazy(
                `Radio button ${overviewInfo.paymentCycle} should be selected`,
                overviewInfo.paymentCycle ? true : undefined,
                this.isRadioButtonByLabelSelected.bind(this),
                this.fieldName.paymentCycle,
                overviewInfo.paymentCycle,
            );
        }

        FlagsCollector.collectEqualLazy(
            'Billing bank account number should be displayed correctly',
            overviewInfo.billingBankAccountNumber,
            this.getTextFieldValueByLabel.bind(this),
            this.fieldName.billingBankAccountNumber,
        );
        FlagsCollector.collectEqual(
            'Note should be displayed correctly',
            overviewInfo.note,
            await this.getTextAreaValueByLabel(this.fieldName.note),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('input unit prices')
    public async inputUnitPrices(unitPricesRecords: UnitPrices[]): Promise<void> {
        gondola.report('Number of record: ' + unitPricesRecords.length);
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

    @action('does unit prices display correctly')
    public async doesUnitPricesDisplayCorrectly(unitPricesRecords?: UnitPrices[]): Promise<boolean> {
        if (!unitPricesRecords) {
            return true;
        }
        for (let i = 0; i < unitPricesRecords.length; i++) {
            const unitPrices = unitPricesRecords[i];
            FlagsCollector.collectEqual(
                `Start date should be displayed correctly for record ${i} `,
                unitPrices.startDate,
                await this.getTextRecordField(RecordTable.CUSTOMER_UNIT_PRICES, i, RecordFieldName.START_DATE),
            );
            FlagsCollector.collectEqual(
                `Leader should be displayed correctly for record ${i} `,
                unitPrices.leader.toString(),
                await this.getTextRecordField(RecordTable.CUSTOMER_UNIT_PRICES, i, RecordFieldName.LEADER),
            );
            FlagsCollector.collectEqual(
                `Tester should be displayed correctly for record ${i} `,
                unitPrices.tester.toString(),
                await this.getTextRecordField(RecordTable.CUSTOMER_UNIT_PRICES, i, RecordFieldName.TESTER),
            );
            FlagsCollector.collectEqual(
                `Dispatch should be displayed correctly for record ${i} `,
                unitPrices.dispatch.toString(),
                await this.getTextRecordField(RecordTable.CUSTOMER_UNIT_PRICES, i, RecordFieldName.DISPATCH),
            );
        }
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('input customer magnifications')
    public async inputCustomerMagnifications(customerMagnificationsRecords: CustomerMagnifications[]): Promise<void> {
        for (let i = 0; i < customerMagnificationsRecords.length; i++) {
            const customerMagnifications = customerMagnificationsRecords[i];
            if (
                !(await this.doesRecordFieldExist(RecordTable.CUSTOMER_MAGNIFICATIONS, i, RecordFieldName.START_DATE))
            ) {
                await gondola.click(this.addCustomerMagnificationRecordButton);
            }
            await this.enterRecordField(
                RecordTable.CUSTOMER_MAGNIFICATIONS,
                i,
                RecordFieldName.START_DATE,
                customerMagnifications.startDate,
            );
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

    @action('does customer magnification display correctly')
    public async doesCustomerMagnificationsDisplayCorrectly(
        customerMagnifications?: CustomerMagnifications[],
    ): Promise<boolean> {
        if (!customerMagnifications) {
            return true;
        }
        for (let i = 0; i < customerMagnifications.length; i++) {
            const magnification = customerMagnifications[i];
            FlagsCollector.collectEqual(
                `Start date should be displayed correctly for record ${i} `,
                magnification.startDate,
                await this.getTextRecordField(RecordTable.CUSTOMER_MAGNIFICATIONS, i, RecordFieldName.START_DATE),
            );
            FlagsCollector.collectEqual(
                `Holiday should be displayed correctly for record ${i} `,
                magnification.holiday.toString(),
                await this.getTextRecordField(RecordTable.CUSTOMER_MAGNIFICATIONS, i, RecordFieldName.HOLIDAY),
            );
            FlagsCollector.collectEqual(
                `Holiday late night should be displayed correctly for record ${i} `,
                magnification.holiday_late_night.toString(),
                await this.getTextRecordField(
                    RecordTable.CUSTOMER_MAGNIFICATIONS,
                    i,
                    RecordFieldName.HOLIDAY_LATE_NIGHT,
                ),
            );
            FlagsCollector.collectEqual(
                `Late night should be displayed correctly for record ${i} `,
                magnification.lateNight.toString(),
                await this.getTextRecordField(RecordTable.CUSTOMER_MAGNIFICATIONS, i, RecordFieldName.LATE_NIGHT),
            );
            FlagsCollector.collectEqual(
                `Late night overtime should be displayed correctly for record ${i} `,
                magnification.lateNightOvertime.toString(),
                await this.getTextRecordField(
                    RecordTable.CUSTOMER_MAGNIFICATIONS,
                    i,
                    RecordFieldName.LATE_NIGHT_OVERTIME,
                ),
            );
            FlagsCollector.collectEqual(
                `Overtime should be displayed correctly for record ${i} `,
                magnification.overtime.toString(),
                await this.getTextRecordField(RecordTable.CUSTOMER_MAGNIFICATIONS, i, RecordFieldName.OVERTIME),
            );
        }
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    public async doesCustomerDisplayCorrectly(customerInfo: CustomerInfo): Promise<boolean> {
        return (
            (await this.doesCustomerOverviewDisplayCorrectly(customerInfo.overview)) &&
            (await this.doesCustomerMagnificationsDisplayCorrectly(customerInfo.customerMagnificationsRecords)) &&
            (await this.doesUnitPricesDisplayCorrectly(customerInfo.unitPricesRecords))
        );
    }
}
export default new AddCustomerPage();
