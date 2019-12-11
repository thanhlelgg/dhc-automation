import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { CustomerInfo, Overview } from '../models/customer-info';

@page
export class AddCustomerPage extends GeneralPage {
    fieldName = this.translator.fieldName.addCustomer;

    @action('input customer info')
    public async inputCustomerInfo(customerInfo: CustomerInfo): Promise<void> {
        if (customerInfo.overview) {
            await this.inputCustomerOverview(customerInfo.overview);
        }
    }

    public async inputCustomerOverview(overviewInfo: Overview): Promise<void> {
        await this.selectSelectorByLabel(this.fieldName.classify, overviewInfo.classify);
        await this.enterTextFieldByLabel(this.fieldName.code, overviewInfo.code);
        await this.enterTextFieldByLabel(this.fieldName.name, overviewInfo.name);
        await this.enterTextFieldByLabel(
            this.fieldName.billingBankAccountNumber,
            overviewInfo.billingBankAccountNumber,
        );
    }
}
export default new AddCustomerPage();
