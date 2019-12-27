import { gondola, TestCase, TestModule } from 'gondolajs';
import addItemPage from '../../pages/add-item-page';

import setup from './add-item-setup';
import { Constants } from '../../common/constants';

TestModule('Add Item - Column to be deleted');

const INVENTORY_VALUATION_UNIT_PRICE = Constants.translator.fieldName.addItem.inventoryEvaluationUnitPrice;
const PAYMENT_UNIT_PRICE = Constants.translator.fieldName.addItem.unitPrice;
const COST_CENTER = Constants.translator.fieldName.addItem.costCenter;
const ARRANGEMENT_LEVEL = Constants.translator.fieldName.addItem.itemArrangerInfo.arrangementLevel;
const ARRANGEMENT = Constants.translator.fieldName.addItem.itemArrangerInfo.arrangement;
const ARRANGEMENT_CLASSIFICATION = Constants.translator.fieldName.addItem.itemArrangerInfo.arrangeClassification;
const ARRANGEMENT_UNIT = Constants.translator.fieldName.addItem.itemArrangerInfo.arrangementUnit;
const ARRANGEMENT_UNIT_MULTIPLE = Constants.translator.fieldName.addItem.itemArrangerInfo.arrangementUnitMultiple;
const UNIT_PURCHASE_PRICE = Constants.translator.fieldName.addItem.itemArrangerInfo.unitPurchasePrice;

Before(setup);

TestCase('BMS-197. BMS:マスタ:品目作成:削除対象のカラムについて', async () => {
    gondola.report(`VP.「品目情報」セッションで「在庫評価単価」、「支給単価」、「原価センター」項目が削除されたこと。`);
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(INVENTORY_VALUATION_UNIT_PRICE),
        'Inventory valuation unit price should be deleted',
    );
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(PAYMENT_UNIT_PRICE),
        'Payment unit price should be deleted',
    );
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(COST_CENTER),
        'Cost center should be deleted',
    );

    gondola.report(
        `VP.「品目手配先情報」セッションで全項目（「手配レベル」、「手配先」、「手配区分」、「手配単位」、「手配単位倍数」、「購入単価」）が削除されたこと。`,
    );
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(ARRANGEMENT_LEVEL),
        'Arrangement level should be deleted',
    );
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(ARRANGEMENT),
        'Arrangement destination should be deleted',
    );
    await gondola.checkFalse(
        await addItemPage.doesSelectorfieldByLabelDisplay(ARRANGEMENT_CLASSIFICATION),
        'Arrangement classification should be deleted',
    );
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(ARRANGEMENT_UNIT),
        'Arrangement unit should be deleted',
    );
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(ARRANGEMENT_UNIT_MULTIPLE),
        'Arrangement unit multiple should be deleted',
    );
    await gondola.checkFalse(
        await addItemPage.doesTextfieldByLabelDisplay(UNIT_PURCHASE_PRICE),
        'Purchase unit price should be deleted',
    );
});
