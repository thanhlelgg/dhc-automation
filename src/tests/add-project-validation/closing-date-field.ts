import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './setup-and-teardown';

TestModule('Add Project - Project Currency field validation');

const CLOSING_DATE_FIELD_NAME = Constants.translator.fieldName.closingDate;

Before(setup);

TestCase('BMS-44. 案件:案件作成:締日:選択肢', async () => {
    gondola.report(`Step 2.「締日」プルダウンで選択肢を確認する。`);
    const currencyIdOptions = Object.values(Constants.closingDates);
    gondola.report(
        `VP.「締日」は必須項目であり、「締日」プルダウンには選択肢が31つあり、1～30および「末」を含んでいること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(CLOSING_DATE_FIELD_NAME, currencyIdOptions),
        true,
        'Closing date options should be displayed correctly',
    );
});
