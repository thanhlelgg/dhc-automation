import workerInfo from '../data/worker-info.json';
import workerInitialData from '../data/initial-data/worker-info.json';

export class WorkerInfo {
    workerCode!: string;
    workerName!: string;
    department?: string;
    isRetired!: boolean;
    note?: string;
}

export class WorkerInfoData {
    public static WORKER_FULL_DATA: WorkerInfo = Object.assign(new WorkerInfo(), workerInfo.fullData);
    public static WORKER_REQUIRED_DATA: WorkerInfo = Object.assign(new WorkerInfo(), workerInfo.requiredOnly);
    public static WORKER_INITIAL_DATA: WorkerInfo[] = workerInitialData.map(item => {
        return Object.assign(new WorkerInfo(), item);
    });
}
