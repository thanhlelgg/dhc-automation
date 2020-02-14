import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
import { RecordTable } from '../models/enum-class/recordTable';
import { RecordFieldName } from '../models/enum-class/recordFieldName';
import '@src/string.extensions';
import {
    PersonalInfo,
    ChangePositionAndPriceHistory,
    EmploymentHistory,
    RecruitmentHistory,
    LoginInfo,
    ContactInfo,
    EmergencyContactInfo,
    InterviewInfo,
    ProfessionalInfo,
    AttendanceInfo,
    TrainingInfo,
    SkillInfo,
    LanguageSkill,
    LaborInfo,
    PaymentInfo,
    HealthInsuranceInfo,
    HealthInsuranceHistory,
    EmployeePensionHistory,
    EmployeePensionInfo,
    CareInsuranceInfo,
    CareInsuranceHistory,
    EmploymentInsuranceInfo,
    EmploymentInsuranceHistory,
    RoleInfo,
    UserInfo,
} from '../models/user-info';
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';

@page
export class AddUserPage extends GeneralPage {
    fieldName = this.translator.fieldName.addUser;
    placeHolder = this.translator.fieldPlaceHolder.addUser;

    //#region personal info
    @locator
    protected userName = "//input[@id='name']";
    @locator
    protected userAlphabetName = "//input[@id='alphabet_name']";
    @locator
    protected userZipCode = "//input[@id='zipcode']";
    @locator
    protected userAddress1 = "//input[@id='address1']";
    @locator
    protected userAddress2 = "//input[@id='address2']";
    @locator
    protected userTel = "//input[@id='tel']";
    @locator
    protected emergencyUserName = "//input[@id='user-emergency-name']";
    @locator
    protected emergencyUserAlphabetName = "//input[@id='user-emergency-alphabet']";
    @locator
    protected emergencyUserZipCode = "//input[@id='user-emergency-zipcode']";
    @locator
    protected emergencyUserAddress1 = "//input[@id='user-emergency-address1']";
    @locator
    protected emergencyUserAddress2 = "//input[@id='user-emergency-address2']";
    @locator
    protected emergencyUserTel = "//input[@id='user-emergency-phone']";
    @locator
    protected ratingByStar = "label[for='star{0}']";
    @locator
    protected interviewContainer = `//div[label[contains(text(),'${this.fieldName.personalInfo.interviewInfo.interviewer}')]]//select/following-sibling::span`;
    @locator
    protected interviewResult = "//ul[@id='select2-talent-manage-interview-results']/li[text()='{0}']";
    //#endregion

    //#region role info
    @locator
    protected accessTtsSystemCbxInput = "//input[@id='check_bts_system']";
    @locator
    protected accessBmsSystemCbxInput = "//input[@id='check_business_system']";
    @locator
    protected accessTtsSystemLabel = "//label[input[@id='check_bts_system']]";
    @locator
    protected accessBmsSystemLabel = "//label[input[@id='check_business_system']]";
    @locator
    protected businessRole = "//select[@id='business_role']";
    @locator
    protected talentRole = "//select[@id='talent_role']";
    @locator
    protected ttsRole = "//select[@id='bts_role']";
    @locator
    protected ttsSystemCheckBoxByLabel = "//div[@id='bts_system']//label[contains(., '{0}')]";
    @locator
    protected talentSystemCheckBoxByLabel = "//div[@id='talent_system']//label[contains(., '{0}')]";
    @locator
    protected businessSystemCheckBoxByLabel = "//div[@id='business_system']//label[contains(., '{0}')]";
    //#endregion

    //#region professional info
    @locator
    protected trainingSupplement = `//label[contains(text(),'${this.translator.fieldName.addUser.professionalInfo.trainingInfo.trainingSupplement}')]/following-sibling::div//input[@type='checkbox']`;
    //#endregion

    @locator
    protected checkboxByLabel = "//div[contains(@class, 'checkbox-custom')]/label[text()='{0}']/following-sibling::div";
    @locator
    protected tabByTitle = "//div[@class='tabbable-custom ']//a[contains(.,'{0}')]";
    @locator
    protected addHistoryButtonByTitle = "//div[text()='{0}']//following-sibling::div//button[contains(@class,'add')]";

    @locator
    saveButton = "//button[@id='btn-submit']";
    @locator
    protected pageHeader = "//div[@class='page-header navbar navbar-fixed-top']";

