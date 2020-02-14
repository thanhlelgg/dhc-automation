import { action, gondola, page, locator } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import '@src/string.extensions';
import { TableHelper } from '../helper/table-helper';

@page
export class ListUserPage extends GeneralPage {
    @locator
    private pageUrl = `${Constants.BMS_BASE_URL}/users`;
    @locator
    protected usersTable = "//div[@id='data-table']";
    private userTableHelper = new TableHelper(this.usersTable);
    private tableColumnName = Constants.translator.columnName.usersList;

    @action('does user exist')
    public async doesUserExist(userName: string): Promise<boolean> {
        return await this.userTableHelper.doesRowValueExists(this.tableColumnName.loginId, userName);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new ListUserPage();
