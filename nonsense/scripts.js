var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=';

var key = '';
var dict = ''
var head = '';
var tail = '';

var aesCtr;

var convert = function(text) {
  return head + text.split('').map(function(x) {
    return dict[char.indexOf(x)];
  }).join('') + tail;
};

var apostate = function(text) {
  text = text.slice(head.length, -tail.length);
  var len = text.length;
  var res = [];
  for(var i = 0; i < len; i += 1) {
    var k = 0;
    var r = dict.filter(function(x) {
      return text[i + k] === x[0];
    });
    while(r.length > 1) {
      k += 1;
      r = r.filter(function(x) {
        return text[i + k] === x[k];
      });
    };
    i += r[0].length - 1;
    res.push(char[dict.indexOf(r[0])]);
  }
  return res.join('');
};

document.getElementById('en').addEventListener('click', function(e) {
  if(typeof dict === 'string') {
    dict = dict.split(',');
  }
  aesCtr = new aesjs.ModeOfOperation.ctr(sha1(key).slice(12, 28).split('').map(function(x) {return parseInt(x, 16);}), new aesjs.Counter(5));
  document.getElementById('target').value = (
    convert(
      base32.encode(
        aesjs.utils.hex.fromBytes(
          aesCtr.encrypt(
            aesjs.utils.utf8.toBytes(
              document.getElementById('source').value))))));
  e.preventDefault();
  return false;
});
document.getElementById('de').addEventListener('click', function(e) {
  if(typeof dict === 'string') {
    dict = dict.split(',');
  }
  aesCtr = new aesjs.ModeOfOperation.ctr(sha1(key).slice(12, 28).split('').map(function(x) {return parseInt(x, 16);}), new aesjs.Counter(5));
  document.getElementById('source').value = (
    aesjs.utils.utf8.fromBytes(
      aesCtr.decrypt(
        aesjs.utils.hex.toBytes(
          base32.decode(
            apostate(
              document.getElementById('target').value))))));
  e.preventDefault();
  return false;
});

var $key = document.getElementById('key');
var $head = document.getElementById('head');
var $tail = document.getElementById('tail');
var $dict = document.getElementById('dict');

var update = function() {
  location.hash = base32.encode(JSON.stringify({
    key: $key.value,
    head: $head.value,
    tail: $tail.value,
    dict: $dict.value
  }));
  key = $key.value;
  head = $head.value;
  tail = $tail.value;
  dict = $dict.value;
};

if(location.hash.length > 1) {
  var tmp = JSON.parse(base32.decode(location.hash.slice(1)));
  key = tmp.key;
  head = tmp.head;
  tail = tmp.tail;
  dict = tmp.dict;
  $key.value = key;
  $head.value = head;
  $tail.value = tail;
  $dict.value = dict;
}

$key.oninput = update;
$head.oninput = update;
$tail.oninput = update;
$dict.oninput = update;

