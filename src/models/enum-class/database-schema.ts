export class DatabaseSchema {
    static readonly BUSINESS = new DatabaseSchema('BUSINESS', 'dhc_bms');
    static readonly SSO = new DatabaseSchema('SSO', 'dhc_dms');
    static readonly TALENT = new DatabaseSchema('TALENT', 'dhc_tms');
    static readonly TTS = new DatabaseSchema('TTS', 'dhc_tts');
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly schema: string) {}

    toString(): string {
        return this.name;
    }
}
