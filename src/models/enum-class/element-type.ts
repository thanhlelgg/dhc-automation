export class ElementType {
    static readonly TEXTFIELD = new ElementType('TEXTFIELD', 'input');
    static readonly TEXTAREA = new ElementType('TEXTAREA', 'textarea');
    static readonly SELECTOR = new ElementType('SELECTOR', 'select');

    // private to disallow creating other instances of this type
    private constructor(private readonly name: string, public readonly type: string) {}

    toString(): string {
        return this.name;
    }
}
