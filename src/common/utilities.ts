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
    public static isFilterCorrect(keyword: string, result: string[]): boolean {
        if (keyword === '') {
            return true;
        }
        for (const item of result) {
            if (!item.includes(keyword)) {
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
}
export default new Utilities();
