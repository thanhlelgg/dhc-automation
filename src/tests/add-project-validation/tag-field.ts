import { gondola, TestCase, TestModule } from 'gondolajs';
import addProjectPage from '../../pages/add-project-page';
import { Constants } from '../../common/constants';
import setup from './add-project-setup';
import { protractor } from 'protractor/built/ptor';

TestModule('Add Project - Project Tags field validation');

const TAG_FIELD_NAME = Constants.translator.fieldName.tag;
const TAG_1 = 'TAG_1';
const TAG_2 = 'TAG_2';
const TAG_3 = 'TAG_3';
const TAG_4 = 'TAG_4';
const TAG_5_UPPERCASE = 'TAG_5';
const MULTIPLE_TAGS = `${TAG_2},${TAG_3},${TAG_4},`;
const TAG_5_LOWERCASE = TAG_5_UPPERCASE.toLowerCase();
const TAG_FULL_WIDTH = 'ハハハ';
const TAG_HALF_WIDTH = 'ﾊﾊﾊ';

Before(setup);

TestCase('BMS-48. 案件:案件作成:タグ:タグ入力', async () => {
    gondola.report(`Step 2.「タグ」の枠内でテキストを入力し、Enterを押下する。`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_1 + '\n');
    gondola.report(`VP.直前まで入力していた文字列がタグとしてまとめられること。`);
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_1), true, 'Tag should be displayed');

    gondola.report(`Step 3. 「タグ」の枠内でテキストを入力し、半角カンマを入力する。`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, MULTIPLE_TAGS);
    gondola.report(`VP. タグは複数登録可能であり、直前まで入力していた文字列がタグとしてまとめられること。`);
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_2), true, 'Tag should be displayed');
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_3), true, 'Tag should be displayed');
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_4), true, 'Tag should be displayed');

    gondola.report(`Step 4.1. 大文字のタグを入力し、小文字のタグを入力し`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_5_UPPERCASE + '\n');
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_5_LOWERCASE + '\n');
    gondola.report(`VP. タグは複数登録可能であり`);
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_5_UPPERCASE), true, 'Tag should be displayed');
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_5_LOWERCASE), true, 'Tag should be displayed');

    gondola.report(`Step 4.2. もう一回入力したタグと同じ大文字のタグを入力する。`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_5_UPPERCASE + '\n');

    gondola.report(`VP. 直前まで入力していた文字列がタグとしてまとめられること。`);
    await gondola.checkEqual(await addProjectPage.doesTagUnique(TAG_5_UPPERCASE), true, 'Tag should be unique');

    gondola.report(`Step 5.1. 全角のタグを入力し、半角のタグを入力し`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_FULL_WIDTH + '\n');
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_HALF_WIDTH + '\n');
    gondola.report(`VP. 一つ目の全角のタグと半角のタグが入力でき`);
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_FULL_WIDTH), true, 'Tag should be displayed');
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_HALF_WIDTH), true, 'Tag should be displayed');

    gondola.report(`Step 5.2. もう一回入力したタグと同じ全角のタグを入力する。`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_FULL_WIDTH + '\n');

    gondola.report(`VP. 重複の二つ目の全角のタグはEnterした後、自動的に消えること。`);
    await gondola.checkEqual(await addProjectPage.doesTagUnique(TAG_FULL_WIDTH), true, 'Tag should be unique');
});

TestCase('BMS-49. 案件:案件作成:タグ:タグ削除', async () => {
    gondola.report(`Step 2. タグを登録し、タグでの「×」ボタンをクリックする。`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_1 + '\n');
    await addProjectPage.removeTagItem(TAG_1);
    gondola.report(`VP. 登録したタグが削除されこと。`);
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_1, false), false, 'Tag should not be displayed');

    gondola.report(`Step 3. タグを登録し、「BackSpace」キーを押下する。`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_1 + '\n');
    await (gondola as any).pressKey(protractor.Key.BACK_SPACE);
    gondola.report(`VP. 登録したタグが削除されこと。`);
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_1, false), false, 'Tag should not be displayed');

    gondola.report(`Step 4. タグを登録し、「Delete」キーを押下する。`);
    await addProjectPage.enterTextFieldByLabel(TAG_FIELD_NAME, TAG_1 + '\n');
    await (gondola as any).pressKey(protractor.Key.DELETE);
    gondola.report(`VP. 登録したタグが削除されこと。`);
    //BUG: delete key doesn't remove tag
    await gondola.checkEqual(await addProjectPage.doesTagDisplay(TAG_1, false), false, 'Tag should not be displayed');
});
