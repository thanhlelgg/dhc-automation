import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './add-customer-setup';
import addCustomerPage from '../../pages/add-customer-page';

TestModule('Add Customer - Customer collect circle fields validation');

const COLLECT_CYCLE_FIELD_NAME = Constants.translator.fieldName.addCustomer.collectCycle;
const COLLECT_CYCLE_OPTIONS = Constants.translator.radioButtonOptions.addCustomer.collectCycle;
const COLLECT_CYCLE_DAY_INPUT_GROUP_NAME = Constants.translator.inputGroupName.addCustomer.collectCycleDay;
const COLLECT_CYCLE_MONTH_INPUT_GROUP_NAME = Constants.translator.inputGroupName.addCustomer.collectCycleMonth;
const COLLECT_CYCLE_MONTHLY_DAY_INPUT_GROUP_NAME =
    Constants.translator.inputGroupName.addCustomer.collectCycleMonthlyDay;
Before(setup);

TestCase('BMS-98. 案件:得意先マスタ作成:顧客情報:回収サイクル:選択肢', async () => {
    gondola.report(`Step 2. 「回収サイクル」ラジオボタンで選択肢を確認する。`);
    gondola.report(`VP. 「回収サイクル」の選択肢が三つあり、「日ごと」、「月ごと」、「設定しない」を含めていること。`);
    const collectCircleOptions = Object.values(Constants.translator.radioButtonOptions.addCustomer.collectCycle);
    await gondola.checkTrue(
        await addCustomerPage.doesRadioButtonOptionsExist(COLLECT_CYCLE_FIELD_NAME, collectCircleOptions),
        'Radio button should not be selected',
    );

    gondola.report(`Step 3. 「回収サイクル」ラジオボタンで「日ごと」を選択する。`);
    await addCustomerPage.selectRadioButtonByLabel(COLLECT_CYCLE_FIELD_NAME, COLLECT_CYCLE_OPTIONS.daily);
    gondola.report(`VP. 「日後に回収」という数値入力欄が表示されること。`);
    await gondola.checkTrue(
        await addCustomerPage.doesInputGroupByNameDisplay(COLLECT_CYCLE_DAY_INPUT_GROUP_NAME),
        'Text field should be displayed',
    );
    //BUG: textfield is not numeric
    await gondola.checkTrue(
        await addCustomerPage.isInputGroupByNameNumeric(COLLECT_CYCLE_DAY_INPUT_GROUP_NAME),
        'Text field should be numeric',
    );

    gondola.report(`Step 4. 「回収サイクル」ラジオボタンで「月ごと」を選択する。`);
    await addCustomerPage.selectRadioButtonByLabel(COLLECT_CYCLE_FIELD_NAME, COLLECT_CYCLE_OPTIONS.monthly);
    gondola.report(`VP. 「ケ月後」「日に回収」という数値入力欄が表示されること。`);
    await gondola.checkTrue(
        await addCustomerPage.doesInputGroupByNameDisplay(COLLECT_CYCLE_MONTH_INPUT_GROUP_NAME),
        'Text field should be displayed',
    );
    //BUG: textfield is not numeric
    await gondola.checkTrue(
        await addCustomerPage.isInputGroupByNameNumeric(COLLECT_CYCLE_MONTH_INPUT_GROUP_NAME),
        'Text field should be numeric',
    );
    await gondola.checkTrue(
        await addCustomerPage.doesInputGroupByNameDisplay(COLLECT_CYCLE_MONTHLY_DAY_INPUT_GROUP_NAME),
        'Text field should be displayed',
    );
    //BUG: textfield is not numeric
    await gondola.checkTrue(
        await addCustomerPage.isInputGroupByNameNumeric(COLLECT_CYCLE_MONTHLY_DAY_INPUT_GROUP_NAME),
        'Text field should be numeric',
    );
});

