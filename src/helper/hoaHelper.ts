import { action } from "gondolajs/built/deco";

class HoaHelper extends Helper {
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
}
module.exports = HoaHelper;