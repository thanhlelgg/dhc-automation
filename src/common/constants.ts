import { Translate } from '../locales/translate';
import downloadsFolder from 'downloads-folder';
import path from 'path';

export class Constants {
    public static translator = Translate.getTranslator();
    public static readonly BASE_URL = 'http://' + process.env.HOST;
    public static readonly TMS_PORT = '10015';
    public static readonly TMS_BASE_URL = `${Constants.BASE_URL}:${Constants.TMS_PORT}`;
    public static readonly BMS_PORT = '10013';
    public static readonly BMS_BASE_URL = `${Constants.BASE_URL}:${Constants.BMS_PORT}`;
    public static readonly TTS_PORT = '10014';
    public static readonly TTS_BASE_URL = `${Constants.BASE_URL}:${Constants.TTS_PORT}`;
    public static readonly LOGIN_PORT = '10012';
    public static readonly LOGIN_URL = `${Constants.BASE_URL}:${Constants.LOGIN_PORT}/login`;
    public static readonly VERY_SHORT_TIMEOUT = 2;
    public static readonly SHORT_TIMEOUT = 10;
    public static readonly MEDIUM_TIMEOUT = 30;
    public static readonly LONG_TIMEOUT = 90;
    // incase we have too many elements, scroll to the last of it will take really long time, so we should limit it a little
    public static readonly LIMIT_SCROLL_TIMES = 10;
    public static readonly SLIGHTLY_RIGHT_OFFSET = { x: -50, y: 0 };
    public static readonly NORMAL_DATE_FORMAT = 'YYYY-MM-DD';
    public static readonly DEFAULT_DOWNLOAD_FOLDER = downloadsFolder().replace('/', '\\');
    public static readonly POSITION_FILENAME = 'positions.csv';
    public static readonly POSITION_CSV_PATH = path.resolve('src/data/positions.csv');
    public static readonly DELIVERY_XLS_PATH = path.resolve('src/data/delivery.xls');
    public static readonly DELIVERY_FILENAME = 'delivery.xls';
    public static readonly ESTIMATE_XLS_PATH = path.resolve('src/data/estimate.xls');
    public static readonly ESTIMATE_FILENAME = 'estimate.xls';
    public static readonly BILLING_XLS_PATH = path.resolve('src/data/bill.xls');
    public static readonly BILLING_FILENAME = 'bill.xls';

    //#region Input data
    public static USER_NAME = 'administrator';
    public static PASSWORD = 'P@ssW0rd123';
    public static EXCEEDED_NOC_MESSAGE =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \
    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat \
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
    public static SINGE_BYTE_ALPHABET_STRING = 'abcd';
    public static SINGLE_BYTE_NUMBER_STRING = '1234';
    public static FULL_SIZE_ALPHA_NUMERIC_STRING = 'ａｂｃｄ１２３４';
    public static HALF_SIZE_ALPHA_NUMERIC_STRING = 'abcd1234';
    public static SYMBOL_STRING = `!"#$%&'()`;
    public static HIRAGANA_KATAKANA_STRING = 'あああｱｱｱハハハ';
    public static HALF_SIZE_NUMBER_AND_HYPHEN = '210-0021';
    public static ONE_BILLION = '1000000000';
    public static DECIMAL = '1.5';
    public static VALIDATION_MESSAGE_FOR_DECIMAL =
        '有効な値を入力してください。有効な値として最も近いのは 1 と 2 です。';
    public static LESS_THAN_ONE_BILLION = '999999999';
    public static MORE_THAN_ONE_BILLION = '1000000001';
    public static NEGATIVE_NUMBER = '-1';
    public static ONLY_WORD = 'only text';
    public static VALID_CONTACT_NUMBER = '+8190-000-0001';
    public static readonly EXAMPLE_DEFAULT_DATE = '2019-01-01';
    public static readonly EXAMPLE_DEFAULT_DATE_SHORT = '2019-1-1';
    public static readonly EXAMPLE_DATE_DIVIDED_BY_DOT = '2019.1.1';
    public static readonly EXAMPLE_DATE_DIVIDED_BY_SLASH = '2019/1/1';
    public static readonly DEFAULT_END_DATE = '9999-12-31';
    //#endregion

    //#region invalid feedback message
    public static FIELD_REQUIRED_ERROR_MESSAGE = Constants.translator.invalidFeedback.fieldRequired;
    public static EXCEEDED_NOC_ERROR_MESSAGE = Constants.translator.invalidFeedback.exceededNOC;
    public static EXCEEDED_NOC_ERROR_MESSAGE_16 = '16' + Constants.translator.invalidFeedback.exceededNOC;
    public static EXCEEDED_NOC_ERROR_MESSAGE_255 = '255' + Constants.translator.invalidFeedback.exceededNOC;
    public static EXCEEDED_NOC_ERROR_MESSAGE_50 = '50' + Constants.translator.invalidFeedback.exceededNOC;
    public static EXCEEDED_NOC_ERROR_MESSAGE_1024 = '1024' + Constants.translator.invalidFeedback.exceededNOC;
    public static EXCEEDED_NOC_ERROR_MESSAGE_64 = '64' + Constants.translator.invalidFeedback.exceededNOC;
    // this message content has been not decided yet
    public static INPUT_HALF_SIZE_ALPHANUMERIC_TYPE_ERROR_MESSAGE =
        Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;
    public static DUPLICATED_TYPE_ERROR_MESSAGE = Constants.translator.invalidFeedback.duplicatedTypeError;
    public static INPUT_NUMERIC_TYPE_ERROR_MESSAGE = Constants.translator.invalidFeedback.inputNumericTypeError;
    public static DECIMAL_PLACE_ERROR_MESSAGE = Constants.translator.invalidFeedback.decimalPlaceTypeError;
    //#endregion

    //#region Project attributes
    public static PROJECT_FORMS = Constants.translator.dropdownOptions.projectForms;
    public static ACCURACY_TYPES = Constants.translator.dropdownOptions.accuracyTypes;
    public static PROJECT_STATUSES = Constants.translator.dropdownOptions.projectStatuses;
    public static PROJECT_PLACE = Constants.translator.dropdownOptions.projectPlace;
    public static CURRENT_IDS = Constants.translator.dropdownOptions.currencyIds;
    public static BILLING_TYPES = Constants.translator.dropdownOptions.billingTypes;

    public static CLOSING_DATES = {
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

    public static JAPANESE_END_DATE = Constants.translator.dropdownOptions.date.endDate;
    public static DEBIT_CREDIT_GROUP_IDS = Constants.translator.dropdownOptions.debitCreditGroupIds;
    public static TAX_IDS = Constants.translator.dropdownOptions.taxIds;
    public static PROJECT_ROLE = Constants.translator.dropdownOptions.projectRole;
    //#endregion
}

export default new Constants();
