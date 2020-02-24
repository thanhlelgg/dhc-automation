import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './positions-setup';
import listPositionPage from '../../pages/list-position-page';
import addPositionPage from '../../pages/add-position-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';
// import { Constants } from '../../common/constants';

// const POSITION_NAME_HEADER_NAME = Constants.translator.tableColumnName.positionsList.positionName;
// const EDIT_PAGE_TITLE = Constants.translator.pageTitle.editTitle;

TestModule('Positions - Search text box validation');

Before(setup);

TestCase('TMS-135. マスタ:役職一覧:新規ボタン', async () => {
    gondola.report(`Step 2.「新規」ボタンをクリックする。`);
    await listPositionPage.clickAddButton();
    gondola.report(`VP. 役職の新規登録画面に遷移すること。`);
    await gondola.checkTrue(await addPositionPage.isCurrentPage(), 'Should be navigated to Add position page');
});

TestCase('TMS-136. マスタ:役職一覧:インポートボタン', async () => {
    gondola.report(`Step 2.「インポートボタン 」ボタンをクリックする。`);
    await listPositionPage.clickButtonByIcon(ButtonIcon.UPLOAD);
    gondola.report(`VP. 役職のインポート操作画面に遷移すること。`);
    await gondola.checkTrue(
        await listPositionPage.doesImportModalDisplay(),
        'Import modal windows should be displayed',
    );
});

//TODO: Currently obsolete, update when testcase is updated
// TestCase('TMS-141. マスタ:役職一覧:閲覧ボタン', async () => {
//     gondola.report(`Step 2. 任意の役職行で「閲覧」ボタン（目アイコン）をクリックする。`);
//     const randomPosition = await listPositionPage.getRandomCellOfPositionTableByHeaderName(POSITION_NAME_HEADER_NAME);
//     await listPositionPage.clickActionButton(ButtonIcon.VIEW, POSITION_NAME_HEADER_NAME, randomPosition);
//     gondola.report(`VP. 選択した役職の閲覧画面に遷移すること`);
//     await gondola.checkTrue(
//         await listPositionPage.isPageTitleDisplayed(randomPosition),
//         'Selected position should be displayed',
//     );
// });

//TODO: Currently obsolete, update when testcase is updated
// TestCase('TMS-142. マスタ:役職一覧:編集ボタン', async () => {
//     gondola.report(`Step 2. 任意の役職行で「編集」ボタン（鉛筆アイコン）をクリックする。`);
//     const randomPosition = await listPositionPage.getRandomCellOfPositionTableByHeaderName(POSITION_NAME_HEADER_NAME);
//     await listPositionPage.clickActionButton(ButtonIcon.EDIT, POSITION_NAME_HEADER_NAME, randomPosition);
//     gondola.report(`VP. 選択した役職の編集画面に遷移すること。`);
//     await gondola.checkTrue(
//         await listPositionPage.isPageTitleDisplayed(EDIT_PAGE_TITLE),
//         'Edit screen should be displayed',
//     );
//     await gondola.checkEqual(
//         await listPositionPage.getTextFieldValueByLabel(POSITION_NAME_HEADER_NAME, true),
//         randomPosition,
//         'Selected position should be displayed',
//     );
// });
