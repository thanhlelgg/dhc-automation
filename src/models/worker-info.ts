import workerInfo from '../data/worker-info.json';

export interface WorkerInfo {
    workerCode: string;
    workerName: string;
    department: string | null;
    isRetired: boolean;
    note: string | null;
}

export class WorkerInfoData {
    public static WORKER_FULL_DATA: WorkerInfo = workerInfo.fullData;
    public static WORKER_REQUIRED_DATA: WorkerInfo = workerInfo.requiredOnly;
}
