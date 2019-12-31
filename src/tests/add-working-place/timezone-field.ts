import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { Constants } from '../../common/constants';

const WORKING_PLACE_TIME_ZONE_FIELD_NAME = Constants.translator.fieldName.addWorkingPlace.timeZone;

TestModule('Working place - Category field validation');

Before(setup);

TestCase('TMS-126. マスタ:ラボ管理作成:タイムゾーン', async () => {
    gondola.report(`Step 2. 「タイムゾーン」プルダウンの初期値を確認する`);
    gondola.report(`VP. 初期値は「(UTC+09:00) 大阪、札幌、東京」であること。`);
    await gondola.checkEqual(
        await addWorkingPlacePage.getSelectedOptionByLabel(WORKING_PLACE_TIME_ZONE_FIELD_NAME, true),
        '(UTC+09:00) 大阪、札幌、東京',
        'Default option should be selected',
    );
});
