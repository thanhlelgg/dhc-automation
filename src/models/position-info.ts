import positionInfo from '../data/position-info.json';
import positionInitialData from '../data/initial-data/tms-position-info.json';

export class PositionInfo {
    positionName!: string;
    abbreviationName!: string;
    timeCardApprove!: string;
}

export class PositionInfoData {
    public static POSITION_FULL_DATA: PositionInfo = Object.assign(new PositionInfo(), positionInfo.fullData);
    public static POSITION_INITIAL_DATA: PositionInfo[] = positionInitialData.map(item => {
        return Object.assign(new PositionInfo(), item);
    });
}
