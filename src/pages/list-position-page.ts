import { gondola, locator, page, action } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { HTMLTableHelper } from '../helper/html-table-helper';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { CsvHelpers } from '../helper/csv-helpers';
import { PositionsTableHeader } from '../models/enum-class/positions-table-header';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import { ActionButton } from '../models/enum-class/action-button';
import { TimeCardApprove } from '../models/enum-class/timecard-approve';

@page
export class PositionsPage extends GeneralPage {
    pageUrl = `${Constants.tmsBaseUrl}/positions`;
    @locator
    protected positionsTable = '//table';
    protected tableHelper = new HTMLTableHelper(this.positionsTable);
    @locator
    protected importButton = "//a[i[@class='fa fa-upload']]";
    @locator
    protected downloadButton = "//a[i[@class='fa fa-upload']]";
    @locator
    protected importModalTitle = `//div[@class='modal-body']/label[normalize-space()='${Constants.translator.modalWindows.importPositionTitle}']`;
    @locator
    protected fileInput = "//input[@type='file']";

    @action('get random cell of a column')
    public async getRandomCellOfPositionTableByHeaderName(headerName: string, getPartial = false): Promise<string> {
        return await this.tableHelper.getRandomRowOneColumn(headerName, getPartial);
    }

    @action('click action button')
    public async clickActionButton(buttonType: ActionButton, columnName?: string, value?: string): Promise<void> {
        await this.tableHelper.clickActionButton(buttonType, columnName, value);
    }

    @action('does search result display correctly')
    public async doesSearchResultDisplayCorrectly(input: string): Promise<boolean> {
        const results = await this.tableHelper.getAllRecordCells();
        return Utilities.isFilterMultipleColumnCorrect(input, results);
    }

    @action('does import modal display')
    public async doesImportModalDisplay(isExpected = true): Promise<boolean> {
        if (!isExpected) {
            await gondola.waitUntilElementNotVisible(this.importModalTitle);
        } else {
            await gondola.waitUntilElementVisible(this.importModalTitle);
        }
        return await gondola.doesControlDisplay(this.importModalTitle);
    }

    @action('remove downloaded position template')
    public removeDownloadedPositionTemplate(): void {
        Utilities.removeFileIfExist(Constants.DEFAULT_POSITION_DOWNLOAD_FILE_PATH);
    }

    @action('is file downloaded correctly')
    public async isFileDownloadedCorrectly(): Promise<boolean> {
        const filePath = Constants.DEFAULT_POSITION_DOWNLOAD_FILE_PATH;
        await gondola.waitUntilFileExists(filePath);
        return Utilities.isFileExist(filePath);
    }

    @action('is position imported correctly')
    public async isPositionImportedCorrectly(filePath: string): Promise<boolean> {
        if (!PositionsTableHeader.POSITION_NAME.csvColumnName) {
            throw new Error('CSV column is not available');
        }
        const csvPositionNameIdx = CsvHelpers.getColumnIndex(
            filePath,
            PositionsTableHeader.POSITION_NAME.csvColumnName,
        );
        const csvData = CsvHelpers.getCsvData(filePath);
        // Go through all rows and verify csv data and UI data
        for (const csvRow of csvData) {
            const actualRow = await this.tableHelper.getAllColumnsOneRow(
                PositionsTableHeader.POSITION_NAME.uiColumnName,
                csvRow[csvPositionNameIdx],
            );
            if (!(await this.compareExpectedAndActualPosition(filePath, csvRow, actualRow))) {
                return false;
            }
        }
        return true;
    }

    @action('compare csv data and ui data')
    public async compareExpectedAndActualPosition(
        csvFilePath: string,
        csvRow: string[],
        uiRow: string[],
    ): Promise<boolean> {
        for (const headerName of PositionsTableHeader.ALLS) {
            // This field doesn't depend on CSV file
            if (!headerName.csvColumnName) {
                continue;
            }
            const csvRowIdx = CsvHelpers.getColumnIndex(csvFilePath, headerName.csvColumnName);
            const uiRowIdx = await this.tableHelper.getHeaderIndex(headerName.uiColumnName);
            let expected = csvRow[csvRowIdx];
            // UI index start with 1 when array index start with 0
            const actual = uiRow[uiRowIdx - 1];
            // Convert UI value to match with csv value
            if (headerName === PositionsTableHeader.TIME_CARD_APPROVE) {
                expected = TimeCardApprove.getUIName(expected).uiName;
            }
            FlagsCollector.collectEqual(
                `Position attribute ${headerName.uiColumnName} is not displayed correctly`,
                expected,
                actual,
            );
        }
        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('does position name display')
    public async doesPositionValueDisplay(value: string, header: PositionsTableHeader): Promise<boolean> {
        return await this.tableHelper.doesRowValueExists(header.uiColumnName, value);
    }

    // since both name and abbreviation must be unique, remove both of them
    @action('remove position if exist')
    public async removePositionIfExist(positionName: string, positionAbbreviation: string): Promise<void> {
        await this.tableHelper.removeRecordIfValueExist(positionName, PositionsTableHeader.POSITION_NAME.uiColumnName);
        await this.tableHelper.removeRecordIfValueExist(
            positionAbbreviation,
            PositionsTableHeader.POSITION_ABBREVIATION.uiColumnName,
        );
    }

    @action('remove position if exist')
    public async removePositionIfExistFromCSVFile(filePath: string): Promise<void> {
        if (!PositionsTableHeader.POSITION_NAME.csvColumnName) {
            throw new Error('CSV column is not available');
        }
        if (!PositionsTableHeader.POSITION_ABBREVIATION.csvColumnName) {
            throw new Error('CSV column is not available');
        }
        const csvPositionNameIdx = CsvHelpers.getColumnIndex(
            filePath,
            PositionsTableHeader.POSITION_NAME.csvColumnName,
        );
        const csvAbbreviationNameIdx = CsvHelpers.getColumnIndex(
            filePath,
            PositionsTableHeader.POSITION_ABBREVIATION.csvColumnName,
        );
        const csvData = CsvHelpers.getCsvData(Constants.POSITION_CSV_PATH);
        for (const csvRow of csvData) {
            await this.removePositionIfExist(csvRow[csvPositionNameIdx], csvRow[csvAbbreviationNameIdx]);
        }
    }

    @action('upload csv file')
    public async uploadFile(filePath: string): Promise<void> {
        await gondola.sendKeys(this.fileInput, filePath);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new PositionsPage();
