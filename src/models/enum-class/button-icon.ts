export class ButtonIcon {
    static readonly ADD = new ButtonIcon('Add', 'fa fa-plus');
    static readonly CHECK = new ButtonIcon('Check', 'fa fa-check');
    static readonly BACK = new ButtonIcon('Back', 'fa fa-angle-double-left');
    static readonly UPLOAD = new ButtonIcon('Import', 'fa fa-upload');
    static readonly DOWNLOAD = new ButtonIcon('Download', 'fa fa-download');

    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly _class: string) {}

    toString(): string {
        return this.name;
    }
}
