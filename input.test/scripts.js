eventBubbling = false;

$log = document.getElementById('log');
var log = function(msg) {
  $log.insertAdjacentHTML('afterbegin', '<span>' + msg + '</span>');
  while($log.children.length > 100) {
    $log.children[99].remove();
  }
};

var keyLayout = {"0":{"key":"0","x":10,"y":0,"w":1},"1":{"key":"1","x":1,"y":0,"w":1},"2":{"key":"2","x":2,"y":0,"w":1},"3":{"key":"3","x":3,"y":0,"w":1},"4":{"key":"4","x":4,"y":0,"w":1},"5":{"key":"5","x":5,"y":0,"w":1},"6":{"key":"6","x":6,"y":0,"w":1},"7":{"key":"7","x":7,"y":0,"w":1},"8":{"key":"8","x":8,"y":0,"w":1},"9":{"key":"9","x":9,"y":0,"w":1},"`":{"key":"`","x":0,"y":0,"w":1},"-":{"key":"-","x":11,"y":0,"w":1},"=":{"key":"=","x":12,"y":0,"w":1},"Backspace":{"key":"Backspace","x":13,"y":0,"w":2},"Tab":{"key":"Tab","x":0,"y":1,"w":1.3333333333333333},"Q":{"key":"Q","x":1.3333333333333333,"y":1,"w":1.0000000000000002},"W":{"key":"W","x":2.3333333333333335,"y":1,"w":1},"E":{"key":"E","x":3.3333333333333335,"y":1,"w":0.9999999999999996},"R":{"key":"R","x":4.333333333333333,"y":1,"w":1},"T":{"key":"T","x":5.333333333333333,"y":1,"w":1},"Y":{"key":"Y","x":6.333333333333333,"y":1,"w":1},"U":{"key":"U","x":7.333333333333333,"y":1,"w":1.0000000000000009},"I":{"key":"I","x":8.333333333333334,"y":1,"w":1},"O":{"key":"O","x":9.333333333333334,"y":1,"w":1},"P":{"key":"P","x":10.333333333333334,"y":1,"w":1},"[":{"key":"[","x":11.333333333333334,"y":1,"w":1},"]":{"key":"]","x":12.333333333333334,"y":1,"w":1},"\\":{"key":"\\","x":13.333333333333334,"y":1,"w":1.666666666666666},"CapsLock":{"key":"CapsLock","x":0,"y":2,"w":1.6666666666666665},"A":{"key":"A","x":1.6666666666666665,"y":2,"w":1},"S":{"key":"S","x":2.6666666666666665,"y":2,"w":1},"D":{"key":"D","x":3.6666666666666665,"y":2,"w":1.0000000000000004},"F":{"key":"F","x":4.666666666666667,"y":2,"w":1},"G":{"key":"G","x":5.666666666666667,"y":2,"w":1},"H":{"key":"H","x":6.666666666666667,"y":2,"w":1},"J":{"key":"J","x":7.666666666666667,"y":2,"w":0.9999999999999991},"K":{"key":"K","x":8.666666666666666,"y":2,"w":1},"L":{"key":"L","x":9.666666666666666,"y":2,"w":1},";":{"key":";","x":10.666666666666666,"y":2,"w":1},"'":{"key":"'","x":11.666666666666666,"y":2,"w":1},"Enter":{"key":"Enter","x":12.666666666666666,"y":2,"w":2.333333333333334},"LShift":{"key":"LShift","x":0,"y":3,"w":2},"Z":{"key":"Z","x":2,"y":3,"w":1},"X":{"key":"X","x":3,"y":3,"w":1},"C":{"key":"C","x":4,"y":3,"w":1},"V":{"key":"V","x":5,"y":3,"w":1},"B":{"key":"B","x":6,"y":3,"w":1},"N":{"key":"N","x":7,"y":3,"w":1},"M":{"key":"M","x":8,"y":3,"w":1},",":{"key":",","x":9,"y":3,"w":1},".":{"key":".","x":10,"y":3,"w":1},"/":{"key":"/","x":11,"y":3,"w":1},"RShift":{"key":"RShift","x":12,"y":3,"w":3},"LCtrl":{"key":"LCtrl","x":0,"y":4,"w":1},"LWin":{"key":"LWin","x":1,"y":4,"w":1},"LAlt":{"key":"LAlt","x":2,"y":4,"w":1},"LCmd":{"key":"LCmd","x":3,"y":4,"w":1},"Space":{"key":"Space","x":4,"y":4,"w":7},"RAlt":{"key":"RAlt","x":11,"y":4,"w":1},"RWin":{"key":"RWin","x":12,"y":4,"w":1},"Menu":{"key":"Menu","x":13,"y":4,"w":1},"RCtrl":{"key":"RCtrl","x":14,"y":4,"w":1}};

