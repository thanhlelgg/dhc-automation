import { action, gondola, page, locator } from 'gondolajs';
import { GeneralPage } from './general-page';
import { Constants } from '../common/constants';
import { TableHelper } from '../helper/table-helper';
import TableType from '../models/enum-class/table-type';
import { PositionsTableHeader } from '../models/enum-class/positions-table-header';
@page
export class ListPositionPage extends GeneralPage {
    private pageUrl = `${Constants.TTS_BASE_URL}/positions`;
    protected positionLink = "//div[@tabulator-field='position_name']/a[text()='{0}']";
    @locator
    protected positionsTable = "//div[@id='data-table']";
    protected tableHelper = new TableHelper(this.positionsTable, TableType.TABULAR_DIV);
    @action('open Position by name')
    public async openPositionByName(name: string): Promise<void> {
        await gondola.click(this.positionLink.format(name));
    }

    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
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
}
export default new ListPositionPage();
