interface String {
    format(...args: string[]): string;
}

String.prototype.format = function(...args: string[]): string {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const s = this;
    return s.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};
