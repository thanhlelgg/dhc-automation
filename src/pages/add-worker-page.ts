import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { Utilities } from '../common/utilities';
import { FilterType } from '../models/enum-class/filter-field-type';
import { Constants } from '../common/constants';
@page
export class AddWorkerPage extends GeneralPage {
    @locator
    protected workerCode = "//input[@id='cd']";
    @locator
    protected workerName = "//input[@id='name']";
    @locator
    protected departmentName = "//input[@id='department_name']";
    @locator
    protected isRetired = "//input[@id='is‐retired']";
    @locator
    protected note = "//textarea[@id='note']";
    @locator
    protected saveButton = "//button[@class='btn btn-info']";
    @locator
    protected backButton = "//a[contains(.,'戻る')]";

    //#region Search department modal
    @locator
    protected searchKeyInputField = "//input[@id='department_cd']";
    protected searchResultRow = "//div[@id='departmentList']//a[contains(.,'{0}')][1]";
    protected resultNameColumn = "//div[@id='departmentList']//a[contains(.,'{0}')][1]//div[@class='row']/div[2]";
    protected closeButton = "//button[@class='close']";
    //#endregion

    @action('selectSearchResult')
    public async selectSearchResult(itemName: string | undefined): Promise<string> {
        let resultRowLocator;
        let departmentNameLocator;
        // we handle undefined in here so we won't have to handle it on the test case level
        if (itemName === undefined) {
            throw new Error('Item name is not valid');
        } else {
            resultRowLocator = Utilities.formatString(this.searchResultRow, itemName);
            departmentNameLocator = Utilities.formatString(this.resultNameColumn, itemName);
        }

        gondola.report("Department locator: " + departmentNameLocator);
        let departmentName = await gondola.getText(departmentNameLocator);
        gondola.report("Department name: " + departmentName);
        await this.waitControlExist(resultRowLocator);
        await gondola.click(resultRowLocator);
        return departmentName.trim();
    }

    @action('filterResult')
    public async filterResult(value: string): Promise<void> {
        await this.waitControlExist(this.searchKeyInputField, Constants.LONG_TIMEOUT);
        await gondola.enter(this.searchKeyInputField, value);
    }

    @action('searchDepartment')
    public async searchDepartment(searchKey: string): Promise<string> {
        await gondola.click(this.departmentName);
        await this.filterResult(searchKey);
        return await this.selectSearchResult(searchKey);
    }

    @action('inputWorkerInformation')
    public async inputWorkerInformation(): Promise<void> {
        await this.waitControlExist(this.workerCode);
        await gondola.enter(this.workerCode, "123");
        await gondola.enter(this.workerName, "123");
        await this.searchDepartment("E001");
        await gondola.setState(this.isRetired, true);
        await gondola.enter(this.note, "");
    }

    @action('saveNewWorker')
    public async saveNewWorker() {
        await gondola.click(this.saveButton);
    }
}
export default new AddWorkerPage();
