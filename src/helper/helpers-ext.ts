import { action } from "gondolajs/built/deco";
import { ProtractorBrowser, ElementFinder, ElementHelper } from "protractor";
import * as dotenv from "dotenv";
import * as protractor from "protractor";
import { gondola } from "gondolajs";

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

    public async getCurrentBrowser(): Promise<ProtractorBrowser> {
        return await browser;
    }

    public async getElement(control: any): Promise<protractor.WebElement> {
        if (typeof control === "string") {
            control = {xpath: control};
        }
        return await browser.findElement(control);
    }

    public async areOptionsExists(control: any, options: string[]): Promise<boolean> {
        let elements = await this.getOptions(control);
        for (let element of elements) {
            let optionText = await element.getText();
            if (!options.includes(optionText)) {
                console.log(`Option: ${optionText} does not exist`)
                return false;
            }
        }
        return true;
    }

    public async getOptions(control: any): Promise<protractor.WebElement[]> {
        return await (await this.getElement(control)).findElements({css: "option"});
    }

    public async doesControlDisplay(control: any): Promise<boolean> {
        return await (await this.getElement(control)).isDisplayed();
    }

}
module.exports = HelperExt;