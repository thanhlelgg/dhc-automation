import { action, gondola, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
@page
export class ListPositionPage extends GeneralPage {
    private pageUrl = `${Constants.TTS_BASE_URL}/positions`;
    protected positionLink = "//div[@tabulator-field='position_name']/a[text()='{0}']";

    @action('open Position by name')
    public async openPositionByName(name: string): Promise<void> {
        await gondola.click(this.positionLink.format(name));
    }

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListPositionPage();
