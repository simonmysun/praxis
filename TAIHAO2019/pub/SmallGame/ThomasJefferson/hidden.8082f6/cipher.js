var key = [9, 7, 2, 4, 6, 1, 5, 8, 3];
var disks = [
    "",
    "ZWAXJGDLUBVIQHKYPNTCRMOSFE",
    "KPBELNACZDTRXMJQOYHGVSFUWI",
    "BDMAIZVRNSJUWFHTEQGYXPLOCK",
    "RPLNDVHGFCUKTEBSXQYIZMJWAO",
    "IHFRLABEUOTSGJVDKCPMNZQWXY",
    "AMKGHIWPNYCJBFZDRUSLOQXVET",
    "GWTHSPYBXIZULVKMRAFDCEONJQ",
    "NOZUTWDCVRJLXKISEFAPMYGHBQ",
    "XPLTDSRFHENYVUBMCQWAOIKZGJ",
    "UDNAJFBOWTGVRSCZQKELMXYIHP"
];
var msg = 'ALLESGUTE'.split('');
console.log(key.map(x => disks[x]).map((x, i) => x.slice(x.indexOf(msg[i])) + x.slice(0, x.indexOf(msg[i]))).map(x => x[6]).join(''));
