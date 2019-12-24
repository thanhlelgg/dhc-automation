import moment from 'moment';
import Kuroshiro from 'kuroshiro';
import AFHConvert from 'ascii-fullwidth-halfwidth-convert';
import { convertCircleDigitsCharacterToNumber } from '../helper/unicode-search';
const converter = new AFHConvert();
import { JsonConvert, ValueCheckingMode } from 'json2typescript';

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

    public static getRandomNumber(min: number, max: number, length = 0): number {
        if (length == 0) return Math.floor(Math.random() * (max - min + 1) + min);

        let numberAsString: string = '' + this.getRandomNumber(1, 9);
        for (let i = 1; i < length; i++) numberAsString += this.getRandomNumber(0, 9);
        return parseInt(numberAsString);
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

    public static getRandomText(numberOfCharacters: number, prefix?: string): string {
        const randomCharacter = Array(numberOfCharacters + 1)
            .join((Math.random().toString(36) + '00000000000000000').slice(2, 18))
            .slice(0, numberOfCharacters);

        if (prefix) return prefix + randomCharacter;
        return randomCharacter;
    }

    /**
     * Check if all results of partial search or full search are correct
     * @param keyword
     * @param result
     */
    public static isSearchResultCorrect(
        keyword: string,
        result: string[],
        isPartialSearch = true,
        isCaseSensitive = false,
        doesIgnoreSize = true,
        doesIgnoreDakuten = true,
        doesIgnoreHiraKata = true,
    ): boolean {
        if (keyword === '') {
            return true;
        }
        if (!isCaseSensitive) {
            keyword = keyword.toLowerCase();
        }
        if (doesIgnoreSize) {
            keyword = Utilities.convertToHalfSize(keyword);
        }
        if (doesIgnoreDakuten) {
            keyword = Utilities.removeDakutenHandakutenCharacter(keyword);
        }
        if (doesIgnoreHiraKata) {
            keyword = Utilities.convertToRomaji(keyword);
        }

        let isMatched = true;
        for (let item of result) {
            if (!isCaseSensitive) {
                item = item.toLowerCase();
            }
            if (doesIgnoreSize) {
                item = Utilities.convertToHalfSize(item);
            }
            if (doesIgnoreDakuten) {
                item = Utilities.removeDakutenHandakutenCharacter(item);
            }
            if (doesIgnoreHiraKata) {
                item = Utilities.convertToRomaji(item);
            }

            // Convert Circle Digit Character to string
            item = convertCircleDigitsCharacterToNumber(item);
            item = Utilities.convertToLatinh(item);

            if (isPartialSearch && !item.includes(keyword)) {
                isMatched = false;
                console.log(`Search for ${keyword} got incorrect at ${item}`);
            }
            if (!isPartialSearch && !this.isTextEqual(item, keyword)) {
                isMatched = false;
                console.log(`Search for ${keyword} got incorrect at ${item}`);
            }
        }

        return isMatched;
    }

    public static convertToHalfSize(text: string): string {
        // const halfwidthValue = text
        //     .replace(/[\uff01-\uff5e]/g, (fullwidthChar: string) =>
        //         String.fromCharCode(fullwidthChar.charCodeAt(0) - 0xfee0),
        //     )
        //     .replace(/\u3000/g, '\u0020');
        // return halfwidthValue;
        return converter.toHalfWidth(text);
    }

    public static removeDakutenHandakutenCharacter(rawTxt: string): string {
        const arrReplaceData = [
            ['ガ', 'カ'],
            ['が', 'か'],
            ['ギ', 'キ'],
            ['ぎ', 'き'],
            ['グ', 'ク'],
            ['ぐ', 'く'],
            ['ゲ', 'ケ'],
            ['げ', 'け'],
            ['ゴ', 'コ'],
            ['ご', 'こ'],
            ['ザ', 'サ'],
            ['ざ', 'さ'],
            ['ジ', 'シ'],
            ['じ', 'し'],
            ['ズ', 'ス'],
            ['ず', 'す'],
            ['ゼ', 'セ'],
            ['ぜ', 'せ'],
            ['ゾ', 'ソ'],
            ['ぞ', 'そ'],
            ['ダ', 'タ'],
            ['だ', 'た'],
            ['ヂ', 'チ'],
            ['ぢ', 'ち'],
            ['ヅ', 'ツ'],
            ['づ', 'つ'],
            ['デ', 'テ'],
            ['で', 'て'],
            ['ド', 'ト'],
            ['ど', 'と'],
            ['バ', 'ハ'],
            ['ば', 'は'],
            ['ビ', 'ヒ'],
            ['び', 'ひ'],
            ['ブ', 'フ'],
            ['ぶ', 'ふ'],
            ['ベ', 'ヘ'],
            ['べ', 'へ'],
            ['ボ', 'ホ'],
            ['ぼ', 'ほ'],
            ['パ', 'ハ'],
            ['ぱ', 'は'],
            ['ピ', 'ヒ'],
            ['ぴ', 'ひ'],
            ['プ', 'フ'],
            ['ぷ', 'ふ'],
            ['ペ', 'ヘ'],
            ['ぺ', 'へ'],
            ['ポ', 'ホ'],
            ['ぽ', 'ほ'],
        ];

        if (rawTxt.length > 0) {
            for (let i = 0; i < arrReplaceData.length; i++) {
                const replaceData = arrReplaceData[i];
                if (rawTxt.includes(replaceData[0])) {
                    rawTxt = rawTxt.replace(new RegExp(replaceData[0], 'g'), replaceData[1]);
                }
            }
        }
        return rawTxt;
    }

    public static convertToRomaji(text: string) {
        return Kuroshiro.Util.kanaToRomaji(text, 'nippon');
    }

    public static convertToLatinh(str: string): string {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    public static getNumberOfSearchResultRecords(pagingResultStr: string): number {
        const startPos = pagingResultStr.indexOf('表示(') + 3;
        const endPos = pagingResultStr.indexOf(' 件中)');
        return parseInt(pagingResultStr.substring(startPos, endPos));
    }

    public static getNumberOfSearchResultPages(pagingResultStr: string): number {
        const startPos = pagingResultStr.indexOf('目(') + 2;
        const endPos = pagingResultStr.indexOf('ページ中)');
        return parseInt(pagingResultStr.substring(startPos, endPos));
    }

    public static compareArrays(array1: any[], array2: any[]): boolean {
        return array1.length === array2.length && array1.sort().every((value, index) => value === array2.sort()[index]);
    }

    public static addDaysToDate(date: Date, days: number, returnFormat: string): string {
        date.setDate(date.getDate() + days);
        return moment(date).format(returnFormat);
    }

    public static getLaterDateOfTwoDates(date1: string, date2: string, format: string): string {
        const laterDate =
            moment(date1, format) >= moment(date2, format) ? moment(date1, format) : moment(date2, format);
        return laterDate.format(format);
    }
}

export class JsonUtility {
    /**
     * Convert json object to redefined object
     * @static
     * @param {*} json
     * @param {new () => any} classReference
     * @returns {*}
     * @memberof JsonUtility
     */
    public static deserialize(json: any, classReference: new () => any): any {
        try {
            let jsobj = json;
            if (typeof json == 'string') jsobj = JSON.parse(json as string);

            const jsonConvert = new JsonConvert();
            jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL; // never allow null

            try {
                const obj = jsonConvert.deserialize(jsobj, classReference);
                if ('triggerFunction' in obj) obj[obj.triggerFunction]();
                return obj;
            } catch (e) {
                console.log(e);
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * Convert json array object to redefined objects
     * @static
     * @param {*} json
     * @param {new () => any} classReference
     * @returns {*}
     * @memberof JsonUtility
     */
    public static deserializeArray(json: any, classReference: new () => any): any[] {
        try {
            let jsobj = json;
            if (typeof json == 'string') jsobj = JSON.parse(json as string);

            const jsonConvert = new JsonConvert();
            jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL; // never allow null

            try {
                return jsonConvert.deserializeArray(jsobj, classReference);
            } catch (e) {
                console.log(e);
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * Convert redefined object to json object
     * @static
     * @param {*} classReference
     * @returns {*}
     * @memberof JsonUtility
     */
    public static serialize(classReference: any): any {
        try {
            const jsonConvert = new JsonConvert();
            jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
            jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

            try {
                return jsonConvert.serialize(classReference);
            } catch (e) {
                console.log(e);
            }
        } catch (err) {
            throw err;
        }
    }
}

export default new Utilities();
