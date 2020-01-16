import { gondola } from 'gondolajs';
import '@src/string.extensions';
import { Utilities } from '../common/utilities';
import { ActionButton } from '../models/enum-class/action-button';
import { Constants } from '../common/constants';
import TableType from '../models/enum-class/table-type';

export class TableHelper {
    private tableLocator: string;
    private headerRowLocator: string;
    private headerNameLocator: string;
    private columnByIndexLocator: string;
    private recordRowCellsByIndex: string;
    private rowLocator: string;
    private actionButton: string;

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
            this.recordRowCellsByIndex = `${locator}//div[@role='row'][1]/div[@role='gridcell']`;
            this.actionButton = `${locator}//div[@role='row'][1]//a[@title="削除"]`;
        } else {
            this.tableLocator = locator;
            this.headerRowLocator = `${locator}/thead/tr`;
            this.headerNameLocator = `${locator}/thead/tr/th`;
            this.columnByIndexLocator = `${locator}/tbody/tr/td[{0}]`;
            this.rowLocator = `${locator}/tbody/tr`;
            this.recordRowCellsByIndex = `${locator}/tbody/tr[{0}]/td`;
            this.actionButton = `${locator}/tbody/tr[{0}]/td[@class='actions text-center']/a[@title='{1}']`;
        }
    }

    /**
     * Get list of table header/column name
     * @param headerName
     */
    public async getAllHeaderNames(): Promise<string[]> {
        return await gondola.getElementsAttributes(this.headerNameLocator, 'innerText');
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
    public async clickActionButton(buttonType: ActionButton, columnName?: string, value?: string): Promise<void> {
        const rowIdx =
            columnName && value ? await this.getRowIndexByValue(columnName, value) : await this.getRandomRow();
        await gondola.click(this.actionButton.format(rowIdx.toString(), buttonType.title));
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
            await this.clickActionButton(ActionButton.DELETE, header, value);
            await gondola.waitForAlert();
            await gondola.clickPopup('OK');
            await gondola.waitUntilStalenessOfElement(this.tableLocator);
        }
    }
}
