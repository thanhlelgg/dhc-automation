import moment from 'moment';

export class Utilities {
    public static formatString(str: string, ...val: string[]): string {
        for (let index = 0; index < val.length; index++) {
            str = str.replace(`{${index}}`, val[index]);
        }
        return str;
    }

    public static mapJsonToClass(mapper: any, json: any): any {
        const adaptedObj: any = {};
        const fields: Array<string> = Object.keys(mapper);
        for (const field of fields) {
            const targetField: any = mapper[field];
            adaptedObj[targetField] = json[field];
        }
        return adaptedObj;
    }

    public static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Check if keyword is filtered correctly
     * @param keyword
     * @param result
     */
    public static isFilterCorrect(keyword: string, result: string[], isCaseSensitive = false): boolean {
        if (keyword === '') {
            return true;
        }
        if (!isCaseSensitive) {
            keyword = keyword.toLowerCase();
        }
        for (let item of result) {
            if (!isCaseSensitive) {
                item = item.toLowerCase();
            }
            if (!item.includes(keyword)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if keyword is filtered correctly
     * @param keyword
     * @param result
     */
    public static isFilterMultipleColumnCorrect(keyword: string, result: string[][], isCaseSensitive = false): boolean {
        if (keyword === '') {
            return true;
        }
        if (!isCaseSensitive) {
            keyword = keyword.toLowerCase();
        }
        for (const row of result) {
            let isMatched = false;
            for (let item of row) {
                if (!isCaseSensitive) {
                    item = item.toLowerCase();
                }
                if (item.includes(keyword)) {
                    isMatched = true;
                    break;
                }
            }
            if (!isMatched) {
                console.log(`Filter for ${keyword} got incorrect row ${row}`);
                return false;
            }
        }
        return true;
    }

    /**
     * Get a random partial characters of a text
     * @param text
     */
    public static getRandomPartialCharacters(text: string): string {
        if (text === '') {
            return '';
        }
        return text.substring(0, Utilities.getRandomNumber(0, text.length));
    }

    /**
     * Get key from a map, throw exception instead of return undefined
     * @param map
     * @param key
     */
    public static getMapValue(map: Map<any, string>, key: any): any {
        const value = map.get(key);
        if (value === undefined) {
            throw new Error(`Key: ${key} is not exist`);
        }
        return value;
    }

    /**
     * Check if array is a subset of another array
     * @param superset array which should contain subset array
     * @param subset array should be in superset array
     */
    public static isSubset(superset: any[], subset: any[]): boolean {
        // Verify a superset of empty array doesn't have any meaning, if it's expected behavior, handle it before use this utility
        if (superset.length > 0 && subset.length === 0) {
            return false;
        }
        const isSubset = subset.every(val => {
            const isExist = superset.indexOf(val) >= 0;
            if (!isExist) {
                console.log(`${val} is not exist in superset`);
            }
            return superset.indexOf(val) >= 0;
        });
        return isSubset;
    }

    /**
     * check if text is equal to expected value
     * @param checkValue
     * @param expectValue
     */
    public static isTextEqual(checkValue: string, expectValue: string): boolean {
        return checkValue === expectValue;
    }

    /**
     * Verify if date is in correct format
     * @param date
     * @param format
     */
    public static isDateFormatCorrect(date: string, format: string): boolean {
        return moment(date, format, true).isValid();
    }

    /**
     * Get date string with inputted format
     * @param day
     * @param month
     * @param year
     * @param dateFormat
     */
    public static getDateString(day: string, month: string, year: string, dateFormat: string): string {
        const dateString = `${day}-${month}-${year}'`;
        const momentObj = moment(dateString, 'DD-MM-YYYY');
        return momentObj.format(dateFormat);
    }

    public static currentTimeInSeconds(): number {
        return new Date().getTime() / 1000;
    }

    public static getRandomText(numberOfCharacters: number): string {
        return Array(numberOfCharacters + 1)
            .join((Math.random().toString(36) + '00000000000000000').slice(2, 18))
            .slice(0, numberOfCharacters);
    }

    public static compareArrays(array1: any[], array2: any[]): boolean {
        return array1.length === array2.length && array1.sort().every((value, index) => value === array2.sort()[index]);
    }

    public static addDaysToDate(date: Date, days: number, returnFormat: string): string {
        date.setDate(date.getDate() + days);
        return moment(date).format(returnFormat);
    }
}
export default new Utilities();
