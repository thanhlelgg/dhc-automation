import { action, gondola, locator, page } from 'gondolajs';
import { Constants } from '../common/constants';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import '@src/string.extensions';
import { ItemInfo } from '../models/item-info';
import { FilterType } from '../models/enum-class/filter-field-type';
import searchModalWindows from './search-modal-windows';
import { GeneralPage } from './general-page';
import { FlagsCollector, LoggingType } from '../helper/flags-collector';
import { Utilities } from '../common/utilities';

@page
export class AddItemPage extends GeneralPage {
    private pageUrl = `${Constants.bmsBaseUrl}/items/add`;

    //#region Item information
    @locator
    private itemCode = { id: 'cd' };
    private itemName = { id: 'name' };
    private mgmtSection = { id: 'manage-cd' };
    private unitPrice = { id: 'unit-price' };
    private stockEvaluationUnitPrice = { id: 'stock-evaluation-unit-price' };
    private supplyUnitPrice = { id: 'supply-unit-price' };
    private manageUnit = { id: 'manage-unit' };
    private costCenter = { id: 'cost-center' };
    private debitSubcode = { id: 'debit-aux-cd' };
    private creditSubcode = { id: 'credit-aux-cd' };
    private chkDisable = { id: 'is-disable' };
    private lbDisable = { xpath: "//input[@id='is-disable']/following-sibling::label" };
    private isDisable = "//input[@id='is-disable']";
    private remarks = { id: 'note' };
    radioButtonByLabel =
        "//div[label[text()='{0}']]//preceding-sibling::input[@type='radio']//following-sibling::label";

    //#region search Segment
    @locator
    protected searchSegmentField = { id: 'search-segments' };
    @locator
    protected segmentTable = { id: 'modal-segments-table' };
    //#endregion

    fieldName = this.translator.fieldName.addItem;
    //#endregion

    //#region Item arrangement destination information
    private arrangementLevel = { id: 'item-arrangements-0-arrange-level' };

    private arrangementPlace = { id: 'item-arrangements-0-arrange-cd' };
    private arrangementUnit = { id: 'item-arrangements-0-arrange-unit' };
    private arrangementUnitMulp = { id: 'item-arrangements-0-arrange-unit-multiple' };
    private unitPurchasePrice = { id: 'item-arrangements-0-purchase-unit-price' };
    //#endregion

