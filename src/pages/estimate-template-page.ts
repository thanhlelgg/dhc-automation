import { action, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import '@src/string.extensions';
import { Constants } from '../common/constants';
import { TableHelper } from '../helper/table-helper';
import { ActionButton } from '../models/enum-class/action-button';

@page
export class EstimateTemplatePage extends GeneralPage {
    protected pageUrl = `${Constants.BMS_BASE_URL}/projects/estimate-template-file-index`;
    @locator
    protected templateTable = '//table';
    protected tableHelper = new TableHelper(this.templateTable);
    protected tableColumnName = Constants.translator.columnName.estimateTemplate;

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }

    @action('upload template if does not exist')
    public async uploadTemplateFileIfDoesNotExist(filePath: string, fileName: string): Promise<void> {
        if (!(await this.doesTemplateExist(fileName))) {
            await this.uploadFile(filePath);
            await this.clickSubmitButton();
        }
    }

    @action('remove template if exist')
    public async removeTemplateFileIfExist(fileName: string): Promise<void> {
        await this.tableHelper.removeRecordIfValueExist(fileName, this.tableColumnName.fileName);
    }

    @action('does template exist')
    public async doesTemplateExist(fileName: string): Promise<boolean> {
        return await this.tableHelper.doesRowValueExists(this.tableColumnName.fileName, fileName);
    }

    @action('remove template file')
    public async removeTemplateFile(fileName: string): Promise<void> {
        await this.tableHelper.clickActionButton(ActionButton.DELETE, this.tableColumnName.fileName, fileName);
    }

    @action('download template')
    public async downloadTemplate(templateName: string): Promise<void> {
        await this.removeDownloadedFile(templateName);
        await this.tableHelper.clickRecordRowLinkByText(this.tableColumnName.fileName, templateName);
    }

    @action('check template downloaded')
    public async checkTemplateDownloaded(templateName: string): Promise<boolean> {
        return await this.isFileDownloadedCorrectly(templateName);
    }
}
export default new EstimateTemplatePage();
