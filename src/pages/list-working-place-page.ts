import { page, action } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { Constants } from '../common/constants';

@page
export class AddWorkingPlacePage extends GeneralPage {
    protected pageUrl = `${Constants.tmsBaseUrl}/working-place`;

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new AddWorkingPlacePage();
