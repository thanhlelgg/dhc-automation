import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import { action } from 'gondolajs';

const MASTER_DATA_MANAGEMENT = Constants.translator.verticalMenuTMS.masterDataManagement.title;
const USER_MANAGEMENT = Constants.translator.verticalMenuTMS.userManagement.title;

class TalentManagementMenu extends GeneralPage {
    public async gotoPositionsPage(): Promise<void> {
        await this.clickMenuLinkByTitle(MASTER_DATA_MANAGEMENT);
        await this.clickMenuLinkByTitle(Constants.translator.verticalMenuTMS.masterDataManagement.positions);
    }
    public async gotoWorkingPlacePage(): Promise<void> {
        await this.clickMenuLinkByTitle(MASTER_DATA_MANAGEMENT);
        await this.clickMenuLinkByTitle(Constants.translator.verticalMenuTMS.masterDataManagement.workingPlace);
    }

    @action('go to user page')
    public async gotoUserPage(): Promise<void> {
        await this.clickMenuLinkByTitle(USER_MANAGEMENT);
        await this.clickMenuLinkByTitle(Constants.translator.verticalMenuTMS.userManagement.addUser);
    }
}
export default new TalentManagementMenu();
