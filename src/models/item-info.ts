import itemInfo from '../data/item-info.json';
import itemInitialData from '../data/initial-data/item-info.json';
import { JsonUtility, Utilities } from '../common/utilities.js';
import { JsonProperty } from 'json2typescript';
import { Constants } from '../common/constants.js';

export class ItemInfo {
    @JsonProperty('itemCode', String)
    itemCode: string = undefined;
    @JsonProperty('itemName', String)
    itemName: string = undefined;
    @JsonProperty('managementSection', String)
    managementSection: string = undefined;
    @JsonProperty('segment', String)
    segment: string = undefined;
    @JsonProperty('unitPrice', Number, true)
    unitPrice: number = undefined;
    @JsonProperty('inventoryEvaluationUnitPrice', Number, true)
    inventoryEvaluationUnitPrice: number = undefined;
    @JsonProperty('supplyUnitPrice', Number, true)
    supplyUnitPrice: number = undefined;
    @JsonProperty('tax', String, true)
    tax: string = undefined;
    @JsonProperty('managementUnit', String, true)
    managementUnit: string = undefined;
    @JsonProperty('costCenter', String, true)
    costCenter: string = undefined;
    @JsonProperty('debitSubcode', String, true)
    debitSubcode: string = undefined;
    @JsonProperty('creditSubcode', String, true)
    creditSubcode: string = undefined;
    @JsonProperty('isInvalidation', Boolean, true)
    isInvalidation: boolean = undefined;
    @JsonProperty('remarks', String, true)
    remarks: string = undefined;

    constructor() {
        this.itemCode = Utilities.getRandomText(8, 'code');
        this.itemName = Utilities.getRandomText(8, 'name');
        this.segment = undefined;
        this.randomManagementSection();
        this.randomTax();
    }

    public initOptionalValues(): void {
        // should change the max number based on new requirements (16 digit)
        this.unitPrice = Utilities.getRandomNumber(0, 999999);
        this.inventoryEvaluationUnitPrice = Utilities.getRandomNumber(0, 999999);
        this.supplyUnitPrice = Utilities.getRandomNumber(0, 999999);
        this.managementUnit = Utilities.getRandomText(3);
        this.costCenter = 'SES・開発';
        this.debitSubcode = Utilities.getRandomText(16);
        this.creditSubcode = Utilities.getRandomText(16);
        this.isInvalidation = Math.random() >= 0.5;
        this.remarks = Utilities.getRandomText(1024);
    }

    private randomTax(): void {
        const taxes: string[] = Object.values(Constants.translator.radioButtonOptions.addItem.tax);
        this.tax = taxes[Utilities.getRandomNumber(0, taxes.length - 1)];
    }

    private randomManagementSection(): void {
        const tmp: string[] = Object.values(Constants.translator.dropdownOptions.managementSection);
        this.managementSection = tmp[Utilities.getRandomNumber(0, tmp.length - 1)];
    }
}

export class ItemInfoData {
    public static ITEM_REQUIRED_DATA: ItemInfo = JsonUtility.deserialize(itemInfo, ItemInfo);
    public static ITEM_INITIAL_DATA: ItemInfo[] = JsonUtility.deserializeArray(itemInitialData, ItemInfo);
}
