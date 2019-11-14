import { action, gondola, locator, page } from "gondolajs";
import { generalPage } from "./generalPage";
@page
export class loginPage extends generalPage {
    @locator
    protected txtUsername = {id: "username"};
    @locator
    protected txtPassword = {id: "password"};
    @locator
    protected btnLogin = {css: ".btn"};
    @action("login")
    public async login(username: string, password: string) {
        await gondola.enter(this.txtUsername, username);
        await gondola.enter(this.txtPassword, password);
        await gondola.click(this.btnLogin);
    }
}
export default new loginPage();
