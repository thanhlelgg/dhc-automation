import { gondola } from 'gondolajs';
import '@src/string.extensions';
import { Utilities } from '../common/utilities';
import TableType from '../models/enum-class/table-type';
import generalPage from '../pages/general-page';
import { ButtonIcon } from '../models/enum-class/button-icon';

export class TableHelper {
    private tableLocator: string;
    private headerRowLocator: string;
    private headerNameLocator: string;
    private columnByIndexLocator: string;
    private recordRowCellsByIndex: string;
    private rowLocator: string;
    private actionButton: string;
    private cellByIndex: string;
    private cellLinkByIndex: string;
    private cellTextfieldByIndex: string;
    private cellTextareaByIndex: string;
    private cellSelectorByIndex: string;
    private cellCheckboxByIndex: string;
    private cellInvalidFeedbackByIndex: string;

    /**
     * Generate all the locators for all parts of an table
     * @param locator table locator, should be the parent node of table header and body
     * @param tableType normal HTML table or DHC customize tabulator table
     */
    public constructor(locator: string, tableType = TableType.HTML_TABLE) {
        if (tableType === TableType.TABULAR_DIV) {
            this.tableLocator = locator;
            this.headerRowLocator = `${locator}/div[@class="tabulator-headers"]`;
            this.headerNameLocator = `${locator}//div[@role='columnheader']`;
            this.columnByIndexLocator = `${locator}//div[@role='gridcell'][{0}]`;
            this.rowLocator = `${locator}//div[@role='row']`;
            this.recordRowCellsByIndex = `${locator}//div[@role='row'][{0}]/div[@role='gridcell']`;
            this.actionButton = `${locator}//div[@role='row'][{0}]//a[i[contains(@class,'{1}')]]`;
            this.cellByIndex = `${locator}//div[@role='row'][{0}]//div[@role='gridcell'][{1}]`;
        } else {
            this.tableLocator = locator;
            this.headerRowLocator = `${locator}/thead/tr`;
            this.headerNameLocator = `${locator}/thead/tr/th`;
            this.columnByIndexLocator = `${locator}/tbody[not(@class='d-none')]/tr/td[{0}]`;
            this.rowLocator = `${locator}/tbody[not(@class='d-none')]/tr`;
            this.recordRowCellsByIndex = `${locator}/tbody[not(@class='d-none')]/tr[{0}]/td`;
            this.actionButton = `${locator}/tbody[not(@class='d-none')]/tr[{0}]/td/a[i[contains(@class,'{1}')]]`;
            this.cellByIndex = `${locator}/tbody[not(@class='d-none')]/tr[{0}]/td[{1}]`;
        }
        this.cellLinkByIndex = this.cellByIndex + '//a';
        this.cellTextfieldByIndex = this.cellByIndex + "//input[not(@type='hidden')]";
        this.cellTextareaByIndex = this.cellByIndex + '//textarea';
        this.cellSelectorByIndex = this.cellByIndex + '//select';
        this.cellCheckboxByIndex = this.cellByIndex + "/div[input[@type='checkbox']]";
        this.cellInvalidFeedbackByIndex = this.cellByIndex + "/div[@class='invalid-feedback']";
    }

    /**
     * Get list of table header/column name
     * @param headerName
     */
    public async getAllHeaderNames(): Promise<string[]> {
        return await gondola.getElementsAttributes(this.headerNameLocator, 'innerText', true);
    }

    /**
     * Get index of header/column by name
     * @param headerName
     */
    public async getHeaderIndex(headerName: string): Promise<number> {
        const headers = await this.getAllHeaderNames();
        return headers.indexOf(headerName) + 1;
    }

    /**
     *
     * @param headerName
     */
    public async doesHeaderValueExist(headerName: string): Promise<boolean> {
        return (await this.getHeaderIndex(headerName)) >= 1;
    }

    /**
     * Get all rows of one column by it's name
     * @param headerName
     */
    public async getAllRowsOneColumn(headerName: string): Promise<string[]> {
        const headerIdx = await this.getHeaderIndex(headerName);
        return await gondola.getElementsAttributes(this.columnByIndexLocator.format(headerIdx.toString()), 'innerText');
    }

    /**
     * Get one random row of one column by it's name
     * @param headerName
     * @param getPartial only get some first random characters of the result
     */
    public async getRandomRowOneColumn(headerName: string, getPartial = false): Promise<string> {
        const rows = await this.getAllRowsOneColumn(headerName);
        const randomIdx = Utilities.getRandomNumber(0, rows.length - 1);
        const randomRow = getPartial ? Utilities.getRandomPartialCharacters(rows[randomIdx]) : rows[randomIdx];
        return randomRow;
    }