TestCase('BMS-99. 案件:得意先マスタ作成:顧客情報:回収サイクル:「日ごと」の選択', async () => {
    gondola.report(`Step 2. 「回収サイクル」ラジオボタンで「日ごと」を選択する。`);
    await addCustomerPage.selectRadioButtonByLabel(COLLECT_CYCLE_FIELD_NAME, COLLECT_CYCLE_OPTIONS.daily);
    gondola.report(`VP. 「日後に回収」という数値入力欄が表示されること。`);
    await gondola.checkTrue(
        await addCustomerPage.doesInputGroupByNameDisplay(COLLECT_CYCLE_DAY_INPUT_GROUP_NAME),
        'Text field should be displayed',
    );
    //BUG: textfield is not numeric
    await gondola.checkTrue(
        await addCustomerPage.isInputGroupByNameNumeric(COLLECT_CYCLE_DAY_INPUT_GROUP_NAME),
        'Text field should be numeric',
    );

    gondola.report(`Step 3. 「日後に回収」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: Verify error message when requirement available

    gondola.report(`Step 4. 「日後に回収」で数字以外を入力する。`);
    await addCustomerPage.enterInputGroupByName(COLLECT_CYCLE_DAY_INPUT_GROUP_NAME, Constants.singleByteAlphabetString);
    gondola.report(`VP. 数字しか入力できないこと。`);
    gondola.checkEqual(
        await addCustomerPage.getTextInputGroupByName(COLLECT_CYCLE_DAY_INPUT_GROUP_NAME),
        '',
        'Only number can be entered',
    );

    gondola.report(`Step 5. 「日後に回収」で。。桁数超過を入力する。`);
    // TODO: Enter exceed digits when requirement is available
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: Verify exceed digits can't be entered when requirement is available
});

TestCase('BMS-100. 案件:得意先マスタ作成:顧客情報:回収サイクル:「月ごと」の選択', async () => {
    gondola.report(`Step 2. 「回収サイクル」ラジオボタンで「月ごと」を選択する。`);
    await addCustomerPage.selectRadioButtonByLabel(COLLECT_CYCLE_FIELD_NAME, COLLECT_CYCLE_OPTIONS.monthly);
    gondola.report(`VP. 「ケ月後」「日に回収」という数値入力欄が表示されること。`);
    await gondola.checkTrue(
        await addCustomerPage.doesInputGroupByNameDisplay(COLLECT_CYCLE_MONTH_INPUT_GROUP_NAME),
        'Text field should be displayed',
    );
    //BUG: textfield is not numeric
    await gondola.checkTrue(
        await addCustomerPage.isInputGroupByNameNumeric(COLLECT_CYCLE_MONTH_INPUT_GROUP_NAME),
        'Text field should be numeric',
    );
    await gondola.checkTrue(
        await addCustomerPage.doesInputGroupByNameDisplay(COLLECT_CYCLE_MONTHLY_DAY_INPUT_GROUP_NAME),
        'Text field should be displayed',
    );
    //BUG: textfield is not numeric
    await gondola.checkTrue(
        await addCustomerPage.isInputGroupByNameNumeric(COLLECT_CYCLE_MONTHLY_DAY_INPUT_GROUP_NAME),
        'Text field should be numeric',
    );

    gondola.report(`Step 3. 「ケ月後」で何も入力しなくて、「保存」ボタンをクリックする。`);
    gondola.report(`Step 4. 「日に回収」で何も入力しなくて、「保存」ボタンをクリックする。`);
    await addCustomerPage.saveCustomer();
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: Verify error message when requirement available
    gondola.report(`VP. 入力フィールドの下にエラー「。。。」が表示されること。`);
    // TODO: Verify error message when requirement available

    gondola.report(`Step 5. 「ケ月後」で数字以外を入力する。`);
    await addCustomerPage.enterInputGroupByName(
        COLLECT_CYCLE_MONTH_INPUT_GROUP_NAME,
        Constants.singleByteAlphabetString,
    );
    gondola.report(`VP. 数字しか入力できないこと。`);
    gondola.checkEqual(
        await addCustomerPage.getTextInputGroupByName(COLLECT_CYCLE_MONTH_INPUT_GROUP_NAME),
        '',
        'Only number can be entered',
    );

    gondola.report(`Step 6. 「日に回収」で数字以外を入力する。`);
    await addCustomerPage.enterInputGroupByName(
        COLLECT_CYCLE_MONTHLY_DAY_INPUT_GROUP_NAME,
        Constants.singleByteAlphabetString,
    );
    gondola.report(`VP. 数字しか入力できないこと。`);
    gondola.checkEqual(
        await addCustomerPage.getTextInputGroupByName(COLLECT_CYCLE_MONTHLY_DAY_INPUT_GROUP_NAME),
        '',
        'Only number can be entered',
    );

    gondola.report(`Step 7. 「ケ月後」で。。桁数超過を入力する。`);
    // TODO: Enter exceed digits when requirement is available
    gondola.report(`VP. 「日に回収」で。。桁数超過を入力できないこと。`);
    // TODO: Verify exceed digits can't be entered when requirement is available

    gondola.report(`Step 8. 「日に回収」で。。桁数超過を入力する。`);
    // TODO: Enter exceed digits when requirement is available
    gondola.report(`VP. 「日に回収」で。。桁数超過を入力できないこと。`);
    // TODO: Verify exceed digits can't be entered when requirement is available
});
