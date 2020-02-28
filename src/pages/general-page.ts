import { action, gondola, locator, page } from 'gondolajs';
import { Constants } from '../common/constants';
import { Translate } from '../locales/translate';
import { Utilities } from '../common/utilities';
import { Language } from '../models/enum-class/language';
import { ElementType } from '../models/enum-class/element-type';
import { RecordTable } from '../models/enum-class/recordTable';
import { RecordFieldName } from '../models/enum-class/recordFieldName';
import '@src/string.extensions';
import { ButtonIcon } from '../models/enum-class/button-icon';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import { SearchResultColumn } from '../models/enum-class/search-result-column';

@page
export class GeneralPage {
    protected translator = Translate.getTranslator();
    @locator
    protected menuButtonByText = "//li[a[span[normalize-space()='{0}']] or @title='{0}']";
    @locator
    protected pageTitle = "//h1[@class = 'page-title' and normalize-space()='{0}']";
    @locator
    protected captionSubject = { css: '.page-title-text' };
    @locator
    protected homeLink = `//a[.='${this.translator.headerMenu.home}']"`;
    @locator
    protected businessSystemLink = `//a[.='${this.translator.headerMenu.businessSystem}']`;
    @locator
    protected taskSystemLink = `//a[.='${this.translator.headerMenu.taskSystem}']`;
    @locator
    protected talentManagementLink = `//a[.='${this.translator.headerMenu.home}']`;
    @locator
    protected invalidFeedBackByFieldLabel =
        "//div[label[normalize-space()='{0}']]//div[@class='invalid-feedback' or @class='error-message']";
    @locator
    protected invalidFeedBackByFieldLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//div[@class='invalid-feedback' or @class='error-message']";
    @locator
    protected helpBlockErrorByLabel = "//div[label[normalize-space()='{0}']]//span[contains(@class,'help-block')]";
    @locator
    protected helpBlockErrorByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//span[contains(@class,'help-block')]";
    @locator
    protected textFieldByLabel =
        "//div[label[normalize-space()='{0}']]//input[@type='text' or @type='number' or @type='password' or @type='email']";
    @locator
    protected textFieldByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//input[@type='text' or @type='password' or @type='number' or @type='email']";
    @locator
    protected paragraphByLabel = "//div[label[normalize-space()='{0}']]//p";
    @locator
    protected paragraphByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//p";
    @locator
    protected spanByLabel = "//div[label[normalize-space()='{0}']]//span";
    @locator
    protected spanByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//span";
    @locator
    protected textFieldByPlaceHolder = "//input[@type='text' and @placeholder='{0}']";
    @locator
    protected textAreaByPlaceHolder = "//textarea[@placeholder='{0}']";
    @locator
    protected textAreaByLabel = "//div[label[normalize-space()='{0}']]//textarea";
    @locator
    protected textAreaByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//textarea";
    @locator
    protected selectorByLabel = "//div[label[normalize-space()='{0}']]//select";
    @locator
    protected selectorByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//select";
    @locator
    protected radioButtonByLabel =
        "//div[label[normalize-space()='{0}']]//label[input[@type='radio'] or ./preceding-sibling::input[@type='radio']]";
    @locator
    protected radioButtonByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//label[input[@type='radio'] or ./preceding-sibling::input[@type='radio']]";
    @locator
    protected radioButtonOptionByLabel =
        "//div[label[normalize-space()='{0}']]//label[(input[@type='radio'] or ./preceding-sibling::input[@type='radio']) and normalize-space()='{1}']";
    @locator
    protected radioButtonOptionByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//label[(input[@type='radio'] or ./preceding-sibling::input[@type='radio']) and normalize-space()='{1}']";
    @locator
    protected modalDialog = { xpath: "//div[@class='modal']" };
    @locator
    protected modalTitle = { xpath: "//h5[@class='modal-title']" };
    @locator
    protected modalTitleByText = "//h5[@class='modal-title' and normalize-space()='{0}']";
    @locator
    protected checkboxByLabel = "//div[contains(@class, 'custom-checkbox')]/label[normalize-space()='{0}']";
    @locator
    protected checkboxByLabelPartialMatch = "//div[contains(@class, 'custom-checkbox')]/label[contains(text(),'{0}')]";
    @locator
    protected checkboxInputByLabel =
        "//div[contains(@class, 'custom-checkbox')][label[normalize-space()='{0}']]/input[@type='checkbox']";
    @locator
    protected checkboxInputByLabelPartialMatch =
        "//div[contains(@class, 'custom-checkbox')][label[contains(text(),'{0}')]]/input[@type='checkbox']";
    @locator
    protected closeModuleButtonByName = "//div[h5[normalize-space()='{0}']]//span[normalize-space()='×']";
    @locator
    protected savedMessage = "//div[@role='alert'  and text()='saved']";
    @locator
    protected alertMessage = "//div[@role='alert'  and text()='{0}']";
    @locator
    protected currentLanguage = { css: '.langname' };
    @locator
    protected languageOption = "//a[@class='changeFlag' and contains(@href, '{0}')]";
    @locator
    protected labelByName = "//div/label[normalize-space()='{0}']";
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
    protected addButton = "//a[i[@class='fa fa-plus']]";
    @locator
    protected labelCheckBox = "//div[@class='custom-control custom-checkbox']//label[contains(.,'{0}')]";

