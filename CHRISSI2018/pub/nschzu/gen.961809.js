var s = 'BABAAAABAAABABAABABAAAABBABBABABBAAAABAABABBAABBABBAABBBAAABABBABABABABAABBAABAAAAABBABAAABAABAAABABABABAAAAAAAABBAABABAAABAAAABABBAABAAAAABBAAAAAAAAAAAABAAABAAABBAAABAAAABBAAAABAABAABABABAAABBABAAAABAABAAAABAABABBBAABAABAAAAABBABABBAAABAAAABBAAAABAABAABABABAAABBABBAAAAABAAAAABBAAABBBBAABAAAAABBAAAAAAAAAAAABAAABAA';

var dic = {
    a: '*ooooo',
    b: '*o*ooo',
    c: '**oooo',
    d: '**o*oo',
    e: '*oo*oo',
    f: '***ooo',
    g: '****oo',
    h: '*o**oo',
    i: 'o**ooo',
    j: 'o***oo',
    k: '*ooo*o',
    l: '*o*o*o',
    m: '**oo*o',
    n: '**o**o',
    o: '*oo**o',
    p: '***o*o',
    q: '*****o',
    r: '*o***o',
    s: 'o**o*o',
    t: 'o****o',
    u: '*ooo**',
    v: '*o*o**',
    w: 'o***o*',
    x: '**oo**',
    y: '**o***',
    z: '*oo***'
};

r = s.split('').map(x => x==='A' ? 'ABCDEFGHIJKLM'[Math.floor(Math.random() * 13)] : 'NOPQRSTUVWXYZ'[Math.floor(Math.random() * 13)]);
// console.log(r.join(''));
r = 'ZCUAJBIOHCCXEVKDOIQCHEJUZAYZJYITOGBEJYLLWAUTDDROEYXIJOWPAHGVGUQBTCXLPAUMGRVGKPCIGAAZSMRMKDQCHSEAFSIQBUEXKFDKDMDBXZDCWIWLLIQJKBKUDXNMEOBMHEGZZDEHMICDKKMJINGBCXIEINOEBGPEEKHOWHBIKZHFNELSFSAOMBIVVMRJMAJRHGUEKCBQJJWGPOOMHRLHPKLMDDSWMXFNQJIIXFCAHOOGKKGNHJSCAQHRHSAGFXTGNSBMAHJRHKDJEYULFBWQYSHKQADMHBRTICKBHMMHCKDDXDDIRHL';
r = r.split('').map(x => dic[x.toLowerCase()]);

// console.log(r, r.length);

var p = new Array(76).fill(0).map(x => new Array(65).fill(' '));
for(var i = 0; i < r.length; i += 1) {
    var row = Math.floor(i / 25);
    var col = i % 25;
    p[74 - col * 3][row * 5] = r[i][0];
    p[74 - col * 3 - 1][row * 5] = r[i][1];
    p[74 - col * 3][row * 5 + 1] = r[i][2];
    p[74 - col * 3 - 1][row * 5 + 1] = r[i][3];
    p[74 - col * 3][row * 5 + 2] = r[i][4];
    p[74 - col * 3 - 1][row * 5 + 2] = r[i][5];
}

console.log(p.map(x => x.join('')).join('\n'));

