// A tool to generate keyboard layout

row = [];
row[0] = '`1234567890-=';
row[1] = ' QWERTYUIOP[]';
row[2] = ' ASDFGHJKL;\'';
row[3] = ' ZXCVBNM,./';
row[4] = '';
row = row.map(function(x) {return x.split('');});

row[0][13] = 'Backspace';
row[1][0] = 'Tab';
row[1][13] = '\\';
row[2][0] = 'CapsLock';
row[2][12] = 'Enter';
row[3][0] = 'LShift';
row[3][11] = 'RShift';
row[4][0] = 'LCtrl';
row[4][1] = 'LWin';
row[4][2] = 'LAlt';
row[4][3] = 'LCmd';
row[4][4] = 'Space';
row[4][5] = 'RAlt';
row[4][6] = 'RWin';
row[4][7] = 'Menu';
row[4][8] = 'RCtrl';

var layout = [];
layout[0] = row[0].map(function(key, index) {
  return {
    'key': key,
    'x': index,
    'y': 0
  };
});
layout[1] = row[1].map(function(key, index) {
  return {
    'key': key,
    'x': index + 1 / 3,
    'y': 1
  };
});
layout[1][0].x = 0;
layout[2] = row[2].map(function(key, index) {
  return {
    'key': key,
    'x': index + 2 / 3,
    'y': 2
  };
});
layout[2][0].x = 0;
layout[3] = row[3].map(function(key, index) {
  return {
    'key': key,
    'x': index + 1,
    'y': 3
  };
});
layout[3][0].x = 0;
layout[4] = row[4].map(function(key, index) {
  return {
    'key': key,
    'x': index,
    'y': 4
  };
});
layout[4][0].x = 0;
layout[4][1].x = 1;
layout[4][2].x = 2;
layout[4][3].x = 3;
layout[4][4].x = 4;
layout[4][5].x = 11;
layout[4][6].x = 12;
layout[4][7].x = 13;
layout[4][8].x = 14;

layout = layout.map(function(row) {
  return row.map(function(key, index) {
    if(row[index + 1] == undefined) {
      return {
        'key': key.key,
        'x': key.x,
        'y': key.y,
        'w': 15 - key.x
      };
    } else {
      return {
        'key': key.key,
        'x': key.x,
        'y': key.y,
        'w': row[index + 1].x - key.x
      };
    }
  });
});

var keyLayout = {};

layout.map(function(row) {
  return row.map(function(key) {
    keyLayout[key.key.toString()] = {
      'key': key.key,
      'x': key.x,
      'y': key.y,
      'w': key.w
    };
  });
});

JSON.stringify(keyLayout);


