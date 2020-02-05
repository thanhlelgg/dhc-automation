import { TestModule, Data, gondola } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './set-up';
import listCustomerPage from '../../pages/list-customer-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('List customer page - Search customer by closing date');

const CUSTOMER_CLOSING_DATE_FIELD_NAME = Constants.translator.fieldName.listCustomer.searchField.closingDate;
const CUSTOMER_CLOSING_DATE = Object.values(Constants.CLOSING_DATES);

Before(setup);

Data(CUSTOMER_CLOSING_DATE).TestCase('BMS-456. BMS:マスタ:得意先検索:締日', async (current: any) => {
    await gondola.report(`Step 2. 「締日」プルダウンの選択肢を確認する。`, '');
    gondola.report(`VP. 「締日」プルダウンの選択肢が「1」～「30」と「末」を含めていること。`);
    await gondola.checkTrue(
        await listCustomerPage.doesSelectorByLabelOptionsExist(
            CUSTOMER_CLOSING_DATE_FIELD_NAME,
            CUSTOMER_CLOSING_DATE.concat(''),
        ),
        'Customer options should be displayed correctly',
    );

    gondola.report(`Step 3. 「締日」プルダウンで任意の選択肢を選択し、「検索」ボタンをクリックする。`);
    await listCustomerPage.searchCustomer({ closingDate: current });
    const actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        current,
        SearchResultColumn.CLOSING_DATE,
        true,
    );
    gondola.report(`VP. 選択したものと完全一致する締日である得意先が表示されること。`);
    await gondola.checkTrue(actualResult, 'Search result should be correct');
});
