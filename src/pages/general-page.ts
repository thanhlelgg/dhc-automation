import { action, gondola, locator, page } from 'gondolajs';
import { Constants } from '../common/constants';
import { Translate } from '../locales/translate';
import { ProtractorBrowser } from 'protractor';
import { Utilities } from '../common/utilities';
import { Language } from '../models/enum-class/language';
import { ElementType } from '../models/enum-class/element-type';
import { RecordTable } from '../models/enum-class/recordTable';
import { RecordFieldName } from '../models/enum-class/recordFieldName';
import '@src/string.extensions';

@page
export class GeneralPage {
    protected translator = Translate.getTranslator();
    @locator
    protected pageTitle = { css: '.page-title' };
    @locator
    protected captionSubject = { css: '.page-title-text' };
    @locator
    protected homeLink = `//a[.='${this.translator.headerMenu.home}']"`;
    @locator
    protected businessSystemLink = `//a[.='${this.translator.headerMenu.businessSystem}']`;
    @locator
    protected taskSystemLink = `//a[.='${this.translator.headerMenu.businessSystem}']`;
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
    protected recordField = "//{0}[@name='{1}[{2}][{3}]']";
    @locator
    protected saveButton = "//button[@class='btn btn-info']";
    @locator
    protected backButton = `//a[contains(.,'${this.translator.backButton}')]`;
    @locator
    protected labelCheckBox = "//div[@class='custom-control custom-checkbox']//label[contains(.,'{0}')]";

    @action('gotoHome')
    public async gotoHome(): Promise<void> {
        await gondola.waitUntilElementVisible(this.homeLink, 10);
        await gondola.click(this.homeLink);
    }

    @action('gotoBusinessSystem')
    public async gotoBusinessSystem(): Promise<void> {
        await gondola.waitUntilElementVisible(this.businessSystemLink, 10);
        await gondola.click(this.businessSystemLink);
    }

    @action('gotoTaskSystem')
    public async gotoTaskSystem(): Promise<void> {
        await gondola.waitUntilElementVisible(this.taskSystemLink, 10);
        await gondola.click(this.taskSystemLink);
    }

    @action('openWebsite')
    public async openWebsite(): Promise<void> {
        await gondola.navigate(Constants.url);
        await gondola.maximize();
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
        return await gondola.getElementAttribute(locator, 'value');
    }

    @action('enterTextAreaByLabel')
    public async enterTextAreaByLabel(label: string, text: string): Promise<void> {
        const locator = Utilities.formatString(this.textAreaByLabel, label);
        await gondola.enter(locator, text);
    }

    @action('getTextAreaValueByLabel')
    public async getTextAreaValueByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.textAreaByLabel, label);
        return await gondola.getElementAttribute(locator, 'value');
    }

    @action('clickTextFieldByLabel')
    public async clickTextFieldByLabel(label: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(locator);
    }

    @action('click outside textfield')
    public async clickOutsideTextFieldByLabel(label: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.performClick(locator, Constants.SLIGHTLY_RIGHT_OFFSET);
    }

    @action('doesModalTitleDisplay')
    public async doesModalTitleDisplay(name: string, expected = true): Promise<boolean> {
        const locator = Utilities.formatString(this.moduleTitle, name);
        if (expected) {
            await gondola.waitUntilElementVisible(locator, Constants.MEDIUM_TIMEOUT);
        } else {
            await gondola.waitUntilElementNotVisible(locator, Constants.SHORT_TIMEOUT);
        }
        return await gondola.doesControlDisplay(locator);
    }

    @action('closeModalWindowByName')
    public async closeModalWindowByName(name: string): Promise<void> {
        const locator = Utilities.formatString(this.closeModuleButtonByName, name);
        await gondola.waitUntilElementVisible(locator, Constants.LONG_TIMEOUT);
        await gondola.waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(locator);
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
        return await gondola.doesControlDisplay(this.savedMessage);
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
        return await this.doesControlRequired(locator);
    }

    @action('doesControlRequired')
    public async doesControlRequired(control: any): Promise<boolean> {
        return (await gondola.getControlProperty(control, 'class')).indexOf('required') < 0;
    }

    @action('doesSelectorOptionsExist')
    public async doesSelectorOptionsExist(control: any, options: string[]): Promise<boolean> {
        return await gondola.areOptionsExists(control, options);
    }

    @action('doesSelectorByLabelOptionsExist')
    public async doesSelectorByLabelOptionsExist(label: string, options: string[]): Promise<boolean> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        return await gondola.areOptionsExists(locator, options);
    }

    @action('selectSelectorByLabel')
    public async selectSelectorByLabel(label: string, option: string): Promise<void> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        await gondola.select(locator, option);
    }

    @action('selectSelectorByLabel')
    public async getSelectedOptionByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        return await gondola.getSelectedOption(locator);
    }

    @action('set state customized checkbox')
    public async setStateCustomizeCheckbox(control: string, check: boolean): Promise<void> {
        const checkboxStatusLocator = control + "//input[@type='checkbox']";
        const checkboxStatus = await gondola.doesCheckboxChecked(checkboxStatusLocator);
        if (check != checkboxStatus) {
            await gondola.click(control);
        }
    }

    @action('does checkbox label exist')
    public async doesCheckboxLabelExist(label: string): Promise<boolean> {
        const locator = Utilities.formatString(this.labelCheckBox, label);
        return await gondola.doesControlExist(locator);
    }

    public buildRecordFieldXpath(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        fieldType: ElementType,
    ): string {
        return this.recordField.format(fieldType.type, tableName.nameAttr, index.toString(), tableFieldName.nameAttr);
    }

    public async enterRecordField(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        text: string,
        fieldType = ElementType.TEXTFIELD,
    ): Promise<void> {
        const locator = this.buildRecordFieldXpath(tableName, index, tableFieldName, fieldType);
        await gondola.enter(locator, text);
    }

    public async doesRecordFieldExist(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        fieldType = ElementType.TEXTFIELD,
    ): Promise<boolean> {
        const locator = this.buildRecordFieldXpath(tableName, index, tableFieldName, fieldType);
        return await gondola.doesControlExist(locator);
    }

    public async isSelectorByLabelEnabled(label: string): Promise<boolean> {
        return await gondola.isControlEnabled(this.selectorByLabel.format(label));
    }
}
export default new GeneralPage();
