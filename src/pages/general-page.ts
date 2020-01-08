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
    protected pageTitle = "//h1[@class = 'page-title' and normalize-space()='{0}']";
    @locator
    protected captionSubject = { css: '.page-title-text' };
    @locator
    protected homeLink = `//a[.='${this.translator.headerMenu.home}']"`;
    @locator
    protected businessSystemLink = `//a[.='${this.translator.headerMenu.businessSystem}']`;
    @locator
    protected taskSystemLink = `//a[.='${this.translator.headerMenu.businessSystem}']`;
    @locator
    protected talentManagementLink = `//a[.='${this.translator.headerMenu.home}']`;
    @locator
    protected invalidFeedBackByFieldLabel =
        "//div[label[text()='{0}']]//div[@class='invalid-feedback' or @class='error-message']";
    @locator
    protected invalidFeedBackByFieldLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//div[@class='invalid-feedback' or @class='error-message']";
    @locator
    protected helpBlockErrorByLabel = "//div[label[text()='{0}']]//span[contains(@class,'help-block')]";
    @locator
    protected helpBlockErrorByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//span[contains(@class,'help-block')]";
    @locator
    protected textFieldByLabel = "//div[label[text()='{0}']]//input[@type='text' or @type='number']";
    @locator
    protected textFieldByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//input[@type='text' or @type='password' or @type='number']";
    @locator
    protected paragraphByLabel = "//div[label[text()='{0}']]//p";
    @locator
    protected paragraphByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//p";
    @locator
    protected spanByLabel = "//div[label[text()='{0}']]//span";
    @locator
    protected spanByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//span";
    @locator
    protected textFieldByPlaceHolder = "//input[@type='text' and @placeholder='{0}']";
    @locator
    protected textAreaByLabel = "//div[label[text()='{0}']]//textarea";
    @locator
    protected textAreaByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//textarea";
    @locator
    protected selectorByLabel = "//div[label[text()='{0}']]//select";
    @locator
    protected selectorByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//select";
    @locator
    protected radioButtonByLabel = "//div[label[text()='{0}']]//label[input[@type='radio']]";
    @locator
    protected radioButtonByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//label[input[@type='radio']]";
    @locator
    protected radioButtonOptionByLabel =
        "//div[label[text()='{0}']]//label[(input[@type='radio'] or ./preceding-sibling::input[@type='radio']) and normalize-space()='{1}']";
    @locator
    protected radioButtonOptionByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//label[(input[@type='radio'] or ./preceding-sibling::input[@type='radio']) and normalize-space()='{1}']";
    @locator
    protected modalDialog = { xpath: "//div[@class='modal']" };
    @locator
    protected modalTitle = { xpath: "//h5[@class='modal-title']" };
    @locator
    protected modalTitleByText = "//h5[@class='modal-title' and text()='{0}']";
    @locator
    protected checkboxByLabel = "//div[contains(@class, 'custom-checkbox')]/label[text()='{0}']";
    @locator
    protected checkboxByLabelPartialMatch = "//div[contains(@class, 'custom-checkbox')]/label[contains(text(),'{0}')]";
    @locator
    protected checkboxInputByLabel =
        "//div[contains(@class, 'custom-checkbox')][label[text()='{0}']]/input[@type='checkbox']";
    @locator
    protected checkboxInputByLabelPartialMatch =
        "//div[contains(@class, 'custom-checkbox')][label[contains(text(),'{0}')]]/input[@type='checkbox']";
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
    protected addButton = "//a[i[@class='fa fa-plus']]";
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
    @locator
    protected menuLinkByTitle = "//a[span[@class='title' and normalize-space()='{0}']]";
    @locator
    protected buttonByIcon = "//*[contains(@class, 'btn') and i[contains(@class,'{0}')]]";
    @locator
    protected selectSelectionSpnByLabelPartialMatch = "//div[label[contains(text(),'{0}')]]//span[@role='combobox']";
    @locator
    protected selectSelectionSpnByLabel = "//div[label[text()='{0}']]//span[@role='combobox']";
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
    protected selectSelectionOptionByText = "//li[contains(@class, 'results__option') and text()='{0}']";
    @locator
    protected selectSelectionSelectedItemByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//span[contains(@class, 'selection__rendered')]";
    @locator
    protected selectSelectionSelectedItemByLabel =
        "//div[label[text()='{0}']]//span[contains(@class, 'selection__rendered')]";
    @locator
    protected selectSelectionClearButtonByLabelPartialMatch =
        "//div[label[contains(text(),'{0}')]]//span[contains(@class, 'selection__clear')]";
    @locator
    protected selectSelectionClearButtonByLabel =
        "//div[label[text()='{0}']]//span[contains(@class, 'selection__clear')]";
    @locator
    protected tabularTableLinkByText = "//div[@tabulator-field='{0}']/a[text()='{1}']";

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

    @action('go to talent management')
    public async gotoTalentManagement(): Promise<void> {
        if (await gondola.doesControlExist(this.talentManagementLink)) {
            await gondola.click(this.talentManagementLink);
        }
    }

    @action('openWebsite')
    public async openWebsite(): Promise<void> {
        await gondola.navigate(Constants.loginUrl);
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
    public async enterTextFieldByLabel(label: string, text: any | undefined, partial = false): Promise<void> {
        const locator = partial ? this.textFieldByLabelPartialMatch : this.textFieldByLabel;
        if (text) {
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
    public async clickTextFieldByLabel(label: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(locator);
        await gondola.waitForElement(this.modalTitle);
    }

    @action('click outside textfield')
    public async clickOutsideTextFieldByLabel(label: string): Promise<void> {
        const locator = Utilities.formatString(this.textFieldByLabel, label);
        await gondola.performClick(locator, Constants.SLIGHTLY_RIGHT_OFFSET);
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
        await gondola.select(locator.format(label), option);
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

    public async doesRadioButtonOptionsExist(label: string, options: string[], partial = false): Promise<boolean> {
        const locator = partial ? this.radioButtonByLabelPartialMatch : this.radioButtonByLabel;
        const radioButtonNames = await gondola.getElementsAttributes(locator.format(label), 'innerText');
        return Utilities.compareArrays(radioButtonNames, options);
    }

    public async selectRadioButtonByLabel(label: string, option: string | undefined, partial = false): Promise<void> {
        if (option) {
            const locator = partial ? this.radioButtonOptionByLabelPartialMatch : this.radioButtonOptionByLabel;
            await gondola.click(locator.format(label, option));
        }
    }

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
        return await gondola.doesControlExist(this.pagingLastPage);
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

    public async clickMenuLinkByTitle(title: string): Promise<void> {
        await gondola.waitUntilElementVisible(this.menuLinkByTitle.format(title));
        await gondola.click(this.menuLinkByTitle.format(title));
    }

    public async clickButtonByIcon(buttonIcon: ButtonIcon): Promise<void> {
        await gondola.waitUntilElementVisible(this.buttonByIcon.format(buttonIcon._class));
        await gondola.click(this.buttonByIcon.format(buttonIcon._class));
    }

    public async isPageTitleDisplayed(name: string): Promise<boolean> {
        return await gondola.doesControlDisplay(this.pageTitle.format(name));
    }

    public async clickSearchSelectionDropdownByLabel(label: string, partial = false): Promise<void> {
        const locator = partial ? this.selectSelectionSpnByLabelPartialMatch : this.selectSelectionSpnByLabel;
        await gondola.click(locator.format(label));
    }

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

    public async enterSearchSelectionTextfield(text: string, partial = false): Promise<string> {
        if (partial) {
            text = Utilities.getRandomPartialCharacters(text);
        }
        await gondola.enter(this.selectSelectionSearchField, text);
        return text;
    }

    public async selectSearchSelectionResult(text: string, partial = false): Promise<void> {
        await gondola.waitForElementDisappearSoftly(this.selectSelectionLoadingResults, Constants.SHORT_TIMEOUT);
        const locator = partial ? this.selectSelectionOptionByTextPartialMatch : this.selectSelectionOptionByText;
        await gondola.click(locator.format(text));
    }

    public async doesSearchResultDisplayCorrectly(searchText: string): Promise<boolean> {
        const results = await gondola.getElementsAttributes(this.selectSelectionOptions, 'innerText');
        return Utilities.isFilterCorrect(searchText, results);
    }

    public async getSearchSelectionSelectedItemByLabel(label: string, partial = false): Promise<string> {
        const locator = partial
            ? this.selectSelectionSelectedItemByLabelPartialMatch
            : this.selectSelectionSelectedItemByLabel;
        return await gondola.getElementAttribute(locator.format(label), 'title');
    }

    public async clearSearchSelectionByLabel(label: string, partial = false): Promise<void> {
        const locator = partial
            ? this.selectSelectionClearButtonByLabelPartialMatch
            : this.selectSelectionClearButtonByLabel;
        await gondola.click(locator.format(label));
    }

    public async doesSelectedSearchResultEmpty(label: string, partial = false): Promise<boolean> {
        const locator = partial
            ? this.selectSelectionSelectedItemByLabelPartialMatch
            : this.selectSelectionSelectedItemByLabel;
        await gondola.waitUntilElementNotVisible(locator.format(label));
        return !(await gondola.doesControlDisplay(locator.format(label)));
    }

    public async getRandomSelectionSearchResult(): Promise<string> {
        const results = await gondola.getElementsAttributes(this.selectSelectionOptions, 'innerText');
        const randomIdx = Utilities.getRandomNumber(1, results.length);
        return results[randomIdx];
    }

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

    public async getTextFieldValidationMessageByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.textFieldByLabelPartialMatch : this.textFieldByLabel;
        return await gondola.getValidationMessage(locator.format(label));
    }

    public async getTextAreaValidationMessageByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.textAreaByLabelPartialMatch : this.textAreaByLabel;
        return await gondola.getValidationMessage(locator.format(label));
    }

    public async getSelectorValidationMessageByLabel(label: string, partial = false): Promise<string> {
        const locator = partial ? this.selectorByLabelPartialMatch : this.selectorByLabel;
        return await gondola.getValidationMessage(locator.format(label));
    }

    public async clickTabularTableLinkByText(columnType: SearchResultColumn, text: string): Promise<void> {
        const locator = this.tabularTableLinkByText.format(columnType.tabulatorField, text);
        await gondola.waitUntilStalenessOfElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.click(locator);
    }
}
export default new GeneralPage();
