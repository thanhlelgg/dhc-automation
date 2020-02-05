import { gondola } from 'gondolajs';

export enum LoggingType {
    REPORT,
    CONSOLE,
    NONE,
}

export enum CustomerFieldName {
    CUSTOMER_CODE,
    CUSTOMER_NAME,
    SUBCODE,
    AID_CODE,
}

export class FlagsCollector {
    private static failedFlags: string[];

    /**
     * Assert true but don't throw exception right away after failed. Need to call `verifyFlags` to assert result.
     * @param message
     * @param value
     * @param skipIfUndefined
     */
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
     * this should be used when we don't want to get actual value if expected value is undefined
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

    /**
     * Assert true but don't throw exception right away after failed. Need to call `verifyFlags` to assert result.
     * @param message
     * @param expected
     * @param actual
     * @param skipIfUndefined default true
     */
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

    /**
     * Verify all cached checkpoints.
     * @param loggingType
     */
    public static verifyFlags(loggingType = LoggingType.REPORT): boolean {
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