    @locator
    protected searchResultText = `//div[@class='paginator']//p`;
    @locator
    protected inputGroupByName = "//div[div[@class='input-group-append']/span[normalize-space()='{0}']]/input";
    @locator
    protected sectionName = "//div[@class='page-sub-title' and normalize-space()='{0}']";
    @locator
    protected pagingLastPage = "//li[@class='page-item last']";
    @locator
    protected modalWindowByName = "//div[@class='modal-content' and .//h5[normalize-space()='{0}']]";
    @locator
    protected modalWindowLoading =
        "//div[@class='modal-content' and .//h5[normalize-space()='{0}']]//div[contains(@id, 'loading')]";
    @locator
    protected menuLinkByTitle = "//a[span[@class='title' and normalize-space()='{0}']]";
    @locator
    protected buttonByIcon = "//*[contains(@class, 'btn') and i[contains(@class,'{0}')]]";
    @locator
    protected selectSelectionSpnByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//span[@role='combobox']";
    @locator
    protected selectSelectionSpnByLabel = "//div[label[normalize-space()='{0}']]//span[@role='combobox']";
    @locator
    protected selectSelectionSearchField = "//input[@type='search']";
    @locator
    protected selectSelectionOptions = "//li[@class='select2-results__option']";
    @locator
    protected selectSelectionLoadingResults = "//li[contains(@class, 'loading-results')]";
    @locator
    protected selectSelectionOptionByTextPartialMatch =
        "//li[contains(@class, 'results__option') and contains(text(),'{0}')]";
    @locator
    protected selectSelectionOptionByText = "//li[contains(@class, 'results__option') and normalize-space()='{0}']";
    @locator
    protected selectSelectionSelectedItemByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//span[contains(@class, 'selection__rendered')]";
    @locator
    protected selectSelectionSelectedItemByLabel =
        "//div[label[normalize-space()='{0}']]//span[contains(@class, 'selection__rendered')]";
    @locator
    protected selectSelectionClearButtonByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//span[contains(@class, 'selection__clear')]";
    @locator
    protected selectSelectionClearButtonByLabel =
        "//div[label[normalize-space()='{0}']]//span[contains(@class, 'selection__clear')]";
    @locator
    protected tabularTableLinkByText = "//div[@tabulator-field='{0}']/a[normalize-space()='{1}']";
    @locator
    protected fileUpload = "//input[@type='file']";

