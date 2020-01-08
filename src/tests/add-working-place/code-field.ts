import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { Constants } from '../../common/constants';
import { Utilities } from '../../common/utilities';
import { WorkingPlaceInfoData } from '../../models/working-place-info';
import { DatabaseHelper } from '../../helper/database-helpers';

const WORKING_PLACE_CODE_FIELD_NAME = Constants.translator.fieldName.addWorkingPlace.code;
const CODE_FIELD_INVALID_VALUE_MESSAGE = Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;
const ALREADY_IN_USE_ERROR_MESSAGE = Constants.translator.invalidFeedback.duplicatedTypeError;
const requireData = WorkingPlaceInfoData.WORKING_PLACE_REQUIRED_DATA;

TestModule('Working place - Code field validation');

Before(setup);

TestCase('TMS-119. マスタ:ラボ管理作成:就業先コード:文字数', async () => {
    gondola.report(`Step 2. 「就業先コード」で何も入力しなくて、「保存」ボタンをクリックする。`);
    requireData.code = '';
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    // TODO: update when requirement specified
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValidationMessageByLabel(WORKING_PLACE_CODE_FIELD_NAME, true),
        Constants.fieldRequiredErrorMessage,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「就業先コード」で16文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 16;
    const randomText = Utilities.getRandomText(maximumNOC);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_CODE_FIELD_NAME, randomText, true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValueByLabel(WORKING_PLACE_CODE_FIELD_NAME, true),
        randomText,
        'All characters should be displayed',
    );

    gondola.report(`Step 4.「就業先コード」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_CODE_FIELD_NAME, randomText + 'a', true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getTextFieldValueByLabel(WORKING_PLACE_CODE_FIELD_NAME, true),
        randomText,
        'Exceed characters should be stripped',
    );
});

TestCase('TMS-176. マスタ:ラボ管理作成:就業先コード:文字種', async () => {
    gondola.report(`Pre-condition 2. Enter all other required fields`);
    requireData.code = '';
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);
    gondola.report(`Step 2. 「就業先コード」で全角英数字を入力し、「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.enterTextFieldByLabel(
        WORKING_PLACE_CODE_FIELD_NAME,
        Constants.fullSizeAlphaNumericString,
        true,
    );
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not displayed
    await gondola.checkEqual(
        await addWorkingPlacePage.getInvalidFeedBack(WORKING_PLACE_CODE_FIELD_NAME),
        CODE_FIELD_INVALID_VALUE_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(`Step 3. 「取引先コード」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addWorkingPlacePage.enterTextFieldByLabel(
        WORKING_PLACE_CODE_FIELD_NAME,
        Constants.hiraganaKatakanaString,
        true,
    );
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not displayed
    await gondola.checkEqual(
        await addWorkingPlacePage.getInvalidFeedBack(WORKING_PLACE_CODE_FIELD_NAME),
        CODE_FIELD_INVALID_VALUE_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(`Step 4. 「取引先コード」で記号を入力し、「保存」ボタンをクリックする。（例：「!"#$%&'()」を入力）`);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_CODE_FIELD_NAME, Constants.symbolString, true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not displayed
    await gondola.checkEqual(
        await addWorkingPlacePage.getInvalidFeedBack(WORKING_PLACE_CODE_FIELD_NAME),
        CODE_FIELD_INVALID_VALUE_MESSAGE,
        'Invalid customer code feedback should be displayed',
    );

    gondola.report(`Step 5. 「取引先コード」で半角英数字を入力し、「保存」ボタンをクリックする`);
    await addWorkingPlacePage.enterTextFieldByLabel(WORKING_PLACE_CODE_FIELD_NAME, Utilities.getRandomText(15), true);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getInvalidFeedBack(WORKING_PLACE_CODE_FIELD_NAME),
        '',
        'Invalid customer code feedback should not be displayed',
    );
});

TestCase('TMS-177. 案件:得意先マスタ作成:顧客情報:取引先コード :重複時', async () => {
    gondola.report(`Step 2. 「取引先コード」で重複しているコードを入力し、「保存」ボタンをクリックする。`);
    const randomLabCode = (await DatabaseHelper.getRandomLab()).code;
    requireData.code = randomLabCode ? randomLabCode : '';
    await addWorkingPlacePage.inputWorkingPlaceInfo(requireData);
    await addWorkingPlacePage.clickButtonByIcon(ButtonIcon.SAVE);
    gondola.report(
        `VP. 入力フィールドの下にエラー「既に使われている値のため異なる値を入力してください」が表示されること。`,
    );
    //BUG: invalid feedback is not displayed
    await gondola.checkEqual(
        await addWorkingPlacePage.getInvalidFeedBack(WORKING_PLACE_CODE_FIELD_NAME, true),
        ALREADY_IN_USE_ERROR_MESSAGE,
        'Customer code is already in use feedback should be displayed',
    );
});