    @action('save user')
    public async saveUser(): Promise<void> {
        await gondola.click(this.saveButton);
    }

    @action('input personal information of user')
    public async inputPersonalInfo(personalInfo: PersonalInfo): Promise<void> {
        await this.openTab(this.fieldName.personalInfo.tabTitle);
        await gondola.enter(this.userName, personalInfo.name);
        if (personalInfo.alphabetName) {
            await gondola.enter(this.userAlphabetName, personalInfo.alphabetName);
        }
        await this.enterTextFieldByLabel(this.fieldName.personalInfo.phoneticName, personalInfo.phoneticName, true);
        await this.enterTextFieldByLabel(this.fieldName.personalInfo.dateOfBirth, personalInfo.dateOfBirth, true);
        //this is to close the calendar
        await this.clickOutsideTextFieldByLabel(this.fieldName.personalInfo.dateOfBirth, true);
        await this.selectRadioButtonByLabel(this.fieldName.personalInfo.gender, personalInfo.gender, true);
        await this.selectSelectorByLabel(this.fieldName.personalInfo.groupId, personalInfo.groupId, true);
        await this.selectSelectorByLabel(this.fieldName.personalInfo.labId, personalInfo.labId, true);
        await this.selectSelectorByLabel(this.fieldName.personalInfo.timezone, personalInfo.timezone, true);
        await this.selectSelectorByLabel(this.fieldName.personalInfo.studentType, personalInfo.studentType, true);
        gondola.report('Input login info');
        await this.inputLoginInfo(personalInfo.loginInfo);

        gondola.report('Input contact info');
        await this.inputContactInfo(personalInfo.contactInfo);

        gondola.report('Input emergency contact info');
        await this.inputEmergencyContactInfo(personalInfo.emergencyContactInfo);

        gondola.report('Input interview info');
        await this.inputInterviewInfo(personalInfo.interviewInfo);

        if (personalInfo.changePositionAndPriceHistory) {
            await this.inputChangePositionHistory(personalInfo.changePositionAndPriceHistory);
        }

        if (personalInfo.employmentHistory) {
            await this.inputEmploymentHistory(personalInfo.employmentHistory);
        }

        if (personalInfo.recruitmentHistory) {
            await this.inputRecruitmentHistory(personalInfo.recruitmentHistory);
        }

        await this.enterTextAreaByPlaceholder(this.placeHolder.comment, personalInfo.comment);
    }