    /**
     * Get all cells of a table
     */
    public async getAllRecordCells(): Promise<string[][]> {
        const rows: string[][] = [];
        const numberOfRow = await gondola.getElementCount(this.rowLocator);
        for (let i = 1; i <= numberOfRow; i++) {
            const row = await gondola.getElementsAttributes(
                this.recordRowCellsByIndex.format(i.toString()),
                'innerText',
            );
            rows.push(row);
        }
        return rows;
    }

    /**
     * Get row index by one of it's cell value
     * @param columnName
     * @param value
     */
    public async getRowIndexByValue(columnName: string, value: string): Promise<number> {
        const rows = await this.getAllRowsOneColumn(columnName);
        const idx = rows.indexOf(value) + 1;
        if (idx === 0) {
            throw new Error('No row was found.');
        }
        return idx;
    }

    /**
     * Get a random row
     */
    public async getRandomRow(): Promise<number> {
        const numberOfRow = await gondola.getElementCount(this.rowLocator);
        return Utilities.getRandomNumber(1, numberOfRow);
    }

    /**
     * Click table action button
     * @param buttonType Button type
     * @param columnName Column name to find the row
     * @param value Cell's text of `columnName` column to find the correct row
     */
    public async clickActionButton(buttonType: ButtonIcon, columnName?: string, value?: string): Promise<void> {
        const rowIdx =
            columnName && value ? await this.getRowIndexByValue(columnName, value) : await this.getRandomRow();
        await gondola.click(this.actionButton.format(rowIdx.toString(), buttonType._class));
    }

    /**
     * Get all cells of a row
     * @param columnName Column where cell's value belong to
     * @param value Cell's value to find row
     */
    public async getAllColumnsOneRow(columnName?: string, value?: string): Promise<string[]> {
        const rowIdx =
            columnName && value ? await this.getRowIndexByValue(columnName, value) : await this.getRandomRow();
        return await gondola.getElementsAttributes(this.recordRowCellsByIndex.format(rowIdx.toString()), 'innerText');
    }

    /**
     * Check if row exist
     * @param columnName Column where cell's value belong to
     * @param value Cell's value to find row
     */
    public async doesRowValueExists(columnName: string, value: string): Promise<boolean> {
        const allRow = await this.getAllRowsOneColumn(columnName);
        return allRow.indexOf(value) >= 0;
    }

    //For some reason this is not working with gondola helper, will update later
    // public async waitUntilRowValueExists(columnName: string, value: string): Promise<void> {
    //     const condition = async (): Promise<boolean> => {
    //         return await this.doesRowValueExists(columnName, value);
    //     };
    //     await gondola.waitUntilConditionCorrect(condition, Constants.SHORT_TIMEOUT);
    // }

    /**
     * Remove the record if exist
     * @param value
     * @param header
     */
    public async removeRecordIfValueExist(value: string, header: string): Promise<void> {
        if (await this.doesRowValueExists(header, value)) {
            await this.clickActionButton(ButtonIcon.DELETE, header, value);
            await gondola.waitForAlert();
            await gondola.clickPopup('OK');
            await gondola.waitUntilStalenessOfElement(this.tableLocator);
        }
    }

    /**
     * Create cell link by it's text
     */
    public async clickCellLinkByText(header: string, value: string): Promise<void> {
        const rowIdx = await this.getRowIndexByValue(header, value);
        const headerIdx = await this.getHeaderIndex(header);
        await gondola.click(this.cellLinkByIndex.format(rowIdx.toString(), headerIdx.toString()));
    }

    /**
     * Get number of rows
     */
    public async getNumberOfRows(): Promise<number> {
        return await gondola.getElementCount(this.rowLocator);
    }

    /**
     * Enter cell textfield by row index
     * @param header
     * @param rowIdx
     * @param text
     */
    public async enterCellTextfieldByIndex(header: string, rowIdx: string, text?: string): Promise<void> {
        if (text === undefined) return;
        const headerIdx = await this.getHeaderIndex(header);
        await gondola.enter(this.cellTextfieldByIndex.format(rowIdx, headerIdx.toString()), text);
    }

    /**
     * click cell textfield by row index
     * @param header
     * @param rowIdx
     */
    public async clickCellTextfieldByIndex(header: string, rowIdx: string): Promise<void> {
        const headerIdx = await this.getHeaderIndex(header);
        await gondola.click(this.cellTextfieldByIndex.format(rowIdx, headerIdx.toString()));
    }

    /**
     * Get cell textfield value by row index
     * @param header
     * @param rowIdx
     */
    public async getTextCellTextfieldByIndex(header: string, rowIdx: string): Promise<string> {
        const headerIdx = await this.getHeaderIndex(header);
        return await gondola.getElementAttribute(
            this.cellTextfieldByIndex.format(rowIdx, headerIdx.toString()),
            'value',
        );
    }

