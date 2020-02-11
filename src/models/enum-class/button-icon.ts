export class ButtonIcon {
    static readonly ADD = new ButtonIcon('Add', 'fa-plus');
    static readonly CHECK = new ButtonIcon('Check', 'fa-check');
    static readonly SAVE = new ButtonIcon('Save', 'fa-save');
    static readonly BACK = new ButtonIcon('Back', 'fa-chevron-left');
    static readonly DOUBLE_LEFT = new ButtonIcon('Double left', 'fa-angle-double-left');
    static readonly UPLOAD = new ButtonIcon('Import', 'fa-upload');
    static readonly DOWNLOAD = new ButtonIcon('Download', 'fa-download');
    static readonly SEARCH = new ButtonIcon('Search', 'fa-search');
    static readonly DELETE = new ButtonIcon('Delete', 'fa-trash-o');
    static readonly EDIT = new ButtonIcon('Search', 'fa-edit');
    static readonly VIEW = new ButtonIcon('Delete', 'fa-eye');
    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly _class: string) {}

    toString(): string {
        return this.name;
    }
}
