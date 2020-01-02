import itemInfo from '../data/item-info.json';
import itemInitialData from '../data/initial-data/item-info.json';
import { Utilities } from '../common/utilities.js';
import { Constants } from '../common/constants.js';

export class ItemInfo {
    itemCode: string;
    itemName: string;
    managementSection!: string;
    segment!: string;
    unitPrice?: number;
    inventoryEvaluationUnitPrice?: number;
    supplyUnitPrice?: number;
    tax?: string;
    managementUnit?: string;
    costCenter?: string;
    debitSubcode?: string;
    creditSubcode?: string;
    isInvalidation?: boolean;
    remarks?: string;

    constructor() {
        this.itemCode = Utilities.getRandomText(8, 'code');
        this.itemName = Utilities.getRandomText(8, 'name');
        this.segment;
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
    public static ITEM_REQUIRED_DATA: ItemInfo = Object.assign(new ItemInfo(), itemInfo);
    public static ITEM_INITIAL_DATA: ItemInfo[] = itemInitialData.map(item => {
        return Object.assign(new ItemInfo(), item);
    });
}
