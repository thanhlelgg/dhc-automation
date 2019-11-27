import { action, gondola, locator, page } from 'gondolajs';
import { Constants } from '../common/constants';
import { translate } from '../locales/translate';
import { ProtractorBrowser } from 'protractor';
import { Utilities } from '../common/utilities';

@page
export class GeneralPage {
    protected translator = translate.getTranslator();
    @locator
    protected pageTitle = { css: '.page-title' };
    @locator
    protected captionSubject = { css: '.page-title-text' };
    @locator
    protected homeLink = "//a[.='ホーム']";
    @locator
    protected businessSystemLink = "//a[.='営業管理']";
    @locator
    protected taskSystemLink = "//a[.='業務管理']";
    @locator
    protected invalidFeedBackByFieldLabel = "//div[label[text()='{0}']]//div[@class='invalid-feedback']";
    @locator
    protected textFieldByLabel = "//div[label[text()='{0}']]//input[@type='text']";
    @locator
    protected moduleTitle = "//h5[@class='modal-title' and text()='{0}']";
    @locator
    protected closeModuleButtonByName = "//div[h5[text()='{0}']]//span[text()='×']";

    @action('gotoHome')
    public async gotoHome(): Promise<void> {
        await this.waitControlExist(this.homeLink, 10);
        await gondola.click(this.homeLink);
    }

    @action('gotoBusinessSystem')
    public async gotoBusinessSystem(): Promise<void> {
        await this.waitControlExist(this.businessSystemLink, 10);
        await gondola.click(this.businessSystemLink);
    }

    @action('gotoTaskSystem')
    public async gotoTaskSystem(): Promise<void> {
        await this.waitControlExist(this.taskSystemLink, 10);
        await gondola.click(this.taskSystemLink);
    }

    @action('openWebsite')
    public async openWebsite(): Promise<void> {
        await gondola.navigate(Constants.url);
        await gondola.maximize();
    }

    @action('enterText')
    public async enterText(inputControl: any, text: string): Promise<void> {
        /* await gondola.enter(inputControl, text);
        let popupExist = await (gondola as any).doesPopupExist();
        if (popupExist){
            await gondola.clickPopup("ok");
            await gondola.enter(inputControl, text);
        }    */

        await (gondola as any).controlPopupAndEnterText(inputControl, text);
    }

    @action('waitControlExist')
    public async waitControlExist(control: any, seconds = Constants.MEDIUM_TIMEOUT): Promise<void> {
        let controlExist = await gondola.doesControlExist(control);
        let timeCount = 0;
        while (!controlExist && timeCount < seconds) {
            await gondola.wait(1);
            timeCount++;
            controlExist = await gondola.doesControlExist(control);
        }
    }

    @action('getCurrentBrowser')
    public async getCurrentBrowser(): Promise<ProtractorBrowser> {
        return await (gondola as any).getCurrentBrowser();
    }

    @action('getInvalidFeedBack')
    public async getInvalidFeedBack(fieldName: string): Promise<string> {
        const locator = Utilities.formatString(this.invalidFeedBackByFieldLabel, fieldName);
        return await gondola.getText(locator);
    }

    @action('enterTextFieldByLabel')
    public async enterTextFieldByLabel(label: string, text: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.enter(locator, text);
    }

    @action('enterTextFieldByLabel')
    public async getTextFieldValueByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        return await (gondola as any).getElementAttribute(locator, 'value');
    }

    @action('clickTextFieldByLabel')
    public async clickTextFieldByLabel(label: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.click(locator);
    }

    @action('doesModalTitleDisplay')
    public async doesModalTitleDisplay(name: string, timeOut = Constants.LONG_TIMEOUT): Promise<boolean> {
        const locator = Utilities.formatString(this.moduleTitle, name);
        this.waitControlExist(locator, timeOut);
        return await (gondola as any).doesControlDisplay(locator);
    }

    @action('closeModalWindowByName')
    public async closeModalWindowByName(name: string): Promise<void> {
        const locator = Utilities.formatString(this.closeModuleButtonByName, name);
        this.waitControlExist(locator, Constants.LONG_TIMEOUT);
        gondola.click(locator);
    }

    @action("getSelectedOption")
    public async getSelectedOption(selectControl: any): Promise<string> {
        return await gondola.getControlProperty(selectControl + "/option[@selected='selected']", "text");
    }

    @action("getTextBoxValue")
    public async getTextBoxValue(inputControl: any): Promise<string> {
        return await gondola.getControlProperty(inputControl, "value");
    }

    @action("getCheckboxValue")
    public async getCheckboxValue(checkboxControl: any): Promise<boolean> {
        let value = await gondola.getControlProperty(checkboxControl, "value");
        if (value === "1") {
            return true;
        } else {
            return false;
        }
    }
}
export default new GeneralPage();
