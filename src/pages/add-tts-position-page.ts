import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { PositionInfo } from '../models/tts-position-info';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';

@page
export class AddPositionPage extends GeneralPage {
    fieldName = this.translator.fieldName.addTTSPosition;

    @action('save position')
    public async savePosition(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('enter position information')
    public async enterPositionInformation(positionInfo: PositionInfo): Promise<void> {
        await this.waitForStalenessOfTextFieldByLabel(this.fieldName.name, true);
        await this.enterTextFieldByLabel(this.fieldName.name, positionInfo.name, true);
        await this.enterTextFieldByLabel(this.fieldName.abbreviation, positionInfo.abbreviationName, true);
        await this.selectSelectorByLabel(this.fieldName.payAllowance, positionInfo.payAllowance, true);
        await this.selectSelectorByLabel(this.fieldName.timecardApprove, positionInfo.timecardApprove, true);
    }

    @action('does position display correctly')
    public async doesPositionDisplayCorrectly(positionInfo: PositionInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Position name should be displayed correctly',
            positionInfo.name,
            await this.getTextFieldValueByLabel(this.fieldName.name),
        );
        FlagsCollector.collectEqual(
            'Position abbreviation name should be displayed correctly',
            positionInfo.abbreviationName,
            await this.getTextFieldValueByLabel(this.fieldName.abbreviation),
        );
        FlagsCollector.collectEqual(
            'Position pay allowance should be displayed correctly',
            positionInfo.payAllowance,
            await this.getSelectedOptionByLabel(this.fieldName.payAllowance),
        );
        FlagsCollector.collectEqual(
            'Position timecard approve should be displayed correctly',
            positionInfo.timecardApprove,
            await this.getSelectedOptionByLabel(this.fieldName.timecardApprove),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }
}
export default new AddPositionPage();
