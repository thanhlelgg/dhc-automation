import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-segment-setup';
import addSegmentPage from '../../pages/add-segment-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Segment - Segment name field validation');

const SEGMENT_NAME_TEXTFIELD_LABEL = Constants.translator.fieldName.addSegment.name;
Before(setup);

TestCase('BMS-213. マスタ:セグメント作成:セグメント名:文字数', async () => {
    gondola.report(`Step 2.「セグメント名」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「入力必須項目です」が表示されること。`);
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_NAME_TEXTFIELD_LABEL),
        Constants.fieldRequiredErrorMessage,
        'Field is required error message should be displayed',
    );
    gondola.report(`Step 3.「セグメント名」で64文字を入力し、「保存」ボタンをクリックする。`);
    const maximumNOC = 64;
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_NAME_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC));
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されないこと。`);
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_NAME_TEXTFIELD_LABEL),
        '',
        'Invalid feedback should not be displayed',
    );

    gondola.report(`Step 4.「セグメント名」で65文字以上を入力し、「保存」ボタンをクリックする。`);
    await addSegmentPage.enterTextFieldByLabel(SEGMENT_NAME_TEXTFIELD_LABEL, Utilities.getRandomText(maximumNOC + 1));
    await addSegmentPage.saveSegment();
    gondola.report(`VP. 入力フィールドの下にエラー「64文字以内で入力してください」が表示されること。`);
    //BUG: no invalid feedback is displayed
    await gondola.checkEqual(
        await addSegmentPage.getInvalidFeedBack(SEGMENT_NAME_TEXTFIELD_LABEL),
        maximumNOC.toString() + Constants.exceededNOCErrorMessage,
        'Invalid feedback should be displayed correctly',
    );
});
