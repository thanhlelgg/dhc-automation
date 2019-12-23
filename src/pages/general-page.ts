import { action, gondola, locator, page } from 'gondolajs';
import { Constants } from '../common/constants';
import { Translate } from '../locales/translate';
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
    protected textFieldByPlaceHolder = "//input[@type='text' and @placeholder='{0}']";
    @locator
    protected textAreaByLabel = "//div[label[text()='{0}']]//textarea";
    @locator
    protected selectorByLabel = "//div[label[text()='{0}']]//select";
    @locator
    protected radioButtonByLabel = "//div[label[text()='{0}']]//label[input[@type='radio']]";
    @locator
    protected radioButtonOptionByLabel = "//div[label[text()='{0}']]//label[input[@type='radio'] and text()='{1}']";
    @locator
    protected checkboxByLabel = "//div[contains(@class, 'custom-checkbox')]/label[text()='{0}']";
    @locator
    protected checkboxInputByLabel =
        "//div[contains(@class, 'custom-checkbox')][label[text()='{0}']]/input[@type='checkbox']";
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
    protected returnButton = { css: '.btn-secondary' };
    @locator
    protected saveButton = "//button[@class='btn btn-info']";
    @locator
    protected backButton = `//a[contains(.,'${this.translator.backButton}')]`;
    @locator
    protected searchButton = "//button[@type='submit'][i[@class='fa fa-search']]";
    @locator
    protected labelCheckBox = "//div[@class='custom-control custom-checkbox']//label[contains(.,'{0}')]";

    @locator
    protected searchResultText = `//div[@class='paginator']//p`;
    @locator
    protected inputGroupByName = "//div[div[@class='input-group-append']/span[normalize-space()='{0}']]/input";
    @locator
    protected sectionName = "//div[@class='page-sub-title' and text()='{0}']";
    @locator
    protected pagingLastPage = "//li[@class='page-item last']";
    @locator
    protected modalWindowByName = "//div[@class='modal-content' and .//h5[text()='{0}']]";
    @locator
    protected modalWindowLoading =
        "//div[@class='modal-content' and .//h5[text()='{0}']]//div[contains(@id, 'loading')]";

    protected async isCurrentPage(pageUrl: string): Promise<boolean> {
        return (await gondola.getCurrentUrl()) === pageUrl;
    }

    @action('gotoHome')
    public async gotoHome(): Promise<void> {
        await gondola.waitUntilElementVisible(this.homeLink, Constants.MEDIUM_TIMEOUT);
        await gondola.click(this.homeLink);
    }

    @action('gotoBusinessSystem')
    public async gotoBusinessSystem(): Promise<void> {
        await gondola.waitUntilElementVisible(this.businessSystemLink, Constants.MEDIUM_TIMEOUT);
        await gondola.click(this.businessSystemLink);
    }

    @action('gotoTaskSystem')
    public async gotoTaskSystem(): Promise<void> {
        await gondola.waitUntilElementVisible(this.taskSystemLink, Constants.MEDIUM_TIMEOUT);
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
    public async enterTextFieldByLabel(label: string, text: string | undefined): Promise<void> {
        if (text) {
            await gondola.enter(this.textFieldByLabel.format(label), text);
        }
    }

    @action('getTextFieldValueByLabel')
    public async getTextFieldValueByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        return await gondola.getElementAttribute(locator, 'value');
    }

    @action('enterTextAreaByLabel')
    public async enterTextAreaByLabel(label: string, text: string | undefined): Promise<void> {
        if (text) {
            await gondola.enter(this.textAreaByLabel.format(label), text);
        }
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
            return value === '1';
        } else {
            const isChecked = await gondola.getControlProperty(checkboxControl, 'checked');
            return isChecked === 'true';
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
    public async selectSelectorByLabel(label: string, option: string | undefined): Promise<void> {
        if (!option) {
            return;
        }
        const locator = Utilities.formatString(this.selectorByLabel, label);
        await gondola.select(locator, option);
    }

    @action('selectSelectorByLabel')
    public async getSelectedOptionByLabel(label: string): Promise<string> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        return await gondola.getSelectedOption(locator);
    }

    /**
     * Set state of DH customized checkbox
     * @param control
     * @param check boolean, check or uncheck
     * @param checkboxStatusLocator: locator of checkbox status, if not provided, assume it's the child checkbox input
     */
    @action('set state customized checkbox')
    public async setStateCustomizeCheckbox(
        control: string,
        check: boolean,
        checkboxStatusLocator?: string,
    ): Promise<void> {
        if (!checkboxStatusLocator) {
            checkboxStatusLocator = control + "//input[@type='checkbox']";
        }
        const checkboxStatus = await gondola.doesCheckboxChecked(checkboxStatusLocator);
        if (check != checkboxStatus) {
            await gondola.click(control);
        }
    }

    public async getCheckboxStateByLabel(label: string): Promise<boolean> {
        return await gondola.doesCheckboxChecked(this.checkboxInputByLabel.format(label));
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
        await gondola.waitForElementSoftly(locator, Constants.SHORT_TIMEOUT);
        await gondola.enter(locator, text);
    }

    public async getTextRecordField(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        fieldType = ElementType.TEXTFIELD,
    ): Promise<string> {
        const locator = this.buildRecordFieldXpath(tableName, index, tableFieldName, fieldType);
        return await gondola.getControlProperty(locator, 'value');
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

    public async enterTextfieldByPlaceholder(placeholder: string, text: string | undefined): Promise<void> {
        if (text) {
            await gondola.enter(this.textFieldByPlaceHolder.format(placeholder), text);
        }
    }

    public async getTextfieldValueByPlaceholder(placeholder: string): Promise<string> {
        return await gondola.getControlProperty(this.textFieldByPlaceHolder.format(placeholder), 'value');
    }

    @action('verify page display by url')
    public async verifyPageDisplayByUrl(pageUrl: string): Promise<boolean> {
        const currentUrl = await gondola.getCurrentUrl();
        return Utilities.isTextEqual(currentUrl, pageUrl);
    }

    @action('get number of search result resords')
    public async getNumberOfSearchResultRecords(): Promise<number> {
        const resultString = await gondola.getText(this.searchResultText);
        return Utilities.getNumberOfSearchResultRecords(resultString);
    }

    @action('get number of search result pages')
    public async getNumberOfSearchResultPages(): Promise<number> {
        const resultString = await gondola.getText(this.searchResultText);
        return Utilities.getNumberOfSearchResultPages(resultString);
    }

    public async doesRadioButtonOptionsExist(label: string, options: string[]): Promise<boolean> {
        const radioButtonNames = await gondola.getElementsAttributes(
            this.radioButtonByLabel.format(label),
            'innerText',
        );
        return Utilities.compareArrays(radioButtonNames, options);
    }

    public async selectRadioButtonByLabel(label: string, option: string | undefined): Promise<void> {
        if (option) {
            await gondola.click(this.radioButtonOptionByLabel.format(label, option));
        }
    }

    public async isRadioButtonByLabelSelected(label: string, option: string): Promise<boolean> {
        return await gondola.doesCheckboxChecked(this.radioButtonOptionByLabel.format(label, option) + '//input');
    }

    public async isTextFieldNumeric(control: any): Promise<boolean> {
        return (await gondola.getControlProperty(control, 'type')) === 'number';
    }

    public async doesInputGroupByNameDisplay(name: string): Promise<boolean> {
        return await gondola.doesControlDisplay(this.inputGroupByName.format(name));
    }

    public async isInputGroupByNameNumeric(name: string): Promise<boolean> {
        return await this.isTextFieldNumeric(this.inputGroupByName.format(name));
    }

    public async enterInputGroupByName(name: string, text: string | undefined): Promise<void> {
        if (text) {
            await gondola.enter(this.inputGroupByName.format(name), text);
        }
    }

    public async getTextInputGroupByName(name: string): Promise<string> {
        return await gondola.getControlProperty(this.inputGroupByName.format(name), 'value');
    }

    public async setStateCheckboxByLabel(label: string, checked: boolean | undefined): Promise<void> {
        if (checked === undefined) {
            return;
        }
        await this.setStateCustomizeCheckbox(
            this.checkboxByLabel.format(label),
            checked,
            this.checkboxInputByLabel.format(label),
        );
    }

    public async doesSectionDisplay(name: string): Promise<boolean> {
        return await gondola.doesControlDisplay(this.sectionName.format(name));
    }

    public async clickReturnButton(): Promise<void> {
        await gondola.click(this.returnButton);
    }

    public async clickSearchButton(): Promise<void> {
        await gondola.click(this.searchButton);
    }

    public async clickPagingLastPage(): Promise<void> {
        await gondola.click(this.pagingLastPage);
    }

    @action('wait for search window fully loaded')
    public async waitForLoadingIconDisappear(modalName: string): Promise<void> {
        const locator = Utilities.formatString(this.modalWindowLoading, modalName);
        await gondola.waitUntilElementNotVisible(locator, Constants.LONG_TIMEOUT);
    }

    @action('clickOutsideOfWindowModal')
    public async clickOutsideOfWindowModal(modalName: string): Promise<void> {
        const locator = Utilities.formatString(this.modalWindowByName, modalName);
        await this.waitForLoadingIconDisappear(modalName);
        await gondola.performClick(locator, Constants.SLIGHTLY_RIGHT_OFFSET);
    }
}
export default new GeneralPage();
