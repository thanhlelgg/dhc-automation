import { Constants } from '../../common/constants';

const UI_NAME = Constants.translator.dropdownOptions.position.timeCardApprove;

export class TimeCardApprove {
    static readonly NONE = new TimeCardApprove('NONE', UI_NAME.none);
    static readonly FULL = new TimeCardApprove('FULL', UI_NAME.full);
    static readonly ONLY_ASSIGN = new TimeCardApprove('ONLY_ASSIGN', UI_NAME.onlyAssign);
    static readonly ALLS = [TimeCardApprove.NONE, TimeCardApprove.FULL, TimeCardApprove.ONLY_ASSIGN];
    // private to disallow creating other instances of this type
    private constructor(private readonly csvName: string, public readonly uiName: string) {}

    toString(): string {
        return this.csvName;
    }

    static getUIName(csvName: string): TimeCardApprove {
        for (const timeCardApprove of TimeCardApprove.ALLS) {
            if (timeCardApprove.csvName === csvName) {
                return timeCardApprove;
            }
        }
        throw new Error(`CSV name ${csvName} is not available`);
    }
}
