var password = 'dcfd17cc40c789165e00842a6940de94';
var msg = 'Blaise';
var key = password.split('').map(x => x.charCodeAt(0));
var res = [];
for(var i = 0; i < msg.length; i += 1) {
    res.push(msg.charCodeAt(i) ^ key[i % key.length]);
}
console.log(btoa(res.map(x => String.fromCharCode(x)).join('')));
console.log(res.map(x => String.fromCharCode(x)).join(''));
