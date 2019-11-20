import {I18nResolver} from "i18n-ts";
import english from "./en.json";
import japanese from "./jp.json";

export class translate {
    private static i18n = {
        en: english,
        jp: japanese,
        default: japanese
    };

    private static translator = new I18nResolver(translate.i18n, process.env.LANGUAGE).translation;

    public static getTranslator () {
        return translate.translator;
    }
}
