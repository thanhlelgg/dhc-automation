import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';

TestModule('Add Item - Management Section dropdown validation');

const ITEM_MANAGEMENT_SECTION_FIELD_NAME = Constants.translator.fieldName.addItem.managementSection;
const DROPDOWN_ITEM = Object.values(Constants.translator.dropdownOptions.managementSection);

Before(setup);

TestCase('BMS-193. BMS:マスタ:品目作成:品目名:文字数', async () => {
    gondola.report(`Step 2.「管理区分」プルダウンで選択肢と「管理区分」フィールドを確認する`);
    gondola.report(`VP.「管理区分」は必須項目であり、「管理区分」プルダウンには選択肢が二つあり、
    「製番」と「MRP」を含んでいること。`);
    await gondola.checkTrue(
        await addItemPage.doesSelectorByLabelOptionsExist(ITEM_MANAGEMENT_SECTION_FIELD_NAME, DROPDOWN_ITEM),
        'Valid dropdown options should be correct',
    );
});
