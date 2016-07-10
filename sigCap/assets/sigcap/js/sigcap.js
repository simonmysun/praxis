Webcam.set({
    width: 480,
    height: 270,
    
    dest_width: 1280,
    dest_height: 720,
    
    image_format: 'jpeg',
    jpeg_quality: 90
});

var oriCanvas = document.createElement('canvas');
var final_width = Webcam.params.crop_width || Webcam.params.dest_width;
var final_height = Webcam.params.crop_height || Webcam.params.dest_height;
oriCanvas.width = final_width;
oriCanvas.height = final_height;
var oriCtx = oriCanvas.getContext('2d');

var filteredCanvas = document.createElement('canvas');
filteredCanvas.width = 1280;
filteredCanvas.height = 720;
var filteredCtx = filteredCanvas.getContext('2d');
var previewCanvas = document.getElementById('preview');
previewCanvas.width = 480;
previewCanvas.height = 270;
var previewCtx = previewCanvas.getContext('2d');
var config = {
    output: 'pixels'
};

var downloadSignature = function() {
    if(config.output === 'curves') {
        var url = 'data:image/svg+xml;base64,' + btoa(paper.project.exportSVG({ asString: true }));
        var filename = 'Signature.svg';
    } else if(config.output === 'pixels') {
        var url = previewCanvas.toDataURL();
        var filename = 'Signature.png';
    }
    var aLink = document.createElement('a');
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, false);
    aLink.download = filename;
    aLink.href = url;
    aLink.dispatchEvent(evt);
    aLink.remove();
}

var configure = function(cfg) {
    for(var c in cfg) {
        config[c] = cfg[c];
    }
    worker.postMessage({
        op: 'config',
        config: config
    });
}

var process = function() {
    if (!Webcam.loaded || document.hidden) {
        setTimeout((function(fn) {
            return fn;
        })(process), 30);
        return;
    } else {
        Webcam.snap((function(ctx) {
            return function() {
                var img = ctx.getImageData(selector.cl, selector.ct, selector.cw, selector.ch);
                worker.postImg(img);
            };
        })(oriCtx), oriCanvas);
    }
};
    
var Selector = function() {
    var self = this;
    var preX = 180;
    var preY = 101;
    var preW = 120;
    var preH = 67;
    self.cl = preX / 480 * final_width;
    self.ct = preY / 270 * final_height;
    self.cw = preW / 480 * final_width;
    self.ch = preH / 270 * final_height;
    var startX = preX;
    var startY = preY;
    var endX = preX + preW;
    var endY = preY + preH;
    var moving = false;
    var selecting = false;
    var select = $('#select');
    var refreshSelect = function() {
        if(moving||selecting) {
            select.css({
                top: Math.min(startY, endY) + 'px',
                left: Math.min(startX, endX) + 'px',
                width: Math.abs(endX - startX) + 'px',
                height: Math.abs(endY - startY) + 'px'
            });
        } else {
            select.css({
                top: preY + 'px',
                left: preX + 'px',
                width: preW + 'px',
                height: preH + 'px'
            });
        }
    }
    var selectStart = function(x, y) {
        selecting = true;
        startX = x;
        endX = x;
        startY = y;
        endY = y;
        refreshSelect();
    };
    var selectEnd = function() {
        if(selecting && ! moving) {
            selecting = false;
            if(Math.abs((endX - startX) * (endY - startY)) < 480 * 2) {
                startX = preX;
                startY = preY;
                endX = preX + preW;
                endY = preY + preH;
                console.log('Selection too small. ');
            } else {
                preX = Math.min(startX, endX);
                preY = Math.min(startY, endY);
                preW = Math.abs(endX - startX);
                preH = Math.abs(endY - startY);
                self.cl = preX / 480 * final_width;
                self.ct = preY / 270 * final_height;
                self.cw = preW / 480 * final_width;
                self.ch = preH / 270 * final_height;
            }
        }
        refreshSelect();
    }
    var selectSelecting = function(e) {
        endX = e.pageX - crop.offset().left;
        endY = e.pageY - crop.offset().top;
        refreshSelect();
    }
    var crop = $('#crop');
    crop.on({
        mousedown: function(e) {
            selectStart(e.pageX - crop.offset().left, e.pageY - crop.offset().top);
        }, 
        mouseup: function() {
            if(selecting) {
                selectEnd();
            } else if(moving) {
                moveEnd();
            }
        }, 
        mouseleave: function() {
            if(selecting) {
                selectEnd();
            } else if(moving) {
                moveEnd();
            }
        },
        mousemove: function(e) {
            if(selecting) {
                selectSelecting(e);
            } else if(moving) {
                selectMoving(e);
            }
        }
    });
    var preL = 0;
    var preT = 0;
    var moveStart = function(x, y) {
        moving = true;
        preL = x;
        preT = y;
        refreshSelect();
    };
    var moveEnd = function() {
        if(moving && !selecting) {
            moving = false;
            preX = Math.min(startX, endX);
            preY = Math.min(startY, endY);
            preW = Math.abs(endX - startX);
            preH = Math.abs(endY - startY);
            startX = preX;
            startY = preY;
            endX = preX + preW;
            endY = preY + preH;
            self.cl = preX / 480 * final_width;
            self.ct = preY / 270 * final_height;
            self.cw = preW / 480 * final_width;
            self.ch = preH / 270 * final_height;
        }
        refreshSelect();
    }
    var selectMoving = function(e) {
        if(moving) {
            var tmpStart = startX;
            var tmpEnd = endX;
            if(preL - e.clientX > startX) {
                startX = 0;
                endX = tmpEnd - tmpStart;
            } else if(e.clientX - preL > 479 - endX) {
                endX = 479;
                startX = 479 - tmpEnd + tmpStart;
            } else {
                startX = Math.min(tmpStart, tmpEnd) + e.clientX - preL;
                endX = Math.max(tmpStart, tmpEnd) + e.clientX - preL;
            }
            preL = e.clientX;
            tmpStart = startY;
            tmpEnd = endY;
            if(preT - e.clientY > startY) {
                startY = 0;
                endY = tmpEnd - tmpStart;
            } else if(e.clientY - preT > 269 - endY) {
                endY = 269;
                startY = 269 - tmpEnd + tmpStart;
            } else {
                startY = Math.min(tmpStart, tmpEnd) + e.clientY - preT;
                endY = Math.max(tmpStart, tmpEnd) + e.clientY - preT;
            }
            preT = e.clientY;
            e.stopPropagation();
            refreshSelect();
        }
    };
    select.on({
        mousedown: function(e) {
            moveStart(e.clientX, e.clientY);
            e.stopPropagation();
        },
        mouseup: function(e) {
            if(selecting) {
                selectEnd();
            } else if(moving) {
                moveEnd();
            }
            e.stopPropagation();
        },
        mousemove: function(e) {
            if(selecting) {
                selectSelecting(e);
            } else if(moving) {
                selectMoving(e);
            }
        }
    });
    refreshSelect();
};

