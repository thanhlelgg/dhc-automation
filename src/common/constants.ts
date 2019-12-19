import { Translate } from '../locales/translate';

export class Constants {
    public static translator = Translate.getTranslator();
    public static readonly url = 'https://dhcdms.digitalhearts.com/language/ja_JP';
    public static readonly addProjectUrl = 'https://dhcbms.digitalhearts.com/projects/add';
    public static readonly VERY_SHORT_TIMEOUT = 2;
    public static readonly SHORT_TIMEOUT = 5;
    public static readonly MEDIUM_TIMEOUT = 30;
    public static readonly LONG_TIMEOUT = 90;
    // incase we have too many elements, scroll to the last of it will take really long time, so we should limit it a little
    public static readonly LIMIT_SCROLL_TIMES = 10;
    public static readonly SLIGHTLY_RIGHT_OFFSET = { x: -50, y: 0 };
    public static readonly NORMAL_DATE_FORMAT = 'YYYY-MM-DD';
    public static readonly EXAMPLE_DEFAULT_DATE = '2019-01-01';
    public static readonly EXAMPLE_DEFAULT_DATE_SHORT = '2019-1-1';
    public static readonly EXAMPLE_DATE_DIVIDED_BY_DOT = '2019.1.1';
    public static readonly EXAMPLE_DATE_DIVIDED_BY_SLASH = '2019/1/1';

    //#region Input data
    public static adminUserName = 'logigear_admin';
    public static adminPassword = 'log2019';
    public static exceededNOCMessage =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
    public static singleByteAlphaNumericString = 'abcd';
    public static fullSizeAlphaNumericString = 'ａｂｃｄ１２３４';
    public static halfSizeAlphaNumericString = 'abcd1234';
    public static symbolString = `!"#$%&'()`;
    public static hiraganaKatakanaString = 'あああｱｱｱハハハ';
    public static halfSizeNumberAndHyphen = '210-0021';
    public static oneBillion = '1000000000';
    public static decimal = '1.5';
    public static validationMessageForDecimal = '有効な値を入力してください。有効な値として最も近いのは 1 と 2 です。';
    public static lessThanOneBillion = '999999999';
    public static moreThanOneBillion = '1000000001';
    public static negativeNumber = '-1';
    public static onlyWord = 'only text';
    public static validContactNumber = '+8190-000-0001';
    //#endregion

    //#region invalid feedback message
    public static fieldRequiredErrorMessage = Constants.translator.invalidFeedback.fieldRequired;
    public static exceededNOCErrorMessage = Constants.translator.invalidFeedback.exceededNOC;
    public static exceededNOCErrorMessage16 = '16' + Constants.translator.invalidFeedback.exceededNOC;
    public static exceededNOCErrorMessage255 = '255' + Constants.translator.invalidFeedback.exceededNOC;
    public static exceededNOCErrorMessage50 = '50' + Constants.translator.invalidFeedback.exceededNOC;
    public static exceededNOCErrorMessage1024 = '1024' + Constants.translator.invalidFeedback.exceededNOC;
    // this message content has been not decided yet
    public static inputHalfSizeAlphaNumericTypeErrorMessage =
        Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;
    public static duplicatedTypeErrorMessage = Constants.translator.invalidFeedback.duplicatedTypeError;
    //#endregion

    //#region Project attributes
    public static projectForms = Constants.translator.dropdownOptions.projectForms;
    public static accuracyTypes = Constants.translator.dropdownOptions.accuracyTypes;
    public static projectStatuses = Constants.translator.dropdownOptions.projectStatuses;
    public static projectPlace = Constants.translator.dropdownOptions.projectPlace;
    public static currencyIds = Constants.translator.dropdownOptions.currencyIds;
    public static billingTypes = Constants.translator.dropdownOptions.billingTypes;

    public static closingDates = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
        26: '26',
        27: '27',
        28: '28',
        29: '29',
        30: '30',
        31: Constants.translator.dropdownOptions.date.endDate,
    };

    public static japaneseEndDate = Constants.translator.dropdownOptions.date.endDate;
    public static debitCreditGroupIds = Constants.translator.dropdownOptions.debitCreditGroupIds;
    public static taxIds = Constants.translator.dropdownOptions.taxIds;
    public static projectRole = Constants.translator.dropdownOptions.projectRole;
    //#endregion
}

export default new Constants();
