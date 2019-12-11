import { action, gondola, locator, page } from 'gondolajs';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
@page
export class ListWorkerPage {
    @locator
    protected workerCode = "//input[@id='cd']";
    @locator
    protected workerName = "//input[@id='name']";
    @locator
    protected departmentCode = "//input[@id='department-cd']";
    @locator
    protected departmentName = "//input[@id='department-name']";
    @locator
    protected isNotSpecified = "//input[@id='is-retired']";
    @locator
    protected isRetired = "//input[@id='is-retired-1']";
    @locator
    protected isEnrolling = "//input[@id='is-retired-0']";
    @locator
    protected searchButton = "//button[@class='btn btn-info px-5 mr-2']";
    @locator
    protected editWorkerLinkStr = "//a[.='{0}']";
    @locator
    protected dataTable = "//div[@id='data-table']";

    @action('search worker')
    public async searchWorker(
        workerCode?: string,
        workerName?: string,
        departmentCode?: string,
        departmentName?: string,
        isRetied?: boolean,
    ): Promise<void> {
        if (workerCode) {
            gondola.report('Worker code: ' + workerCode);
            await gondola.enter(this.workerCode, workerCode);
        }
        if (workerName) {
            await gondola.enter(this.workerName, workerName);
        }
        if (departmentCode) {
            await gondola.enter(this.departmentCode, departmentCode);
        }
        if (departmentName) {
            await gondola.enter(this.departmentName, departmentName);
        }
        if (isRetied) {
            await gondola.setState(this.isRetired, true);
        } else if (isRetied === null || isRetied === undefined) {
            await gondola.setState(this.isNotSpecified, true);
        } else {
            await gondola.setState(this.isEnrolling, true);
        }

        // click search
        await gondola.click(this.searchButton);
        await (gondola as any).waitUntilStalenessOfElement(this.dataTable, Constants.VERY_SHORT_TIMEOUT);
    }

    @action('get worker link')
    public getWorkerLink(workerCode: string): string {
        return Utilities.formatString(this.editWorkerLinkStr, workerCode);
    }
}
export default new ListWorkerPage();
