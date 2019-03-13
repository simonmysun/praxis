var password = 'Life is short, you need Python';
var msg = 'EulerscheZahl';
var key = password.split('').map(x => x.charCodeAt(0));
var res = [];
for(var i = 0; i < msg.length; i += 1) {
    res.push(msg.charCodeAt(i) ^ key[i % key.length]);
}
console.log(btoa(res.map(x => String.fromCharCode(x)).join('')));
console.log(res.map(x => String.fromCharCode(x)).join(''));
