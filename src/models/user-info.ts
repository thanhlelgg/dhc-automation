import userInitialData from '../data/initial-data/user-info.json';
import { JsonProperty, JsonObject } from 'json2typescript';

@JsonObject('PersonalInfo')
export class PersonalInfo {
    name!: string;
    alphabetName?: string = undefined;
    phoneticName!: string;
    dateOfBirth?: string = undefined;
    gender?: string = undefined;
    groupId!: string;
    labId!: string;
    timezone!: string;
    studentType?: string = undefined;
    loginInfo!: LoginInfo;
    contactInfo!: ContactInfo;
    emergencyContactInfo!: EmergencyContactInfo;
    interviewInfo!: InterviewInfo;
    changePositionAndPriceHistory?: ChangePositionAndPriceHistory[];
    employmentHistory?: EmploymentHistory[];
    recruitmentHistory?: RecruitmentHistory[];
    comment?: string = undefined;
}

export class LoginInfo {
    loginId!: string;
    password!: string;
    roleId!: string;
}

export class ContactInfo {
    zipcode!: string;
    address1!: string;
    address2?: string = undefined;
    nearestStation1!: string;
    nearestStation2?: string = undefined;
    nearestStation3?: string = undefined;
    tel!: string;
    email!: string;
}

export class EmergencyContactInfo {
    name!: string;
    alphabetName?: string = undefined;
    phoneticName!: string;
    relationship!: string;
    zipcode!: string;
    address1!: string;
    address2?: string = undefined;
    tel?: string = undefined;
}

export class InterviewInfo {
    interviewer!: string;
    manageAccession!: string;
    rating!: number;
    manageDebug?: boolean;
    manageLeaderDesire?: boolean;
}

export class ChangePositionAndPriceHistory {
    applyDate?: string = undefined;
    position!: string;
    unitPrice!: number;
    allowance?: number = undefined;
}

export class EmploymentHistory {
    date?: string = undefined;
    type!: string;
}

export class RecruitmentHistory {
    date?: string = undefined;
    status!: string;
}

export class ProfessionalInfo {
    attendanceInfo?: AttendanceInfo;
    trainingInfo?: TrainingInfo;
}

export class AttendanceInfo {
    workAttitude?: string = undefined;
    assignJudgment?: string = undefined;
}

export class TrainingInfo {
    trainingSupplement?: boolean;
    spiScore?: number = undefined;
}

export class SkillInfo {
    languageSkill?: LanguageSkill;
}

export class LanguageSkill {
    nativeLanguage?: string = undefined;
    nativeSecondLanguage?: string = undefined;
    nativeJapanese?: string = undefined;
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
    bugyoId?: string = undefined;
    taxClassification?: string = undefined;
    transferBankCode?: string = undefined;
    transferBankName?: string = undefined;
    transferBankPhoneticName?: string = undefined;
    transferBranchCode?: string = undefined;
    transferBranchName?: string = undefined;
    depositClassification?: string = undefined;
    transferAccountNumber?: string = undefined;
    nameOfDepositAccount?: string = undefined;
    phoneticNameOfDepositAccount?: string = undefined;
}

export class HealthInsuranceInfo {
    healthInsuranceNo?: string = undefined;
}

export class HealthInsuranceHistory {
    joinDate?: string = undefined;
    stopDate?: string = undefined;
}

export class EmployeePensionInfo {
    pensionFundNo?: string = undefined;
}

export class EmployeePensionHistory {
    joinDate?: string = undefined;
    stopDate?: string = undefined;
}

export class CareInsuranceInfo {
    careInsuranceNo?: string = undefined;
}

export class CareInsuranceHistory {
    joinDate?: string = undefined;
    stopDate?: string = undefined;
}

export class EmploymentInsuranceInfo {
    unemploymentInsuranceNo?: string = undefined;
    unemploymentInsuranceInfo?: string = undefined;
    leaveCompanyName?: string = undefined;
    leaveCompanyReason?: string = undefined;
    leaveCompanyDate?: string = undefined;
}

export class EmploymentInsuranceHistory {
    joinDate?: string = undefined;
    status?: string = undefined;
}

export class VisaInfo {
    visaName?: string = undefined;
    nationality?: string = undefined;
    residencePaperId?: string = undefined;
    termOfResidencePaper?: string = undefined;
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
}