    @action('input login information')
    public async inputLoginInfo(loginInfo: LoginInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.personalInfo.loginInfo.loginId, loginInfo.loginId, true);
        await this.enterTextFieldByLabel(this.fieldName.personalInfo.loginInfo.password, loginInfo.password, true);
        // currently hidden
        // await this.selectSelectorByLabel(this.fieldName.personalInfo.loginInfo.roleId, loginInfo.roleId, true);
    }

    @action('input contact information')
    public async inputContactInfo(contactInfo: ContactInfo): Promise<void> {
        await gondola.enter(this.userZipCode, contactInfo.zipcode);
        await gondola.enter(this.userAddress1, contactInfo.address1);
        await gondola.enter(this.userAddress2, contactInfo.address2 ? contactInfo.address2 : '');
        await this.selectSearchSelectionByLabel(
            this.fieldName.personalInfo.contactInfo.nearestStation1,
            Utilities.getStationNameFromNearestStationString(contactInfo.nearestStation1),
            contactInfo.nearestStation1,
            true,
            false,
            true,
        );
        if (contactInfo.nearestStation2) {
            await this.selectSearchSelectionByLabel(
                this.fieldName.personalInfo.contactInfo.nearestStation2,
                Utilities.getStationNameFromNearestStationString(contactInfo.nearestStation2),
                contactInfo.nearestStation2,
                true,
                false,
                true,
            );
        }
        if (contactInfo.nearestStation3) {
            await this.selectSearchSelectionByLabel(
                this.fieldName.personalInfo.contactInfo.nearestStation3,
                Utilities.getStationNameFromNearestStationString(contactInfo.nearestStation3),
                contactInfo.nearestStation3,
                true,
                false,
                true,
            );
        }
        await gondola.enter(this.userTel, contactInfo.tel);
        await this.enterTextFieldByLabel(this.fieldName.personalInfo.contactInfo.email, contactInfo.email, true);
    }

    @action('input emergency contact information')
    public async inputEmergencyContactInfo(emergencyInfo: EmergencyContactInfo): Promise<void> {
        await gondola.enter(this.emergencyUserName, emergencyInfo.name);
        if (emergencyInfo.alphabetName) {
            await gondola.enter(this.emergencyUserAlphabetName, emergencyInfo.alphabetName);
        }
        await this.enterTextFieldByLabel(
            this.fieldName.personalInfo.emergencyContactInfo.phoneticName,
            emergencyInfo.phoneticName,
            true,
        );
        await this.selectSelectorByLabel(
            this.fieldName.personalInfo.emergencyContactInfo.relationship,
            emergencyInfo.relationship,
            true,
        );
        await gondola.enter(this.emergencyUserZipCode, emergencyInfo.zipcode);
        await gondola.enter(this.emergencyUserAddress1, emergencyInfo.address1);
        await gondola.enter(this.emergencyUserAddress2, emergencyInfo.address2 ? emergencyInfo.address2 : '');
        await gondola.enter(this.emergencyUserTel, emergencyInfo.tel ? emergencyInfo.tel : '');
    }

    @action('select interview')
    public async selectInterview(interview: string): Promise<void> {
        await gondola.click(this.interviewContainer);
        await gondola.click(this.interviewResult.format(interview));
    }

    @action('input interview information')
    public async inputInterviewInfo(interviewInfo: InterviewInfo): Promise<void> {
        await this.selectInterview(interviewInfo.interviewer);
        await this.selectSelectorByLabel(
            this.fieldName.personalInfo.interviewInfo.manageAccession,
            interviewInfo.manageAccession,
            true,
        );
        await gondola.click(this.ratingByStar.format(interviewInfo.rating + ''));
        if (interviewInfo.manageDebug) {
            await this.setStateCustomizeCheckbox(
                this.checkboxByLabel.format(this.fieldName.personalInfo.interviewInfo.manageDebug),
                interviewInfo.manageDebug,
            );
        }
        if (interviewInfo.manageLeaderDesire) {
            await this.setStateCustomizeCheckbox(
                this.checkboxByLabel.format(this.fieldName.personalInfo.interviewInfo.manageLeaderDesire),
                interviewInfo.manageLeaderDesire,
            );
        }
    }

    @action('input change position history')
    public async inputChangePositionHistory(changePositionHistory: ChangePositionAndPriceHistory[]): Promise<void> {
        gondola.report('Number of record: ' + changePositionHistory.length);
        for (let i = 0; i < changePositionHistory.length; i++) {
            const positionRow = changePositionHistory[i];
            if (
                !(await this.doesRecordFieldExist(
                    RecordTable.USER_POSITION_HISTORY,
                    i + 1,
                    RecordFieldName.APPLY_DATE_OF_POSITION_HISTORY,
                ))
            ) {
                await gondola.click(
                    this.addHistoryButtonByTitle.format(this.fieldName.personalInfo.changePositionAndPriceHistory),
                );
            }
            await this.enterRecordField(
                RecordTable.USER_POSITION_HISTORY,
                i + 1,
                RecordFieldName.APPLY_DATE_OF_POSITION_HISTORY,
                positionRow.applyDate ? positionRow.applyDate : '',
            );
            await this.selectRecordField(
                RecordTable.USER_POSITION_HISTORY,
                i + 1,
                RecordFieldName.POSITION_OF_POSITION_HISTORY,
                positionRow.position,
            );
            await this.enterRecordField(
                RecordTable.USER_POSITION_HISTORY,
                i + 1,
                RecordFieldName.PAYMENT_UNIT_PRICE,
                positionRow.unitPrice ? positionRow.unitPrice.toString() : '',
            );
            await this.enterRecordField(
                RecordTable.USER_POSITION_HISTORY,
                i + 1,
                RecordFieldName.PAYMENT_LEADER_ALLOWANCE,
                positionRow.allowance ? positionRow.allowance.toString() : '',
            );
        }
    }

    @action('input employment history')
    public async inputEmploymentHistory(employmentHistory: EmploymentHistory[]): Promise<void> {
        gondola.report('Number of record: ' + employmentHistory.length);
        for (let i = 0; i < employmentHistory.length; i++) {
            const employmentRow = employmentHistory[i];
            if (
                !(await this.doesRecordFieldExist(
                    RecordTable.USER_LABOR_FORM_HISTORY,
                    i + 1,
                    RecordFieldName.DATE_USER_LABOR_FORM_HISTORY,
                ))
            ) {
                await gondola.click(this.addHistoryButtonByTitle.format(this.fieldName.personalInfo.employmentHistory));
            }
            await this.enterRecordField(
                RecordTable.USER_LABOR_FORM_HISTORY,
                i + 1,
                RecordFieldName.DATE_USER_LABOR_FORM_HISTORY,
                employmentRow.date ? employmentRow.date : '',
            );
            await this.selectRecordField(
                RecordTable.USER_LABOR_FORM_HISTORY,
                i + 1,
                RecordFieldName.TYPE_USER_LABOR_FORM_HISTORY,
                employmentRow.type,
            );
        }
    }

    @action('input recruitment history')
    public async inputRecruitmentHistory(recruitmentHistory: RecruitmentHistory[]): Promise<void> {
        gondola.report('Number of record: ' + recruitmentHistory.length);
        for (let i = 0; i < recruitmentHistory.length; i++) {
            const recruitmentRow = recruitmentHistory[i];
            if (
                !(await this.doesRecordFieldExist(
                    RecordTable.USER_JOIN_COMPANY_HISTORY,
                    i + 1,
                    RecordFieldName.DATE_USER_JOIN_COMPANY_HISTORY,
                ))
            ) {
                await gondola.click(
                    this.addHistoryButtonByTitle.format(this.fieldName.personalInfo.recruitmentHistory),
                );
            }
            await this.enterRecordField(
                RecordTable.USER_JOIN_COMPANY_HISTORY,
                i + 1,
                RecordFieldName.DATE_USER_JOIN_COMPANY_HISTORY,
                recruitmentRow.date ? recruitmentRow.date : '',
            );
            await this.selectRecordField(
                RecordTable.USER_JOIN_COMPANY_HISTORY,
                i + 1,
                RecordFieldName.STATUS_USER_JOIN_COMPANY_HISTORY,
                recruitmentRow.status,
            );
        }
    }

    @action('input professional information')
    public async inputProfessionalInfo(professionalInfo: ProfessionalInfo): Promise<void> {
        await this.openTab(this.fieldName.professionalInfo.tabTitle);
        if (professionalInfo.attendanceInfo) {
            await this.inputAttendanceInfo(professionalInfo.attendanceInfo);
        }

        if (professionalInfo.trainingInfo) {
            await this.inputTrainingInfo(professionalInfo.trainingInfo);
        }
    }

    @action('input attendance information')
    public async inputAttendanceInfo(attendanceInfo: AttendanceInfo): Promise<void> {
        await this.selectSelectorByLabel(
            this.fieldName.professionalInfo.attendanceInfo.workAttitude,
            attendanceInfo.workAttitude,
            true,
        );
        await this.selectSelectorByLabel(
            this.fieldName.professionalInfo.attendanceInfo.assignJudgment,
            attendanceInfo.assignJudgment,
            true,
        );
    }

    @action('input training information')
    public async inputTrainingInfo(trainingInfo: TrainingInfo): Promise<void> {
        if (trainingInfo.trainingSupplement) {
            gondola.report(`Training Supplement ${this.trainingSupplement}`);
            await gondola.setState(this.trainingSupplement, trainingInfo.trainingSupplement);
        }
        await this.enterTextFieldByLabel(
            this.fieldName.professionalInfo.trainingInfo.spiScore,
            trainingInfo.spiScore,
            true,
        );
    }

    @action('input skill information of user')
    public async inputSkillInfo(skillInfo: SkillInfo): Promise<void> {
        await this.openTab(this.fieldName.skillInfo.tabTitle);
        if (skillInfo.languageSkill) {
            await this.inputLanguageSkill(skillInfo.languageSkill);
        }
    }

    @action('input language skill of user')
    public async inputLanguageSkill(languageSkill: LanguageSkill): Promise<void> {
        await this.selectSelectorByLabel(
            this.fieldName.skillInfo.languageSkill.nativeLanguage,
            languageSkill.nativeLanguage,
            true,
        );
        await this.selectSelectorByLabel(
            this.fieldName.skillInfo.languageSkill.nativeSecondLanguage,
            languageSkill.nativeSecondLanguage,
            true,
        );
        await this.selectSelectorByLabel(
            this.fieldName.skillInfo.languageSkill.nativeJapanese,
            languageSkill.nativeJapanese,
            true,
        );
    }

    @action('input labor information of user')
    public async inputLaborInfo(laborInfo: LaborInfo): Promise<void> {
        await this.openTab(this.fieldName.laborInfo.tabTitle);
        if (laborInfo.paymentInfo) {
            await this.inputPaymentInfo(laborInfo.paymentInfo);
        }
        if (laborInfo.healthInsuranceInfo) {
            await this.inputHealthInsuranceInfo(laborInfo.healthInsuranceInfo);
        }
        if (laborInfo.healthInsuranceHistory) {
            await this.inputHealthInsuranceHistory(laborInfo.healthInsuranceHistory);
        }
        if (laborInfo.employeePensionInfo) {
            await this.inputEmployeePensionInfo(laborInfo.employeePensionInfo);
        }
        if (laborInfo.employeePensionHistory) {
            await this.inputEmployeePensionHistory(laborInfo.employeePensionHistory);
        }
        if (laborInfo.careInsuranceInfo) {
            await this.inputCareInsuranceInfo(laborInfo.careInsuranceInfo);
        }
        if (laborInfo.careInsuranceHistory) {
            await this.inputCareInsuranceHistory(laborInfo.careInsuranceHistory);
        }
        if (laborInfo.employmentInsuranceInfo) {
            await this.inputEmploymentInsuranceInfo(laborInfo.employmentInsuranceInfo);
        }
        if (laborInfo.employmentInsuranceHistory) {
            await this.inputEmploymentInsuranceHistory(laborInfo.employmentInsuranceHistory);
        }
    }

    @action('input payment information')
    public async inputPaymentInfo(paymentInfo: PaymentInfo): Promise<void> {
        await this.enterTextFieldByLabel(this.fieldName.laborInfo.paymentInfo.bugyoId, paymentInfo.bugyoId, true);
        await this.selectSelectorByLabel(
            this.fieldName.laborInfo.paymentInfo.taxClassification,
            paymentInfo.taxClassification,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.transferBankCode,
            paymentInfo.transferBankCode,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.transferBankName,
            paymentInfo.transferBankName,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.transferBankPhoneticName,
            paymentInfo.transferBankPhoneticName,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.transferBranchCode,
            paymentInfo.transferBranchCode,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.transferBranchName,
            paymentInfo.transferBranchName,
            true,
        );
        await this.selectSelectorByLabel(
            this.fieldName.laborInfo.paymentInfo.depositClassification,
            paymentInfo.depositClassification,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.transferAccountNumber,
            paymentInfo.transferAccountNumber,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.nameOfDepositAccount,
            paymentInfo.nameOfDepositAccount,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.paymentInfo.phoneticNameOfDepositAccount,
            paymentInfo.phoneticNameOfDepositAccount,
            true,
        );
    }

    @action('input health insurance information')
    public async inputHealthInsuranceInfo(healthInsuranceInfo: HealthInsuranceInfo): Promise<void> {
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.healthInsuranceInfo.healthInsuranceNo,
            healthInsuranceInfo.healthInsuranceNo,
            true,
        );
    }

    @action('input health insurance history')
    public async inputHealthInsuranceHistory(healthInsuranceHistory: HealthInsuranceHistory[]): Promise<void> {
        gondola.report('Number of record: ' + healthInsuranceHistory.length);
        for (let i = 0; i < healthInsuranceHistory.length; i++) {
            const healthInsuranceRow = healthInsuranceHistory[i];
            if (
                !(await this.doesRecordFieldExist(
                    RecordTable.USER_HEALTH_INSURANCE_HISTORY,
                    i + 1,
                    RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                ))
            ) {
                await gondola.click(
                    this.addHistoryButtonByTitle.format(this.fieldName.laborInfo.healthInsuranceHistory),
                );
            }
            await this.enterRecordField(
                RecordTable.USER_HEALTH_INSURANCE_HISTORY,
                i + 1,
                RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                healthInsuranceRow.joinDate ? healthInsuranceRow.joinDate : '',
            );
            await this.enterRecordField(
                RecordTable.USER_HEALTH_INSURANCE_HISTORY,
                i + 1,
                RecordFieldName.STOP_DATE_USER_INSURANCE_HISTORY,
                healthInsuranceRow.stopDate ? healthInsuranceRow.stopDate : '',
            );
        }
    }

    @action('input employee pension information')
    public async inputEmployeePensionInfo(employeePensionInfo: EmployeePensionInfo): Promise<void> {
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.employeePensionInfo.pensionFundNo,
            employeePensionInfo.pensionFundNo,
            true,
        );
    }

    @action('input employee pension history')
    public async inputEmployeePensionHistory(employeePensionHistory: EmployeePensionHistory[]): Promise<void> {
        gondola.report('Number of record: ' + employeePensionHistory.length);
        for (let i = 0; i < employeePensionHistory.length; i++) {
            const employeePensionRow = employeePensionHistory[i];
            if (
                !(await this.doesRecordFieldExist(
                    RecordTable.USER_PENSION_FUND_HISTORY,
                    i + 1,
                    RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                ))
            ) {
                await gondola.click(
                    this.addHistoryButtonByTitle.format(this.fieldName.laborInfo.employeePensionHistory),
                );
            }
            await this.enterRecordField(
                RecordTable.USER_PENSION_FUND_HISTORY,
                i + 1,
                RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                employeePensionRow.joinDate ? employeePensionRow.joinDate : '',
            );
            await this.enterRecordField(
                RecordTable.USER_PENSION_FUND_HISTORY,
                i + 1,
                RecordFieldName.STOP_DATE_USER_INSURANCE_HISTORY,
                employeePensionRow.stopDate ? employeePensionRow.stopDate : '',
            );
        }
    }

    @action('input care insurance information')
    public async inputCareInsuranceInfo(careInsuranceInfo: CareInsuranceInfo): Promise<void> {
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.careInsuranceInfo.careInsuranceNo,
            careInsuranceInfo.careInsuranceNo,
            true,
        );
    }

    @action('input care insurance history')
    public async inputCareInsuranceHistory(careInsuranceHistory: CareInsuranceHistory[]): Promise<void> {
        gondola.report('Number of record: ' + careInsuranceHistory.length);
        for (let i = 0; i < careInsuranceHistory.length; i++) {
            const careInsuranceRow = careInsuranceHistory[i];
            if (
                !(await this.doesRecordFieldExist(
                    RecordTable.USER_CARE_INSURANCE_HISTORY,
                    i + 1,
                    RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                ))
            ) {
                await gondola.click(this.addHistoryButtonByTitle.format(this.fieldName.laborInfo.careInsuranceHistory));
            }
            await this.enterRecordField(
                RecordTable.USER_CARE_INSURANCE_HISTORY,
                i + 1,
                RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                careInsuranceRow.joinDate ? careInsuranceRow.joinDate : '',
            );
            await this.enterRecordField(
                RecordTable.USER_CARE_INSURANCE_HISTORY,
                i + 1,
                RecordFieldName.STOP_DATE_USER_INSURANCE_HISTORY,
                careInsuranceRow.stopDate ? careInsuranceRow.stopDate : '',
            );
        }
    }

    @action('input employment insurance information')
    public async inputEmploymentInsuranceInfo(employmentInsuranceInfo: EmploymentInsuranceInfo): Promise<void> {
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.employmentInsuranceInfo.unemploymentInsuranceNo,
            employmentInsuranceInfo.unemploymentInsuranceNo,
            true,
        );
        await this.selectSelectorByLabel(
            this.fieldName.laborInfo.employmentInsuranceInfo.unemploymentInsuranceInfo,
            employmentInsuranceInfo.unemploymentInsuranceInfo,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.employmentInsuranceInfo.leaveCompanyName,
            employmentInsuranceInfo.leaveCompanyName,
            true,
        );
        await this.selectSelectorByLabel(
            this.fieldName.laborInfo.employmentInsuranceInfo.leaveCompanyReason,
            employmentInsuranceInfo.leaveCompanyReason,
            true,
        );
        await this.enterTextFieldByLabel(
            this.fieldName.laborInfo.employmentInsuranceInfo.leaveCompanyDate,
            employmentInsuranceInfo.leaveCompanyDate,
            true,
        );
    }

    @action('input employment insurance history')
    public async inputEmploymentInsuranceHistory(
        employmentInsuranceHistory: EmploymentInsuranceHistory[],
    ): Promise<void> {
        gondola.report('Number of record: ' + employmentInsuranceHistory.length);
        for (let i = 0; i < employmentInsuranceHistory.length; i++) {
            const employmentInsuranceRow = employmentInsuranceHistory[i];
            if (
                !(await this.doesRecordFieldExist(
                    RecordTable.USER_UNEMPLOYMENT_INSURANCE_HISTORY,
                    i + 1,
                    RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                ))
            ) {
                await gondola.click(
                    this.addHistoryButtonByTitle.format(this.fieldName.laborInfo.employmentInsuranceHistory),
                );
            }
            await this.enterRecordField(
                RecordTable.USER_UNEMPLOYMENT_INSURANCE_HISTORY,
                i + 1,
                RecordFieldName.JOIN_DATE_USER_INSURANCE_HISTORY,
                employmentInsuranceRow.joinDate ? employmentInsuranceRow.joinDate : '',
            );
            if (employmentInsuranceRow.status) {
                await this.selectRecordField(
                    RecordTable.USER_UNEMPLOYMENT_INSURANCE_HISTORY,
                    i + 1,
                    RecordFieldName.STATUS_USER_UNEMPLOYMENT_INSURANCE_HISTORY,
                    employmentInsuranceRow.status,
                );
            }
        }
    }

    @action('input role information')
    public async inputRoleInfo(roleInfo: RoleInfo): Promise<void> {
        await this.openTab(this.fieldName.roleInfo.tabTitle);
        if (roleInfo.isAccessTTSSystem) {
            await this.setStateCustomizeCheckbox(this.accessTtsSystemLabel, true);
        }
        if (roleInfo.isAccessBusinessSystem) {
            await this.setStateCustomizeCheckbox(this.accessBmsSystemLabel, true);
        }
        if (roleInfo.talentRole) {
            await gondola.waitUntilStalenessOfElement(this.talentRole);
            await gondola.selectOptionByText(this.talentRole, roleInfo.talentRole.role);
            if (roleInfo.talentRole.isSelectedAll) {
                const talentSystemDropdown = this.talentSystemCheckBoxByLabel.format(
                    this.fieldName.roleInfo.talentRole.isSelectedAll,
                );
                await gondola.waitUntilStalenessOfElement(talentSystemDropdown, Constants.SHORT_TIMEOUT);
                await this.setStateCustomizeCheckbox(talentSystemDropdown, roleInfo.talentRole.isSelectedAll);
            }
        }
        if (roleInfo.ttsRole) {
            await gondola.waitUntilStalenessOfElement(this.ttsRole);
            await gondola.selectOptionByText(this.ttsRole, roleInfo.ttsRole.role);
            if (roleInfo.ttsRole.isSelectedAll) {
                const ttsSystemDropdown = this.ttsSystemCheckBoxByLabel.format(
                    this.fieldName.roleInfo.ttsRole.isSelectedAll,
                );
                await gondola.waitUntilStalenessOfElement(ttsSystemDropdown, Constants.SHORT_TIMEOUT);
                await this.setStateCustomizeCheckbox(ttsSystemDropdown, roleInfo.ttsRole.isSelectedAll);
            }
        }
        if (roleInfo.businessRole) {
            await gondola.selectOptionByText(this.businessRole, roleInfo.businessRole.role);
            if (roleInfo.businessRole.isSelectedAll) {
                const businessSystemDropdown = this.businessSystemCheckBoxByLabel.format(
                    this.fieldName.roleInfo.businessRole.isSelectedAll,
                );
                await gondola.waitUntilStalenessOfElement(businessSystemDropdown, Constants.SHORT_TIMEOUT);
                await this.setStateCustomizeCheckbox(businessSystemDropdown, roleInfo.businessRole.isSelectedAll);
            }
        }
    }

    @action('input all information of user')
    public async inputUserInfo(userInfo: UserInfo): Promise<void> {
        await this.inputPersonalInfo(userInfo.personalInfo);
        if (userInfo.professionalInfo) {
            await this.inputProfessionalInfo(userInfo.professionalInfo);
        }
        if (userInfo.skillInfo) {
            await this.inputSkillInfo(userInfo.skillInfo);
        }
        if (userInfo.laborInfo) {
            await this.inputLaborInfo(userInfo.laborInfo);
        }
    }

    @action('open tab by name')
    public async openTab(name: string): Promise<void> {
        const locator = this.tabByTitle.format(name);
        await gondola.waitForElement(locator, Constants.VERY_SHORT_TIMEOUT);
        await gondola.scrollToElement(locator);
        await gondola.executeClick(locator);
    }
}
export default new AddUserPage();
