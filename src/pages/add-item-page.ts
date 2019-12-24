import { action, gondola, locator, page } from 'gondolajs';
import { Constants } from '../common/constants';
import { SearchResultColumn } from '../models/enum-class/search-result-column';
import '@src/string.extensions';
import { ItemInfo } from '../models/item-info';
import { RegistrationPage } from './registration-page';

@page
export class AddItemPage extends RegistrationPage {
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
    private remarks = { id: 'note' };
    radioButtonByLabel = "//div[label[text()='{0}']]//label[./preceding-sibling::input[@type='radio']]";
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
}
export default new AddItemPage();
