import { action, gondola, locator, page } from "gondolajs";
import { generalPage } from "./general-page";
@page
export class businessSystemPage extends generalPage{
    // Project
    @locator
    protected projectLink = "//span[.='案件']";
    @locator
    protected listProjectLink = "//a[@href='/projects']//span[contains(text(), '一覧')]";
    @locator
    protected addProjectLink = "//a[@href='/projects/add']";

    // Master
    @locator
    protected masterLink = "//span[.='マスタ']";
    @locator
    protected customerLink = "//a[contains(.,'顧客')]";
    @locator
    protected listBusinessCustomerLink = "//a[contains(.,'得意先一覧')]";
    @locator
    protected listBusinessSupplierLink = "//span[.='仕入先一覧']";
    @locator
    protected addCustomerLink = "//a[@href='/customers/add']";
    @locator
    protected itemLink = "//span[.='品目']";
    @locator
    protected listItemsLink = "//a[@href='/items']//span[contains(text(), '一覧')]";
    @locator
    protected addItemLink = "//a[@href='/items/add']";
    @locator
    protected departmentLink = "//span[.='部門']";
    @locator
    protected listDepartmentLink = "//a[@href='/departments']//span[contains(text(), '一覧')]";
    @locator
    protected addDepartmentLink = "//a[@href='/departments/add']";
    @locator
    protected segmentLink = "//span[.='セグメント']";
    @locator
    protected listSegmentLink = "//a[@href='/segments']//span[contains(text(), '一覧')]";
    @locator
    protected addSegmentLink = "//a[@href='/segments/add']";

    public async gotoAddProjectPage(){
        await this.waitControlExist(this.projectLink, 30);
        await gondola.click(this.projectLink);
        await gondola.waitForElement(this.addProjectLink);
        await this.waitControlExist(this.addProjectLink, 10);
        await gondola.click(this.addProjectLink);
    }

    @action("gotoListProject")
    public async gotoListProject(){
        await this.waitControlExist(this.projectLink, 30);
        await gondola.click(this.projectLink);
        await gondola.waitForElement(this.listProjectLink);
        await this.waitControlExist(this.listProjectLink, 10);
        await gondola.click(this.listProjectLink);
    }
}
export default new businessSystemPage();
