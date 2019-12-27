import * as fs from 'fs';
import { parse } from 'papaparse';

export class CsvHelpers {
    public static getCsvData(path: string, includeHeader = false): string[][] {
        let result: string[][] = [];
        const file = fs.readFileSync(path, 'utf8');
        parse(file, {
            complete: function(results) {
                result = results.data;
            },
        });
        if (!includeHeader) {
            result = result.slice(1);
        }
        return result;
    }

    public static getColumnIndex(path: string, columnName: string): number {
        const header = CsvHelpers.getCsvData(path, true)[0];
        return header.indexOf(columnName);
    }
}
export default new CsvHelpers();
