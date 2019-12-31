import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { ItemInfoData } from '../../models/item-info';
import businessSystemPage from '../../pages/business-system-page';
import listItemPage from '../../pages/list-item-page';
import { Utilities } from '../../common/utilities';

TestModule('Add Item - Save button validation');

const ITEM_INFO_REQUIRED_ONLY = ItemInfoData.ITEM_REQUIRED_DATA;

Before(setup);

TestCase('BMS-208. BMS:マスタ:品目作成:保存ボタン:必須項目のみ', async () => {
    ITEM_INFO_REQUIRED_ONLY.itemCode = Utilities.getRandomText(8, 'code');
    gondola.report(`Step 2. 必須項目で情報を入力する`);
    await addItemPage.inputItemInformation(ITEM_INFO_REQUIRED_ONLY);
    gondola.report(`Step 3. 保存する`);
    await addItemPage.saveNewItem();
    gondola.report(
        `VP. 正常に保存でき、品目一覧画面には登録した部門が表示され、登録された品目の内容は正しく保存されること`,
    );
    // await gondola.checkEqual(await addItemPage.doesSavedMessageDisplay(), true, 'New Items is saved');
    await businessSystemPage.gotoListItem();
    await listItemPage.searchItem({ itemCode: ITEM_INFO_REQUIRED_ONLY.itemCode });
    gondola.checkControlExist(listItemPage.getItemLink(ITEM_INFO_REQUIRED_ONLY.itemCode));

    gondola.report('Verify content of new project are displayed correctly');

    await gondola.click(listItemPage.getItemLink(ITEM_INFO_REQUIRED_ONLY.itemCode));
    await gondola.checkEqual(
        await addItemPage.doesContentOfItemDisplayCorrect(ITEM_INFO_REQUIRED_ONLY),
        true,
        'One of content of item displays incorrectly.',
    );
});

TestCase('BMS-209. BMS:マスタ:品目作成:保存ボタン:全ての項目', async () => {
    const itemFullData = ITEM_INFO_REQUIRED_ONLY;
    itemFullData.itemCode = Utilities.getRandomText(8, 'code');
    itemFullData.initOptionalValues();

    gondola.report(`Step 2. 必須項目で情報を入力する`);
    gondola.report(`Step 3. 他の項目で情報を入力する`);
    await addItemPage.inputItemInformation(itemFullData);
    gondola.report(`Step 3. 保存する `);
    await addItemPage.saveNewItem();
    gondola.report(
        `VP. 正常に保存でき、品目一覧画面には登録した部門が表示され、登録された品目の内容は正しく保存されること。`,
    );
    // await gondola.checkTrue(await addItemPage.doesSavedMessageDisplay(), 'New Items is saved');
    await businessSystemPage.gotoListItem();
    await listItemPage.searchItem({ itemCode: itemFullData.itemCode });
    gondola.checkControlExist(listItemPage.getItemLink(itemFullData.itemCode));

    gondola.report('Verify content of new project are displayed correctly');

    await gondola.click(listItemPage.getItemLink(itemFullData.itemCode));
    await gondola.checkEqual(
        await addItemPage.doesContentOfItemDisplayCorrect(itemFullData),
        true,
        'One of content of item displays incorrectly.',
    );
});
