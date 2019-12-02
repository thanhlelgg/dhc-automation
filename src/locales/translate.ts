import { I18nResolver } from 'i18n-ts';
import english from './en.json';
import japanese from './jp.json';

export class Translate {
    private static i18n = {
        EN: english,
        JA: japanese,
        default: japanese,
    };

    private static translator = new I18nResolver(Translate.i18n, process.env.LANGUAGE).translation;

    public static getTranslator() {
        return Translate.translator;
    }
}
