import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-segment-setup';
import addSegmentPage from '../../pages/add-segment-page';
import { Utilities } from '../../common/utilities';
import { DatabaseHelper } from '../../helper/database-helpers';
import { SegmentInfoData } from '../../models/segment-info';

TestModule('Add Segment - Segment code field validation');

const SEGMENT_CODE_TEXTFIELD_LABEL = Constants.translator.fieldName.addSegment.code;
const INVALID_SEGMENT_CODE_ERROR_MESSAGE = Constants.translator.invalidFeedback.inputHalfSizeAlphaNumericTypeError;
const ALREADY_IN_USE_ERROR_MESSAGE = Constants.translator.invalidFeedback.alreadyInUse;
Before(setup);

TestCase('BMS-210. マスタ:セグメント作成:セグメントコード:文字数', async () => {
    gondola.report(`Step 2.「セグメントコード」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        Constants.fieldRequiredErrorMessage,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「セグメントコード」で16文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 16;
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report(`Step 4.「セグメントコード」で17文字以上を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_CODE_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC + 1));
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「16文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.exceededNOCErrorMessage,
        'Invalid feedback should be displayed correctly',
    );
});

TestCase('BMS-211. BMS:マスタ:セグメント作成:セグメントコード:文字種', async () => {
    gondola.report(`Step 2. 「セグメントコード」で全角英数字を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_CODE_TEXTFIELD_LABEL, Constants.fullSizeAlphaNumericString);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        INVALID_SEGMENT_CODE_ERROR_MESSAGE,
        'Invalid segment code feedback should be displayed',
    );

    gondola.report(`Step 3. 「セグメントコード」でひらがな・カタカナ字を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_CODE_TEXTFIELD_LABEL, Constants.hiraganaKatakanaString);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        INVALID_SEGMENT_CODE_ERROR_MESSAGE,
        'Invalid segment code feedback should be displayed',
    );

    gondola.report(
        `Step 4. 「セグメントコード」で記号を入力し、「保存」ボタンをクリックする。（例：「!"#$%&'()」を入力）`,
    );
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_CODE_TEXTFIELD_LABEL, Constants.symbolString);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されること。`);
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        INVALID_SEGMENT_CODE_ERROR_MESSAGE,
        'Invalid segment code feedback should be displayed',
    );

    gondola.report(`Step 5. 「セグメントコード」で半角英数字を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_CODE_TEXTFIELD_LABEL, Constants.halfSizeAlphaNumericString);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 「半角英数で入力してください」という文字種誤りのエラーが表示されないこと。`);
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        '',
        'Invalid segment code feedback should not be displayed',
    );
});

TestCase('BMS-212. マスタ:セグメント作成:セグメントコード:重複時', async () => {
    gondola.report(`Step 2. 「セグメントコード」で重複しているコードを入力し、「保存」ボタンをクリックする。`);
    const segmentInfo = SegmentInfoData.SEGMENT_FULL_DATA;
    segmentInfo.code = (await DatabaseHelper.getRandomSegments()).code;
    await addSegmentPage.enterSegmentInformation(segmentInfo);
    await addSegmentPage.saveSegment();
    gondola.report(
        `VP. 入力フィールドの下にエラー「既に使われている値のため異なる値を入力してください」が表示されること。`,
    );
    //BUG: invalid feedback is not correct
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_CODE_TEXTFIELD_LABEL),
        ALREADY_IN_USE_ERROR_MESSAGE,
        'Segment code is already in use feedback should be displayed',
    );
});
