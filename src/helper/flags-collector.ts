import { gondola } from 'gondolajs';
import value from '*.json';

export enum LoggingType {
    REPORT,
    CONSOLE,
    NONE,
}

export class FlagsCollector {
    private static failedFlags: string[];

    public static async collectTruthLazy(
        message: string,
        getValue: (...args: any[]) => Promise<boolean>,
        ...args: any[]
    ): Promise<void> {
        FlagsCollector.collectTruth(message, await getValue(...args), true);
    }

    public static collectTruth(message: string, value?: boolean, skipIfUndefined = true): void {
        if (value === undefined && skipIfUndefined) {
            return;
        }
        if (!FlagsCollector.failedFlags) {
            FlagsCollector.failedFlags = [];
        }
        if (!value) {
            FlagsCollector.failedFlags.push(message);
        }
    }

    /**
     * Collect equal but check if expected data is available or not before calling the get actual data method
     * this should be used when element is not exist to get it's attribute
     * @param message
     * @param expected
     * @param getActualValue
     * @param args
     */
    public static collectEqualLazy(
        message: string,
        expected: string | number | boolean | undefined,
        getActualValue: (...args: any[]) => Promise<any>,
        ...args: any[]
    ): void {
        if (expected === undefined) {
            return;
        }
        getActualValue(...args).then(value => {
            FlagsCollector.collectEqual(message, expected, value, true);
        });
    }

    public static collectEqual(
        message: string,
        expected: string | number | boolean | undefined,
        actual: string | number | boolean,
        skipIfUndefined = true,
    ): void {
        if (!FlagsCollector.failedFlags) {
            FlagsCollector.failedFlags = [];
        }
        if (expected === undefined) {
            if (skipIfUndefined) {
                return;
            }
            expected = '';
        }
        if (!(expected === actual)) {
            message = `${message}. Expected: ${expected}, got ${actual}`;
            FlagsCollector.failedFlags.push(message);
        }
    }

    public static verifyFlags(loggingType = LoggingType.NONE): boolean {
        let result = true;
        if (FlagsCollector.failedFlags.length > 0) {
            if (loggingType === LoggingType.REPORT) {
                gondola.report(`Failed flag(s): \n${this.failedFlags.join('.\n')}`);
            } else if (loggingType === LoggingType.CONSOLE) {
                console.log(`Failed flag(s): \n${this.failedFlags.join('.\n')}`);
            }
            result = false;
        }
        delete FlagsCollector.failedFlags;
        return result;
    }
}
