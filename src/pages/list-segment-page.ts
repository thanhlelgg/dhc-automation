import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
@page
export class ListSegmentPage extends GeneralPage {
    private pageUrl = `${Constants.bmsBaseUrl}/segments`;
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
