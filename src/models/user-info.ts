import userInitialData from '../data/initial-data/user-info.json';
import userData from '../data/user-info.json';
import { JsonProperty, JsonObject } from 'json2typescript';

@JsonObject('PersonalInfo')
export class PersonalInfo {
    name!: string;
    alphabetName?: string;
    phoneticName!: string;
    dateOfBirth?: string;
    gender?: string;
    groupId!: string;
    labId!: string;
    timezone!: string;
    studentType?: string;
    loginInfo!: LoginInfo;
    contactInfo!: ContactInfo;
    emergencyContactInfo!: EmergencyContactInfo;
    interviewInfo!: InterviewInfo;
    changePositionAndPriceHistory?: ChangePositionAndPriceHistory[];
    employmentHistory?: EmploymentHistory[];
    recruitmentHistory?: RecruitmentHistory[];
    comment?: string;
}

export class LoginInfo {
    loginId!: string;
    password!: string;
    roleId!: string;
}

export class ContactInfo {
    zipcode!: string;
    address1!: string;
    address2?: string;
    nearestStation1!: string;
    nearestStation2?: string;
    nearestStation3?: string;
    tel!: string;
    email!: string;
}

export class EmergencyContactInfo {
    name!: string;
    alphabetName?: string;
    phoneticName!: string;
    relationship!: string;
    zipcode!: string;
    address1!: string;
    address2?: string;
    tel?: string;
}

export class InterviewInfo {
    interviewer!: string;
    manageAccession!: string;
    rating!: number;
    manageDebug?: boolean;
    manageLeaderDesire?: boolean;
}

export class ChangePositionAndPriceHistory {
    applyDate?: string;
    position!: string;
    unitPrice!: number;
    allowance?: number;
}

export class EmploymentHistory {
    date?: string;
    type!: string;
}

export class RecruitmentHistory {
    date?: string;
    status!: string;
}

export class ProfessionalInfo {
    attendanceInfo?: AttendanceInfo;
    trainingInfo?: TrainingInfo;
}

export class AttendanceInfo {
    workAttitude?: string;
    assignJudgment?: string;
}

export class TrainingInfo {
    trainingSupplement?: boolean;
    spiScore?: number;
}

export class SkillInfo {
    languageSkill?: LanguageSkill;
}

export class LanguageSkill {
    nativeLanguage?: string;
    nativeSecondLanguage?: string;
    nativeJapanese?: string;
}

export class LaborInfo {
    paymentInfo?: PaymentInfo;
    healthInsuranceInfo?: HealthInsuranceInfo;
    healthInsuranceHistory?: HealthInsuranceHistory[];
    employeePensionInfo?: EmployeePensionInfo;
    employeePensionHistory?: EmployeePensionHistory[];
    careInsuranceInfo?: CareInsuranceInfo;
    careInsuranceHistory?: CareInsuranceHistory[];
    employmentInsuranceInfo?: EmploymentInsuranceInfo;
    employmentInsuranceHistory?: EmploymentInsuranceHistory[];
}

export class PaymentInfo {
    bugyoId?: string;
    taxClassification?: string;
    transferBankCode?: string;
    transferBankName?: string;
    transferBankPhoneticName?: string;
    transferBranchCode?: string;
    transferBranchName?: string;
    depositClassification?: string;
    transferAccountNumber?: string;
    nameOfDepositAccount?: string;
    phoneticNameOfDepositAccount?: string;
}

export class HealthInsuranceInfo {
    healthInsuranceNo?: string;
}

export class HealthInsuranceHistory {
    joinDate?: string;
    stopDate?: string;
}

export class EmployeePensionInfo {
    pensionFundNo?: string;
}

export class EmployeePensionHistory {
    joinDate?: string;
    stopDate?: string;
}

export class CareInsuranceInfo {
    careInsuranceNo?: string;
}

export class CareInsuranceHistory {
    joinDate?: string;
    stopDate?: string;
}

export class EmploymentInsuranceInfo {
    unemploymentInsuranceNo?: string;
    unemploymentInsuranceInfo?: string;
    leaveCompanyName?: string;
    leaveCompanyReason?: string;
    leaveCompanyDate?: string;
}

export class EmploymentInsuranceHistory {
    joinDate?: string;
    status?: string;
}

export class VisaInfo {
    visaName?: string;
    nationality?: string;
    residencePaperId?: string;
    termOfResidencePaper?: string;
    isAllowedOutsideVisa?: boolean;
    specificationPaper?: boolean;
}

export class RoleInfo {
    isAccessTTSSystem?: boolean;
    isAccessBusinessSystem?: boolean;
    talentRole?: TalentRole;
    ttsRole?: TTSRole;
    businessRole?: BusinessRole;
}

export class TalentRole {
    role!: string;
    isSelectedAll?: boolean;
}

export class TTSRole {
    role!: string;
    isSelectedAll?: boolean;
}

export class BusinessRole {
    role!: string;
    isSelectedAll?: boolean;
}

export class UserInfo {
    personalInfo!: PersonalInfo;
    professionalInfo?: ProfessionalInfo;
    skillInfo?: SkillInfo;
    laborInfo?: LaborInfo;
    visaInfo?: VisaInfo;
    roleInfo?: RoleInfo;
}

export class UserInfoData {
    public static USER_INITIAL_DATA: UserInfo[] = userInitialData.map(user => {
        const userData: UserInfo = {
            personalInfo: user.personalInfo,
            professionalInfo: user.professionalInfo,
            skillInfo: user.skillInfo,
            laborInfo: user.laborInfo,
            visaInfo: user.visaInfo,
            roleInfo: user.roleInfo,
        };
        return userData;
    });
    public static ADMIN_USER_INFO: UserInfo = Object.assign(new UserInfo(), userData.adminAccount);
}
