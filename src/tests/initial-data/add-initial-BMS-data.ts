import { gondola, Data, TestModule } from 'gondolajs';
import setup from './precondition-setup';
import addDepartmentPage from '../../pages/add-department-page';
import listDepartmentPage from '../../pages/list-department-page';
import addSegmentPage from '../../pages/add-segment-page';
import listSegmentPage from '../../pages/list-segment-page';
import { DepartmentInfoData } from '../../models/department-info';
import { Constants } from '../../common/constants';
import { SegmentInfoData } from '../../models/segment-info';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import addItemPage from '../../pages/add-item-page';
import listItemPage from '../../pages/list-item-page';
import { ItemInfoData } from '../../models/item-info';
import addWorkerPage from '../../pages/add-worker-page';
import listWorkerPage from '../../pages/list-worker-page';
import { WorkerInfoData } from '../../models/worker-info';
import addCustomerPage from '../../pages/add-customer-page';
import listCustomerPage from '../../pages/list-customer-page';
import { CustomerInfoData } from '../../models/customer-info';

TestModule('Add initial data for BMS');

const DEPARTMENT_INFO = DepartmentInfoData.DEPARTMENT_INITIAL_DATA;
const SEGMENT_INFO = SegmentInfoData.SEGMENT_INITIAL_DATA;
const ITEM_INFO = ItemInfoData.ITEM_INITIAL_DATA;
const WORKER_INFO = WorkerInfoData.WORKER_INITIAL_DATA;
const CUSTOMER_DATA = CustomerInfoData.CUSTOMER_INITIAL_DATA;

Before(setup);

Data(DEPARTMENT_INFO).TestCase('InitialData1. マスタ:部門作成', async (current: any) => {
    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「部門」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddDepartmentPage();

    gondola.report(`Step 2.「部門コード」と「部門名」で有効な情報を入力する。`);
    gondola.report(`Step 3. 他の項目（「備考」）で有効な情報を入力する。`);
    await addDepartmentPage.enterDepartmentInformation(current);
    gondola.report(`Step 4.「保存」ボタンをクリックする。`);
    //BUG: currently department is also required, so we can't create new department, lead to testcase failed
    await addDepartmentPage.saveDepartment();
    gondola.report(
        `VP. 正常に保存でき、部門一覧画面には登録した部門が表示され、登録された部門の内容は正しく保存されること。`,
    );
    await addDepartmentPage.clickReturnButton();
    await listDepartmentPage.enterTextFieldByLabel(Constants.translator.fieldName.departmentList.code, current.code);
    await listDepartmentPage.clickSearchButton();
    await listDepartmentPage.openDepartmentByCode(current.code);
    gondola.checkTrue(await addDepartmentPage.doesDepartmentDisplayCorrectly(current));
});

Data(SEGMENT_INFO).TestCase('InitialData2. マスタ:セグメント作成', async (current: any) => {
    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「セグメント」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddSegmentPage();

    gondola.report(`Step 2.「セグメントコード」、「セグメント名」で有効な情報を入力する。`);
    gondola.report(`Step 3. 他の項目（「親セグメント」）で有効な情報を入力する。`);
    await addSegmentPage.enterSegmentInformation(current);
    gondola.report(`Step 4.「保存」ボタンをクリックする。`);
    //BUG: currently department is also required, so we can't create new segment, lead to testcase failed
    await addSegmentPage.saveSegment();
    gondola.report(
        `VP. 正常に保存でき、セグメント一覧画面には登録した部門が表示され、登録されたセグメントの内容は正しく保存されること。`,
    );
    await addSegmentPage.clickReturnButton();
    await listSegmentPage.enterTextFieldByLabel(Constants.translator.fieldName.segmentList.code, current.code);
    await listSegmentPage.clickSearchButton();
    await listSegmentPage.openSegmentByCode(current.code);
    gondola.checkTrue(await addSegmentPage.doesSegmentDisplayCorrectly(current));
});

