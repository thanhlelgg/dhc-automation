import departmentInfo from '../data/department-info.json';
import departmentInitialData from '../data/initial-data/department-info.json';

export class DepartmentInfo {
    code!: string;
    name!: string;
    note?: string;
}

export class DepartmentInfoData {
    public static DEPARTMENT_FULL_DATA: DepartmentInfo = Object.assign(new DepartmentInfo(), departmentInfo.fullData);
    public static DEPARTMENT_REQUIRED_DATA: DepartmentInfo = Object.assign(
        new DepartmentInfo(),
        departmentInfo.requiredOnly,
    );
    public static DEPARTMENT_INITIAL_DATA: DepartmentInfo[] = departmentInitialData.map(item => {
        return Object.assign(new DepartmentInfo(), item);
    });
}
