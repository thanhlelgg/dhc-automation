import { action, gondola, locator, page } from 'gondolajs';
import { Utilities } from '../common/utilities';
@page
export class ListProjectPage {
    @locator
    protected projectCode = { id: 'number' };
    @locator
    protected projectName = { id: 'name' };
    @locator
    protected customerName = { css: '.select2-selection' };
    @locator
    protected selectCustomer = { id: 'business-customer' };
    @locator
    protected status = { id: 'status' };
    @locator
    protected billingType = { id: 'billing-type' };
    @locator
    protected accuracy = { id: 'accuracy' };
    @locator
    protected tag = { id: 'tag' };
    @locator
    protected startDateStart = { id: 'start-date-start' };
    @locator
    protected startDateEnd = { id: 'start-date-end' };
    @locator
    protected endDateStart = { id: 'end-date-start' };
    @locator
    protected endDateEnd = { id: 'end-date-end' };
    @locator
    protected scheduleStartDateStart = { id: 'scheduled-start-date-start' };
    @locator
    protected scheduleStartDateEnd = { id: 'scheduled-start-date-end' };
    @locator
    protected scheduleEndDateStart = { id: 'scheduled-end-date-start' };
    @locator
    protected scheduleEndDateEnd = { id: 'scheduled-end-date-end' };
    @locator
    protected searchButton = "//button[@class='btn btn-info px-5 mr-2']";
    @locator
    protected ttsLinkByProjectId =
        "//div[div[@tabulator-field='案件番号']/a[text()='{0}']]/div[@tabulator-field='tts連携']//a";
    @locator
    protected editProjectLinkStr = "//a[.='{0}']";

    @action('searchProject')
    public async searchProject(
        projectCode?: string,
        projectName?: string,
        customerName?: string,
        status?: string,
        billingType?: string,
        accuracy?: string,
        tag?: string,
        startDateStart?: string,
        startDateEnd?: string,
        endDateStart?: string,
        endDateEnd?: string,
        scheduleStartDateStart?: string,
        scheduleStartDateEnd?: string,
        scheduleEndDateStart?: string,
        scheduleEndDateEnd?: string,
    ): Promise<void> {
        if (projectCode) {
            await gondola.enter(this.projectCode, projectCode);
        }
        if (projectName) {
            await gondola.enter(this.projectName, projectName);
        }
        if (customerName) {
            await gondola.select(this.selectCustomer, customerName);
        }
        if (status) {
            await gondola.select(this.status, status);
        }
        if (billingType) {
            await gondola.select(this.billingType, billingType);
        }
        if (accuracy) {
            await gondola.select(this.accuracy, accuracy);
        }
        if (tag) {
            await gondola.enter(this.tag, tag);
        }
        if (startDateStart) {
            await gondola.enter(this.startDateStart, startDateStart);
        }
        if (startDateEnd) {
            await gondola.enter(this.startDateEnd, startDateEnd);
        }
        if (endDateStart) {
            await gondola.enter(this.endDateStart, endDateStart);
        }
        if (endDateEnd) {
            await gondola.enter(this.endDateEnd, endDateEnd);
        }
        if (scheduleStartDateStart) {
            await gondola.enter(this.scheduleStartDateStart, scheduleStartDateStart);
        }
        if (scheduleStartDateEnd) {
            await gondola.enter(this.scheduleStartDateEnd, scheduleStartDateEnd);
        }
        if (scheduleEndDateStart) {
            await gondola.enter(this.scheduleEndDateStart, scheduleEndDateStart);
        }
        if (scheduleEndDateEnd) {
            await gondola.enter(this.scheduleEndDateEnd, scheduleEndDateEnd);
        }
        // click search
        await gondola.click(this.searchButton);
    }

    @action('getProjectLink')
    public getProjectLink(projectCode: string): string {
        return Utilities.formatString(this.editProjectLinkStr, projectCode);
    }

    @action('isTTSLinkEnabled')
    public async isTTSLinkDisabled(projectId: string): Promise<boolean> {
        const locator = Utilities.formatString(this.ttsLinkByProjectId, projectId);
        return (await gondola.getControlProperty(locator, 'class')).indexOf('disabled') >= 0;
    }

    @action('clickOnTTSLinkButton')
    public async clickOnTTSLinkButton(projectId: string): Promise<void> {
        const locator = Utilities.formatString(this.ttsLinkByProjectId, projectId);
        await gondola.click(locator);
    }
}
export default new ListProjectPage();
