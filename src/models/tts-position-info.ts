// import positionInfo from '../data/position-info.json';
import positionInitialData from '../data/initial-data/tts-position-info.json';

export class PositionInfo {
    name!: string;
    abbreviationName!: string;
    payAllowance?: string;
    timecardApprove?: string;
}

export class PositionInfoData {
    // public static SEGMENT_FULL_DATA: PositionInfo = Object.assign(new PositionInfo(), positionInfo.fullData);
    // public static SEGMENT_REQUIRED_DATA: PositionInfo = Object.assign(new PositionInfo(), positionInfo.requiredOnly);
    public static POSITION_INITIAL_DATA: PositionInfo[] = positionInitialData.map(item => {
        return Object.assign(new PositionInfo(), item);
    });
}
