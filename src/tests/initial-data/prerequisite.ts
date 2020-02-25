import { gondola, TestModule, TestCase } from 'gondolajs';
import loginPage from '../../pages/login-page';
import businessSystemPage from '../../pages/business-system-page';
import { DatabaseHelper } from '../../helper/database-helpers';
import { Constants } from '../../common/constants';
import listRolePage from '../../pages/list-bms-role';
import addUserPage from '../../pages/add-user-page';
import { UserInfoData } from '../../models/user-info';

TestModule('Create Admin account');

TestCase('Prerequisite 1. Create Admin role and account', async () => {
    gondola.report(`Precondition 1. 有効なユーザー名とパスワードでdh-connectシステムに正常にログインすること`);
    await loginPage.openWebsite();
    await loginPage.login(Constants.DEFAULT_ADMIN_USERNAME, Constants.DEFAULT_ADMIN_PASSWORD);
    await loginPage.chooseLanguage(process.env.LANGUAGE);

    gondola.report(`Step 1. Go to Roles page`);
    await loginPage.gotoBusinessSystem();
    await businessSystemPage.gotoListRolePage();

    gondola.report(`Step 2. Create new Roles if not exist`);
    await listRolePage.createRoleIfNotExist(Constants.ADMIN_ROLE_NAME);

    gondola.report(`VP. Check Admin role exists`);
    gondola.checkTrue(await listRolePage.doesRoleExist(Constants.ADMIN_ROLE_NAME));

    const adminUserData = UserInfoData.ADMIN_USER_INFO;
    if (await DatabaseHelper.doesUserNameExist(adminUserData.personalInfo.loginInfo.loginId)) return;

    gondola.report(`Step 1. Go Add User page`);
    await addUserPage.openPage();
    await addUserPage.gotoPageByMenuButton(Constants.translator.verticalMenuTMS.userManagement.addUser);

    gondola.report(`Step 2. Input Personal info`);
    await addUserPage.inputPersonalInfo(adminUserData.personalInfo);
    gondola.report(`Step 3. Input Role info`);
    if (adminUserData.roleInfo) {
        await addUserPage.inputRoleInfo(adminUserData.roleInfo);
    }
    gondola.report(`Step 4. Save User`);
    await addUserPage.saveUser();

    gondola.report(`VP. 正常に保存でき`);
    gondola.checkTrue(await DatabaseHelper.doesUserNameExist(adminUserData.personalInfo.loginInfo.loginId));
});
