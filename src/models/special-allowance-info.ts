// import specialAllowanceInfo from '../data/specialAllowance-info.json';
import specialAllowanceInitialData from '../data/initial-data/special-allowances-info.json';

export class SpecialAllowanceInfo {
    name!: string;
    amount!: number;
    necessarySkill!: string;
}

export class SpecialAllowanceInfoData {
    // public static SEGMENT_FULL_DATA: SpecialAllowanceInfo = Object.assign(new SpecialAllowanceInfo(), specialAllowanceInfo.fullData);
    // public static SEGMENT_REQUIRED_DATA: SpecialAllowanceInfo = Object.assign(new SpecialAllowanceInfo(), specialAllowanceInfo.requiredOnly);
    public static SPECIAL_ALLOWANCE_INITIAL_DATA: SpecialAllowanceInfo[] = specialAllowanceInitialData.map(item => {
        return Object.assign(new SpecialAllowanceInfo(), item);
    });
}
