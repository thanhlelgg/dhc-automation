import { AddProjectPage } from './add-project-page';
import { Constants } from '../common/constants';
import { action, locator, gondola } from 'gondolajs';
import { TableHelper } from '../helper/table-helper';
import { OrderedDetails } from '../models/project-info';
import searchModalWindows from './search-modal-windows';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import { FilterType } from '../models/enum-class/filter-field-type';
import { FlagsCollector } from '../helper/flags-collector';
import { ButtonIcon } from '../models/enum-class/button-icon';

const orderedDetailColumnName = Constants.translator.tableColumnName.addProject.orderedDetails;

export class ProjectDetailsPage extends AddProjectPage {
    private detailsPageUrl = `${Constants.BMS_BASE_URL}/projects/edit`;

    @locator
    protected orderedDetailsTable = "//div[@id='project-ordered-detail']/table";
    @locator
    protected addOrderedDetailsRowButton = "//div[@id='project-ordered-detail']/button";
    private orderedDetailsTableHelper = new TableHelper(this.orderedDetailsTable);

    @action('is details page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isDetailsPage(this.detailsPageUrl);
    }

    @action('click add ordered details row button')
    public async clickAddOrderedDetailsRowButton(): Promise<void> {
        await gondola.click(this.addOrderedDetailsRowButton);
    }

    @action('delete ordered details row')
    public async deleteOrderedDetailsRow(): Promise<void> {
        await this.orderedDetailsTableHelper.clickActionButton(ButtonIcon.DELETE);
    }

    @action('does ordered details input line display')
    public async doesOrderedDetailsInputLineDisplay(): Promise<boolean> {
        return (await this.orderedDetailsTableHelper.getNumberOfRows()) === 1;
    }

    @action('click ordered detail item name')
    public async clickOrderedDetailsItemName(rowIdx = '1'): Promise<void> {
        await this.orderedDetailsTableHelper.clickCellTextfieldByIndex(orderedDetailColumnName.itemName, rowIdx);
    }

    @action('click ordered details textfield')
    public async clickOrderedDetailsTextfield(headerName: string, rowIdx = '1'): Promise<void> {
        await this.orderedDetailsTableHelper.clickCellTextfieldByIndex(headerName, rowIdx);
    }

    @action('select ordered details item')
    public async selectOrderedDetailsItem(itemName: string, rowIdx: string): Promise<void> {
        await this.orderedDetailsTableHelper.clickCellTextfieldByIndex(orderedDetailColumnName.itemName, rowIdx);
        await searchModalWindows.filterResult(itemName, FilterType.ITEMS);
        await searchModalWindows.selectSearchResult(itemName, SearchResultColumn.NAME);
    }

