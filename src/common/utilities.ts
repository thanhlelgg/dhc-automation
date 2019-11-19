export class utilities {
    public static formatString(str: string, ...val: string[]) {
        for (let index = 0; index < val.length; index++) {
          str = str.replace(`{${index}}`, val[index]);
        }
        return str;
    }

    public static mapJsonToClass(mapper: any, json: any): any {
      let adaptedObj: any = {};
      const fields: Array<string> = Object.keys(mapper);
      for (let field of fields) {
        const targetField: any = mapper[field];
        adaptedObj[targetField] = json[field];
      }
      return adaptedObj;
    }
}
export default new utilities();