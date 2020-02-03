import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { SpecialAllowanceInfo } from '../models/special-allowance-info';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';

@page
export class AddSpecialAllowancePage extends GeneralPage {
    fieldName = this.translator.fieldName.addSpecialAllowance;

    @action('save special allowance')
    public async saveSpecialAllowance(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('enter special allowance information')
    public async enterSpecialAllowanceInformation(specialAllowanceInfo: SpecialAllowanceInfo): Promise<void> {
        await this.waitForStalenessOfTextFieldByLabel(this.fieldName.name, true);
        await this.enterTextFieldByLabel(this.fieldName.name, specialAllowanceInfo.name, true);
        await this.enterTextFieldByLabel(this.fieldName.amount, specialAllowanceInfo.amount, true);
        await this.enterTextFieldByLabel(this.fieldName.skillNecessary, specialAllowanceInfo.necessarySkill, true);
    }

    @action('does special allowance display correctly')
    public async doesSpecialAllowanceDisplayCorrectly(specialAllowanceInfo: SpecialAllowanceInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Special Allowance name should be displayed correctly',
            specialAllowanceInfo.name,
            await this.getTextFieldValueByLabel(this.fieldName.name, true),
        );
        FlagsCollector.collectEqual(
            'Special Allowance amount should be displayed correctly',
            specialAllowanceInfo.amount,
            await this.getTextFieldValueByLabel(this.fieldName.amount, true),
        );
        FlagsCollector.collectEqual(
            'Special Allowance necessary should be displayed correctly',
            specialAllowanceInfo.necessarySkill,
            await this.getTextFieldValueByLabel(this.fieldName.skillNecessary, true),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }
}
export default new AddSpecialAllowancePage();
