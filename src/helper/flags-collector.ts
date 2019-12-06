import { gondola } from 'gondolajs';

export enum LoggingType {
    REPORT,
    CONSOLE,
    NONE,
}

export class FlagsCollector {
    private static failedFlags: string[];

    public static collectTruth(message: string, value: boolean): void {
        if (!FlagsCollector.failedFlags) {
            this.failedFlags = [];
        }
        if (!value) {
            this.failedFlags.push(message);
        }
    }

    public static collectEqual(message: string, expected: string | number, actual: string | number): void {
        if (!FlagsCollector.failedFlags) {
            this.failedFlags = [];
        }
        if (!(expected === actual)) {
            message = `${message}. Expected: ${expected}, got ${actual}`;
            this.failedFlags.push(message);
        }
    }

    public static verifyFlags(loggingType = LoggingType.NONE): boolean {
        let result = true;
        if (this.failedFlags.length > 0) {
            if (loggingType === LoggingType.REPORT) {
                gondola.report(`Failed flag(s): \n${this.failedFlags}`);
            } else if (loggingType === LoggingType.CONSOLE) {
                console.log(`Failed flag(s): \n${this.failedFlags}`);
            }
            result = false;
        }
        delete this.failedFlags;
        return result;
    }
}
