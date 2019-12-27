import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './positions-setup';
import addPositionPage from '../../pages/add-position-page';
import { Constants } from '../../common/constants';

const TIME_CARD_APPROVE_FIELD_NAME = Constants.translator.fieldName.addPosition.timeCardApprove;
const TIME_CARD_APPROVE_OPTIONS = Constants.translator.dropdownOptions.position.timeCardApprove;

TestModule('Positions - Time card approve dropdown validation');

Before(setup);

TestCase('TMS-129. マスタ:役職作成:役職名:文字数', async () => {
    gondola.report(`Step 2. 「タイムカード承認」プルダウンの初期値を確認する。`);
    gondola.report(`VP. 「タイムカード承認」プルダウンの初期値が「全て可能」であること。`);
    await gondola.checkEqual(
        await addPositionPage.getSelectedOptionByLabel(TIME_CARD_APPROVE_FIELD_NAME),
        TIME_CARD_APPROVE_OPTIONS.full,
        'Default option should be selected',
    );
    gondola.report(`Step 3.「タイムカード承認」プルダウンの選択肢を確認する。`);
    gondola.report(
        `VP. 「タイムカード承認」プルダウンで選択肢が三つあり、「全て可能」、「担当のみ」と「不可能」を含めていること。`,
    );
    await gondola.checkTrue(
        await addPositionPage.doesSelectorByLabelOptionsExist(
            TIME_CARD_APPROVE_FIELD_NAME,
            Object.values(TIME_CARD_APPROVE_OPTIONS),
        ),
        'All options should be available',
    );
});
