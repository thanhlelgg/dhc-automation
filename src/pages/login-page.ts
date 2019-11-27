import { action, gondola, locator, page } from 'gondolajs';
import { GeneralPage } from './general-page';
@page
export class LoginPage extends GeneralPage {
    @locator
    protected txtUsername = { id: 'username' };
    @locator
    protected txtPassword = { id: 'password' };
    @locator
    protected btnLogin = { css: '.btn' };
    @action('login')
    public async login(username: string, password: string): Promise<void> {
        await gondola.enter(this.txtUsername, username);
        await gondola.enter(this.txtPassword, password);
        await gondola.click(this.btnLogin);
    }
}
export default new LoginPage();
