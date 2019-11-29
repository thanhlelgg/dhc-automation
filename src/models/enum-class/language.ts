export class Language {
    static readonly EN = new Language('EN', 'ja_JP');
    static readonly JA = new Language('JA', 'en_US');
    static readonly VI = new Language('VI', 'vi_VN');
    static readonly ALLS = [Language.EN, Language.JA, Language.VI];
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly href: string) {}

    toString(): string {
        return this.name;
    }

    static getLanguage(lang: string): Language {
        for (const language of Language.ALLS) {
            if (language.name === lang) {
                return language;
            }
        }
        throw new Error(`Language ${lang} is not available`);
    }
}
