import { page, action, gondola } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { PositionInfo } from '../models/position-info';
import { Constants } from '../common/constants';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';

@page
export class AddPositionPage extends GeneralPage {
    private positionFieldName = Constants.translator.fieldName.addPosition;
    protected pageUrl = `${Constants.TMS_BASE_URL}/positions/add`;

    @action('input position info')
    public async inputPositionInfo(positionInfo: PositionInfo): Promise<void> {
        await this.waitForStalenessOfTextFieldByLabel(this.positionFieldName.positionName, true);
        await this.enterTextFieldByLabel(this.positionFieldName.positionName, positionInfo.positionName, true);
        await this.enterTextFieldByLabel(
            this.positionFieldName.positionAbbreviation,
            positionInfo.abbreviationName,
            true,
        );
        await this.selectSelectorByLabel(this.positionFieldName.timeCardApprove, positionInfo.timeCardApprove);
    }

    @action('does position info display correctly')
    public async doesPositionInfoDisplayCorrectly(positionInfo: PositionInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Position name should be displayed correctly',
            await this.getTextFieldValueByLabel(this.positionFieldName.positionName, true),
            positionInfo.positionName,
        );
        FlagsCollector.collectEqual(
            'Position abbreviation should be displayed correctly',
            await this.getTextFieldValueByLabel(this.positionFieldName.positionAbbreviation, true),
            positionInfo.abbreviationName,
        );
        FlagsCollector.collectEqual(
            'Time card approve should be displayed correctly',
            await this.getSelectedOptionByLabel(this.positionFieldName.timeCardApprove, true),
            positionInfo.timeCardApprove,
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new AddPositionPage();
