import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './add-segment-setup';
import addSegmentPage from '../../pages/add-segment-page';
import listSegmentPage from '../../pages/list-segment-page';
import { SegmentInfoData } from '../../models/segment-info';
import { Utilities } from '../../common/utilities';
import { Constants } from '../../common/constants';

const SEARCH_CODE_FIELD_NAME = Constants.translator.fieldName.segmentList.code;

TestModule('Add Customer - Back button test');

Before(setup);

TestCase('BMS-219. マスタ:セグメント作成:保存ボタン:必須項目のみ', async () => {
    const segmentInfo = SegmentInfoData.SEGMENT_REQUIRED_DATA;
    segmentInfo.code += Utilities.getRandomText(10);
    gondola.report(`Step 2.「セグメントコード」、「セグメント名」で有効な情報を入力する。`);
    await addSegmentPage.enterSegmentInformation(segmentInfo);
    gondola.report(`Step 3. 「保存」ボタンをクリックする。`);
    //BUG: currently department is also required, so we can't create new segment, lead to testcase failed
    await addSegmentPage.saveSegment();
    gondola.report(
        `VP. 正常に保存でき、セグメント一覧画面には登録した部門が表示され、登録されたセグメントの内容は正しく保存されること。`,
    );
    await addSegmentPage.clickReturnButton();
    await listSegmentPage.enterTextFieldByLabel(SEARCH_CODE_FIELD_NAME, segmentInfo.code);
    await listSegmentPage.clickSearchButton();
    await listSegmentPage.openSegmentByCode(segmentInfo.code);
    gondola.checkTrue(await addSegmentPage.doesSegmentDisplayCorrectly(segmentInfo));
});

TestCase('BMS-220. マスタ:セグメント作成:保存ボタン:全ての項目', async () => {
    const segmentInfo = SegmentInfoData.SEGMENT_FULL_DATA;
    segmentInfo.code += Utilities.getRandomText(10);
    gondola.report(`Step 2.「セグメントコード」、「セグメント名」で有効な情報を入力する。`);
    gondola.report(`Step 3. 他の項目（「親セグメント」）で有効な情報を入力する。`);
    await addSegmentPage.enterSegmentInformation(segmentInfo);
    gondola.report(`Step 4.「保存」ボタンをクリックする。`);
    //BUG: currently department is also required, so we can't create new segment, lead to testcase failed
    await addSegmentPage.saveSegment();
    gondola.report(
        `VP. 正常に保存でき、セグメント一覧画面には登録した部門が表示され、登録されたセグメントの内容は正しく保存されること。`,
    );
    await addSegmentPage.clickReturnButton();
    await listSegmentPage.enterTextFieldByLabel(SEARCH_CODE_FIELD_NAME, segmentInfo.code);
    await listSegmentPage.clickSearchButton();
    await listSegmentPage.openSegmentByCode(segmentInfo.code);
    gondola.checkTrue(await addSegmentPage.doesSegmentDisplayCorrectly(segmentInfo));
});
