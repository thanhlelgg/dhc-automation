import { gondola, Data, TestModule } from 'gondolajs';
import setup from './precondition-setup';
import loginPage from '../../pages/login-page';
import { DatabaseHelper } from '../../helper/database-helpers';
import taskSystemMenu from '../../pages/task-system-menu';
import { SpecialAllowanceInfoData, SpecialAllowanceInfo } from '../../models/special-allowance-info';
import addSpecialAllowancePage from '../../pages/add-special-allowance';
import { ButtonIcon } from '../../models/enum-class/button-icon';
import listSpecialAllowancePage from '../../pages/list-special-allowance-page';
import { PositionInfoData, PositionInfo } from '../../models/tts-position-info';
import listPositionPage from '../../pages/list-tts-position-page';
import addPositionPage from '../../pages/add-tts-position-page';

TestModule('Add initial data for TTS');

const SPECIAL_ALLOWANCE_INFO = SpecialAllowanceInfoData.SPECIAL_ALLOWANCE_INITIAL_DATA;
const POSITION_INFO = PositionInfoData.POSITION_INITIAL_DATA;

Before(setup);

Data(SPECIAL_ALLOWANCE_INFO).TestCase(
    'TTS - InitialData 1. Create new Special Allowance',
    async (current: SpecialAllowanceInfo) => {
        if (await DatabaseHelper.doesSpecialAllowanceExist(current.name)) return;
        gondola.report(`Step 1. Go to Add special Allowance page`);
        await loginPage.gotoTaskSystem();
        await taskSystemMenu.gotoListSpecialAllowancePage();
        await listSpecialAllowancePage.clickButtonByIcon(ButtonIcon.ADD);

        gondola.report(`Step 2. Create new Special Allowance`);

        await addSpecialAllowancePage.enterSpecialAllowanceInformation(current);
        await addSpecialAllowancePage.clickButtonByIcon(ButtonIcon.SAVE);

        gondola.report(`VP. Check new Special Allowance is created`);
        gondola.checkTrue(await DatabaseHelper.doesSpecialAllowanceExist(current.name));
    },
);

Data(POSITION_INFO).TestCase('TTS - InitialData 2. Create new Position', async (current: PositionInfo) => {
    if (await DatabaseHelper.doesTTSPositionExist(current.name)) return;
    gondola.report(`Step 1. Go to Add special Allowance page`);
    await loginPage.gotoTaskSystem();
    await taskSystemMenu.gotoListPositionPage();
    await listPositionPage.clickButtonByIcon(ButtonIcon.ADD);

    gondola.report(`Step 2. Create new Special Allowance`);

    await addPositionPage.enterPositionInformation(current);
    await addPositionPage.clickButtonByIcon(ButtonIcon.SAVE);

    gondola.report(`VP. Check new Special Allowance is created`);
    gondola.checkTrue(await DatabaseHelper.doesTTSPositionExist(current.name));
});
