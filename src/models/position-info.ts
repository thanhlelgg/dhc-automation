import positionInfo from '../data/position-info.json';

export class PositionInfo {
    positionName!: string;
    abbreviationName!: string;
    timeCardApprove!: string;
}

export class PositionInfoData {
    public static POSITION_FULL_DATA: PositionInfo = Object.assign(new PositionInfo(), positionInfo.fullData);
}
