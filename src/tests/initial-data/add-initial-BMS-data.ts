import { gondola, Data, TestModule } from 'gondolajs';
import setup from './precondition-setup';
import addDepartmentPage from '../../pages/add-department-page';
import addSegmentPage from '../../pages/add-segment-page';
import { DepartmentInfoData, DepartmentInfo } from '../../models/department-info';
import { Constants } from '../../common/constants';
import { SegmentInfoData, SegmentInfo } from '../../models/segment-info';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import addItemPage from '../../pages/add-item-page';
import { ItemInfoData, ItemInfo } from '../../models/item-info';
import addWorkerPage from '../../pages/add-worker-page';
import { WorkerInfoData, WorkerInfo } from '../../models/worker-info';
import addCustomerPage from '../../pages/add-customer-page';
import { CustomerInfoData, CustomerInfo } from '../../models/customer-info';
import { TaxInfoData, TaxInfo } from '../../models/tax-info';
import addTaxPage from '../../pages/add-tax-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import { DatabaseHelper } from '../../helper/database-helpers';

TestModule('Add initial data for BMS');

const DEPARTMENT_INFO = DepartmentInfoData.DEPARTMENT_INITIAL_DATA;
const SEGMENT_INFO = SegmentInfoData.SEGMENT_INITIAL_DATA;
const ITEM_INFO = ItemInfoData.ITEM_INITIAL_DATA;
const WORKER_INFO = WorkerInfoData.WORKER_INITIAL_DATA;
const CUSTOMER_DATA = CustomerInfoData.CUSTOMER_INITIAL_DATA;
const TAX_INFO = TaxInfoData.TAX_INITIAL_DATA;

Before(setup);

Data(DEPARTMENT_INFO).TestCase('BMS - InitialData 1. Create new Department', async (current: DepartmentInfo) => {
    if (await DatabaseHelper.doesDepartmentExist(current.code)) return;
    gondola.report(`Step 1. Go to Add department page`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddDepartmentPage();

    gondola.report(`Step 2. Create new Department`);
    await addDepartmentPage.enterDepartmentInformation(current);
    await addDepartmentPage.saveDepartment();

    gondola.report(`VP. Check new Department is created`);
    gondola.checkTrue(await DatabaseHelper.doesDepartmentExist(current.code));
});

Data(SEGMENT_INFO).TestCase('BMS - InitialData 2. Create new Segment', async (current: SegmentInfo) => {
    if (await DatabaseHelper.doesSegmentExist(current.code)) return;

    gondola.report(`Step 1. Go to add new Segment page`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddSegmentPage();

    gondola.report(`Step 2. Create new Segment`);
    await addSegmentPage.enterSegmentInformation(current);
    await addSegmentPage.saveSegment();

    gondola.report(`VP. Check new Segment is created`);
    gondola.checkTrue(await DatabaseHelper.doesSegmentExist(current.code));
});

Data(ITEM_INFO).TestCase('BMS - InitialData 3. Create new Item', async (current: ItemInfo) => {
    if (await DatabaseHelper.doesItemExist(current.itemCode)) return;

    gondola.report(`Step 1. Go to add Item page`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddItemPage();

    gondola.report(`Step 2. Create new Item`);
    await addItemPage.inputItemInformation(current);
    await addItemPage.saveNewItem();

    gondola.report(`VP. Check item is created`);
    await gondola.checkTrue(await DatabaseHelper.doesItemExist(current.itemCode));
});

Data(WORKER_INFO).TestCase('BMS - InitialData 4. Add new worker', async (current: WorkerInfo) => {
    if (await DatabaseHelper.doesWorkerExist(current.workerCode)) return;

    gondola.report(`Step 1. Go to create worker page`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddWorkerPage();

    gondola.report(`Step 2. Create new worker`);
    await addWorkerPage.inputWorkerInformation(current);
    await addWorkerPage.saveNewWorker();

    gondola.report(`VP. Check if worker is created`);
    await gondola.checkTrue(await DatabaseHelper.doesWorkerExist(current.workerCode));
});

Data(CUSTOMER_DATA).TestCase('BMS - InitialData 5. Add Customer', async (current: CustomerInfo) => {
    if (await DatabaseHelper.doesBusinessCustomerExist(current.overview.code)) return;
    gondola.report(`Step 1. Go to Add customer page`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();

    gondola.report(`Step 2. Create new customer`);
    await addCustomerPage.selectSelectorByLabel(
        Constants.translator.fieldName.addCustomer.classify,
        Constants.translator.dropdownOptions.customer.classify.client,
    );
    await addCustomerPage.inputCustomerInfo(current);
    await addCustomerPage.saveCustomer();

    gondola.report(`VP. Check if customer is created`);
    await gondola.checkTrue(
        await DatabaseHelper.doesBusinessCustomerExist(current.overview.code),
        'Customer should be created correctly',
    );
});

Data(TAX_INFO).TestCase('BMS - InitialData 6. Add Taxes', async (current: TaxInfo) => {
    if (await DatabaseHelper.doesTaxNameExist(current.name)) return;

    gondola.report(`Step 1. Go to Add tax page`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddTaxPage();

    gondola.report(`Step 2. Create new tax`);
    await addTaxPage.enterTaxInformation(current);
    await addTaxPage.clickButtonByIcon(ButtonIcon.SAVE);

    gondola.report(`VP. New tax is created`);
    gondola.checkTrue(await DatabaseHelper.doesTaxNameExist(current.name));
});
