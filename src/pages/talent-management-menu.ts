import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';

const MASTER_DATA_MANAGEMENT = Constants.translator.verticalMenuTMS.masterDataManagement.title;

class TalentManagementMenu extends GeneralPage {
    public async gotoPositionsPage(): Promise<void> {
        await this.clickMenuLinkByTitle(MASTER_DATA_MANAGEMENT);
        await this.clickMenuLinkByTitle(Constants.translator.verticalMenuTMS.masterDataManagement.positions);
    }
}
export default new TalentManagementMenu();
