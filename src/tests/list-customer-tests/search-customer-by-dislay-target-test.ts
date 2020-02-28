import { TestModule, Data, gondola } from 'gondolajs';
import setup from './set-up';
import { Constants } from '../../common/constants';
import listCustomerPage, { CustomerSearchResultColumn } from '../../pages/list-customer-page';
import { SearchResultColumn } from '../../models/enum-class/search-result-column';

TestModule('List customer page - Search customer by display target');

const CUSTOMER_IS_DISABLE_FIELD_NAME = Constants.translator.fieldName.listCustomer.searchField.displayTarget;
const CUSTOMER_IS_DISABLE = Object.values(Constants.CUSTOMER_IS_DISABLE).concat('');

Before(setup);

Data(CUSTOMER_IS_DISABLE).TestCase('BMS-458. マスタ:得意先検索:表示対象', async (current: any) => {
    await gondola.report(`Step 2. 「表示対象」プルダウンの選択肢を確認する。`, '');
    gondola.report(`VP. 「表示対象」プルダウンの選択肢が「有効な顧客のみ」「無効な顧客のみ」を含めていること。`);
    await gondola.checkTrue(
        await listCustomerPage.doesSelectorByLabelOptionsExist(CUSTOMER_IS_DISABLE_FIELD_NAME, CUSTOMER_IS_DISABLE),
        'Customer options should be displayed correctly',
    );
    gondola.report(`Step 3. 「表示対象」プルダウンで「有効な顧客のみ」を選択し、「検索」ボタンをクリックする。`);
    gondola.report('VP. 無効フラグのチェックが無い得意先が表示されること');
    gondola.report('Step 4. 「表示対象」プルダウンで「無効な顧客のみ」を選択し、「検索」ボタンをクリックする。');
    gondola.report('VP. 無効フラグのチェックがある得意先が表示されること。');
    await listCustomerPage.searchCustomer(CustomerSearchResultColumn.CUSTOMER_IS_DISBALE, current);
    const actualResult = await listCustomerPage.verifySearchResultsByOneColumn(
        await listCustomerPage.getInputInvalidFlag(current),
        SearchResultColumn.IS_DISABLE,
        true,
    );
    await gondola.checkTrue(actualResult, 'Search result should be correct');
});
