import departmentInfo from '../data/department-info.json';

export interface DepartmentInfo {
    code: string;
    name: string;
    note?: string;
}

export class DepartmentInfoData {
    public static DEPARTMENT_FULL_DATA: DepartmentInfo = departmentInfo.fullData;
    public static DEPARTMENT_REQUIRED_DATA: DepartmentInfo = departmentInfo.requiredOnly;
}
