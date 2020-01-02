import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { WorkerInfo } from '../models/worker-info';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import { FilterType } from '../models/enum-class/filter-field-type';
import searchModalWindows from './search-modal-windows';
@page
export class AddWorkerPage extends GeneralPage {
    @locator
    protected workerCode = "//input[@id='cd']";
    @locator
    protected workerName = "//input[@id='name']";
    @locator
    protected departmentName = "//input[@id='search-departments']";
    @locator
    protected isRetired = "//input[@id='is‐retired']";
    @locator
    protected note = "//textarea[@id='note']";

    protected fieldName = this.translator.fieldName.addWorker;

    @action('select department')
    public async selectDepartment(department: string, byColumn?: SearchResultColumn): Promise<void> {
        await this.clickTextFieldByLabel(this.fieldName.department);
        await searchModalWindows.filterResult(department, FilterType.DEPARTMENT);
        await searchModalWindows.selectSearchResult(department, byColumn);
    }

    @action('input worker information')
    public async inputWorkerInformation(workerInfo: WorkerInfo): Promise<void> {
        await gondola.waitUntilElementVisible(this.workerCode);
        await gondola.enter(this.workerCode, workerInfo.workerCode);
        await gondola.enter(this.workerName, workerInfo.workerName);
        if (workerInfo.department) {
            await this.selectDepartment(workerInfo.department);
        }
        await this.setStateCheckboxByLabel(this.fieldName.isRetired, workerInfo.isRetired);
        if (workerInfo.note) {
            await gondola.enter(this.note, workerInfo.note);
        }
    }

    @action('save new worker')
    public async saveNewWorker(): Promise<void> {
        await gondola.waitUntilStalenessOfElement(this.saveButton, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(this.saveButton);
    }

    @action('does worker name display correct')
    public async doesWorkerNameDisplayCorrect(workerName: string): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.workerName);
        return Utilities.isTextEqual(currentName, workerName);
    }

    @action('does department display correct')
    public async doesDepartmentDisplayCorrect(department?: string): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.departmentName);
        return Utilities.isTextEqual(currentName, department ? department : '');
    }

    @action('does enrollment status display correct')
    public async doesEnrollmentStatusDisplayCorrect(isRetired: boolean): Promise<boolean> {
        const isChecked = await this.getCheckboxValue(this.isRetired, false);
        return isChecked === isRetired;
    }

    @action('does note display correct')
    public async doesNoteDisplayCorrect(note?: string): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.note);
        return Utilities.isTextEqual(currentName, note ? note : '');
    }

    @action('does content of worker displays correct')
    public async doesContentOfWorkerDisplayCorrect(worker: WorkerInfo): Promise<boolean> {
        gondola.report('Verify content of project overview');
        FlagsCollector.collectTruth(
            'Worker name should be correct',
            await this.doesWorkerNameDisplayCorrect(worker.workerName),
        );
        FlagsCollector.collectTruth(
            'Department should be correct',
            await this.doesDepartmentDisplayCorrect(worker.department),
        );
        FlagsCollector.collectTruth(
            'Enrollment status should be correct',
            await this.doesEnrollmentStatusDisplayCorrect(worker.isRetired),
        );
        FlagsCollector.collectTruth('Worker note should be correct', await this.doesNoteDisplayCorrect(worker.note));

        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }
}
export default new AddWorkerPage();
