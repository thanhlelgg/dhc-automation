import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
@page
export class BusinessSystemPage extends GeneralPage {
    // Project
    @locator
    protected projectLink = `//span[.='${this.translator.verticalMenuBMS.project.title}']`;
    @locator
    protected listProjectLink = `//a[@href='/projects']//span[contains(., '${this.translator.verticalMenuBMS.project.listLink}')]`;
    @locator
    protected addProjectLink = "//a[@href='/projects/add']";

    // Master
    @locator
    protected masterLink = `//span[.='${this.translator.verticalMenuBMS.master.title}']`;
    @locator
    protected customerLink = `//a[contains(.,'${this.translator.verticalMenuBMS.master.customer.title}')]`;
    @locator
    protected listBusinessCustomerLink = `//a[@href='/customers/business-customer']//span[contains(., '${this.translator.verticalMenuBMS.master.customer.listCustomerLink}')]`;
    @locator
    protected listBusinessSupplierLink = `//a[@href='/customers/business-supplier']//span[contains(., '${this.translator.verticalMenuBMS.master.customer.listSupplierLink}')]`;
    @locator
    protected addCustomerLink = "//a[@href='/customers/add']";
    @locator
    protected itemLink = `//span[.='${this.translator.verticalMenuBMS.master.item.title}']`;
    @locator
    protected listItemsLink = `//a[@href='/items']//span[contains(., '${this.translator.verticalMenuBMS.master.item.listLink}')]`;
    @locator
    protected addItemLink = "//a[@href='/items/add']";
    @locator
    protected departmentLink = `//span[.='${this.translator.verticalMenuBMS.master.department.title}']`;
    @locator
    protected listDepartmentLink = `//a[@href='/departments']//span[contains(., '${this.translator.verticalMenuBMS.master.department.listLink}')]`;
    @locator
    protected addDepartmentLink = "//a[@href='/departments/add']";
    @locator
    protected segmentLink = `//span[.='${this.translator.verticalMenuBMS.master.segment.title}']`;
    @locator
    protected listSegmentLink = `//a[@href='/segments']//span[contains(., '${this.translator.verticalMenuBMS.master.segment.listLink}')]`;
    @locator
    protected addSegmentLink = "//a[@href='/segments/add']";
    @locator
    protected workerLink = `//span[.='${this.translator.verticalMenuBMS.master.worker.title}']`;
    @locator
    protected listWorkerLink = `//a[@href='/workers']//span[contains(., '${this.translator.verticalMenuBMS.master.worker.listLink}')]`;
    @locator
    protected addWorkerLink = "//a[@href='/workers/add']";

    @action('gotoAddProjectPage')
    public async gotoAddProjectPage(): Promise<void> {
        await this.waitForControlVisible(this.projectLink);
        await gondola.click(this.projectLink);
        await this.waitForControlVisible(this.addProjectLink);
        await gondola.click(this.addProjectLink);
    }

    @action('gotoListProject')
    public async gotoListProject(): Promise<void> {
        await this.waitForControlVisible(this.projectLink);
        await gondola.click(this.projectLink);
        await this.waitForControlVisible(this.listProjectLink);
        await gondola.click(this.listProjectLink);
    }

    @action('gotoAddWorkerPage')
    public async gotoAddWorkerPage(): Promise<void> {
        await this.waitForControlVisible(this.masterLink);
        await gondola.click(this.masterLink);
        await this.waitForControlVisible(this.workerLink);
        await gondola.click(this.workerLink);
        await this.waitForControlVisible(this.addWorkerLink);
        await gondola.click(this.addWorkerLink);
    }

    @action('gotoAddCustomerPage')
    public async gotoAddCustomerPage(): Promise<void> {
        await this.waitForControlVisible(this.masterLink);
        await gondola.click(this.masterLink);
        await this.waitForControlVisible(this.customerLink);
        await gondola.click(this.customerLink);
        await this.waitForControlVisible(this.addCustomerLink);
        await gondola.click(this.addCustomerLink);
    }
}
export default new BusinessSystemPage();
