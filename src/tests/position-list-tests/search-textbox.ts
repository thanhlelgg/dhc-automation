import { gondola, TestCase, TestModule } from 'gondolajs';
import { Constants } from '../../common/constants';
import setup from './positions-setup';
import { Utilities } from '../../common/utilities';
import positionsPage from '../../pages/list-position-page';

TestModule('Positions - Search text box validation');

const SEARCH_TEXT_BOX_PLACEHOLDER_NAME = Constants.translator.fieldPlaceHolder.positions.searchTextBox;
const POSITION_NAME_HEADER_NAME = Constants.translator.tableColumnName.positionsList.positionName;
const POSITION_ABBREVIATION_HEADER_NAME = Constants.translator.tableColumnName.positionsList.positionAbbreviation;
Before(setup);

TestCase('TMS-132. マスタ:セグメント作成:セグメント名:文字数', async () => {
    gondola.report(`Step 2.「検索」テキストボックスで「。。。」文字を入力する。`);
    // TODO: this is just dummy data, replace to expected data when requirement is defined.
    const maximumNOC = 10;
    const randomInput = Utilities.getRandomText(maximumNOC);
    await positionsPage.enterTextfieldByPlaceholder(SEARCH_TEXT_BOX_PLACEHOLDER_NAME, randomInput);
    gondola.report(`VP. 「。。。」文字まで入力できること。`);
    await gondola.checkEqual(
        await positionsPage.getTextfieldValueByPlaceholder(SEARCH_TEXT_BOX_PLACEHOLDER_NAME),
        randomInput,
        'All characters should be entered',
    );
    gondola.report(`Step 3.「検索」テキストボックスで「。。。＋１」文字を入力する。`);
    await positionsPage.enterTextfieldByPlaceholder(SEARCH_TEXT_BOX_PLACEHOLDER_NAME, randomInput + 'a');
    gondola.report(`VP. 「。。。」文字まで入力できること。`);
    await gondola.checkEqual(
        await positionsPage.getTextfieldValueByPlaceholder(SEARCH_TEXT_BOX_PLACEHOLDER_NAME),
        randomInput,
        'Exceed characters should be stripped',
    );
});

TestCase('TMS-133. マスタ:役職一覧:検索:役職名で検索', async () => {
    gondola.report(`Step 2.「検索」テキストボックスで既存の役職名の部分を入力し、「拡大鏡アイコン」をクリックする。`);
    const randomPositionName = await positionsPage.getRandomCellOfPositionTableByHeaderName(POSITION_NAME_HEADER_NAME);
    await positionsPage.enterTextfieldByPlaceholder(SEARCH_TEXT_BOX_PLACEHOLDER_NAME, randomPositionName);
    await positionsPage.clickSearchButton();
    gondola.report(`VP. 入力した役職名と部分一致する検索結果一覧が表示されること。`);
    await gondola.checkTrue(
        await positionsPage.doesSearchResultDisplayCorrectly(randomPositionName),
        'Search result should be displayed correctly',
    );
});

TestCase('TMS-134. マスタ:役職一覧:検索:省略名で検索', async () => {
    gondola.report(`Step 2.「検索」テキストボックスで既存の省略名の部分を入力し、「拡大鏡アイコン」をクリックする。`);
    const randomPositionName = await positionsPage.getRandomCellOfPositionTableByHeaderName(
        POSITION_ABBREVIATION_HEADER_NAME,
    );
    await positionsPage.enterTextfieldByPlaceholder(SEARCH_TEXT_BOX_PLACEHOLDER_NAME, randomPositionName);
    await positionsPage.clickSearchButton();
    gondola.report(`VP. 入力した省略名と部分一致する検索結果一覧が表示されること。`);
    //BUG: search by abbreviation is not working correctly
    await gondola.checkTrue(
        await positionsPage.doesSearchResultDisplayCorrectly(randomPositionName),
        'Search result should be displayed correctly',
    );
});
