import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import setup from './setup-and-teardown';

TestModule('Add Project - Labs field validation');

const PROJECT_PLACE_FIELD_NAME = Constants.translator.fieldName.place;
const LAB_NAME_FIELD_NAME = Constants.translator.fieldName.labName;

Before(setup);

TestCase('BMS-42. 案件:案件作成:場所:選択肢', async () => {
    gondola.report(`Step 2.「場所」プルダウンで選択肢を確認する。`);
    const placeOptions = Object.values(Constants.projectPlace);
    gondola.report(
        `VP.「場所」は必須項目であり、「場所」プルダウンには選択肢が三つあり、「社内」、「出向」、「派遣」を含んでいること。`,
    );
    await gondola.checkEqual(
        await addProjectPage.doesFieldRequired(PROJECT_PLACE_FIELD_NAME),
        true,
        'Project place field should be required',
    );
    await gondola.checkEqual(
        await addProjectPage.doesSelectorByLabelOptionsExist(PROJECT_PLACE_FIELD_NAME, placeOptions),
        true,
        'Project place options should be displayed correctly',
    );

    gondola.report(
        `Step 3.「場所」プルダウンで「社内」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.projectPlace.house);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    gondola.report(`VP. お客様先が表示されなくて、社内のラボのみが表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesLabsDisplayCorrect(true),
        true,
        'Labs should be displayed correctly',
    );
    await addProjectPage.clickOutsideOfWindowModal();

    gondola.report(
        `Step 4.「場所」プルダウンで「出向」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.projectPlace.secondment);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    await addProjectPage.waitForTableUpdated();
    gondola.report(`VP. お客様先が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesLabsDisplayCorrect(false),
        true,
        'Labs should be displayed correctly',
    );
    await addProjectPage.clickOutsideOfWindowModal();

    gondola.report(
        `Step 5.「場所」プルダウンで「派遣」を選択し、選択画面を起動するにはリソースの拠点欄で枠内をクリックし、選択画面で表示一覧を確認する。`,
    );
    await addProjectPage.selectSelectorByLabel(PROJECT_PLACE_FIELD_NAME, Constants.projectPlace.dispatch);
    await addProjectPage.clickTextFieldByLabel(LAB_NAME_FIELD_NAME);
    await addProjectPage.waitForTableUpdated();
    gondola.report(`VP. お客様先が表示されること。`);
    await gondola.checkEqual(
        await addProjectPage.doesLabsDisplayCorrect(false),
        true,
        'Labs should be displayed correctly',
    );
});