    /**
     * Enter cell textarea by row index
     * @param header
     * @param rowIdx
     * @param text
     */
    public async enterCellTextareaByIndex(header: string, rowIdx: string, text?: string): Promise<void> {
        if (!text) return;
        const headerIdx = await this.getHeaderIndex(header);
        await gondola.enter(this.cellTextareaByIndex.format(rowIdx, headerIdx.toString()), text);
    }

    /**
     * Get textarea value by row index
     * @param header
     * @param rowIdx
     */
    public async getTextCellTextareaByIndex(header: string, rowIdx: string): Promise<string> {
        const headerIdx = await this.getHeaderIndex(header);
        return await gondola.getElementAttribute(
            this.cellTextareaByIndex.format(rowIdx, headerIdx.toString()),
            'value',
        );
    }

    /**
     * Select cell dropdown by row index
     * @param header
     * @param rowIdx
     * @param text
     */
    public async selectCellDropdownByIndex(header: string, rowIdx: string, text?: string): Promise<void> {
        if (!text) return;
        const headerIdx = await this.getHeaderIndex(header);
        await gondola.selectOptionByText(this.cellSelectorByIndex.format(rowIdx, headerIdx.toString()), text);
    }

    /**
     * get selected item of cell dropdown by row index
     * @param header
     * @param rowIdx
     */
    public async getSelectedCellDropdownByIndex(header: string, rowIdx: string): Promise<string> {
        const headerIdx = await this.getHeaderIndex(header);
        return await gondola.getSelectedOption(this.cellSelectorByIndex.format(rowIdx, headerIdx.toString()));
    }

    /**
     * set state of cell checkbox by row index
     * @param header
     * @param rowIdx
     * @param state
     */
    public async setStateCellCheckboxByIndex(header: string, rowIdx: string, state?: boolean): Promise<void> {
        if (state === undefined) return;
        const headerIdx = await this.getHeaderIndex(header);
        await generalPage.setStateCustomizeCheckbox(
            this.cellCheckboxByIndex.format(rowIdx, headerIdx.toString()),
            state,
        );
    }

    /**
     * Get state of cell checkbox by row index
     * @param header
     * @param rowIdx
     */
    public async getStateCellCheckboxByIndex(header: string, rowIdx: string): Promise<boolean> {
        const headerIdx = await this.getHeaderIndex(header);
        return await generalPage.getStateCustomizeCheckbox(
            this.cellCheckboxByIndex.format(rowIdx, headerIdx.toString()),
        );
    }

    /**
     * Get invalid message of cell by row index
     * @param header
     * @param rowIdx
     */
    public async getCellInvalidFeedback(header: string, rowIdx: string): Promise<string> {
        const headerIdx = await this.getHeaderIndex(header);
        const locator = this.cellInvalidFeedbackByIndex.format(rowIdx, headerIdx.toString());
        const doesExist = await gondola.doesControlExist(locator);
        return doesExist ? await gondola.getText(locator) : '';
    }

    /**
     * check jf cell dropdown's options exist by row index
     * @param header
     * @param rowIdx
     * @param options
     */
    public async doesCellDropdownOptionExist(header: string, rowIdx: string, options: string[]): Promise<boolean> {
        const headerIdx = await this.getHeaderIndex(header);
        const locator = this.cellSelectorByIndex.format(rowIdx, headerIdx.toString());
        return await gondola.areOptionsExists(locator, options);
    }

    /**
     * Check if cell dropdown's first option is selected by row index
     * @param header
     * @param rowIdx
     */
    public async isCellDropdownFirstOptionSelected(header: string, rowIdx: string): Promise<boolean> {
        const headerIdx = await this.getHeaderIndex(header);
        const locator = this.cellSelectorByIndex.format(rowIdx, headerIdx.toString());
        const firstOption = await gondola.getOptionByIndex(locator, 0);
        return (await gondola.getSelectedOption(locator)) === firstOption;
    }

    /**
     * check if cell dropdown is enabled by row index
     * @param header
     * @param rowIdx
     */
    public async isCellDropdownEnabled(header: string, rowIdx: string): Promise<boolean> {
        const headerIdx = await this.getHeaderIndex(header);
        const locator = this.cellSelectorByIndex.format(rowIdx, headerIdx.toString());
        return await gondola.isControlEnabled(locator);
    }

    /**
     * get cell textfield validation message by row index
     * @param header
     * @param rowIdx
     */
    public async getCellTextfieldValidationMessage(header: string, rowIdx: string): Promise<string> {
        const headerIdx = await this.getHeaderIndex(header);
        const locator = this.cellSelectorByIndex.format(rowIdx, headerIdx.toString());
        return await gondola.getValidationMessage(locator);
    }
}
