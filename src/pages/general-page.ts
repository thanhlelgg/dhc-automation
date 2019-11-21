import { action, gondola, locator, page } from "gondolajs";
import { constants } from "../common/constants";
import { translate } from "../locales/translate"
import { ProtractorBrowser } from "protractor";
import { utilities } from "../common/utilities";

@page
export class generalPage {
    protected translator = translate.getTranslator();
    @locator
    protected pageTitle = {css: ".page-title"};
    @locator
    protected captionSubject = {css: ".page-title-text"};
    @locator
    protected homeLink = "//a[.='ホーム']";
    @locator
    protected businessSystemLink = "//a[.='営業管理']";
    @locator
    protected taskSystemLink = "//a[.='業務管理']";
    @locator
    protected invalidFeedBackByFieldLabel = "//div[label[text()='{0}']]//div[@class='invalid-feedback']"
    @locator
    protected textFieldByLabel = "//div[label[text()='{0}']]//input[@type='text']"

    @action("gotoHome")
    public async gotoHome(){
        await this.waitControlExist(this.homeLink, 10);
        await gondola.click(this.homeLink);
    }

    @action("gotoBusinessSystem")
    public async gotoBusinessSystem(){
        await this.waitControlExist(this.businessSystemLink, 10);
        await gondola.click(this.businessSystemLink);
    }

    @action("gotoTaskSystem")
    public async gotoTaskSystem(){
        await this.waitControlExist(this.taskSystemLink, 10);
        await gondola.click(this.taskSystemLink);
    }

    @action("openWebsite")
    public async openWebsite(){
        await gondola.navigate(constants.url);
        await gondola.maximize();
    }

    @action("enterText")
    public async enterText(inputControl: any, text: string){
        /* await gondola.enter(inputControl, text);
        let popupExist = await (gondola as any).doesPopupExist();
        if (popupExist){
            await gondola.clickPopup("ok");
            await gondola.enter(inputControl, text);
        }    */   
        await (gondola as any).controlPopupAndEnterText(inputControl, text);
    }

    @action("waitControlExist")
    public async waitControlExist(control: any, seconds: number){
        let controlExist = await gondola.doesControlExist(control);
        let timeCount = 0;
        while (!controlExist && timeCount < seconds){
            await gondola.wait(1);
            timeCount++;
            controlExist = await gondola.doesControlExist(control);
        }
    }

    @action("getCurrentBrowser")
    public async getCurrentBrowser(): Promise<ProtractorBrowser> {
        return await (gondola as any).getCurrentBrowser();
    }

    @action("getInvalidFeedBack")
    public async getInvalidFeedBack(fieldName: string): Promise<string> {
        let locator = utilities.formatString(this.invalidFeedBackByFieldLabel, fieldName);
        return await gondola.getText(locator);
    }

    @action("enterTextFieldByLabel")
    public async enterTextFieldByLabel(label: string, text: string): Promise<void> {
        let locator = utilities.formatString(this.textFieldByLabel, label);
        await gondola.enter(locator, text);
    }
    
}
export default new generalPage();