var selector;
var worker;

$(document).ready(function() {
    Webcam.attach('#cam');
    paper.setup(previewCanvas);

    worker = new Worker('assets/sigcap/js/sigcap.worker.js');
    worker.onmessage = function(data) {
        data = data.data;
        var w;
        var h;
        var t;
        var l;
        var s;
        var r = selector.cw / selector.ch;
        if(r > 16 / 9) {
            s = selector.cw / 416;
            w = 416;
            h = 416 / r;
            t = 18 + (234 - h) / 2;
            l = 32;
        } else {
            s = selector.ch / 234;
            w = 234 * r;
            h = 234;
            t = 18;
            l = 32 + (416 - w) / 2;
        }
        if(data.op === 'dat') {
            filteredCtx.putImageData(data.img, 0, 0);
            previewCtx.fillStyle = "white";
            previewCtx.fillRect(0, 0, 480, 270);
            previewCtx.drawImage(filteredCanvas, 0, 0, data.img.width, data.img.height, l, t, w, h);
        } else if(data.op === 'vec') {
            paper.project.clear();
            var dat = JSON.parse(data.vec)
            for(var plg in dat) {
                var path = new paper.Path();
                path.strokeColor = 'black';
                if(dat[plg].arg < 0) {
                    path.fillColor = 'rgba(255, 126, 0, 0.5)'; 
                } else {
                    path.fillColor = 'rgba(255, 255, 255, 0.5)';
                }
                path.moveTo(dat[plg].dat[0].x + l, dat[plg].dat[0].y + t);
                for(var pnt = 1; pnt < dat[plg].dat.length - 1; pnt ++) {
                    path.lineTo(dat[plg].dat[pnt].x + l, dat[plg].dat[pnt].y + t);
                    path.closePath();
                }
                path.simplify(2.5);
                path.scale(1 / s, new paper.Point(l, t));
                paper.view.draw();
            }
        }
        worker.busy = false;
        process();
    };
    
    worker.postImg = function(img) {
        if(worker.busy) {
            return ;
        }
        worker.busy = true;
        worker.postMessage({
            op: 'dat',
            img: img
        });
    }
    worker.busy = false;

    configure();
    process();
    selector = new Selector();
});
