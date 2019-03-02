var password = 'e7690b98735fccbe4d173b1e37d70da0';
var msg = 'ReverseEngineeringV';
var key = password.split('').map(x => x.charCodeAt(0));
var res = [];
for(var i = 0; i < msg.length; i += 1) {
    res.push(msg.charCodeAt(i) ^ key[i % key.length]);
}
console.log(btoa(res.map(x => String.fromCharCode(x)).join('')));
console.log(res.map(x => String.fromCharCode(x)).join(''));
