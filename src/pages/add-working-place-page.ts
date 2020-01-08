import { page, action } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { WorkingPlaceInfo } from '../models/working-place-info';
import { Constants } from '../common/constants';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';

@page
export class AddWorkingPlacePage extends GeneralPage {
    private workingPlaceFieldName = Constants.translator.fieldName.addWorkingPlace;
    protected pageUrl = `${Constants.tmsBaseUrl}/working-place/add`;

    @action('input workingPlace info')
    public async inputWorkingPlaceInfo(workingPlaceInfo: WorkingPlaceInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.workingPlaceFieldName.name, workingPlaceInfo.name, true);
        await this.enterTextFieldByLabel(this.workingPlaceFieldName.code, workingPlaceInfo.code, true);
        await this.selectRadioButtonByLabel(this.workingPlaceFieldName.category, workingPlaceInfo.category);
        await this.enterTextAreaByLabel(this.workingPlaceFieldName.address, workingPlaceInfo.address, true);

        // Match label partial, search with full characters, select item match partial
        await this.selectSearchSelectionByLabel(
            this.workingPlaceFieldName.nearestStation1,
            this.getStationNameFromResult(workingPlaceInfo.nearestStation1),
            workingPlaceInfo.nearestStation1,
            true,
            false,
            true,
        );

        if (workingPlaceInfo.nearestStation2) {
            await this.selectSearchSelectionByLabel(
                this.workingPlaceFieldName.nearestStation2,
                this.getStationNameFromResult(workingPlaceInfo.nearestStation2),
                workingPlaceInfo.nearestStation2,
                true,
                false,
                true,
            );
        }
        if (workingPlaceInfo.nearestStation3) {
            await this.selectSearchSelectionByLabel(
                this.workingPlaceFieldName.nearestStation3,
                this.getStationNameFromResult(workingPlaceInfo.nearestStation3),
                workingPlaceInfo.nearestStation3,
                true,
                false,
                true,
            );
        }

        await this.selectSelectorByLabel(this.workingPlaceFieldName.timeZone, workingPlaceInfo.timezone, true);
    }

    @action('does workingPlace info display correctly')
    public async doesWorkingPlaceInfoDisplayCorrectly(workingPlaceInfo: WorkingPlaceInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Working place name should be displayed correctly',
            workingPlaceInfo.name,
            await this.getTextFieldValueByLabel(this.workingPlaceFieldName.name, true),
        );
        FlagsCollector.collectEqual(
            'Working place code should be displayed correctly',
            workingPlaceInfo.code,
            await this.getTextFieldValueByLabel(this.workingPlaceFieldName.code, true),
        );
        FlagsCollector.collectTruth(
            'Working place category should be displayed correctly',
            await this.isRadioButtonByLabelSelected(
                this.workingPlaceFieldName.category,
                workingPlaceInfo.category,
                true,
            ),
        );
        FlagsCollector.collectEqual(
            'Working place address should be displayed correctly',
            workingPlaceInfo.address,
            await this.getTextAreaValueByLabel(this.workingPlaceFieldName.address, true),
        );
        const nearestStation1Result = await this.getSearchSelectionSelectedItemByLabel(
            this.workingPlaceFieldName.nearestStation1,
            true,
        );
        FlagsCollector.collectEqual(
            'Working place nearest station 1 should be displayed correctly',
            workingPlaceInfo.nearestStation1,
            nearestStation1Result,
        );
        const nearestStation2Result = await this.getSearchSelectionSelectedItemByLabel(
            this.workingPlaceFieldName.nearestStation2,
            true,
        );
        FlagsCollector.collectEqual(
            'Working place nearest station 2 should be displayed correctly',
            workingPlaceInfo.nearestStation2,
            nearestStation2Result,
        );
        const nearestStation3Result = await this.getSearchSelectionSelectedItemByLabel(
            this.workingPlaceFieldName.nearestStation3,
            true,
        );
        FlagsCollector.collectEqual(
            'Working place nearest station 3 should be displayed correctly',
            workingPlaceInfo.nearestStation3,
            nearestStation3Result,
        );
        FlagsCollector.collectEqual(
            'Working place code should be displayed correctly',
            workingPlaceInfo.timezone,
            await this.getSelectedOptionByLabel(this.workingPlaceFieldName.timeZone, true),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    public getStationNameFromResult(result: string): string {
        const regex = /-(.*)$/g;
        const groups = regex.exec(result);
        return groups ? groups[1] : '';
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new AddWorkingPlacePage();
