import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';

const MASTER_DATA_MANAGEMENT = Constants.translator.verticalMenuTTS.masterDataManagement;

class TaskSystemMenu extends GeneralPage {
    public async gotoListSpecialAllowancePage(): Promise<void> {
        await this.gotoPageByMenuButton(MASTER_DATA_MANAGEMENT.title, MASTER_DATA_MANAGEMENT.specialAllowance);
    }

    public async gotoListPositionPage(): Promise<void> {
        await this.gotoPageByMenuButton(MASTER_DATA_MANAGEMENT.title, MASTER_DATA_MANAGEMENT.position);
    }
}
export default new TaskSystemMenu();
