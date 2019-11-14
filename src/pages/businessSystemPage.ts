import { action, gondola, locator, page } from "gondolajs";
import { generalPage } from "./generalPage";
@page
export class businessSystemPage extends generalPage{
    // Project
    @locator
    protected projectLink = {xpath: "//span[.='案件']"};
    @locator
    protected listProjectLink = {xpath: "//a[@href='/projects']//span[contains(text(), '一覧')]"};
    @locator
    protected addProjectLink = {xpath: "//a[@href='/projects/add']"};

    // Master
    @locator
    protected masterLink = {xpath: "//span[.='マスタ']"};
    @locator
    protected customerLink = {xpath: "//a[contains(.,'顧客')]"};
    @locator
    protected listBusinessCustomerLink = {xpath: "//a[contains(.,'得意先一覧')]"};
    @locator
    protected listBusinessSupplierLink = {xpath: "//span[.='仕入先一覧']"};
    @locator
    protected addCustomerLink = {xpath: "//a[@href='/customers/add']"};
    @locator
    protected itemLink = {xpath: "//span[.='品目']"};
    @locator
    protected listItemsLink = {xpath: "//a[@href='/items']//span[contains(text(), '一覧')]"};
    @locator
    protected addItemLink = {xpath: "//a[@href='/items/add']"};
    @locator
    protected departmentLink = {xpath: "//span[.='部門']"};
    @locator
    protected listDepartmentLink = {xpath: "//a[@href='/departments']//span[contains(text(), '一覧')]"};
    @locator
    protected addDepartmentLink = {xpath: "//a[@href='/departments/add']"};
    @locator
    protected segmentLink = {xpath: "//span[.='セグメント']"};
    @locator
    protected listSegmentLink = {xpath: "//a[@href='/segments']//span[contains(text(), '一覧')]"};
    @locator
    protected addSegmentLink = {xpath: "//a[@href='/segments/add']"};

    @action("gotoAddProjectPage")
    public async gotoAddProjectPage(){
        await gondola.click(this.projectLink);
        await gondola.waitForElement(this.addProjectLink);
        await this.waitControlExist(this.addProjectLink, 10);
        await gondola.click(this.addProjectLink);
    }

    @action("gotoListProject")
    public async gotoListProject(){
        await gondola.click(this.projectLink);
        await gondola.waitForElement(this.listProjectLink);
        await this.waitControlExist(this.listProjectLink, 10);
        await gondola.click(this.listProjectLink);
    }
}
export default new businessSystemPage();
