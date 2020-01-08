import taxInfo from '../data/tax-info.json';
import taxInitialData from '../data/initial-data/tax-info.json';

export class TaxInfo {
    name!: string;
    taxRate!: number;
    displayOrder!: number;
}

export class TaxInfoData {
    public static TAX_FULL_DATA: TaxInfo = Object.assign(new TaxInfo(), taxInfo.fullData);
    public static TAX_INITIAL_DATA: TaxInfo[] = taxInitialData.map(item => {
        return Object.assign(new TaxInfo(), item);
    });
}
