import { gondola } from 'gondolajs';
import loginPage from '../../pages/login-page';
import { Constants } from '../../common/constants';
import businessSystemPage from '../../pages/business-system-page';
import { CustomerInfoData } from '../../models/customer-info';
import { Utilities } from '../../common/utilities';
import addCustomerPage from '../../pages/add-customer-page';
import { ButtonIcon } from '../../models/enum-class/button-icon';

export default async function setup(): Promise<void> {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.USER_NAME, Constants.PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoAddCustomerPage();
    const requiredInfo = CustomerInfoData.CUSTOMER_ALL_DATA;
    requiredInfo.overview.code = Utilities.getRandomText(4);
    requiredInfo.overview.name = Utilities.getRandomText(4);
    await addCustomerPage.inputCustomerInfo(requiredInfo);
    await addCustomerPage.clickButtonByIcon(ButtonIcon.SAVE);
}