var keycode = [null,null,null,null,null,null,null,null,"Backspace","Tab",null,null,null,"Enter",null,null,"LShift","LCtrl","LAlt","Pause","CapsLock","Esc",null,null,null,null,null,"Esc",null,null,null,null,"Space","PgUp","PgDw","End","Home","Left","Up","Right","Down",null,null,null,null,"Insert","Delete",null,"0","1","2","3","4","5","6","7","8","9",null,null,null,"=",null,null,null,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","LCmd",null,null,null,null,"0(Numpad)","1(Numpad)","2(Numpad)","3(Numpad)","4(Numpad)","5(Numpad)","6(Numpad)","7(Numpad)","8(Numpad)","9(Numpad)","*(Numpad)","+(Numpad)",null,"-(Numpad)",null,"/(Numpad)","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"NumLock",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"-",null,null,null,null,null,null,null,null,null,null,null,null,";","=",",","-",".","/","`",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"[","\\","]","'"];

var AnimateList = function() {
  var self = this;
  var items = [];
  var $main = document.getElementById('main');
  var lastAniTime = -1;
  self.addItem = function(text) {
    var id = new Date().getTime().toString();
    var el = document.createElement('div');
    el.setAttribute('id', 'keys-' + id);
    el.classList.add('keys');
    el.style.color = '#'
      + (64 + Math.floor(Math.random() * 128)).toString(16)
      + (64 + Math.floor(Math.random() * 128)).toString(16)
      + (64 + Math.floor(Math.random() * 128)).toString(16)
      + '';
    el.textContent = text;
    $main.appendChild(el);
    var tmpx;
    if(keyLayout[text] == undefined) {
      tmpx = 15 / 15;
    } else {
      tmpx = (keyLayout[text].x + keyLayout[text].w / 2) / 15;
    }
    items.push({
      id: id,
      el: el,
      x: tmpx,
      y: 1,
      ng: 0,
      vx: (0.5 - Math.random()) / 5,
      vy: - (0.7 + Math.random() * 0.3) * 2,
      vng: (0.5 - Math.random()) * 1000,
      ax: 0,
      ay: 2,
      o: 1
    });
    self.animate();
  };
  self.animate = function() {
    if(lastAniTime < 0) {
      lastAniTime = new Date().getTime();
    }
    var now = new Date().getTime();
    duration = (now - lastAniTime) / 1000
    lastAniTime = now;
    items.map(function(item) {
      item.x += item.vx * duration;
      item.y += item.vy * duration;
      item.vx += item.ax * duration;
      item.vy += item.ay * duration;
      item.ng += item.vng * duration;
      if(item.x > 1 || item.x < 0) {
        item.vx = - item.vx;
      }
      else if(item.y > 1.01) {
        item.el.remove();
        items.splice(items.indexOf(item), 1);
        return;
      }
      item.o = Math.max(0, item.o - 0.8 * duration);
      item.el.style.left = item.x * 100 + '%';
      item.el.style.top = item.y * 100 + '%';
      item.el.style.transform = 'rotate(' + item.ng + 'deg)';
      item.el.style.opacity = item.o;
    });
  };
};

var animateList = new AnimateList();
var keyPressing = [];
var keyPressChanged = false;

var fire = function(c) {
  var target;
  if(keycode[c]) {
    target = keycode[c];
  } else {
    alert(c);
  }
  animateList.addItem(target);
};

var processMouse = function(event, action) {
  ctx.beginPath();
  ctx.strokeStyle = '#'
       + (64 + Math.floor(Math.random() * 128)).toString(16)
    + (64 + Math.floor(Math.random() * 128)).toString(16)
    + (64 + Math.floor(Math.random() * 128)).toString(16)
    + '';
  if(action === 'moved') {
    ctx.arc(event.pageX, event.pageY, 5, 0, 2*Math.PI, true);
    log('Mouse moved. ');
  } else {
    switch (event.which) {
      case 1:
        log('Left mouse button ' + action +  '. ');
        ctx.arc(event.pageX, event.pageY, 20, 0, 2*Math.PI, true);
        break;
      case 2:
        log('Middle mouse button ' + action +  '. ');
        ctx.arc(event.pageX, event.pageY, 10, 0, 2*Math.PI, true);
        break;
      case 3:
        log('Right mouse button ' + action +  '. ');
        ctx.arc(event.pageX, event.pageY, 15, 0, 2*Math.PI, true);
        break;
      default:
        log('You have a strange mouse and some key is ' + action + '! ');
    }
  }
  ctx.lineWidth = 2;
  ctx.stroke();
  if(!eventBubbling) {
    event.preventDefault();
  }  
};