    @action('saveNewItem')
    public async saveNewItem(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('input item information')
    public async inputItemInformation(itemInfo: ItemInfo): Promise<void> {
        // input required fields
        await gondola.waitUntilElementVisible(this.itemCode);
        await gondola.enter(this.itemCode, itemInfo.itemCode);
        await gondola.enter(this.itemName, itemInfo.itemName);
        await gondola.select(this.mgmtSection, itemInfo.managementSection);
        await this.selectSegment(itemInfo.segment, SearchResultColumn.NAME);
        await this.selectRadioButtonByLabel(Constants.translator.fieldName.addItem.tax, itemInfo.tax);

        // Input optional fields
        if (itemInfo.unitPrice) await gondola.enter(this.unitPrice, itemInfo.unitPrice.toString());
        if (itemInfo.inventoryEvaluationUnitPrice)
            await gondola.enter(this.stockEvaluationUnitPrice, itemInfo.inventoryEvaluationUnitPrice.toString());
        if (itemInfo.supplyUnitPrice) await gondola.enter(this.supplyUnitPrice, itemInfo.supplyUnitPrice.toString());
        if (itemInfo.managementUnit) await gondola.enter(this.manageUnit, itemInfo.managementUnit.toString());
        if (itemInfo.costCenter) await gondola.enter(this.costCenter, itemInfo.costCenter);
        if (itemInfo.debitSubcode) await gondola.enter(this.debitSubcode, itemInfo.debitSubcode);
        if (itemInfo.creditSubcode) await gondola.enter(this.creditSubcode, itemInfo.creditSubcode);
        if (itemInfo.isInvalidation)
            await this.setStateCheckbox(this.chkDisable, itemInfo.isInvalidation, this.lbDisable);
        if (itemInfo.remarks) await gondola.enter(this.remarks, itemInfo.remarks);
    }

    @action('select segment')
    public async selectSegment(segment: string, byColumn?: SearchResultColumn): Promise<void> {
        await this.clickTextFieldByLabel(this.fieldName.segment);
        await searchModalWindows.filterResult(segment, FilterType.SEGMENTS);
        await searchModalWindows.selectSearchResult(segment, byColumn);
    }

    @action('does content of item displays correct')
    public async doesContentOfItemDisplayCorrect(item: ItemInfo): Promise<boolean> {
        gondola.report('Verify content of project overview');
        FlagsCollector.collectTruth(
            'Worker name should be correct',
            await this.doesItemNameDisplayCorrect(item.itemName),
        );
        FlagsCollector.collectTruth(
            'Management section should be correct',
            await this.doesManagementSectionDisplayCorrect(item.managementSection),
        );
        FlagsCollector.collectTruth(
            'Segment should be correct',
            await this.doesSegmentDisplayCorrect(item.segment, true),
        );
        FlagsCollector.collectTruth(
            'Unit price should be correct',
            await this.doesUnitPriceDisplayCorrect(item.unitPrice),
        );
        FlagsCollector.collectTruth(
            `Radio button ${item.tax} should be selected`,
            await this.isTaxableSelectedCorrect(item.tax),
        );
        FlagsCollector.collectTruth(
            'Management unit should be correct',
            await this.doesManageUnitDisplayCorrect(item.managementUnit),
        );
        FlagsCollector.collectTruth(
            'Cost center should be correct',
            await this.doesCostCenterDisplayCorrect(item.costCenter),
        );
        FlagsCollector.collectTruth(
            'Debit code should be correct',
            await this.doesDebitCodeDisplayCorrect(item.debitSubcode),
        );
        FlagsCollector.collectTruth(
            'Credit code should be correct',
            await this.doesCreditCodeDisplayCorrect(item.creditSubcode),
        );
        FlagsCollector.collectTruth(
            'Isdisable checkbox should be correct',
            await this.isDisableCheckboxDisplayCorrect(item.isInvalidation),
        );
        FlagsCollector.collectTruth('Item note should be correct', await this.doesNoteDisplayCorrect(item.remarks));

        return FlagsCollector.verifyFlags(LoggingType.REPORT);
    }

    @action('does item name display correct')
    public async doesItemNameDisplayCorrect(itemName: string): Promise<boolean> {
        const currentName = await this.getTextBoxValue(this.itemName);
        return Utilities.isTextEqual(currentName, itemName);
    }

    @action('does management section display correct')
    public async doesManagementSectionDisplayCorrect(managementSection: string): Promise<boolean> {
        const currentName = await gondola.getSelectedOption(this.mgmtSection);
        return Utilities.isTextEqual(currentName, managementSection);
    }

    @action('does segment display correct')
    public async doesSegmentDisplayCorrect(segmentStr: string, isMatchEntire: boolean): Promise<boolean> {
        const currentSegment = await this.getTextBoxValue(this.searchSegmentField);
        if (isMatchEntire) {
            return Utilities.isTextEqual(currentSegment, segmentStr);
        } else {
            return currentSegment.includes(segmentStr);
        }
    }

    @action('does unit price display correct')
    public async doesUnitPriceDisplayCorrect(unitPrice: number | undefined): Promise<boolean> {
        const currentValue = await this.getTextBoxValue(this.unitPrice);
        return Utilities.isTextEqual(currentValue, unitPrice ? unitPrice + '' : '');
    }

    @action('does manage unit display correct')
    public async doesManageUnitDisplayCorrect(manageUnit: string | undefined): Promise<boolean> {
        const currentValue = await this.getTextBoxValue(this.manageUnit);
        return Utilities.isTextEqual(currentValue, manageUnit ? manageUnit + '' : '');
    }

    @action('does cost center display correct')
    public async doesCostCenterDisplayCorrect(costCenter: string | undefined): Promise<boolean> {
        const currentValue = await this.getTextBoxValue(this.costCenter);
        return Utilities.isTextEqual(currentValue, costCenter ? costCenter : '');
    }

    @action('does debit code display correct')
    public async doesDebitCodeDisplayCorrect(debitCode: string | undefined): Promise<boolean> {
        const currentValue = await this.getTextBoxValue(this.debitSubcode);
        return Utilities.isTextEqual(currentValue, debitCode ? debitCode : '');
    }

    @action('does credit code display correct')
    public async doesCreditCodeDisplayCorrect(creditCode: string | undefined): Promise<boolean> {
        const currentValue = await this.getTextBoxValue(this.creditSubcode);
        return Utilities.isTextEqual(currentValue, creditCode ? creditCode : '');
    }

    @action('isDisable checkbox display correct')
    public async isDisableCheckboxDisplayCorrect(isDisable: boolean | undefined): Promise<boolean> {
        if (isDisable === undefined) {
            return true;
        }
        const isChecked = await this.getCheckboxValue(this.isDisable, false);
        return isDisable ? isChecked === isDisable : isChecked === false;
    }

    @action('does note display correct')
    public async doesNoteDisplayCorrect(note: string | undefined): Promise<boolean> {
        const currentValue = await this.getTextBoxValue(this.remarks);
        return Utilities.isTextEqual(currentValue, note ? note : '');
    }

    @action('isTaxable selected correct')
    public async isTaxableSelectedCorrect(tax: string | undefined): Promise<boolean> {
        if (!tax) {
            return true;
        }
        return await this.getCheckboxValue(this.radioButtonByLabel.format(this.fieldName.tax, tax), false);
    }

    @action('is current page')
    public async isCurrentPage(): Promise<boolean> {
        return await super.isCurrentPage(this.pageUrl);
    }
}
export default new AddItemPage();
