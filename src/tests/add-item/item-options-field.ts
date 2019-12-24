import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';

TestModule('Add Item - Tax Classification radio options and Disable checkbox validation');

const ITEM_TAX_FIELD_NAME = Constants.translator.fieldName.addItem.tax;
const DISABLE_CHECKBOX = Constants.translator.checkboxOptions.addItem.disable;

const TAX_OPTIONS = Constants.translator.radioButtonOptions.addItem.tax;

Before(setup);

TestCase('BMS-200. BMS:マスタ:品目作成:借方補助コード:文字数', async () => {
    gondola.report(`VP.「課税区分」プルダウンには選択肢が二つあり、「課税」と「非課税」を含んでいること。`);
    const collectTaxOptions: string[] = Object.values(TAX_OPTIONS);
    await gondola.checkTrue(
        await addItemPage.doesRadioButtonOptionsExist(ITEM_TAX_FIELD_NAME, collectTaxOptions),
        'Valid dropdown options should be correct',
    );
});

TestCase('BMS-205. BMS:マスタ:品目作成:無効化', async () => {
    gondola.report(`VP.「無効化」で「無効にする」チェックボックスが一つあること。`);
    await gondola.checkTrue(
        await addItemPage.doesCheckboxLabelExist(DISABLE_CHECKBOX),
        'Valid dropdown options should be correct',
    );
});
