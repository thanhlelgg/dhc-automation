import { action, gondola, locator, page } from "gondolajs";
import { translate } from "../locales/translate";

export class constants {
    public static translator = translate.getTranslator();
    public static readonly url = "https://dhcdms.digitalhearts.com/login";

    public static adminUserName = "logigear_admin";

    public static adminPassword = "log2019";
    
    public static projectForms = {
        result: '出来高案件',
        continue: '継続案件',
        shot: 'ショット案件',
    };

    public static accuracyTypes = {
        high: '高',
        middle: '普通',
        low: '低'
    }

    public static projectStatuses = {
        prospecting: '見込',
        estimated: '見積済',
        temporary_ordering: '仮受注',
        ordered: '受注済',
        delivered: '納品済',
        done: '完了',
        postponed: '延期',
        lost: '失注'
    }

    public static projectPlace = {
        house: '社内',
        secondment: '出向',
        dispatch: '派遣'
    }

    public static currencyIds = {
        jpy: 'JPY'
    }

    public static billingTypes = {
        each_time: '案件個別',
        consolidate: '得意先合算'
    }

    public static closingDates = {
        1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10",
        11: "11", 12: "12", 13: "13", 14: "14", 15: "15", 16: "16", 17: "17", 18: "18", 19: "19", 20: "20",
        21: "21", 22: "22", 23: "23", 24: "24", 25: "25", 26: "26", 27: "27", 28: "28", 29: "29", 30: "30", 31: "末"
    }

    public static debitCreditGroupIds = {
        receivable: '売掛',
        advance: '前受',
        advance_consumables: '立替(消耗品)',
        advance_travel_expenses: '立替(旅費交通費)',
        advance_system_related_expenses: '立替(システム関係費)'
    }

    public static taxIds = {
        8: '８％',
        10: '10%'
    }

    public static projectRole = {
        PM: 'PM',
        leader: 'リーダ',
        tester: 'テスター',
        designer: '設計者',
        expert: 'EXDB',
        reserve1: '予備1',
        reserve2: '予備2',
        reserve3: '予備3',
        reserve4: '予備4',
        reserve5: '予備5'
    }

    public static exceededNOCMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore \
                                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, \
                                        sunt in culpa qui officia deserunt mollit anim id est laborum";

    public static fieldRequiredErrorMessage = constants.translator.invalidFeedback.fieldRequired;

    public static exceededNOCErrorMessage = constants.translator.invalidFeedback.exceededNOC;
        
}

export default new constants();
