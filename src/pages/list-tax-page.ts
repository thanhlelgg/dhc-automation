import { action, gondola, page, locator } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import '@src/string.extensions';
import utilities, { Utilities } from '../common/utilities';

@page
export class ListTaxPage extends GeneralPage {
    @locator
    private pageUrl = `${Constants.BMS_BASE_URL}/taxes`;
    @locator
    protected taxLink = "//div[@tabulator-field='code']/a[text()='{0}']";
    @locator
    protected deleteButton = "//a[text()='{0}']/../..//div[@tabulator-field='delete']//a";
    @locator
    protected couldNotDeleteMessage = '選択した税率 {0} は案件の明細情報で使用されているため削除できません。';
    @locator
    protected couldDeleteMessage = '税率 {0} を削除しました。';

    @action('getTextCouldNotDelete')
    public getTextCouldNotDelte(text: string): string {
        return Utilities.formatString(this.couldNotDeleteMessage, text);
    }

    @action('getTextCouldDelete')
    public getTextCouldDelete(text: string): string {
        return Utilities.formatString(this.couldDeleteMessage, text);
    }

    @action('openCustomerByName')
    public async openTaxByCode(name: string): Promise<void> {
        await gondola.click(this.taxLink.format(name));
    }

    @action('click on delete button')
    public async clickOnDeleteButton(projectId: string): Promise<void> {
        const locator = Utilities.formatString(this.deleteButton, projectId);
        await gondola.click(locator);
    }

    @action('isCurrentPage')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('checkControlExist')
    public async checkControlExist(): Promise<void> {
        await gondola.checkControlNotExist(this.deleteButton);
    }
}
export default new ListTaxPage();
