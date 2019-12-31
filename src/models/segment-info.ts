import segmentInfo from '../data/segment-info.json';
import segmentInitialData from '../data/initial-data/segment-info.json';

export interface SegmentInfo {
    code: string;
    name: string;
    parentSegment?: string;
    department?: string;
}

export class SegmentInfoData {
    public static SEGMENT_FULL_DATA: SegmentInfo = segmentInfo.fullData;
    public static SEGMENT_REQUIRED_DATA: SegmentInfo = segmentInfo.requiredOnly;
    public static SEGMENT_INITIAL_DATA: SegmentInfo[] = segmentInitialData;
}
