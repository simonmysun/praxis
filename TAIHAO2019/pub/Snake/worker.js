onmessage = function(m) {
    data = m.data;
    if(data.type === 'init') {
        importScripts(data.scriptUrl);
        next = init(data.w, data.h);
        postMessage(-10);
    } else if(data.type === 'next') {
        var result;
        var status = JSON.parse(data.data);
        try {
            var res = next(status.snake, status.food);
            postMessage((res === 0 ||
                        res === 1 ||
                        res === 2 ||
                         res === 3) ? 1 << res : -1);
        } catch (e) {
            console.log(e);
            postMessage(-1);
        }
    }
}
