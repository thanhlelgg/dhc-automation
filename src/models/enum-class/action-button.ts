export class ActionButton {
    static readonly VIEW = new ActionButton('View', '閲覧');
    static readonly EDIT = new ActionButton('Edit', '編集');
    static readonly DELETE = new ActionButton('Delete', '削除');

    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly title: string) {}

    toString(): string {
        return this.name;
    }
}
