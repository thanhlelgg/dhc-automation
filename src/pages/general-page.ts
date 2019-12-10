import { action, gondola, locator, page } from 'gondolajs';
import { Constants } from '../common/constants';
import { Translate } from '../locales/translate';
import { ProtractorBrowser } from 'protractor';
import { Utilities } from '../common/utilities';
import { Language } from '../models/enum-class/language';

@page
export class GeneralPage {
    protected translator = Translate.getTranslator();
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
    protected textAreaByLabel = "//div[label[text()='{0}']]//textarea";
    @locator
    protected selectorByLabel = "//div[label[text()='{0}']]//select";
    @locator
    protected moduleTitle = "//h5[@class='modal-title' and text()='{0}']";
    @locator
    protected closeModuleButtonByName = "//div[h5[text()='{0}']]//span[text()='×']";
    @locator
    protected savedMessage = "//div[@role='alert'  and text()='saved']";
    @locator
    protected currentLanguage = { css: '.langname' };
    @locator
    protected languageOption = "//a[@class='changeFlag' and contains(@href, '{0}')]";
    @locator
    protected labelByName = "//div[label[text()='{0}']]";
    @locator
    protected saveButton = "//button[@class='btn btn-info']";
    @locator
    protected backButton = `//a[contains(.,'${this.translator.backButton}')]`;

    protected labelCheckBox = "//div[@class='custom-control custom-checkbox']//label[contains(.,'{0}')]";

    @action('gotoHome')
    public async gotoHome(): Promise<void> {
        await this.waitForControlVisible(this.homeLink, 10);
        await gondola.click(this.homeLink);
    }

    @action('gotoBusinessSystem')
    public async gotoBusinessSystem(): Promise<void> {
        await this.waitForControlVisible(this.businessSystemLink, 10);
        await gondola.click(this.businessSystemLink);
    }

    @action('gotoTaskSystem')
    public async gotoTaskSystem(): Promise<void> {
        await this.waitForControlVisible(this.taskSystemLink, 10);
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
    public async waitForControlVisible(control: any, seconds = Constants.MEDIUM_TIMEOUT): Promise<void> {
        let controlExist = await gondola.doesControlExist(control);
        let timeCount = 0;
        while (!controlExist && timeCount < seconds) {
            console.log(`Waiting for control ${timeCount} seconds`);
            await gondola.wait(1);
            timeCount++;
            controlExist = await gondola.doesControlExist(control);
        }
        // We should wait until element exist first, before waiting for it to be displayed
        const currentTime = Utilities.currentTimeInSeconds();
        await gondola.waitForElement(control, seconds);
        seconds = seconds - (Utilities.currentTimeInSeconds() - currentTime);
        if (seconds > 0) {
            await (gondola as any).waitUntilElementVisible(control, seconds);
        }
    }

    @action('getCurrentBrowser')
    public async getCurrentBrowser(): Promise<ProtractorBrowser> {
        return await (gondola as any).getCurrentBrowser();
    }

    @action('getInvalidFeedBack')
    public async getInvalidFeedBack(fieldName: string): Promise<string> {
        const locator = Utilities.formatString(this.invalidFeedBackByFieldLabel, fieldName);
        const doesExist = await gondola.doesControlExist(locator);
        if (!doesExist) {
            gondola.report('Invalid feedback of field ' + fieldName + ' does not exist!');
            return '';
        } else {
            return await gondola.getText(locator);
        }
    }

    @action('enterTextFieldByLabel')
    public async enterTextFieldByLabel(label: string, text: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.enter(locator, text);
    }

    @action('getTextFieldValueByLabel')
    public async getTextFieldValueByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        return await (gondola as any).getElementAttribute(locator, 'value');
    }

    @action('enterTextAreaByLabel')
    public async enterTextAreaByLabel(label: string, text: string): Promise<void> {
        const locator = Utilities.formatString(this.textAreaByLabel, label);
        await gondola.enter(locator, text);
    }

