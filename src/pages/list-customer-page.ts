import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import { ButtonIcon } from '../models/enum-class/button-icon';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { Utilities } from '../common/utilities';
import { TableHelper } from '../helper/table-helper';
import TableType from '../models/enum-class/table-type';
import { CustomerInfoData } from '../models/customer-info';
export enum CustomerSearchResultColumn {
    CUSTOMER_CODE,
    CUSTOMER_NAME,
    CUSTOMER_CLOSING_DATE,
    CUSTOMER_IS_DISBALE,
    CUSTOMER_AID_CODE,
    CUSTOMER_SUBCODE,
}
@page
export class ListCustomerPage extends GeneralPage {
    fieldName = Constants.translator.fieldName.listCustomer.searchField;
    @locator
    protected customerTable = "//div[@id='data-table']";
    protected tableHelper = new TableHelper(this.customerTable, TableType.TABULAR_DIV);
    private pageUrl = `${Constants.BMS_BASE_URL}/customers/business-customer`;
    @locator
    protected customerLink = "//div[@tabulator-field='cd']/a[text()='{0}']";
    @locator
    protected customerCode = { id: 'cd' };
    @locator
    protected customerName = { id: 'name' };
    @locator
    protected closingDate = { id: 'closing-date-group' };
    @locator
    protected isDisable = { id: 'is-disable' };
    @locator
    protected subCode = { id: 'account-receivable-aux-cd' };
    @locator
    protected aidCode = { id: 'sales-aux-cd' };
    @locator
    protected resultTable = `//div[@id='data-table']`;
    @locator
    protected pageLink = `//ul[@class='pagination green']/li[.='{0}']`;
    @locator
    protected deleteButton = "//a[text()='{0}']/../..//div[@tabulator-field='delete']//a";
    @locator
    protected deleteFailMessageDeleteCustomer = `//div[@role='alert' and text()='${Constants.translator.alertMessage.deleteFailMessageDeleteCustomer}']`;

    @locator
    protected resultsByCustomerCode = `//div[@tabulator-field='cd' and @role='gridcell']`;
    @locator
    protected resultsByCustomerName = `//div[@tabulator-field='name' and @role='gridcell']`;
    @locator
    protected resultsByCustomerContact = `//div[@tabulator-field='rep_name' and @role='gridcell']`;
    @locator
    protected resultsByDepartment = `//div[@tabulator-field='rep_department' and @role='gridcell']`;
    @locator
    protected resultsByTradingDate = `//div[@tabulator-field='last_business_date' and @role='gridcell']`;
    @locator
    protected resultsByInvalidFlag = `//div[@tabulator-field='is_disable' and @role='gridcell']`;
    @locator
    protected resultsByPostalCode = `//div[@tabulator-field='zipcode' and @role='gridcell']`;
    @locator
    protected resultsByAddress1 = `//div[@tabulator-field='address1' and @role='gridcell']`;
    @locator
    protected resultsByAddress2 = `//div[@tabulator-field='address2' and @role='gridcell']`;
    @locator
    protected resultsByTel = `//div[@tabulator-field='tel' and @role='gridcell']`;
    @locator
    protected resultsByFax = `//div[@tabulator-field='fax' and @role='gridcell']`;
    @locator
    protected resultsByMailAddress = `//div[@tabulator-field='mail' and @role='gridcell']`;
    @locator
    protected resultsByFeeBurden = `//div[@tabulator-field='fee_payer' and @role='gridcell']`;
    @locator
    protected resultsByRounding = `//div[@tabulator-field='round_cd' and @role='gridcell']`;
    @locator
    protected resultsByTradingCurrency = `//div[@tabulator-field='currency' and @role='gridcell']`;
    @locator
    protected resultsByClosingDate = `//div[@tabulator-field='closing_date_group' and @role='gridcell']`;
    @locator
    protected resultsByTaxUnit = `//div[@tabulator-field='tax_calclation_method' and @role='gridcell']`;
    @locator
    protected resultsByAccountNumber = `//div[@tabulator-field='billing_bank_account_number' and @role='gridcell']`;
    @locator
    protected resultsByAssistanceCode = `//div[@tabulator-field='advance_received_aux_cd' and @role='gridcell']`;
    @locator
    protected resultsBySubcode = `//div[@tabulator-field='account_receivable_aux_cd' and @role='gridcell']`;
    @locator
    protected resultsByAidCode = `//div[@tabulator-field='sales_aux_cd' and @role='gridcell']`;
    @locator
    protected resultsByCollectionCycle = `//div[@tabulator-field='collect_cycle' and @role='gridcell']`;
    @locator
    protected resultsByCollectionCycleMonth = `//div[@tabulator-field='collect_cycle_month' and @role='gridcell']`;
    @locator
    protected resultsByCollectionCycleDay = `//div[@tabulator-field='collect_cycle_day' and @role='gridcell']`;
    @locator
    protected resultsByRegistrationDate = `//div[@tabulator-field='created' and @role='gridcell']`;
    @locator
    protected resultsByRegisteredPerson = `//div[@tabulator-field='created_user' and @role='gridcell']`;
    @locator
    protected resultsByUpdateDate = `//div[@tabulator-field='modified' and @role='gridcell']`;
    @locator
    protected resultsByUpdater = `//div[@tabulator-field='modified_user' and @role='gridcell']`;

