Split(['#viewer', '#console'], {
  direction: 'vertical',
  sizes: [85, 15],
  gutterSize: 8,
  cursor: 'row-resize',
  minSize: 50
});

Split(['#viewer-left', '#viewer-right'], {
  direction: 'horizontal',
  sizes: [50, 50],
  gutterSize: 8,
  cursor: 'row-resize',
  minSize: 50
});

Split(['#layout', '#scripts'], {
  direction: 'vertical',
  sizes: [50, 50],
  gutterSize: 8,
  cursor: 'row-resize',
  minSize: 50
});

Split(['#styles', '#preview'], {
  direction: 'vertical',
  sizes: [35, 65],
  gutterSize: 8,
  cursor: 'row-resize',
  minSize: 50
});

var $iframe = document.getElementById('preview-iframe');

var layoutEditor = ace.edit("layout-editor");
layoutEditor.setTheme("ace/theme/chrome");
layoutEditor.session.setMode("ace/mode/html");
layoutEditor.getSession().on('change', function(e) {
  if(config.manualUpdate) return;
  throttledUpdate();
});

var scriptsEditor = ace.edit("scripts-editor");
scriptsEditor.setTheme("ace/theme/chrome");
scriptsEditor.session.setMode("ace/mode/javascript");
scriptsEditor.getSession().on('change', function(e) {
  if(config.manualUpdate) return;
  throttledUpdate();
});

var stylesEditor = ace.edit("styles-editor");
stylesEditor.setTheme("ace/theme/chrome");
stylesEditor.session.setMode("ace/mode/css");
stylesEditor.getSession().on('change', function(e) {
  if(config.manualUpdate) return;
  throttledUpdate();
});

var inputEditor = ace.edit("input-editor");
inputEditor.setTheme("ace/theme/chrome");
inputEditor.session.setMode("ace/mode/javascript");
inputEditor.setAutoScrollEditorIntoView(true);
inputEditor.setOption("maxLines", 200000);
inputEditor.renderer.setShowGutter(false);
var inputHistory = [];
if(localStorage.inputHistory) {
  //inputHistory = JSON.parse(localStorage.inputHistory);
}
var currInputId = - 1;
inputEditor.commands.addCommand({
  name: 'send',
  bindKey: {win: 'Enter',  mac: 'Enter'},
  exec: function(editor) {
    var msg = editor.getValue();
    $iframe.contentWindow.postMessage(msg, '*');
    log('<div class="console-messages input">' + msg  + '</div>');
    editor.setValue("");
    if(currInputId !== 0 || msg !== inputHistory[currInputId]) {
      inputHistory.unshift(msg);
      localStorage.inputHistory = JSON.stringify(inputHistory);
    }
    currInputId = - 1;
  },
  readOnly: true // false if this command should not apply in readOnly mode
});
inputEditor.commands.addCommand({
  name: 'newLine',
  bindKey: {win: 'Shift+Enter',  mac: 'Shift+Enter'},
  exec: function(editor) {
    editor.insert('\n');
  },
  readOnly: true // false if this command should not apply in readOnly mode
});
inputEditor.commands.addCommand({
  name: 'historyBack',
  bindKey: {win: 'Up',  mac: 'Up'},
  exec: function(editor) {
    if(editor.selection.getCursor().row !== 0) {
      editor.gotoLine(editor.selection.getCursor().row, editor.selection.getCursor().column);
      return;
    } else if(currInputId === inputHistory.length - 1) {
      return;
    }
    editor.setValue(inputHistory[currInputId + 1]);
    editor.clearSelection();
    currInputId += 1;
  },
  readOnly: true // false if this command should not apply in readOnly mode
});
inputEditor.commands.addCommand({
  name: 'historyForward',
  bindKey: {win: 'Down',  mac: 'Down'},
  exec: function(editor) {
    if(editor.selection.getCursor().row !== editor.session.getLength() - 1) {
      editor.gotoLine(editor.selection.getCursor().row + 2, editor.selection.getCursor().column);
      return;
    } else if(currInputId === -1) {
      return;
    } else if(currInputId === 0) {
      editor.setValue('');
    } else {
      editor.setValue(inputHistory[currInputId - 1]);
    }
    editor.clearSelection();
    currInputId -= 1;
  },
  readOnly: true // false if this command should not apply in readOnly mode
});

var throttle = function (callback, delay, maxDelay, init, destroy) {
  var timer = null;
  var startTime;
  return function () {
    var context = this;
    var args = arguments;
    var currentTime = new Date().getTime();
    clearTimeout(timer);
    if (!startTime) {
      startTime = currentTime;
      init();
    } else if (currentTime - startTime >= maxDelay) {
      callback.apply(context, args);
      startTime = currentTime;
    }
    timer = setTimeout(function () {
      callback.apply(context, args);
      destroy();
    }, delay);
  }
};

var config = {
  'manualUpdate': true
};

var update = function () {
  store();
  $iframe.srcdoc = '<script src="assets/inside.js"></script>'
                 + layoutEditor.getValue() + '<script>'
                 + scriptsEditor.getValue() + '</script><style>'
                 + stylesEditor.getValue() + '</style>';
};
var throttledUpdate = throttle(update, 500, 1000, function () {}, function () {});

var hash = LZString.decompressFromBase64(location.hash.slice(2));
if (typeof hash === 'string' && hash.length > 0) {
  (function () {
    var data = hash.split('\x1C');
    layoutEditor.setValue(data[0]);
    layoutEditor.clearSelection();
    scriptsEditor.setValue(data[1]);
    scriptsEditor.clearSelection();
    stylesEditor.setValue(data[2]);
    stylesEditor.clearSelection();
  })();
} else {
  location.hash = '/\x1C\x1C';
}

var store = function () {
  var data = [layoutEditor.getValue(), scriptsEditor.getValue(), stylesEditor.getValue()].join('\x1C');
  var compressed = LZString.compressToBase64(data);
  location.hash = '/' + compressed;
};

update();

var escapeHtml = function (unsafe_str) {
  return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
    //.replace(/\\/g, '\u005c')
    ;
}

var $console = document.getElementById('console');
var $output = document.getElementById('output');
var $input = document.getElementById('input-text');
var logNum = 0;
var log = function (message) {
  if(logNum < 1000) {
    logNum += 1;
  } else {
    $output.removeChild($output.childNodes[0]);
  }
  $output.innerHTML += message;
  $console.scrollTop = $console.scrollHeight;
};
window.addEventListener('message', function (message) {
  if(message.data.type === 'log') {
    log('<div class="console-messages log"><span class="timestamp">' + new Date() + '</span>' + escapeHtml(message.data.data) + '</div>');
  } else if(message.data.type === 'info') {
    log('<div class="console-messages info"><span class="timestamp">' + new Date() + '</span>' + escapeHtml(message.data.data) + '</div>');
  } else if(message.data.type === 'warn') {
    log('<div class="console-messages warn"><span class="timestamp">' + new Date() + '</span>' + escapeHtml(message.data.data) + '</div>');
  } else if(message.data.type === 'error') {
    log('<div class="console-messages error"><span class="timestamp">' + new Date() + '</span>' + escapeHtml(message.data.data) + '</div>');
  } else if(message.data.type === 'others') {
    log('<div class="console-messages others">' + escapeHtml(message.data.data) + '</div>');
  }
}, false);

var $btnUpdate = document.getElementById('btn-update');
$btnUpdate.addEventListener('click', function(event) {
  update();
  event.preventDefault();
});