    @action('upload file')
    public async uploadFile(filePath: string): Promise<void> {
        await gondola.sendKeys(this.fileUpload, filePath);
    }

    @action('upload file')
    public async getUploadedFileName(): Promise<string> {
        await gondola.waitUntilTextAvailable(this.fileUpload);
        const fullPath = await gondola.getElementAttribute(this.fileUpload, 'value');
        return fullPath.replace('C:\\fakepath\\', '');
    }

    @action('is current page')
    protected async isCurrentPage(pageUrl: string): Promise<boolean> {
        return (await gondola.getCurrentUrl()) === pageUrl;
    }

    @action('is details page')
    protected async isDetailsPage(pageUrl: string): Promise<boolean> {
        return (await gondola.getCurrentUrl()).startsWith(pageUrl);
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

    @action('go to talent management')
    public async gotoTalentManagement(): Promise<void> {
        if (await gondola.doesControlExist(this.talentManagementLink)) {
            await gondola.click(this.talentManagementLink);
        }
    }

    @action('openWebsite')
    public async openWebsite(): Promise<void> {
        await gondola.navigate(Constants.LOGIN_URL);
        await gondola.maximize();
    }

    @action('getInvalidFeedBack')
    public async getInvalidFeedBack(fieldName: string, partial = false): Promise<string> {
        let locator = partial ? this.invalidFeedBackByFieldLabelPartialMatch : this.invalidFeedBackByFieldLabel;
        locator = locator.format(fieldName);
        const doesExist = await gondola.doesControlExist(locator);
        if (!doesExist) {
            gondola.report('Invalid feedback of field ' + fieldName + ' does not exist!');
            return '';
        } else {
            return await gondola.getText(locator);
        }
    }

    @action('getInvalidFeedBack')
    public async getHelpBlockError(fieldName: string, partial = false): Promise<string> {
        const dynamicLocator = partial ? this.helpBlockErrorByLabelPartialMatch : this.helpBlockErrorByLabel;
        const locator = dynamicLocator.format(fieldName);
        await gondola.waitUntilElementVisible(locator, Constants.SHORT_TIMEOUT);
        const doesExist = await gondola.doesControlExist(locator);
        if (!doesExist) {
            gondola.report('Invalid feedback of field ' + fieldName + ' does not exist!');
            return '';
        } else {
            return await gondola.getText(locator);
        }
    }

    @action('enterTextFieldByLabel')
    public async waitForStalenessOfTextFieldByLabel(label: string, partial = false): Promise<void> {
        const locator = partial ? this.textFieldByLabelPartialMatch : this.textFieldByLabel;
        await gondola.waitUntilStalenessOfElement(locator.format(label), Constants.VERY_SHORT_TIMEOUT);
    }

    @action('enterTextFieldByLabel')
    public async enterTextFieldByLabel(label: string, text: any | undefined, partial = false): Promise<void> {
        const locator = partial ? this.textFieldByLabelPartialMatch : this.textFieldByLabel;
        if (text != undefined) {
            await gondola.enter(locator.format(label), text);
        }
    }

    @action('getTextFieldValueByLabel')
    public async getTextFieldValueByLabel(label: string, partialMatch = false): Promise<string> {
        const locator = partialMatch
            ? Utilities.formatString(this.textFieldByLabelPartialMatch, label)
            : Utilities.formatString(this.textFieldByLabel, label);
        await gondola.waitUntilElementVisible(locator);
        return await gondola.getElementAttribute(locator, 'value');
    }

    @action('getParagraphValueByLabel')
    public async getParagraphValueByLabel(label: string, partialMatch = false): Promise<string> {
        const locator = partialMatch
            ? Utilities.formatString(this.paragraphByLabelPartialMatch, label)
            : Utilities.formatString(this.paragraphByLabel, label);
        return await gondola.getText(locator);
    }

    @action('getSpanValueByLabel')
    public async getSpanValueByLabel(label: string, partialMatch = false): Promise<string> {
        const locator = partialMatch
            ? Utilities.formatString(this.spanByLabelPartialMatch, label)
            : Utilities.formatString(this.spanByLabel, label);
        return await gondola.getText(locator);
    }

    @action('enterTextAreaByLabel')
    public async enterTextAreaByLabel(label: string, text: any | undefined, partial = false): Promise<void> {
        const locator = partial ? this.textAreaByLabelPartialMatch : this.textAreaByLabel;
        if (text) {
            await gondola.enter(locator.format(label), text);
        }
    }

    @action('getTextAreaValueByLabel')
    public async getTextAreaValueByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.textAreaByLabelPartialMatch : this.textAreaByLabel;
        return await gondola.getElementAttribute(locator.format(label), 'value');
    }