    @action('getTextAreaValueByLabel')
    public async getTextAreaValueByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.textAreaByLabel, label);
        return await (gondola as any).getElementAttribute(locator, 'value');
    }

    @action('clickTextFieldByLabel')
    public async clickTextFieldByLabel(label: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.click(locator);
    }

    @action('click outside textfield')
    public async clickOutsideTextFieldByLabel(label: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await (gondola as any).performClick(locator, Constants.SLIGHTLY_RIGHT_OFFSET);
    }

    @action('doesModalTitleDisplay')
    public async doesModalTitleDisplay(name: string, timeOut = Constants.LONG_TIMEOUT): Promise<boolean> {
        const locator = Utilities.formatString(this.moduleTitle, name);
        await (gondola as any).waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        this.waitForControlVisible(locator, timeOut);
        return await (gondola as any).doesControlDisplay(locator);
    }

    @action('closeModalWindowByName')
    public async closeModalWindowByName(name: string): Promise<void> {
        const locator = Utilities.formatString(this.closeModuleButtonByName, name);
        this.waitForControlVisible(locator, Constants.LONG_TIMEOUT);
        gondola.click(locator);
    }

    @action('getSelectedOption')
    public async getSelectedOption(selectControl: any): Promise<string> {
        return await gondola.getControlProperty(selectControl + "/option[@selected='selected']", 'text');
    }

    @action('getTextBoxValue')
    public async getTextBoxValue(inputControl: any): Promise<string> {
        return await gondola.getControlProperty(inputControl, 'value');
    }

    @action('getCheckboxValue')
    public async getCheckboxValue(checkboxControl: any, checkByValue = true): Promise<boolean> {
        if (checkByValue) {
            const value = await gondola.getControlProperty(checkboxControl, 'value');
            if (value === '1') {
                return true;
            } else {
                return false;
            }
        } else {
            const isChecked = await gondola.getControlProperty(checkboxControl, 'checked');
            if (isChecked === 'true') {
                return true;
            } else {
                return false;
            }
        }
    }

    @action('doesSavedMessageDisplay')
    public async doesSavedMessageDisplay(): Promise<boolean> {
        return await (gondola as any).doesControlDisplay(this.savedMessage);
    }

    @action('chooseLanguage')
    public async chooseLanguage(language: Language | string | undefined): Promise<void> {
        if (!language) {
            throw new Error('Language is not selected. Please try again.');
        }
        if (typeof language === 'string') {
            language = Language.getLanguage(language);
        }
        const currentLanguage = (await gondola.getText(this.currentLanguage)).trim();
        if (currentLanguage === language.toString()) {
            return;
        }
        await gondola.click(this.currentLanguage);
        const languageOption = Utilities.formatString(this.languageOption, language.href);
        await gondola.click(languageOption);
    }

    @action('doesLabelRequired')
    public async doesFieldRequired(name: string): Promise<boolean> {
        const locator = Utilities.formatString(this.labelByName, name);
        return (await gondola.getControlProperty(locator, 'class')).indexOf('required') < 0;
    }

    @action('doesControlRequired')
    public async doesControlRequired(control: any): Promise<boolean> {
        return (await gondola.getControlProperty(control, 'class')).indexOf('required') < 0;
    }

    @action('doesSelectorOptionsExist')
    public async doesSelectorOptionsExist(control: any, options: string[]): Promise<boolean> {
        return await (gondola as any).areOptionsExists(control, options);
    }

    @action('doesSelectorByLabelOptionsExist')
    public async doesSelectorByLabelOptionsExist(label: string, options: string[]): Promise<boolean> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        return await (gondola as any).areOptionsExists(locator, options);
    }

    @action('selectSelectorByLabel')
    public async selectSelectorByLabel(label: string, option: string): Promise<void> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        await gondola.select(locator, option);
    }

    @action('selectSelectorByLabel')
    public async getSelectedOptionByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        return (await gondola.getSelectedItems(locator))[0];
    }

    @action('does checkbox label exist')
    public async doesCheckboxLabelExist(label: string): Promise<boolean> {
        const locator = Utilities.formatString(this.labelCheckBox, label);
        return await gondola.doesControlExist(locator);
    }

    @action('clickOutsideOfWindowModal')
    public async clickOutsideOfWindowModal(): Promise<void> {
        //await gondola.click(this.saveButton);
        await (gondola as any).performClick(this.saveButton);
    }
}
export default new GeneralPage();
