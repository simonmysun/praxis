var model;
var classNames = [];
var stories;

var txtDisp = document.getElementById('text');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
// ctx.fillStyle = '#fff'
// ctx.fillRect(0, 0, 600, 600);
ctx.lineWidth = 20;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = '#ffeaca';

var dpi = window.devicePixelRatio;

var painted = false;
var mouseDown = false;
var lastPosition = {
    x: 0,
    y: 0
};
var bound = {
    maxX: -1,
    maxY: -1,
    minX: 999,
    minY: 999,
};
var updateBound = function(x, y) {
    bound.maxX = Math.max(bound.maxX, x);
    bound.maxY = Math.max(bound.maxY, y);
    bound.minX = Math.min(bound.minX, x);
    bound.minY = Math.min(bound.minY, y);
};
canvas.addEventListener('mouseup', e => {
    mouseDown = false;
    process();
});
canvas.addEventListener('mouseout', e => {
    mouseDown = false;
    process();
});
canvas.addEventListener('mousedown', e => {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    updateBound(x, y);
    lastPosition = {
        x: x,
        y: y
    };
    mouseDown = true;
});
canvas.addEventListener('mousemove', e => {
    if(mouseDown) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        updateBound(x, y);
        painted = true;
        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastPosition = {
            x: x,
            y: y
        };
    }
});

var throttle = function(fn) {
    var timer = -1;
    return function() {
        if(timer !== -1) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, 1000);
    }
}; 


var process = throttle(function() {
    if(painted) {
        var imgData = ctx.getImageData(bound.minX, bound.minY, bound.maxX - bound.minX, bound.maxY - bound.minY);
        for(var i = 0; i < imgData.data.length; i += 4) {
            if(imgData.data[i + 3] === 0) {
                imgData.data[i] = 255;
                imgData.data[i + 1] = 255;
                imgData.data[i + 2] = 255;
                imgData.data[i + 3] = 255;
            } else {
                imgData.data[i] = 0;
                imgData.data[i + 1] = 0;
                imgData.data[i + 2] = 0;
                imgData.data[i + 3] = 255;
            }
            
        }
        prediction = model.predict(tf.tidy(() => {
            let tensor = tf.fromPixels(imgData, numChannels = 1);
            const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
            const offset = tf.scalar(255.0);
            const normalized = tf.scalar(1.0).sub(resized.div(offset));
            const batched = normalized.expandDims(0);
            return batched;
        })).dataSync();
        var res = Array.from(prediction).map((x, i) => {
            return {
                name: classNames[i],
                prediction: x
            };
        });
        res.sort((a, b) => (b.prediction - a.prediction));
        console.log(res);
        if(res[0].prediction < 0.2) {
            txtDisp.innerText = 'I don\'t understand. ';
        } else {
            if(stories[res[0].name].length > 0) {
                txtDisp.innerText = res[0].name + ': ' + stories[res[0].name];
            } else {
                txtDisp.innerText = `${res[0].name}: I guess it is a${'aeiou'.indexOf(res[0].name[0]) === -1 ? '' : 'n'} ${res[0].name}? But I didn\'t see it in this forest. `;
            }
        }
    }
});


async function init() {
    fetch('./model/class_names.txt').then(res => res.text()).then(txt => {
        classNames = txt.split('\n').slice(0, -1);
    });

    fetch('./stories.txt').then(res => res.text()).then(txt => {
        stories = {};
        txt.split('\n').map(x => x.split(':')).map(x => {
            stories[x[0]] = x[1];
        });
    });

    model = await tf.loadModel('model/model.json');
    model.predict(tf.zeros([1, 28, 28, 1]));
}

init();

document.getElementById('reset').addEventListener('click', e => {
    painted = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('download').addEventListener('click', e => {
    var canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    var context = canvas.getContext('2d');

    var img = document.getElementById('img');
    context.drawImage(img, 0, 0);
    var paint = ctx.getImageData(0, 0, 600, 600);
    createImageBitmap(paint).then(function(imgBitmap) {
        context.drawImage(imgBitmap, 1280 - 600 - 60, 720 - 600 - 30);
        canvas.toBlob(function(blob){
            url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', 'export.png');
            var b = document.createEvent('MouseEvents');
            b.initEvent('click', false, true);
            a.dispatchEvent(b);
            console.log(blob);
            console.log(url);
        },'image/png');
    });
});