    @action('clickTextFieldByLabel')
    public async clickTextFieldByLabel(label: string, partial = false): Promise<void> {
        const locator = partial ? this.textFieldByLabelPartialMatch : this.textFieldByLabel;
        await gondola.waitUntilStalenessOfElement(locator.format(label), Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(locator.format(label));
    }

    @action('click outside textfield')
    public async clickOutsideTextFieldByLabel(label: string, partial = false): Promise<void> {
        const locator = partial ? this.textFieldByLabelPartialMatch : this.textFieldByLabel;
        await gondola.performClick(locator.format(label), Constants.SLIGHTLY_RIGHT_OFFSET);
    }

    @action('doesModalTitleDisplay')
    public async doesModalTitleDisplay(name: string, expected = true): Promise<boolean> {
        const locator = Utilities.formatString(this.modalTitleByText, name);
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

    @action('does alert display')
    public async doesAlertDisplay(messageLocator: string, projectId: string): Promise<boolean> {
        const locator = messageLocator.format(projectId);
        return await gondola.doesControlDisplay(locator);
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
        return (await gondola.getControlProperty(control, 'class')).indexOf('required') > 0;
    }

    @action('doesSelectorOptionsExist')
    public async doesSelectorOptionsExist(control: any, options: string[]): Promise<boolean> {
        return await gondola.areOptionsExists(control, options);
    }

    @action('doesSelectorByLabelOptionsExist')
    public async doesSelectorByLabelOptionsExist(label: string, options: string[], partial = false): Promise<boolean> {
        const locator = partial ? this.selectorByLabelPartialMatch : this.selectorByLabel;
        return await gondola.areOptionsExists(locator.format(label), options);
    }

    @action('selectSelectorByLabel')
    public async selectSelectorByLabel(label: string, option: string | undefined, partial = false): Promise<void> {
        if (!option) {
            return;
        }
        const locator = partial ? this.selectorByLabelPartialMatch : this.selectorByLabel;
        await gondola.scrollToElement(locator.format(label));
        await gondola.selectOptionByText(locator.format(label), option);
    }

    @action('selectSelectorByLabel')
    public async getSelectedOptionByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.selectorByLabelPartialMatch : this.selectorByLabel;
        return await gondola.getSelectedOption(locator.format(label));
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

    /**
     * Get state of DH customized checkbox
     * @param control
     * @param check boolean, check or uncheck
     * @param checkboxStatusLocator: locator of checkbox status, if not provided, assume it's the child checkbox input
     */
    @action('get state customized checkbox')
    public async getStateCustomizeCheckbox(control: string, checkboxStatusLocator?: string): Promise<boolean> {
        if (!checkboxStatusLocator) {
            checkboxStatusLocator = control + "//input[@type='checkbox']";
        }
        return await gondola.doesCheckboxChecked(checkboxStatusLocator);
    }

    @action('get checkbox state by label')
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

    @action('enter record field')
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

    @action('enter record field using javascript')
    public async enterRecordFieldUsingJS(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        text: string,
        fieldType = ElementType.TEXTFIELD,
    ): Promise<void> {
        const locator = this.buildRecordFieldXpath(tableName, index, tableFieldName, fieldType);
        await gondola.waitForElementSoftly(locator, Constants.SHORT_TIMEOUT);
        await gondola.setElementAttribute(locator, 'value', text);
    }

    @action('get text record field')
    public async getTextRecordField(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        fieldType = ElementType.TEXTFIELD,
    ): Promise<string> {
        const locator = this.buildRecordFieldXpath(tableName, index, tableFieldName, fieldType);
        return await gondola.getControlProperty(locator, 'value');
    }

    @action('check if record field exist')
    public async doesRecordFieldExist(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        fieldType = ElementType.TEXTFIELD,
    ): Promise<boolean> {
        const locator = this.buildRecordFieldXpath(tableName, index, tableFieldName, fieldType);
        return await gondola.doesControlExist(locator);
    }

    @action('select record field')
    public async selectRecordField(
        tableName: RecordTable,
        index: number,
        tableFieldName: RecordFieldName,
        selectElement: string,
        fieldType = ElementType.SELECTOR,
    ): Promise<void> {
        const locator = this.buildRecordFieldXpath(tableName, index, tableFieldName, fieldType);
        await gondola.waitForElementSoftly(locator, Constants.SHORT_TIMEOUT);
        await gondola.select(locator, selectElement);
    }

    @action('check selector is enabled by label')
    public async isSelectorByLabelEnabled(label: string): Promise<boolean> {
        return await gondola.isControlEnabled(this.selectorByLabel.format(label));
    }

    @action('enter textfield by place holder')
    public async enterTextfieldByPlaceholder(placeholder: string, text: string | undefined): Promise<void> {
        if (text) {
            await gondola.enter(this.textFieldByPlaceHolder.format(placeholder), text);
        }
    }

    @action('enter text area by place holder')
    public async enterTextAreaByPlaceholder(placeholder: string, text: string | undefined): Promise<void> {
        if (text) {
            await gondola.enter(this.textAreaByPlaceHolder.format(placeholder), text);
        }
    }

    @action('get textfield value by place holder')
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

    @action('check radio button options exist')
    public async doesRadioButtonOptionsExist(label: string, options: string[], partial = false): Promise<boolean> {
        const locator = partial ? this.radioButtonByLabelPartialMatch : this.radioButtonByLabel;
        const radioButtonNames = await gondola.getElementsAttributes(locator.format(label), 'innerText');
        return Utilities.compareArrays(radioButtonNames, options);
    }

    @action('select radio button by label')
    public async selectRadioButtonByLabel(label: string, option: string | undefined, partial = false): Promise<void> {
        if (option) {
            const locator = partial ? this.radioButtonOptionByLabelPartialMatch : this.radioButtonOptionByLabel;
            await gondola.click(locator.format(label, option));
        }
    }

    @action('check radio button label selected')
    public async isRadioButtonByLabelSelected(
        label: string,
        option: string | undefined,
        partial = false,
    ): Promise<boolean> {
        if (!option) {
            return true;
        }
        const locator = partial ? this.radioButtonOptionByLabelPartialMatch : this.radioButtonOptionByLabel;
        await gondola.waitUntilElementVisible(locator.format(label, option));
        return await gondola.doesCheckboxChecked(locator.format(label, option) + '//input');
    }

    @action('check if textfield is numeric')
    public async isTextFieldNumeric(control: any): Promise<boolean> {
        return (await gondola.getControlProperty(control, 'type')) === 'number';
    }

    @action('check input group displays')
    public async doesInputGroupByNameDisplay(name: string): Promise<boolean> {
        return await gondola.doesControlDisplay(this.inputGroupByName.format(name));
    }

    @action('check if input group is numeric')
    public async isInputGroupByNameNumeric(name: string): Promise<boolean> {
        return await this.isTextFieldNumeric(this.inputGroupByName.format(name));
    }

    @action('enter input group by name')
    public async enterInputGroupByName(name: string, text: string | undefined): Promise<void> {
        if (text) {
            await gondola.enter(this.inputGroupByName.format(name), text);
        }
    }

    @action('get text input group by name')
    public async getTextInputGroupByName(name: string): Promise<string> {
        return await gondola.getControlProperty(this.inputGroupByName.format(name), 'value');
    }

    @action('does text field by label display')
    public async doesTextfieldByLabelDisplay(label: string): Promise<boolean> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        return await gondola.doesControlDisplay(locator);
    }

    @action('does selector field by label display')
    public async doesSelectorfieldByLabelDisplay(label: string): Promise<boolean> {
        const locator = Utilities.formatString(this.selectorByLabel, label);
        return await gondola.doesControlDisplay(locator);
    }

    @action('go back')
    public async goBack(): Promise<void> {
        await gondola.waitUntilElementVisible(this.backButton);
        await gondola.click(this.backButton);
        await gondola.waitForDisappear(this.backButton);
    }

    /**
     * Set state of checkbox
     * @param locator of checkbox, it should be input tag
     * @param state boolean, check or uncheck
     * @param locator of checkbox's label: click on label instead of the checkbox for some special cases
     */
    @action('set state checkbox')
    public async setStateCheckbox(checkbox: ILocator, state: boolean, checkboxLabel?: ILocator): Promise<void> {
        const checkboxStatus = await gondola.doesCheckboxChecked(checkbox);
        if (state != checkboxStatus) {
            if (checkboxLabel) await gondola.click(checkboxLabel);
            else await gondola.click(checkbox);
        }
    }

    public async setStateCheckboxByLabel(label: string, checked: boolean | undefined, partial = false): Promise<void> {
        if (checked === undefined) {
            return;
        }
        const checkboxLocator = partial ? this.checkboxByLabelPartialMatch : this.checkboxByLabel;
        const checkboxInputLocator = partial ? this.checkboxInputByLabelPartialMatch : this.checkboxInputByLabel;
        await this.setStateCustomizeCheckbox(
            checkboxLocator.format(label),
            checked,
            checkboxInputLocator.format(label),
        );
    }

    public async doesSectionDisplay(name: string): Promise<boolean> {
        return await gondola.doesControlDisplay(this.sectionName.format(name));
    }

    public async clickSubmitButton(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    public async clickReturnButton(): Promise<void> {
        await gondola.click(this.returnButton);
    }

    public async clickSearchButton(): Promise<void> {
        await gondola.click(this.searchButton);
    }

    public async clickAddButton(): Promise<void> {
        await gondola.waitUntilElementVisible(this.addButton);
        await gondola.click(this.addButton);
    }

    public async doesPagingExist(): Promise<boolean> {
        const isPagingExist = await gondola.doesControlExist(this.pagingLastPage);
        return isPagingExist;
    }

    public async gotoLastPage(): Promise<void> {
        if (await this.doesPagingExist()) await gondola.click(this.pagingLastPage);
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

    @action('click menu link by title')
    public async clickMenuLinkByTitle(title: string, isUnstable = false): Promise<void> {
        const locator = this.menuLinkByTitle.format(title);
        await gondola.waitUntilElementVisible(locator);
        if (isUnstable) {
            await gondola.waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        }
        await gondola.click(locator);
    }

    @action('click button by icon')
    public async clickButtonByIcon(buttonIcon: ButtonIcon): Promise<void> {
        await gondola.waitUntilElementVisible(this.buttonByIcon.format(buttonIcon._class));
        await gondola.click(this.buttonByIcon.format(buttonIcon._class));
    }

    @action('check page title displays')
    public async isPageTitleDisplayed(name: string): Promise<boolean> {
        return await gondola.doesControlDisplay(this.pageTitle.format(name));
    }

    @action('click search selection dropdown by label')
    public async clickSearchSelectionDropdownByLabel(label: string, partial = false): Promise<void> {
        const locator = partial ? this.selectSelectionSpnByLabelPartialMatch : this.selectSelectionSpnByLabel;
        await gondola.click(locator.format(label));
    }

    @action('check search selection display')
    public async doesSearchSelectionDisplay(): Promise<boolean> {
        FlagsCollector.collectTruth(
            'Search text field should be displayed',
            await gondola.doesControlDisplay(this.selectSelectionSearchField),
        );
        await gondola.waitForElement(this.selectSelectionOptions);
        FlagsCollector.collectTruth(
            'Search selection items should be displayed',
            await gondola.doesControlDisplay(this.selectSelectionOptions),
        );
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('enter search selection textfield')
    public async enterSearchSelectionTextfield(text: string, partial = false): Promise<string> {
        if (partial) {
            text = Utilities.getRandomPartialCharacters(text);
        }
        await gondola.enter(this.selectSelectionSearchField, text);
        return text;
    }

    @action('select search selection result')
    public async selectSearchSelectionResult(text: string, partial = false): Promise<void> {
        await gondola.waitForElementDisappearSoftly(this.selectSelectionLoadingResults, Constants.VERY_SHORT_TIMEOUT);
        const locator = partial ? this.selectSelectionOptionByTextPartialMatch : this.selectSelectionOptionByText;
        await gondola.click(locator.format(text));
    }

    @action('check search result display')
    public async doesSearchResultDisplayCorrectly(searchText: string): Promise<boolean> {
        await gondola.waitUntilStalenessOfElement(this.selectSelectionOptions, Constants.VERY_SHORT_TIMEOUT);
        const results = await gondola.getElementsAttributes(this.selectSelectionOptions, 'innerText');
        return Utilities.isFilterCorrect(searchText, results);
    }

    @action('get search selection selected item by label')
    public async getSearchSelectionSelectedItemByLabel(label: string, partial = false): Promise<string> {
        const locator = partial
            ? this.selectSelectionSelectedItemByLabelPartialMatch
            : this.selectSelectionSelectedItemByLabel;
        return await gondola.getElementAttribute(locator.format(label), 'title');
    }

    @action('clear search selection by its label')
    public async clearSearchSelectionByLabel(label: string, partial = false): Promise<void> {
        const locator = partial
            ? this.selectSelectionClearButtonByLabelPartialMatch
            : this.selectSelectionClearButtonByLabel;
        await gondola.click(locator.format(label));
    }

    @action('check if selected search result empty')
    public async doesSelectedSearchResultEmpty(label: string, partial = false): Promise<boolean> {
        const locator = partial
            ? this.selectSelectionSelectedItemByLabelPartialMatch
            : this.selectSelectionSelectedItemByLabel;
        await gondola.waitUntilElementNotVisible(locator.format(label));
        return !(await gondola.doesControlDisplay(locator.format(label)));
    }

    @action('get random selection search result')
    public async getRandomSelectionSearchResult(): Promise<string> {
        const results = await gondola.getElementsAttributes(this.selectSelectionOptions, 'innerText');
        const randomIdx = Utilities.getRandomNumber(1, results.length);
        return results[randomIdx];
    }

    @action('select search selection by label')
    public async selectSearchSelectionByLabel(
        label: string,
        searchKey: string | undefined,
        selectResult: string | undefined,
        labelPartial = false,
        searchPartial = false,
        selectPartial = false,
    ): Promise<void> {
        if (searchKey && selectResult) {
            await this.clickSearchSelectionDropdownByLabel(label, labelPartial);
            await this.enterSearchSelectionTextfield(searchKey, searchPartial);
            await this.selectSearchSelectionResult(selectResult, selectPartial);
        }
    }

    @action('get textfield validation message by label')
    public async getTextFieldValidationMessageByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.textFieldByLabelPartialMatch : this.textFieldByLabel;
        return await gondola.getValidationMessage(locator.format(label));
    }
    @action('get text area validation message by label')
    public async getTextAreaValidationMessageByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.textAreaByLabelPartialMatch : this.textAreaByLabel;
        return await gondola.getValidationMessage(locator.format(label));
    }

    @action('get selector validation message')
    public async getSelectorValidationMessageByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.selectorByLabelPartialMatch : this.selectorByLabel;
        return await gondola.getValidationMessage(locator.format(label));
    }

    @action('click tabular table link by text')
    public async clickTabularTableLinkByText(columnType: SearchResultColumn, text: string): Promise<void> {
        const locator = this.tabularTableLinkByText.format(columnType.tabulatorField, text);
        await gondola.waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(locator);
    }

    @action('go to page using menu button')
    public async gotoPageByMenuButton(...buttonTitles: string[]): Promise<void> {
        let currentLocator = this.menuButtonByText;
        for (const buttonTitle of buttonTitles) {
            currentLocator = currentLocator.format(buttonTitle);
            await gondola.waitUntilElementVisible(currentLocator);
            await gondola.click(currentLocator);
            currentLocator += this.menuButtonByText;
        }
    }

    @action('go to page using menu button')
    public async gotoPageByMenuButtonUnstable(...buttonTitles: string[]): Promise<void> {
        let currentLocator = this.menuButtonByText;
        for (const buttonTitle of buttonTitles) {
            currentLocator = currentLocator.format(buttonTitle);
            await gondola.waitUntilElementVisible(currentLocator);
            await gondola.waitUntilStalenessOfElement(currentLocator, Constants.VERY_SHORT_TIMEOUT);
            await gondola.click(currentLocator);
            currentLocator += this.menuButtonByText;
        }
    }

    @action('get popup text')
    public async getPopupText(): Promise<string> {
        return await gondola.getPopupText();
    }

    @action('click popup')
    public async clickPopup(option: string): Promise<void> {
        await gondola.clickPopup(option);
    }

    @action('wait for alert message')
    public async waitForAlertMessage(text: string): Promise<void> {
        await gondola.waitUntilElementVisible(this.alertMessage.format(text));
    }

    @action('does alert message display')
    public async doesAlertMessageDisplay(text: string): Promise<boolean> {
        return await gondola.doesControlDisplay(this.alertMessage.format(text));
    }

    @action('remove file from download folder')
    public async removeDownloadedFile(fileName: string): Promise<void> {
        await Utilities.removeFileIfExist(`${Constants.DEFAULT_DOWNLOAD_FOLDER}\\${fileName}`);
    }

    @action('is file downloaded correctly')
    public async isFileDownloadedCorrectly(fileName: string): Promise<boolean> {
        const filePath = `${Constants.DEFAULT_DOWNLOAD_FOLDER}\\${fileName}`;
        await gondola.waitUntilFileExists(filePath);
        return Utilities.isFileExist(filePath);
    }

    @action('get windows alert message')
    public async getWindowsAlertMessage(): Promise<string> {
        await gondola.waitForAlert();
        return await gondola.getPopupText();
    }

    @action('get windows alert message')
    public async clickWindowAlertMessage(text: string): Promise<void> {
        await gondola.waitForAlert();
        await gondola.clickPopup(text);
    }

    @action('check number field by label validation functional')
    public async doesNumberFieldByLabelValidationWorkingCorrectly(
        label: string,
        saveButtonLocator = this.saveButton,
        validationMessage = Constants.INPUT_NUMERIC_TYPE_ERROR_MESSAGE,
    ): Promise<boolean> {
        for (const invalidNumber of Constants.NUMBER_SPECIAL_CHARACTER_ONLY) {
            await this.enterTextFieldByLabel(label, invalidNumber);
            await gondola.click(saveButtonLocator);
            const invalidMessage = await this.getTextFieldValidationMessageByLabel(label);
            FlagsCollector.collectEqual('Error message is not displayed correctly.', validationMessage, invalidMessage);
        }
        return FlagsCollector.verifyFlags();
    }
}
export default new GeneralPage();
