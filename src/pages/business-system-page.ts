import { action, page } from 'gondolajs';
import { GeneralPage } from './general-page';
@page
export class BusinessSystemPage extends GeneralPage {
    private verticalMenuButton = this.translator.verticalMenuBMS;

    @action('gotoAddProjectPage')
    public async gotoAddProjectPage(): Promise<void> {
        await this.gotoPageByMenuButton(this.verticalMenuButton.project.title, this.verticalMenuButton.project.addLink);
    }

    @action('gotoListProject')
    public async gotoListProject(lastPage = true): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.project.title,
            this.verticalMenuButton.project.listLink,
        );
        if (lastPage) await this.gotoLastPage();
    }

    @action('gotoAddWorkerPage')
    public async gotoAddWorkerPage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.worker.title,
            this.verticalMenuButton.master.worker.addLink,
        );
    }

    @action('gotoAddCustomerPage')
    public async gotoAddCustomerPage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.customer.title,
            this.verticalMenuButton.master.customer.addLink,
        );
    }

    @action('go to list tax page')
    public async gotoListTaxPage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.taxes.title,
            this.verticalMenuButton.master.taxes.listLink,
        );
    }

    @action('gotoAddItemPage')
    public async gotoAddItemPage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.item.title,
            this.verticalMenuButton.master.item.addLink,
        );
    }

    @action('go to Segments page')
    public async gotoAddSegmentPage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.segment.title,
            this.verticalMenuButton.master.segment.addLink,
        );
    }

    @action('go to department page')
    public async gotoAddDepartmentPage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.department.title,
            this.verticalMenuButton.master.department.addLink,
        );
    }

    @action('go to add tax page')
    public async gotoAddTaxPage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.taxes.title,
            this.verticalMenuButton.master.taxes.addLink,
        );
    }

    @action('go to list worker')
    public async gotoListWorker(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.worker.title,
            this.verticalMenuButton.master.worker.listLink,
        );
    }

    @action('go to list customer')
    public async gotoListCustomer(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.customer.title,
            this.verticalMenuButton.master.customer.listCustomerLink,
        );
    }

    @action('go to list item')
    public async gotoListItem(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.item.title,
            this.verticalMenuButton.master.item.listLink,
        );
    }

    @action('go to delivery template page')
    public async gotoDeliveryTemplatePage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.template.title,
            this.verticalMenuButton.master.template.deliveryTemplateLink,
        );
    }

    @action('go to estimate template page')
    public async gotoEstimateTemplatePage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.template.title,
            this.verticalMenuButton.master.template.estimateTemplateLink,
        );
    }

    @action('go to billing template page')
    public async gotoBillingTemplatePage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.template.title,
            this.verticalMenuButton.master.template.billingTemplateLink,
        );
    }

    @action('go to list role page')
    public async gotoListRolePage(): Promise<void> {
        await this.gotoPageByMenuButton(this.verticalMenuButton.system.title, this.verticalMenuButton.system.role);
    }

    @action('go to add exchange page')
    public async gotoAddExchangePage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.exchange.title,
            this.verticalMenuButton.master.exchange.addCurrency,
        );
    }

    @action('go to list exchange rate page')
    public async gotoListExchangeRatePage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.exchange.title,
            this.verticalMenuButton.master.exchange.listExchangeRate,
        );
    }

    @action('go to add exchange rate page')
    public async gotoAddExchangeRatePage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.exchange.title,
            this.verticalMenuButton.master.exchange.addExchangeRate,
        );
    }

    @action('got to list exchange page')
    public async gotoListExchangePage(): Promise<void> {
        await this.gotoPageByMenuButton(
            this.verticalMenuButton.master.title,
            this.verticalMenuButton.master.exchange.title,
            this.verticalMenuButton.master.exchange.listCurrency,
        );
    }
}
export default new BusinessSystemPage();
