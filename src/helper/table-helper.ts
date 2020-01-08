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

    public async getAllHeaderNames(headerName: string): Promise<string[]> {
        return await gondola.getElementsAttributes(this.headerNameLocator.format(headerName), 'innerText');
    }

    public async getHeaderIndex(headerName: string): Promise<number> {
        const headers = await this.getAllHeaderNames(headerName);
        return headers.indexOf(headerName) + 1;
    }

    public async getAllRowsOneColumn(headerName: string): Promise<string[]> {
        const headerIdx = await this.getHeaderIndex(headerName);
        return await gondola.getElementsAttributes(this.columnByIndexLocator.format(headerIdx.toString()), 'innerText');
    }

    public async getRandomRowOneColumn(headerName: string, getPartial = false): Promise<string> {
        const rows = await this.getAllRowsOneColumn(headerName);
        const randomIdx = Utilities.getRandomNumber(0, rows.length - 1);
        const randomRow = getPartial ? Utilities.getRandomPartialCharacters(rows[randomIdx]) : rows[randomIdx];
        return randomRow;
    }

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

    public async getRowIndexByValue(columnName: string, value: string): Promise<number> {
        const rows = await this.getAllRowsOneColumn(columnName);
        const idx = rows.indexOf(value) + 1;
        if (idx === 0) {
            throw new Error('No row was found.');
        }
        return idx;
    }

    public async getRandomRow(): Promise<number> {
        const numberOfRow = await gondola.getElementCount(this.rowLocator);
        return Utilities.getRandomNumber(1, numberOfRow);
    }

    public async clickActionButton(buttonType: ActionButton, columnName?: string, value?: string): Promise<void> {
        const rowIdx =
            columnName && value ? await this.getRowIndexByValue(columnName, value) : await this.getRandomRow();
        await gondola.click(this.actionButton.format(rowIdx.toString(), buttonType.title));
    }

    public async getAllColumnsOneRow(columnName?: string, value?: string): Promise<string[]> {
        const rowIdx =
            columnName && value ? await this.getRowIndexByValue(columnName, value) : await this.getRandomRow();
        return await gondola.getElementsAttributes(this.recordRowCellsByIndex.format(rowIdx.toString()), 'innerText');
    }

    public async doesRowValueExists(columnName: string, value: string): Promise<boolean> {
        const allRow = await this.getAllRowsOneColumn(columnName);
        return allRow.indexOf(value) >= 0;
    }

    public async waitUntilRowValueExists(columnName: string, value: string): Promise<void> {
        const condition = async (): Promise<boolean> => {
            return await this.doesRowValueExists(columnName, value);
        };
        await gondola.waitUntilConditionCorrect(condition, Constants.SHORT_TIMEOUT);
    }

    public async removeRecordIfValueExist(value: string, header: string): Promise<void> {
        if (await this.doesRowValueExists(header, value)) {
            await this.clickActionButton(ActionButton.DELETE, header, value);
            await gondola.waitForAlert();
            await gondola.clickPopup('OK');
            await gondola.waitUntilStalenessOfElement(this.tableLocator);
        }
    }
}
