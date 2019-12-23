import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { DepartmentInfo } from '../models/department-info';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';

@page
export class AddDepartmentPage extends GeneralPage {
    @locator
    protected addUnitPricesRecordButton = { id: 'addRow' };
    @locator
    protected addCustomerMagnificationRecordButton = { id: 'magnifyAddRow' };

    fieldName = this.translator.fieldName.addDepartment;
    placeHolder = this.translator.fieldPlaceHolder.addCustomer;

    @action('save department')
    public async saveDepartment(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('enter department information')
    public async enterDepartmentInformation(departmentInfo: DepartmentInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.code, departmentInfo.code);
        await this.enterTextFieldByLabel(this.fieldName.name, departmentInfo.name);
        await this.enterTextAreaByLabel(this.fieldName.note, departmentInfo.note);
    }

    @action('does department display correctly')
    public async doesDepartmentDisplayCorrectly(departmentInfo: DepartmentInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Department code should be displayed correctly',
            departmentInfo.code,
            await this.getTextFieldValueByLabel(this.fieldName.code),
        );
        FlagsCollector.collectEqual(
            'Department name should be displayed correctly',
            departmentInfo.name,
            await this.getTextFieldValueByLabel(this.fieldName.name),
        );
        FlagsCollector.collectEqual(
            'Department department code should be displayed correctly',
            departmentInfo.note,
            await this.getTextAreaValueByLabel(this.fieldName.note),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }
}
export default new AddDepartmentPage();