    @action('openCustomerByName')
    public async openCustomerByCode(name: string): Promise<void> {
        await gondola.click(this.customerLink.format(name));
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('search customer field by field')
    public async searchCustomerFieldByField(current: CustomerSearchResultColumn): Promise<void> {
        const requiredInfo = CustomerInfoData.CUSTOMER_ALL_DATA;
        switch (current) {
            case CustomerSearchResultColumn.CUSTOMER_CODE:
                this.searchCustomer(CustomerSearchResultColumn.CUSTOMER_CODE, requiredInfo.overview.code);
                break;
            case CustomerSearchResultColumn.CUSTOMER_NAME:
                this.searchCustomer(CustomerSearchResultColumn.CUSTOMER_NAME, requiredInfo.overview.name);
                break;
            case CustomerSearchResultColumn.CUSTOMER_CLOSING_DATE:
                this.searchCustomer(
                    CustomerSearchResultColumn.CUSTOMER_CLOSING_DATE,
                    requiredInfo.overview.closingDateGroup,
                );
                break;
            case CustomerSearchResultColumn.CUSTOMER_IS_DISBALE:
                this.searchCustomer(
                    CustomerSearchResultColumn.CUSTOMER_IS_DISBALE,
                    Constants.translator.dropdownOptions.customerIsDisable['onlyValidCustomer'],
                );
                break;
            case CustomerSearchResultColumn.CUSTOMER_SUBCODE:
                this.searchCustomer(
                    CustomerSearchResultColumn.CUSTOMER_SUBCODE,
                    requiredInfo.overview.advanceReceivedAuxCode,
                );
                break;
            case CustomerSearchResultColumn.CUSTOMER_AID_CODE:
                this.searchCustomer(CustomerSearchResultColumn.CUSTOMER_AID_CODE, requiredInfo.overview.salesAuxCd);
                break;
        }
        await this.clickButtonByIcon(ButtonIcon.SEARCH);
        await gondola.waitUntilStalenessOfElement(this.resultTable);
    }

    @action('search customer')
    public async searchCustomer(filter: CustomerSearchResultColumn, value?: string): Promise<void> {
        if (!value) throw new Error('Value should not be empty');
        switch (filter) {
            case CustomerSearchResultColumn.CUSTOMER_CODE:
                await gondola.enter(this.customerCode, value);
                break;
            case CustomerSearchResultColumn.CUSTOMER_NAME:
                await gondola.enter(this.customerName, value);
                break;
            case CustomerSearchResultColumn.CUSTOMER_CLOSING_DATE:
                await gondola.select(this.closingDate, value);
                break;
            case CustomerSearchResultColumn.CUSTOMER_SUBCODE:
                await gondola.enter(this.subCode, value);
                break;
            case CustomerSearchResultColumn.CUSTOMER_AID_CODE:
                await gondola.enter(this.aidCode, value);
                break;
        }
        await this.clickButtonByIcon(ButtonIcon.SEARCH);
        await gondola.waitUntilStalenessOfElement(this.resultTable);
    }

    @action('get results on one column')
    public async getResultsOnOneColumn(resultColumn: SearchResultColumn): Promise<string[]> {
        let resultLocator = '';
        switch (resultColumn) {
            case SearchResultColumn.CODE:
                resultLocator = this.resultsByCustomerCode;
                break;
            case SearchResultColumn.NAME:
                resultLocator = this.resultsByCustomerName;
                break;
            case SearchResultColumn.SUBCODE:
                resultLocator = this.resultsBySubcode;
                break;
            case SearchResultColumn.AID_CODE:
                resultLocator = this.resultsByAidCode;
                break;
            case SearchResultColumn.IS_DISABLE:
                resultLocator = this.resultsByInvalidFlag;
                break;
            case SearchResultColumn.CLOSING_DATE:
                resultLocator = this.resultsByClosingDate;
                break;
        }

        await gondola.waitUntilElementVisible(resultLocator, Constants.LONG_TIMEOUT);
        return await gondola.getElementsAttributes(resultLocator, 'innerText');
    }

    @action('get all results of all pages on one column')
    public async getResultsOfAllPagesOnOneColumn(resultColumn: SearchResultColumn): Promise<string[]> {
        const numOfPage = await this.getNumberOfSearchResultPages();
        const numOfRecord = await this.getNumberOfSearchResultRecords();
        let results: string[] = [];
        if (numOfRecord === 0) {
            return results;
        } else {
            for (let i = 1; i <= numOfPage; i++) {
                const resultsInPage = await this.getResultsOnOneColumn(resultColumn);
                results = results.concat(resultsInPage);

                // click next page
                if (i !== numOfPage) {
                    gondola.click(this.pageLink.format(i + 1 + ''));
                    await gondola.waitUntilStalenessOfElement(this.searchResultText);
                }
            }
            return results;
        }
    }

    @action('verify search results by one column')
    public async verifySearchResultsByOneColumn(
        input: string,
        resultColumn: SearchResultColumn,
        isPartialSearch: boolean,
    ): Promise<boolean> {
        const numOfRecord = await this.getNumberOfSearchResultRecords();
        if (numOfRecord === 0) {
            return true;
        } else {
            const allResults = await this.getResultsOfAllPagesOnOneColumn(resultColumn);
            return Utilities.isSearchResultCorrect(input, allResults, isPartialSearch);
        }
    }

    @action('get input invalid flag')
    public getInputInvalidFlag(input: string): string {
        if (input == Constants.CUSTOMER_IS_DISABLE['onlyValidCustomer']) {
            return Constants.NO_STRING;
        }
        return '';
    }

    @action('click on delete button')
    public async clickOnDeleteButton(customerId: string): Promise<void> {
        const locator = this.deleteButton.format(customerId);
        await gondola.click(locator);
    }

    @action('does delete button display')
    public async doesDeleteButtonDisplay(customerId: string): Promise<boolean> {
        const locator = this.deleteButton.format(customerId);
        return await gondola.doesControlExist(locator);
    }

    @action('does delete fail message display')
    public async doesDeleteFailMessageDisplay(customerCode: string, customerName: string): Promise<boolean> {
        return await this.doesAlertCustomerDisplay(this.deleteFailMessageDeleteCustomer, customerCode, customerName);
    }

    @action('does alert customer display')
    public async doesAlertCustomerDisplay(
        messageLocator: string,
        customerCode: string,
        customerName: string,
    ): Promise<boolean> {
        const locator = messageLocator.format(customerCode, customerName);
        return await gondola.doesControlDisplay(locator);
    }

    @action('are row sorted correctly')
    public async areRowsSortedCorrectly(columnName: string): Promise<boolean> {
        const arr = await this.tableHelper.getAllRowsOneColumn(columnName);
        return Utilities.isArraySorted(arr, arr.sort());
    }
}
export default new ListCustomerPage();
