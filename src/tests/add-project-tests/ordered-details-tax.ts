import { gondola, TestCase, TestModule } from 'gondolajs';
import setup from './ordered-details-setup';
import projectDetailsPage from '../../pages/project-details-page';
import { Constants } from '../../common/constants';

TestModule('Add Project - Ordered details - Credit credit group field validation');
const columnName = Constants.translator.tableColumnName.addProject.orderedDetails;

Before(setup);

TestCase('BMS-298. BMS:案件:案件編集:非稼働明細:課税欄と税率の連動', async () => {
    gondola.report(`Step 7. 「追加」ボタンをクリック`);
    await projectDetailsPage.clickAddOrderedDetailsRowButton();
    gondola.report(`VP. 入力行が追加されること`);
    await gondola.checkTrue(
        await projectDetailsPage.doesOrderedDetailsInputLineDisplay(),
        'Input line should be displayed',
    );

    gondola.report(`Step 8. 非稼働明細行の「課税」でチェックを入れる。`);
    await projectDetailsPage.setStateOrderedDetailsCheckbox(columnName.taxable, true);

    gondola.report(
        `VP.「税率」プルダウンが有効になり、選択できること。初期値として一番上の選択肢が選択されていること。`,
    );
    await gondola.checkTrue(
        await projectDetailsPage.isOrderedDetailsDropdownEnabled(columnName.taxRate),
        'Tax rate dropdown should be enabled',
    );
    await gondola.checkTrue(
        await projectDetailsPage.isOrderedDetailsDropdownFirstOptionSelected(columnName.taxRate),
        'Tax rate dropdown first option should be selected',
    );

    gondola.report(`Step 9. 非稼働明細行の「課税」でチェックを外す`);
    await projectDetailsPage.setStateOrderedDetailsCheckbox(columnName.taxable, false);

    gondola.report(`VP.「税率」プルダウンが無効になり、選択できないこと。`);
    //BUG: dropdown is not disabled
    await gondola.checkFalse(
        await projectDetailsPage.isOrderedDetailsDropdownEnabled(columnName.taxRate),
        'Tax rate dropdown should not be enabled',
    );
});
