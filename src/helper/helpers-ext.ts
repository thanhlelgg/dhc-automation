import { action } from "gondolajs/built/deco";
import { ProtractorBrowser } from "protractor";
import * as dotenv from "dotenv";

// this helper always run before executing testcase, we will preload environment variable in here
// if we need to use environment variable before this, we should find another place for it
dotenv.config();
declare var browser: ProtractorBrowser;

class HelperExt extends Helper {
    @action("does popup exist", "test if a popup exist")
    public async controlPopupAndEnterText(control: any, text: string) {
        try { 
            await this.helpers["GondolaHelper"].enter(control, text);
        } catch (e) {
            let popupText = await this.helpers["GondolaHelper"].getPopupText();
            if (popupText != null){
                await this.helpers["GondolaHelper"].clickPopup("ok");
                await this.helpers["GondolaHelper"].enter(control, text);
            }
        }
    }

    public async getCurrentBrowser() : Promise<ProtractorBrowser> {
        return await browser;
    }

}
module.exports = HelperExt;