import exchangeInfo from '../data/exchange-info.json';

export class ExchangeInfo {
    code!: string;
    currencyName?: string;
    currencyUnit!: string;
    currencySymbol?: string;
    remarks?: string;

    public getCurrencyOption(): string {
        return `${this.code} - ${this.currencyName} (${this.currencySymbol})`;
    }
}

export class ExchangeInfoData {
    public static EXCHANGE_FULL_DATA: ExchangeInfo = Object.assign(new ExchangeInfo(), exchangeInfo.fullData);
    public static EXCHANGE_RECORDS_DATA: ExchangeInfo[] = exchangeInfo.recordsData.map(item => {
        return Object.assign(new ExchangeInfo(), item);
    });
    public static EXCHANGE_REQUIRED_DATA: ExchangeInfo = Object.assign(new ExchangeInfo(), exchangeInfo.requiredOnly);
}
