import positionInfo from '../data/position-info.json';

export interface PositionInfo {
    positionName: string;
    abbreviationName: string;
    timeCardApprove: string;
}

export class PositionInfoData {
    public static POSITION_FULL_DATA: PositionInfo = positionInfo.fullData;
}
