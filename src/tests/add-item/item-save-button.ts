import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { DatabaseHelper } from '../../helper/database-helpers';
import { ItemInfo } from '../../models/item-info';

TestModule('Add Item - Save button validation');

const ITEM_INFO_REQUIRED_ONLY = new ItemInfo();

Before(setup);

TestCase('BMS-208. BMS:マスタ:品目作成:保存ボタン:必須項目のみ', async () => {
    ITEM_INFO_REQUIRED_ONLY.segment = (await DatabaseHelper.getExistedSegment()).name;
    gondola.report(`Step 2. 必須項目で情報を入力する`);
    await addItemPage.inputItemInformation(ITEM_INFO_REQUIRED_ONLY);
    gondola.report(`Step 3. 保存する`);
    await addItemPage.saveNewItem();
    gondola.report(
        `VP. 正常に保存でき、品目一覧画面には登録した部門が表示され、登録された品目の内容は正しく保存されること`,
    );
    await gondola.checkEqual(await addItemPage.doesSavedMessageDisplay(), true, 'New Items is saved');
});

TestCase('BMS-209. BMS:マスタ:品目作成:保存ボタン:全ての項目', async () => {
    const itemFullData = ITEM_INFO_REQUIRED_ONLY;
    itemFullData.segment = (await DatabaseHelper.getExistedSegment()).name;
    itemFullData.initOptionalValues();

    gondola.report(`Step 2. 必須項目で情報を入力する`);
    gondola.report(`Step 3. 他の項目で情報を入力する
    `);
    await addItemPage.inputItemInformation(ITEM_INFO_REQUIRED_ONLY);
    gondola.report(`Step 3. 保存する `);
    await addItemPage.saveNewItem();
    gondola.report(
        `VP. 正常に保存でき、品目一覧画面には登録した部門が表示され、登録された品目の内容は正しく保存されること。`,
    );
    await gondola.checkEqual(await addItemPage.doesSavedMessageDisplay(), true, 'New Items is saved');
});
