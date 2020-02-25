import { action, gondola, locator, page } from 'gondolajs';
import '@src/string.extensions';
import { Constants } from '../common/constants';
import { GeneralPage } from './general-page';
import { protractor } from 'protractor/built/ptor';
import { DatabaseHelper } from '../helper/database-helpers';
@page
export class ListRolePage extends GeneralPage {
    private pageUrl = `${Constants.BMS_BASE_URL}/roles`;
    @locator
    protected addNewButton = { css: '.btn-add-new' };
    @locator
    protected roleNameTextfield = "//input[@name='name']";
    @locator
    protected roleCombobox = "//span[@role='combobox']";
    @locator
    protected roleOptions = "//li[@role='treeitem']";
    @locator
    protected roleOptionByText = "//li[@role='treeitem' and text()='{0}']";
    @locator
    protected roleName = "//span[@class='role-title' and text()='{0}']";
    @locator
    protected roleSaveButton = { css: '.add-new-save' };

    @action('click add new button')
    public async clickAddNewButton(): Promise<void> {
        await gondola.click(this.addNewButton);
    }

    @action('enter role name')
    public async enterRoleName(text: string): Promise<void> {
        await gondola.waitUntilElementVisible(this.roleNameTextfield);
        await gondola.waitUntilStalenessOfElement(this.roleNameTextfield, Constants.SHORT_TIMEOUT);
        await gondola.enter(this.roleNameTextfield, text);
    }

    @action('click role combobox')
    public async clickRoleCombobox(): Promise<void> {
        await gondola.click(this.roleCombobox);
    }

    @action('click save button')
    public async clickSaveRoleButton(): Promise<void> {
        await gondola.click(this.roleSaveButton);
    }

    @action('click save button')
    public async doesRoleExist(roleName: string): Promise<boolean> {
        await gondola.waitUntilElementVisible(this.roleName.format(roleName));
        return await gondola.doesControlDisplay(this.roleName.format(roleName));
    }

    @action('select role')
    public async selectRoles(roles: string[]): Promise<void> {
        await gondola.keyDown(protractor.Key.CONTROL);
        for (const role of roles) {
            await gondola.click(this.roleOptionByText.format(role));
        }
        await gondola.keyUp(protractor.Key.CONTROL);
        await gondola.performClick(this.roleCombobox, Constants.SLIGHTLY_RIGHT_OFFSET);
    }

    @action('select all roles')
    public async selectAllRoles(): Promise<void> {
        await this.clickRoleCombobox();
        const allRoles = await gondola.getElementsAttributes(this.roleOptions, 'innerText');
        await this.selectRoles(allRoles);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('create new role if not exist')
    public async createRoleIfNotExist(roleName: string): Promise<void> {
        if (await DatabaseHelper.doesRoleExist(roleName)) return;
        await this.clickAddNewButton();
        await this.enterRoleName(roleName);
        await this.selectAllRoles();
        await this.clickSaveRoleButton();
        await this.waitForAlertMessage('Success');
    }
}
export default new ListRolePage();
