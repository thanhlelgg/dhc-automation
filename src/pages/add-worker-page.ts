import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { WorkerInfo } from '../models/worker-info';
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

    @action('select search result')
    public async selectSearchResult(searchStr: string | undefined): Promise<string> {
        let resultRowLocator;
        let departmentNameLocator;
        // we handle undefined in here so we won't have to handle it on the test case level
        if (searchStr === undefined) {
            throw new Error('Department name is not valid');
        } else {
            resultRowLocator = Utilities.formatString(this.searchResultRow, searchStr);
            departmentNameLocator = Utilities.formatString(this.resultNameColumn, searchStr);
        }

        const departmentName = await gondola.getText(departmentNameLocator);
        await this.waitForControlVisible(resultRowLocator);
        await gondola.click(resultRowLocator);
        return departmentName.trim();
    }

    @action('filter result')
    public async filterResult(value: string): Promise<void> {
        await this.waitForControlVisible(this.searchKeyInputField, Constants.LONG_TIMEOUT);
        await gondola.enter(this.searchKeyInputField, value);
    }

    @action('search department')
    public async searchDepartment(searchKey: string): Promise<string> {
        await gondola.click(this.departmentName);
        await this.filterResult(searchKey);
        return await this.selectSearchResult(searchKey);
    }

    @action('input worker information')
    public async inputWorkerInformation(workerInfo: WorkerInfo): Promise<void> {
        await this.waitForControlVisible(this.workerCode);
        await gondola.enter(this.workerCode, workerInfo.workerCode);
        await gondola.enter(this.workerName, workerInfo.workerName);
        if (workerInfo.department) {
            await this.searchDepartment(workerInfo.department);
        }
        await gondola.setState(this.isRetired, workerInfo.isRetired);
        if (workerInfo.note) {
            await gondola.enter(this.note, workerInfo.note);
        }
    }

    @action('save new worker')
    public async saveNewWorker(): Promise<void> {
        await gondola.click(this.saveButton);
    }
}
export default new AddWorkerPage();
