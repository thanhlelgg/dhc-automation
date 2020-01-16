import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Add Project - Project Closing date field validation');

const CLOSING_DATE_FIELD_NAME = Constants.translator.fieldName.addProject.closingDate;

Before(setup);

TestCase('BMS-44. 案件:案件作成:締日:選択肢', async () => {
    gondola.report(`Step 2.「締日」プルダウンで選択肢を確認する。`);
    const currencyIdOptions = Object.values(Constants.CLOSING_DATES);
    gondola.report(
        `VP.「締日」は必須項目であり、「締日」プルダウンには選択肢が31つあり、1～30および「末」を含んでいること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(CLOSING_DATE_FIELD_NAME, currencyIdOptions),
        true,
        'Closing date options should be displayed correctly',
    );

    gondola.report(`Step 3. 取引先で得意先を選択し、「締日」の値を確認する。`);
    const customerCode = await addProjectPage.selectRandomCustomer();
    gondola.report(`VP. 取引先で選択した得意先で設定した締日が転記されること。`);
    const expectedClosingDate = await DatabaseHelper.getClosingDateByBusinessCustomerCode(customerCode);
    const actualClosingDate = await addProjectPage.getClosingDateAsNumber();
    gondola.checkEqual(expectedClosingDate.toString(), actualClosingDate);
});
