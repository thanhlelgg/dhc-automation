import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { TaxInfo } from '../models/tax-info';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import { Constants } from '../common/constants';

@page
export class AddTaxPage extends GeneralPage {
    @locator
    protected addUnitPricesRecordButton = { id: 'addRow' };
    @locator
    protected addCustomerMagnificationRecordButton = { id: 'magnifyAddRow' };
    @locator
    protected pageUrl = `${Constants.BMS_BASE_URL}/taxes/add`;

    fieldName = this.translator.fieldName.addTax;
    placeHolder = this.translator.fieldPlaceHolder.addCustomer;

    @action('save tax')
    public async saveTax(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('enter tax information')
    public async enterTaxInformation(taxInfo: TaxInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.name, taxInfo.name);
        await this.enterTextFieldByLabel(this.fieldName.taxRate, taxInfo.taxRate);
        await this.enterTextFieldByLabel(this.fieldName.displayOrder, taxInfo.displayOrder);
    }

    @action('does tax display correctly')
    public async doesTaxDisplayCorrectly(taxInfo: TaxInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Tax code should be displayed correctly',
            taxInfo.name,
            await this.getTextFieldValueByLabel(this.fieldName.name),
        );
        FlagsCollector.collectEqual(
            'Tax name should be displayed correctly',
            taxInfo.name,
            await this.getTextFieldValueByLabel(this.fieldName.name),
        );
        FlagsCollector.collectEqual(
            'Tax department code should be displayed correctly',
            taxInfo.displayOrder,
            await this.getTextFieldValueByLabel(this.fieldName.displayOrder),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new AddTaxPage();
