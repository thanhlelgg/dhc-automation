import { Data, TestModule, gondola } from 'gondolajs';
import setup from './set-up';
import { Constants } from '../../common/constants';
import listCustomerPage from '../../pages/list-customer-page';

const CUSTOMER_SORT_FIELDS = Object.values(Constants.CUSTOMER_SORT_FIELDS);

TestModule('List customer page - button sort test');

Before(setup);

Data(CUSTOMER_SORT_FIELDS).TestCase('BMS-520. マスタ:得意先検索:ソートボタン', async (current: any) => {
    gondola.report('Step 2. 一覧の各タイトルでソートボタンをクリックする。');
    await listCustomerPage.clickButtonSort(current);
    gondola.report('VP. 検索結果全体はソートされ、nullは最小値としてソートされること。');
    gondola.checkTrue(await listCustomerPage.doRowsSortCorrectly(current), 'Element should be sorted correctly');
});
