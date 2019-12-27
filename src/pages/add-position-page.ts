import { page } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';

@page
export class AddPositionPage extends GeneralPage {
    protected pageUrl = 'https://dhctms.digitalhearts.com/positions/add';

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new AddPositionPage();