    @action('enter ordered details row')
    public async enterOrderedDetailsRow(orderedDetailsInfo: OrderedDetails, rowIdx = '1'): Promise<void> {
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.name,
            rowIdx,
            orderedDetailsInfo.name,
        );
        await this.selectOrderedDetailsItem(orderedDetailsInfo.itemName, rowIdx);
        await this.orderedDetailsTableHelper.selectCellDropdownByIndex(
            orderedDetailColumnName.debitCreditGroup,
            rowIdx,
            orderedDetailsInfo.debitCreditGroup,
        );
        await this.orderedDetailsTableHelper.setStateCellCheckboxByIndex(
            orderedDetailColumnName.taxable,
            rowIdx,
            orderedDetailsInfo.taxable,
        );
        await this.orderedDetailsTableHelper.selectCellDropdownByIndex(
            orderedDetailColumnName.taxRate,
            rowIdx,
            orderedDetailsInfo.taxRate,
        );
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.quantity,
            rowIdx,
            orderedDetailsInfo.quantity,
        );
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.unit,
            rowIdx,
            orderedDetailsInfo.unit,
        );
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.unitPrice,
            rowIdx,
            orderedDetailsInfo.unitPrice,
        );
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.amount,
            rowIdx,
            orderedDetailsInfo.amount,
        );
        await this.orderedDetailsTableHelper.enterCellTextareaByIndex(
            orderedDetailColumnName.note,
            rowIdx,
            orderedDetailsInfo.note,
        );
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.deliveryDate,
            rowIdx,
            orderedDetailsInfo.deliveryDate,
        );
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.recordDate,
            rowIdx,
            orderedDetailsInfo.recordDate,
        );
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(
            orderedDetailColumnName.billingDate,
            rowIdx,
            orderedDetailsInfo.billingDate,
        );
    }

    @action('does ordered details display correctly')
    public async doesOrderedDetailsDisplayCorrectly(
        orderedDetailsInfo: OrderedDetails,
        rowIdx: string,
    ): Promise<boolean> {
        gondola.waitUntilStalenessOfElement(this.orderedDetailsTable, Constants.VERY_SHORT_TIMEOUT);
        FlagsCollector.collectEqual(
            'Name field should be displayed correctly',
            orderedDetailsInfo.name,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(orderedDetailColumnName.name, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Item name should be displayed correctly',
            orderedDetailsInfo.itemName,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(orderedDetailColumnName.itemName, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Debit credit group should be displayed correctly',
            orderedDetailsInfo.debitCreditGroup,
            await this.orderedDetailsTableHelper.getSelectedCellDropdownByIndex(
                orderedDetailColumnName.debitCreditGroup,
                rowIdx,
            ),
        );
        FlagsCollector.collectEqual(
            'Taxable should be displayed correctly',
            orderedDetailsInfo.taxable,
            await this.orderedDetailsTableHelper.getStateCellCheckboxByIndex(orderedDetailColumnName.taxable, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Tax rate should be displayed correctly',
            orderedDetailsInfo.taxRate,
            await this.orderedDetailsTableHelper.getSelectedCellDropdownByIndex(
                orderedDetailColumnName.taxRate,
                rowIdx,
            ),
        );

        FlagsCollector.collectEqual(
            'Quantity should be displayed correctly',
            orderedDetailsInfo.quantity,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(orderedDetailColumnName.quantity, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Unit should be displayed correctly',
            orderedDetailsInfo.unit,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(orderedDetailColumnName.unit, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Unit price should be displayed correctly',
            orderedDetailsInfo.unitPrice,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(orderedDetailColumnName.unitPrice, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Amount should be displayed correctly',
            orderedDetailsInfo.amount,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(orderedDetailColumnName.amount, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Note should be displayed correctly',
            orderedDetailsInfo.note,
            await this.orderedDetailsTableHelper.getTextCellTextareaByIndex(orderedDetailColumnName.note, rowIdx),
        );
        FlagsCollector.collectEqual(
            'Delivery date should be displayed correctly',
            orderedDetailsInfo.deliveryDate,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(
                orderedDetailColumnName.deliveryDate,
                rowIdx,
            ),
        );
        FlagsCollector.collectEqual(
            'Record date should be displayed correctly',
            orderedDetailsInfo.recordDate,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(
                orderedDetailColumnName.recordDate,
                rowIdx,
            ),
        );
        FlagsCollector.collectEqual(
            'Billing date should be displayed correctly',
            orderedDetailsInfo.billingDate,
            await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(
                orderedDetailColumnName.billingDate,
                rowIdx,
            ),
        );
        return FlagsCollector.verifyFlags();
    }

    @action('enter ordered details textfield')
    public async enterOrderedDetailsTextfield(headerName: string, text: string, rowIdx = '1'): Promise<void> {
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(headerName, rowIdx, text);
    }

    @action('get ordered details textfield')
    public async getOrderedDetailsTextfield(headerName: string, rowIdx = '1'): Promise<string> {
        return await this.orderedDetailsTableHelper.getTextCellTextfieldByIndex(headerName, rowIdx);
    }

    @action('get ordered details textfield validation message')
    public async getOrderedDetailsTextfieldValidationMessage(headerName: string, rowIdx = '1'): Promise<string> {
        return await this.orderedDetailsTableHelper.getCellTextfieldValidationMessage(headerName, rowIdx);
    }

    @action('enter ordered details textarea')
    public async enterOrderedDetailsTextarea(headerName: string, text: string, rowIdx = '1'): Promise<void> {
        await this.orderedDetailsTableHelper.enterCellTextareaByIndex(headerName, rowIdx, text);
    }

    @action('select ordered details dropdown')
    public async selectOrderedDetailsDropdown(headerName: string, value: string, rowIdx = '1'): Promise<void> {
        await this.orderedDetailsTableHelper.enterCellTextfieldByIndex(headerName, rowIdx, value);
    }

    @action('set state ordered details checkbox')
    public async setStateOrderedDetailsCheckbox(headerName: string, state: boolean, rowIdx = '1'): Promise<void> {
        await this.orderedDetailsTableHelper.setStateCellCheckboxByIndex(headerName, rowIdx, state);
    }

    @action('get invalid feedback ordered details')
    public async getInvalidFeedBackOrderedDetails(headerName: string, rowIdx = '1'): Promise<string> {
        return await this.orderedDetailsTableHelper.getCellInvalidFeedback(headerName, rowIdx);
    }

    @action('does ordered details dropdown option exist')
    public async doesOrderedDetailsDropdownOptionExist(
        headerName: string,
        options: string[],
        rowIdx = '1',
    ): Promise<boolean> {
        return await this.orderedDetailsTableHelper.doesCellDropdownOptionExist(headerName, rowIdx, options);
    }

    @action('is ordered details dropdown first option selected')
    public async isOrderedDetailsDropdownFirstOptionSelected(headerName: string, rowIdx = '1'): Promise<boolean> {
        return await this.orderedDetailsTableHelper.isCellDropdownFirstOptionSelected(headerName, rowIdx);
    }

    @action('is ordered details dropdown enabled')
    public async isOrderedDetailsDropdownEnabled(headerName: string, rowIdx = '1'): Promise<boolean> {
        return await this.orderedDetailsTableHelper.isCellDropdownEnabled(headerName, rowIdx);
    }
}

export default new ProjectDetailsPage();