[
  {
    e: 'contextmenu',
    h: function(event) {
      if(!eventBubbling) {
        event.preventDefault();
      }
    }
  },
  {
    e: 'mousedown',
    h: function(event) {
      processMouse(event, 'down');
    }
  },
  {
    e: 'mouseup',
    h: function(event) {
      processMouse(event, 'up');
    }
  },
  {
    e: 'mousemove',
    h: function(event) {
      processMouse(event, 'moved');
    }
  },
  {
    e: 'click',
    h: function(event) {
      processMouse(event, 'clicked');
    }
  },
  {
    e: 'dblclick',
    h: function(event) {
      processMouse(event, 'dbclicked');
    }
  },
  {
    e: 'keyup',
    h: function(event) {
      log('Key ' + event.which + ' up. ');
      keyPressChanged = true;
      keyPressing[event.which] = false;
      if(!eventBubbling) {
        event.preventDefault();
      }
    }
  },
  {
    e: 'keydown',
    h: function(event) {
      fire(event.which);
      log('Key ' + event.which + ' down. ');
      keyPressChanged = true;
      keyPressing[event.which] = true;
      if(!eventBubbling) {
        event.preventDefault();
      }
    }
  }
].map(function(x) {
  document.body.addEventListener(x.e, x.h);
});

var pathsCanvasCtx = document.getElementById('paths').getContext("2d");

var ctx = pathsCanvasCtx;
var lines = [];
var touches = [];

var pathsPreDraw =  function(event) {
  log('Touch start. ');
  touches = event.touches;
  var touch = touches[touches.length - 1];
  var id = touch.identifier;
  lines[id] = {
    x: touch.pageX,
    y: touch.pageY,
    force: (touch.radiusX + touch.radiusY) / 2 + touch.force,
    color: '#'
         + (64 + Math.floor(Math.random() * 128)).toString(16)
      + (64 + Math.floor(Math.random() * 128)).toString(16)
      + (64 + Math.floor(Math.random() * 128)).toString(16)
      + ''
  };
  ctx.beginPath();
  ctx.arc(touch.pageX, touch.pageY, lines[id].force, 0, 2*Math.PI, true);
  ctx.lineWidth = 5;
  ctx.stroke();
  event.preventDefault();
};
var pathsDraw = function(event) {
  log('Touch move. ');
  touches = event.touches;
  event.preventDefault();
};
var pathDrawMove= function(i, changeX, changeY) {
  ctx.strokeStyle = lines[i].color;
  ctx.beginPath();
  ctx.moveTo(lines[i].x, lines[i].y);
  ctx.lineTo(lines[i].x + changeX, lines[i].y + changeY);
  ctx.lineWidth = lines[i].force;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.closePath();
  return {
    x: lines[i].x + changeX,
    y: lines[i].y + changeY
  };
};
var pathsEnd =  function(event) {
  log('Touch end. ');
  touches = event.touches;
  event.preventDefault();
};

document.body.addEventListener('touchstart', pathsPreDraw, false);
document.body.addEventListener('touchmove', pathsDraw, false);
document.body.addEventListener('touchend', pathsEnd, false);

var $keyStatus = document.getElementById('key-status');
var $touchStatus = document.getElementById('touch-status');
var touchesCounter = touches.length;

setInterval(function() {
  animateList.animate();
  for(var i = 0; i < (function() {return touches.length;})(); i ++ ) {
    var touch = touches[i];
    var id = touch.identifier;
    var moveX = touch.pageX - lines[id].x;
    var moveY = touch.pageY - lines[id].y;
    var ret = pathDrawMove(id, moveX, moveY);
    lines[id].x = ret.x;
    lines[id].y = ret.y;
    lines[id].force = (touch.radiusX + touch.radiusY) / 2 + touch.force;
  }
  if(touches.length != touchesCounter) {
    $touchStatus.textContent = touches.length;
    touchesCounter = touches.length;
  }
  if(keyPressChanged) {
    var ret;
    ret = keyPressing.map(function(x, i) {
      if(x) {
        return keycode[i];
      }
    }).filter(function(x) {
      return x;
    }).join(' + ');
    if(ret.length === 0) {
      ret = 'none';
    }
    $keyStatus.textContent = ret;
    keyPressChanged = false;
  }
});

window.onresize = function() {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};
window.onresize();

log('This page shows what signal have your keyboard, mouse and touchscreen sent. ');

