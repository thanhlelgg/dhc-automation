import workingPlaceInfo from '../data/working-place-info.json';
import workingPlaceInitialData from '../data/initial-data/working-place-info.json';

export class WorkingPlaceInfo {
    name!: string;
    code!: string;
    category?: string;
    address!: string;
    nearestStation1!: string;
    nearestStation2?: string;
    nearestStation3?: string;
    timezone?: string;
}

export class WorkingPlaceInfoData {
    public static WORKING_PLACE_FULL_DATA: WorkingPlaceInfo = Object.assign(
        new WorkingPlaceInfo(),
        workingPlaceInfo.fullData,
    );
    public static WORKING_PLACE_REQUIRED_DATA: WorkingPlaceInfo = Object.assign(
        new WorkingPlaceInfo(),
        workingPlaceInfo.requiredOnly,
    );
    public static WORKING_PLACE_INITIAL_DATA: WorkingPlaceInfo[] = workingPlaceInitialData.map(item => {
        return Object.assign(new WorkingPlaceInfo(), item);
    });
}
