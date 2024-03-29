import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import searchModalWindows from '../../pages/search-modal-windows';
import { Constants } from '../../common/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import setup from './add-project-setup';

TestModule('Add Project - Labs field validation');

const SEARCH_LABS_MODULE_TITLE = Constants.translator.modalWindows.searchLabsTitle;
const PROJECT_PLACE_FIELD_NAME = Constants.translator.fieldName.addProject.place;
const LAB_NAME_FIELD_NAME = Constants.translator.fieldName.addProject.labName;

Before(setup);

TestCase('BMS-42. 案件:案件作成:場所:選択肢', async () => {
    gondola.report(`Step 2.「場所」プルダウンで選択肢を確認する。`);
    const placeOptions = Object.values(Constants.PROJECT_PLACE);
    gondola.report(
        `VP.「場所」は必須項目であり、「場所」プルダウンには選択肢が三つあり、「社内」、「出向」、「派遣」を含んでいること。`,
    );
    await gondola.checkTrue(
        await addProjectPage.doesFieldRequired(PROJECT_PLACE_FIELD_NAME),
        'Project place field should be required',
    );
    await gondola.checkTrue(
        await addProjectPage.doesSelectorByLabelOptionsExist(PROJECT_PLACE_FIELD_NAME, placeOptions),
        'Project place options should be displayed correctly',
    );

    gondola.report(
        `Step 3.「場所」プルダウンで「社内」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.PROJECT_PLACE.house);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    gondola.report(`VP. お客様先が表示されなくて、社内のラボのみが表示されること。`);
    await gondola.checkTrue(await addProjectPage.doesLabsDisplayCorrect(true), 'Labs should be displayed correctly');
    await addProjectPage.clickOutsideOfWindowModal(SEARCH_LABS_MODULE_TITLE);

    gondola.report(
        `Step 4.「場所」プルダウンで「出向」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.PROJECT_PLACE.secondment);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    await searchModalWindows.waitForTableUpdated();
    gondola.report(`VP. お客様先が表示されること。`);
    await gondola.checkTrue(await addProjectPage.doesLabsDisplayCorrect(false), 'Labs should be displayed correctly');
    await addProjectPage.clickOutsideOfWindowModal(SEARCH_LABS_MODULE_TITLE);

    gondola.report(
        `Step 5.「場所」プルダウンで「派遣」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.PROJECT_PLACE.dispatch);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    await searchModalWindows.waitForTableUpdated();
    gondola.report(`VP. お客様先が表示されること。`);
    await gondola.checkTrue(await addProjectPage.doesLabsDisplayCorrect(false), 'Labs should be displayed correctly');
});
