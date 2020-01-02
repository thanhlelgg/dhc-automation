import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './setup';
import addWorkingPlacePage from '../../pages/add-working-place-page';
import { Constants } from '../../common/constants';

const WORKING_PLACE_CATEGORY_FIELD_NAME = Constants.translator.fieldName.addWorkingPlace.category;
const WORKING_PLACE_CATEGORY_OPTIONS = Constants.translator.radioButtonOptions.addWorkingPlace.category;

TestModule('Working place - Category field validation');

Before(setup);

TestCase('TMS-120. マスタ:ラボ管理作成:カテゴリ:選択肢', async () => {
    gondola.report(`Step 2. 「カテゴリ」ラジオボタンの初期値を確認する。`);
    gondola.report(`VP. 初期値として「ラボ」が選択されていること。`);
    await gondola.checkTrue(
        await addWorkingPlacePage.isRadioButtonByLabelSelected(
            WORKING_PLACE_CATEGORY_FIELD_NAME,
            WORKING_PLACE_CATEGORY_OPTIONS.lab,
            true,
        ),
        'Default option should be selected',
    );
    gondola.report(`Step 3.「カテゴリ」の選択肢を確認する。`);
    gondola.report(`VP. 「カテゴリ」ラジオボタンの選択肢が二つあり、「ラボ」と「クライアント」を含めていること。`);
    const categoryOptions = Object.values(WORKING_PLACE_CATEGORY_OPTIONS);
    await gondola.checkTrue(
        await addWorkingPlacePage.doesRadioButtonOptionsExist(WORKING_PLACE_CATEGORY_FIELD_NAME, categoryOptions, true),
        'All options should be available',
    );
});