Data(ITEM_INFO).TestCase('InitialData3. BMS:マスタ:品目作成', async (current: any) => {
    gondola.report(
        `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「品目」の「登録」をクリックします。`,
    );
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddItemPage();

    gondola.report(`Step 2. 必須項目で情報を入力する`);
    gondola.report(`Step 3. 他の項目で情報を入力する`);
    await addItemPage.inputItemInformation(current);
    gondola.report(`Step 3. 保存する `);
    await addItemPage.saveNewItem();
    gondola.report(
        `VP. 正常に保存でき、品目一覧画面には登録した部門が表示され、登録された品目の内容は正しく保存されること。`,
    );
    await businessSystemPage.gotoListItem();
    await listItemPage.searchItem({ itemCode: current.itemCode });
    gondola.checkControlExist(listItemPage.getItemLink(current.itemCode));

    gondola.report('Verify content of new project are displayed correctly');

    await gondola.click(listItemPage.getItemLink(current.itemCode));
    await gondola.checkEqual(
        await addItemPage.doesContentOfItemDisplayCorrect(current),
        true,
        'One of content of item displays incorrectly.',
    );
});

Data(WORKER_INFO).TestCase('InitialData4. BMS:案件:従業員マスタ作成', async (current: any) => {
    gondola.report(`Step 1.新規従業員登録の画面に移動する`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();

    gondola.report(`Step 2.必須項目で情報を入力する`);
    gondola.report(`Step 3.他の項目で情報を入力する`);
    await addWorkerPage.inputWorkerInformation(current);

    gondola.report(`Step 4.保存する`);
    await addWorkerPage.saveNewWorker();
    gondola.report(
        `VP. 正常に保存でき、従業員一覧画面には登録した従業員が表示され、登録された従業員の内容は正しく保存されること。`,
    );
    await addWorkerPage.clickReturnButton();
    await listWorkerPage.searchWorker(current.workerCode);
    await gondola.checkControlExist(listWorkerPage.getWorkerLink(current.workerCode));

    gondola.report('Verify content of new project are displayed correctly');

    await gondola.click(listWorkerPage.getWorkerLink(current.workerCode));
    await gondola.checkEqual(
        await addWorkerPage.doesContentOfWorkerDisplayCorrect(current),
        true,
        'One of content of worker displays incorrectly.',
    );
});

Data(CUSTOMER_DATA).TestCase(
    'InitialData5. 案件:得意先マスタ作成:顧客情報:保存顧客:全ての項目',
    async (current: any) => {
        gondola.report(
            `Step 1. 水平メニューで「営業管理」をクリックして、垂直メニューで「マスタ」→「顧客」の「登録」をクリックします。`,
        );
        await loginPage.gotoBusinessSystem();
        await businessSystemPage.gotoAddCustomerPage();

        gondola.report(`Step 2. 「区分」で「顧客」を選択する。`);
        await addCustomerPage.selectSelectorByLabel(
            Constants.translator.fieldName.addCustomer.classify,
            Constants.translator.dropdownOptions.customer.classify.client,
        );
        gondola.report(`VP. 「顧客単価」と「割増」入力セッションが表示されること。`);
        gondola.checkTrue(
            await addCustomerPage.doesSectionDisplay(
                Constants.translator.sectionName.addCustomer.customerMagnifications,
            ),
        );
        gondola.checkTrue(
            await addCustomerPage.doesSectionDisplay(Constants.translator.sectionName.addCustomer.customerUnitPrices),
        );

        gondola.report(
            `Step 3. 「顧客情報」入力セッションで「取引先コード」、「取引先名」、「振込手数料負担」、「端数処理」、「取引通貨」、「締め日」、「税計算単位」、「個別請求口座番号」の有効な情報を入力する。`,
        );
        gondola.report(`Step 4. 「顧客情報」入力セッションの他の項目で有効な情報を入力する。`);
        gondola.report(`Step 5. 顧客単価行を二つ追加し、顧客単価行で有効な情報を入力する。`);
        gondola.report(`Step 6. 割増行を二つ追加し、割増行で有効な情報を入力する。`);
        await addCustomerPage.inputCustomerInfo(current);
        gondola.report(`Step 7. 「保存」ボタンをクリックする。`);
        await addCustomerPage.saveCustomer();
        await addCustomerPage.clickReturnButton();
        await listCustomerPage.enterTextFieldByLabel(
            Constants.translator.fieldName.customerList.customerCode,
            current.overview.code,
        );
        await listCustomerPage.clickSearchButton();
        // Currently there's a bug with start date that doesn't allow us to enter a valid date,
        // therefore we can't save customer and failed the test
        await listCustomerPage.openCustomerByCode(current.overview.code);
        gondola.report(
            `VP. 正常に保存でき、得意先一覧画面には登録した得意先が表示され、登録された得意先の内容は正しく保存されること。`,
        );
        await gondola.checkTrue(
            await addCustomerPage.doesCustomerDisplayCorrectly(current),
            'Customer should be created correctly',
        );
    },
);
