export class ButtonIcon {
    static readonly ADD = new ButtonIcon('Add', 'fa-plus');
    static readonly CHECK = new ButtonIcon('Check', 'fa-check');
    static readonly SAVE = new ButtonIcon('Save', 'fa-save');
    static readonly BACK = new ButtonIcon('Back', 'fa-chevron-left');
    static readonly UPLOAD = new ButtonIcon('Import', 'fa-upload');
    static readonly DOWNLOAD = new ButtonIcon('Download', 'fa-download');
    static readonly SEARCH = new ButtonIcon('Search', 'fa-search');
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly _class: string) {}

    toString(): string {
        return this.name;
    }
}
