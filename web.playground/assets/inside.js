(function () {
  var postMessageToParent = function(msg, type) {
    window.top.postMessage({
      data: msg,
      type: type
    }, '*');
  }

  window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
      postMessageToParent('Script Error: See Browser Console for Detail', 'error');
    } else {
      postMessageToParent(JSON.stringify(arguments), 'error');
    }
    return false;
  };

  var oldLog = console.log;
  console.log = function () {
    var message = arguments;
    var data;
    if(arguments.length === 1) {
      message = arguments[0];
      if (typeof message == 'undefined') {
        data = 'undefined';
      } else {
        data = JSON.stringify(message);
      }
    } else {
      data = JSON.stringify(message);
    }
    postMessageToParent(data, 'log');
    oldLog(data);
  }
  oldInfo = console.info;
  console.info = function () {
    var message = arguments;
    var data;
    if(arguments.length === 1) {
      message = arguments[0];
      if (typeof message == 'undefined') {
        data = 'undefined';
      } else {
        data = JSON.stringify(message);
      }
    } else {
      data = JSON.stringify(message);
    }
    postMessageToParent(data, 'info');
    oldInfo(data);
  };
  oldWarn = console.warn;
  console.warn = function () {
    var message = arguments;
    var data;
    if(arguments.length === 1) {
      message = arguments[0];
      if (typeof message == 'undefined') {
        data = 'undefined';
      } else {
        data = JSON.stringify(message);
      }
    } else {
      data = JSON.stringify(message);
    }
    postMessageToParent(data, 'warn');
    oldWarn(data);
  };
  oldError = console.error;
  console.error = function () {
    var message = arguments;
    var data;
    if(arguments.length === 1) {
      message = arguments[0];
      if (typeof message == 'undefined') {
        data = 'undefined';
      } else {
        data = JSON.stringify(message);
      }
    } else {
      data = JSON.stringify(message);
    }
    postMessageToParent(data, 'error');
    oldError(data);
  };

  window.addEventListener("message", function (event) {
    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
    if (false && origin !== "http://example.org:8080") return;
    var res = eval(event.data);
    if(typeof res === 'function') {
      res = res.toString();
    }
    postMessageToParent(JSON.stringify(res), 'others');
  }, false);
})();
