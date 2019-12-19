
// Ref: http://xahlee.info/comp/unicode_circled_numbers.html
const data_str = `24EA;CIRCLED DIGIT ZERO;No;0;ON;<circle> 0030;;0;0;N;;;;;
2460;CIRCLED DIGIT ONE;No;0;ON;<circle> 0031;;1;1;N;;;;;
2461;CIRCLED DIGIT TWO;No;0;ON;<circle> 0032;;2;2;N;;;;;
2462;CIRCLED DIGIT THREE;No;0;ON;<circle> 0033;;3;3;N;;;;;
2463;CIRCLED DIGIT FOUR;No;0;ON;<circle> 0034;;4;4;N;;;;;
2464;CIRCLED DIGIT FIVE;No;0;ON;<circle> 0035;;5;5;N;;;;;
2465;CIRCLED DIGIT SIX;No;0;ON;<circle> 0036;;6;6;N;;;;;
2466;CIRCLED DIGIT SEVEN;No;0;ON;<circle> 0037;;7;7;N;;;;;
2467;CIRCLED DIGIT EIGHT;No;0;ON;<circle> 0038;;8;8;N;;;;;
2468;CIRCLED DIGIT NINE;No;0;ON;<circle> 0039;;9;9;N;;;;;
2469;CIRCLED NUMBER TEN;No;0;ON;<circle> 0031 0030;;;10;N;;;;;
246A;CIRCLED NUMBER ELEVEN;No;0;ON;<circle> 0031 0031;;;11;N;;;;;
246B;CIRCLED NUMBER TWELVE;No;0;ON;<circle> 0031 0032;;;12;N;;;;;
246C;CIRCLED NUMBER THIRTEEN;No;0;ON;<circle> 0031 0033;;;13;N;;;;;
246D;CIRCLED NUMBER FOURTEEN;No;0;ON;<circle> 0031 0034;;;14;N;;;;;
246E;CIRCLED NUMBER FIFTEEN;No;0;ON;<circle> 0031 0035;;;15;N;;;;;
246F;CIRCLED NUMBER SIXTEEN;No;0;ON;<circle> 0031 0036;;;16;N;;;;;
2470;CIRCLED NUMBER SEVENTEEN;No;0;ON;<circle> 0031 0037;;;17;N;;;;;
2471;CIRCLED NUMBER EIGHTEEN;No;0;ON;<circle> 0031 0038;;;18;N;;;;;
2472;CIRCLED NUMBER NINETEEN;No;0;ON;<circle> 0031 0039;;;19;N;;;;;
2473;CIRCLED NUMBER TWENTY;No;0;ON;<circle> 0032 0030;;;20;N;;;;;
3251;CIRCLED NUMBER TWENTY ONE;No;0;ON;<circle> 0032 0031;;;21;N;;;;;
3252;CIRCLED NUMBER TWENTY TWO;No;0;ON;<circle> 0032 0032;;;22;N;;;;;
3253;CIRCLED NUMBER TWENTY THREE;No;0;ON;<circle> 0032 0033;;;23;N;;;;;
3254;CIRCLED NUMBER TWENTY FOUR;No;0;ON;<circle> 0032 0034;;;24;N;;;;;
3255;CIRCLED NUMBER TWENTY FIVE;No;0;ON;<circle> 0032 0035;;;25;N;;;;;
3256;CIRCLED NUMBER TWENTY SIX;No;0;ON;<circle> 0032 0036;;;26;N;;;;;
3257;CIRCLED NUMBER TWENTY SEVEN;No;0;ON;<circle> 0032 0037;;;27;N;;;;;
3258;CIRCLED NUMBER TWENTY EIGHT;No;0;ON;<circle> 0032 0038;;;28;N;;;;;
3259;CIRCLED NUMBER TWENTY NINE;No;0;ON;<circle> 0032 0039;;;29;N;;;;;
325A;CIRCLED NUMBER THIRTY;No;0;ON;<circle> 0033 0030;;;30;N;;;;;
325B;CIRCLED NUMBER THIRTY ONE;No;0;ON;<circle> 0033 0031;;;31;N;;;;;
325C;CIRCLED NUMBER THIRTY TWO;No;0;ON;<circle> 0033 0032;;;32;N;;;;;
325D;CIRCLED NUMBER THIRTY THREE;No;0;ON;<circle> 0033 0033;;;33;N;;;;;
325E;CIRCLED NUMBER THIRTY FOUR;No;0;ON;<circle> 0033 0034;;;34;N;;;;;
325F;CIRCLED NUMBER THIRTY FIVE;No;0;ON;<circle> 0033 0035;;;35;N;;;;;
32B1;CIRCLED NUMBER THIRTY SIX;No;0;ON;<circle> 0033 0036;;;36;N;;;;;
32B2;CIRCLED NUMBER THIRTY SEVEN;No;0;ON;<circle> 0033 0037;;;37;N;;;;;
32B3;CIRCLED NUMBER THIRTY EIGHT;No;0;ON;<circle> 0033 0038;;;38;N;;;;;
32B4;CIRCLED NUMBER THIRTY NINE;No;0;ON;<circle> 0033 0039;;;39;N;;;;;
32B5;CIRCLED NUMBER FORTY;No;0;ON;<circle> 0034 0030;;;40;N;;;;;
32B6;CIRCLED NUMBER FORTY ONE;No;0;ON;<circle> 0034 0031;;;41;N;;;;;
32B7;CIRCLED NUMBER FORTY TWO;No;0;ON;<circle> 0034 0032;;;42;N;;;;;
32B8;CIRCLED NUMBER FORTY THREE;No;0;ON;<circle> 0034 0033;;;43;N;;;;;
32B9;CIRCLED NUMBER FORTY FOUR;No;0;ON;<circle> 0034 0034;;;44;N;;;;;
32BA;CIRCLED NUMBER FORTY FIVE;No;0;ON;<circle> 0034 0035;;;45;N;;;;;
32BB;CIRCLED NUMBER FORTY SIX;No;0;ON;<circle> 0034 0036;;;46;N;;;;;
32BC;CIRCLED NUMBER FORTY SEVEN;No;0;ON;<circle> 0034 0037;;;47;N;;;;;
32BD;CIRCLED NUMBER FORTY EIGHT;No;0;ON;<circle> 0034 0038;;;48;N;;;;;
32BE;CIRCLED NUMBER FORTY NINE;No;0;ON;<circle> 0034 0039;;;49;N;;;;;
32BF;CIRCLED NUMBER FIFTY;No;0;ON;<circle> 0035 0030;;;50;N;;;;;`;

// key is integer (code point in base10). value is unicode name
const g_data = new Map();
(data_str.split("\n")).forEach((x) => {
    const fields = (x.split(";"));
    g_data.set(parseInt(fields[0], 16), fields[8]);
});

export function convertCircleDigitsCharacterToNumber(stringValue: string): string {
    var arrCharacter: string[] = [];
    var tmp: number | undefined;
    const srchString = stringValue.trim().replace(/-$/, '');

    for (const c of srchString) {
        tmp = c.codePointAt(0);
        if (typeof tmp !== 'undefined' && g_data.has(tmp))
            arrCharacter.push(g_data.get(tmp));
        else
            arrCharacter.push(c);
    }
    
    return arrCharacter.join('');
};
