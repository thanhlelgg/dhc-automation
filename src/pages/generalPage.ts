import { action, gondola, locator, page } from "gondolajs";
import { constants } from "../common/constants";

@page
export class generalPage {
    @locator
    protected pageTitle = {css: ".page-title"};
    @locator
    protected captionSubject = {css: ".page-title-text"};
    @locator
    protected homeLink = {xpath: "//a[.='ホーム']"};
    @locator
    protected businessSystemLink = {xpath: "//a[.='営業管理']"};
    @locator
    protected taskSystemLink = {xpath: "//a[.='業務管理']"};

    @action("gotoHome")
    public async gotoHome(){
        await this.waitControlExist(this.homeLink, 10);
        await gondola.click(this.homeLink);
        await gondola.wait(2);
    }

    @action("gotoBusinessSystem")
    public async gotoBusinessSystem(){
        await this.waitControlExist(this.businessSystemLink, 10);
        await gondola.click(this.businessSystemLink);
        await gondola.wait(2);
    }

    @action("gotoTaskSystem")
    public async gotoTaskSystem(){
        await this.waitControlExist(this.taskSystemLink, 10);
        await gondola.click(this.taskSystemLink);
        await gondola.wait(2);
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

}
export default new generalPage();
