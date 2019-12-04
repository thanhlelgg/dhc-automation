export class DatabaseSchema {
    static readonly BUSINESS = new DatabaseSchema('BUSINESS', 'business');
    static readonly SSO = new DatabaseSchema('SSO', 'sso');
    static readonly TALENT = new DatabaseSchema('TALENT', 'talent');
    static readonly TTS = new DatabaseSchema('TTS', 'tts');
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly schema: string) {}

    toString(): string {
        return this.name;
    }
}
