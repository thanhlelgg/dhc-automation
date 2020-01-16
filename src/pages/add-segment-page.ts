import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { SegmentInfo } from '../models/segment-info';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { FilterType } from '../models/enum-class/filter-field-type';
import searchModalWindows from './search-modal-windows';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';

@page
export class AddSegmentPage extends GeneralPage {
    @locator
    protected addUnitPricesRecordButton = { id: 'addRow' };
    @locator
    protected addCustomerMagnificationRecordButton = { id: 'magnifyAddRow' };

    fieldName = this.translator.fieldName.addSegment;
    placeHolder = this.translator.fieldPlaceHolder.addCustomer;

    @action('save segment')
    public async saveSegment(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('enter segment information')
    public async enterSegmentInformation(segmentInfo: SegmentInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.code, segmentInfo.code);
        await this.enterTextFieldByLabel(this.fieldName.name, segmentInfo.name);
        await this.enterTextFieldByLabel(this.fieldName.kanjyoDepartmentCode, segmentInfo.department);
        if (segmentInfo.parentSegment) {
            await this.selectSegment(segmentInfo.parentSegment, SearchResultColumn.NAME);
        }
    }

    @action('does segment display correctly')
    public async doesSegmentDisplayCorrectly(segmentInfo: SegmentInfo): Promise<boolean> {
        FlagsCollector.collectEqual(
            'Segment code should be displayed correctly',
            segmentInfo.code,
            await this.getTextFieldValueByLabel(this.fieldName.code),
        );
        FlagsCollector.collectEqual(
            'Segment name should be displayed correctly',
            segmentInfo.name,
            await this.getTextFieldValueByLabel(this.fieldName.name),
        );
        FlagsCollector.collectEqual(
            'Segment department code should be displayed correctly',
            segmentInfo.department,
            await this.getTextFieldValueByLabel(this.fieldName.kanjyoDepartmentCode),
        );
        FlagsCollector.collectEqual(
            'Segment parent segment should be displayed correctly',
            segmentInfo.parentSegment,
            await this.getTextFieldValueByLabel(this.fieldName.parentSegment),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('select segment')
    public async selectSegment(segment: string, byColumn?: SearchResultColumn): Promise<void> {
        await this.clickTextFieldByLabel(this.fieldName.parentSegment);
        await searchModalWindows.filterResult(segment, FilterType.SEGMENTS);
        await searchModalWindows.selectSearchResult(segment, byColumn);
    }
}
export default new AddSegmentPage();
