import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';

TestModule('Add Project - Project Currency field validation');

const CURRENCY_ID_FIELD_NAME = Constants.translator.fieldName.currencyId;

Before(setup);

TestCase('BMS-43. 案件:案件作成:取引通貨:選択肢', async () => {
    gondola.report(`Step 2.「取引通貨」プルダウンで選択肢を確認する。`);
    const currencyIdOptions = Object.values(Constants.currencyIds);
    gondola.report(`VP.「取引通貨」は必須項目であり、「取引通貨」プルダウンには選択肢が一つあり`);
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(CURRENCY_ID_FIELD_NAME, currencyIdOptions),
        true,
        'Currency id options should be displayed correctly',
    );
});
