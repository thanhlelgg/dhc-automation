import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-segment-setup';
import addSegmentPage from '../../pages/add-segment-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Segment - Department field validation');

const SEGMENT_DEPARTMENT_TEXTFIELD_LABEL = Constants.translator.fieldName.addSegment.kanjyoDepartmentCode;
const INVALID_SEGMENT_DEPARTMENT_ERROR_MESSAGE =
    Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;
Before(setup);

TestCase('BMS-216. マスタ:セグメント作成:会計システム部門コード:文字数', async () => {
    gondola.report(`Step 2.「会計システム部門コード」で16文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 16;
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report(`Step 3.「会計システム部門コード」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(
        SEGMENT_DEPARTMENT_TEXTFIELD_LABEL,
        Utilities.getRandomText(maximumNOC + 1),
    );
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.EXCEEDED_NOC_ERROR_MESSAGE,
        'Invalid feedback should be displayed correctly',
    );
});

TestCase('BMS-217. BMS:マスタ:セグメント作成:会計システム部門コード:文字種', async () => {
    gondola.report(`Step 2. 「会計システム部門コード」で全角英数字を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(
        SEGMENT_DEPARTMENT_TEXTFIELD_LABEL,
        Constants.FULL_SIZE_ALPHA_NUMERIC_STRING,
    );
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL),
        INVALID_SEGMENT_DEPARTMENT_ERROR_MESSAGE,
        'Invalid segment code feedback should be displayed',
    );

    gondola.report(`Step 3. 「会計システム部門コード」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL, Constants.HIRAGANA_KATAKANA_STRING);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL),
        INVALID_SEGMENT_DEPARTMENT_ERROR_MESSAGE,
        'Invalid segment code feedback should be displayed',
    );

    gondola.report(
        `Step 4. 「会計システム部門コード」で記号を入力し、「保存」ボタンをクリックする。（例：「!"#$%&'()」を入力）`,
    );
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL, Constants.SYMBOL_STRING);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL),
        INVALID_SEGMENT_DEPARTMENT_ERROR_MESSAGE,
        'Invalid segment code feedback should be displayed',
    );

    gondola.report(`Step 5. 「会計システム部門コード」で半角英数字を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(
        SEGMENT_DEPARTMENT_TEXTFIELD_LABEL,
        Constants.HALF_SIZE_ALPHA_NUMERIC_STRING,
    );
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_DEPARTMENT_TEXTFIELD_LABEL),
        '',
        'Invalid segment code feedback should not be displayed',
    );
});
