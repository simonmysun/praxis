// A tool to map keycode

var keycode = [];

keycode[8] = 'Backspace';
keycode[9] = 'Tab';

keycode[13] = 'Enter';

keycode[16] = 'LShift';
keycode[17] = 'LCtrl';
keycode[18] = 'LAlt';
keycode[19] = 'Pause';
keycode[20] = 'CapsLock';
keycode[21] = 'Esc';
keycode[27] = 'Esc';

keycode[32] = 'Space';
keycode[33] = 'PgUp';
keycode[34] = 'PgDw';
keycode[35] = 'End';
keycode[36] = 'Home';
keycode[37] = 'Left';
keycode[38] = 'Up';
keycode[39] = 'Right';
keycode[40] = 'Down';

keycode[45] = 'Insert';
keycode[46] = 'Delete';


for(var i = 48; i < 58; i ++ ) {
  keycode[i] = String.fromCharCode(i);
}

keycode[61] = '=';


for(var i = 65; i < 91; i ++ ) {
  keycode[i] = String.fromCharCode(i);
}
keycode[91] = 'LCmd';

for(var i = 96; i < 106; i ++ ) {
  keycode[i] = i - 96 + '(Numpad)';
}

keycode[144] = 'NumLock';
keycode[106] = '*(Numpad)';
keycode[109] = '-(Numpad)';
keycode[107] = '+(Numpad)';
keycode[111] = '/(Numpad)';
for(var i = 112; i < 124; i ++ ) {
  keycode[i] = 'F' + (i - 111);
}

keycode[173] = '-';
keycode[186] = ';';
keycode[187] = '=';
keycode[188] = ',';
keycode[189] = '-';
keycode[190] = '.';
keycode[191] = '/';
keycode[192] = '`';
keycode[219] = '[';
keycode[220] = '\\';
keycode[221] = ']';
keycode[222] = '\'';

JSON.stringify(keycode);
