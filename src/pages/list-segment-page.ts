import { action, gondola, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
@page
export class ListSegmentPage extends GeneralPage {
    private pageUrl = `${Constants.BMS_BASE_URL}/segments`;
    protected segmentLink = "//div[@tabulator-field='code']/a[text()='{0}']";

    @action('openCustomerByName')
    public async openSegmentByCode(name: string): Promise<void> {
        await gondola.click(this.segmentLink.format(name));
    }

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListSegmentPage();
