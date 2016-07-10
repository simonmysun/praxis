onmessage = function(data) {
    data = data.data;
    if(data.op === 'config') {
        for(var c in data.config) {
            config[c] = data.config[c];
        }
    } else {
        process(data.img);
    }
};

config = {};

var Polygon = function() {
    var self = this;
    self.dat = [];
    self.push = function(d) {
        self.dat.push(d);
    };
    self.arg = 0;
    self.endPos = function(x, y, dir) {
        if(dir === 3) {
            return {
                x: x,
                y: y
            };
        } else if(dir === 2) {
            return {
                x: x,
                y: y
            };
        } else if(dir === 1) {
            return {
                x: x + 1,
                y: y + 1
            };
        } else {
            return {
                x: x + 1,
                y: y
            };
        }
    };
    self.turnR = function(dir) {
        self.arg += 90;
        return (dir + 1) % 4;
    };
    self.turnL = function(dir) {
        self.arg -= 90;
        return (dir + 3) % 4;
    };
    self.lookForward = function(x, y, dir) {
        if(dir === 0) {
            return {
                x: x - 1,
                y: y,
                x1: x - 1,
                y1: y - 1
            };
        }
        if(dir === 1) {
            return {
                x: x,
                y: y - 1,
                x1: x + 1,
                y1: y - 1
            };
        }
        if(dir === 2) {
            return {
                x: x + 1,
                y: y,
                x1: x + 1,
                y1: y + 1
            };
        }
        if(dir === 3) {
            return {
                x: x,
                y: y + 1,
                x1: x - 1,
                y1: y + 1
            };
        }
    };
    self.travel = function(x, y, dir, img, vis) {
        var id = img.getIdx(x, y);
        var start = id;
        var flag = true;
        while(flag || !(img.getIdx(x, y) === start && dir === 3)) {
            if(x === 0 || x === img.width - 1 || y === 0 || y === img.height - 1) {
                return 0;
            }
            flag = false;
            next = self.lookForward(x, y, dir);
            vis[img.getIdx(x,y)] = 1;
            if(img.get(next.x1, next.y1) === 0) {
                self.push(self.endPos(next.x1, next.y1, dir));
                dir = self.turnR(dir);
                x = next.x1;
                y = next.y1;
            } else if(img.get(next.x, next.y) === 0) {
                self.push(self.endPos(next.x, next.y, dir));
                x = next.x;
                y = next.y;
            } else {
                dir = self.turnL(dir);
                self.push(self.endPos(x, y, dir));
            }
        }
        return 1;
    }
    return self;
}

var Image = function(width, height, bits) {
    var self = this;
    self.width = width;
    self.height = height;
    self.data = new Uint8ClampedArray(self.width * self.height * bits);
    self.getIdx = function(x, y) {
        return x + y * self.width;
    };
    self.getPos = function(idx) {
        return [idx % self.width, Math.floor(idx / self.width)];
    };
    self.get = function(x, y) {
        return self.data[self.getIdx(x, y)];
    }
    return self;
}

var ImageSum = function(width, height) {
    var self = this;
    self.width = width;
    self.height = height;
    self.data = new Uint32Array((self.width + 1) * (self.height + 1));
    self.getIdx = function(x, y) {
        return x + y * (self.width + 1);
    };
    self.getPos = function(idx) {
        return [idx % (self.width + 1), Math.floor(idx / (self.width + 1))];
    };
    self.get = function(x, y) {
        return self.data[self.getIdx(x, y)];
    }
    self.init = function(img) {
        for(var y = 1; y <= self.height; y ++) {
            for(var x = 1; x <= self.width; x ++) {
                self.data[self.getIdx(x, y)] =
                    + self.get(x - 1, y)
                    + self.get(x, y - 1)
                    - self.get(x - 1, y - 1)
                    + img.get(x - 1, y - 1);
            }
        }
    };
    self.getAvg = function(x1, y1, x2, y2) {
        return (
                + self.get(x2 + 1, y2 + 1)
                - self.get(x1, y2 + 1)
                - self.get(x2 + 1, y1)
                + self.get(x1, y1)
        ) / (
            (x2 - x1 + 1) * (y2 - y1 + 1)
        );
    };
    self.getThreshold = function(x, y, window) {
        var top = y - window;
        var right = x + window;
        var bottom = y + window;
        var left = x - window;
        if(top < 0) {
            top = 0;
        }
        if(right >= self.width - 1) {
            right = self.width - 1;
        }
        if(bottom >= self.height - 1) {
            bottom = self.height - 1;
        }
        if(left < 0) {
            left = 0;
        }
        return self.getAvg(left, top, right, bottom);
    };
    return self;
}

var process = function(img) {
    var ret = grayScale(img);
    ret = dynamicBinarize(ret);
    if(config.output === 'curves') {
        var vec = vectorize(ret);
        postMessage({
            op: 'vec', 
            vec: JSON.stringify(vec)
        });
    } else if(config.output === 'pixels') {
        ret = gray2rgb(ret);
        postMessage({
            op: 'dat', 
            img: new ImageData(ret.data, ret.width, ret.height)
        });
    }
};

var grayScale = function(img) {
    var ret = new Image(img.width, img.height, 1);
    var len = ret.data.length;
    for(var i = 0; i < len; i ++) {
        ret.data[i] = img.data[i * 4] * 0.7 + img.data[i * 4 + 1] * 0.2 + img.data[i * 4 + 2] * 0.1;
    }
    return ret;
};

var binarize = function(img) {
    var ret = new Image(img.width, img.height, 1);
    var len = ret.data.length;
    var threshold = 127;
    for(var i = 0; i < len; i ++) {
        ret.data[i] = img.data[i] <= threshold ? 0 : 255;
    }
    return ret;
};

var dynamicBinarize = function(img) {
    var ret = new Image(img.width, img.height, 1);
    var wdw = [
        Math.floor(0.01 * ret.width),
        Math.floor(0.03 * ret.width),
        Math.floor(0.09 * ret.width),
        Math.floor(0.27 * ret.width)
    ];
    var wdwWeight = [
        0.4,
        0.3,
        0.2,
        0.1
    ];
    var sum = new ImageSum(img.width, img.height);
    sum.init(img);
    var globalThreshold = 0.7 * sum.getAvg(0, 0, ret.width - 1, ret.height - 1) + 0.3 * 127;
    for(var y = 0; y < ret.height; y ++) {
        for(var x = 0; x < ret.width; x ++) {
            var idx = ret.getIdx(x, y);
            var threshold = 0.8 * wdw.reduce(function(pre, cur, idx) {
                return pre + sum.getThreshold(x, y, cur) * wdwWeight[idx];
            }) + 0.2 * globalThreshold;
            ret.data[idx] = img.data[idx] < threshold ? 0 : 255;
            //ret.data[idx] = threshold;
        }
    }
    return ret;
}

var gray2rgb = function(img) {
    var ret = new Image(img.width, img.height, 4);
    var len = ret.data.length;
    for(var i = 0; i < len / 4; i ++) { 
        ret.data[i * 4 + 0] = img.data[i];
        ret.data[i * 4 + 1] = img.data[i];
        ret.data[i * 4 + 2] = img.data[i];
        ret.data[i * 4 + 3] = 255;
    }
    return ret;
};

var vectorize = function(img) {
    var polygons = [];
    var vis = new Uint8ClampedArray(img.width * img.height);
    for(var y = 1; y < img.height - 1; y ++) {
        for(var x = 1; x < img.width - 1; x ++) {
            var id = img.getIdx(x, y);
            if(vis[id] === 1) {
                while(img.get(x, y) === 0 && x < img.width) {
                    x ++;
                }
                continue;
            }
            if(img.data[id] === 0 && img.data[id - 1] === 255) {
                var polygon = new Polygon();
                polygon.push({
                    x: x,
                    y: y
                });
                polygon.push({
                    x: x,
                    y: y + 1
                });
                // along the right side from
                //  ----<----
                //  |   0   |
                //  |3     1A
                // \V/  2   |
                //  ---->----
                if(polygon.travel(x, y, 3, img, vis) === 1) {
                    polygons.push(polygon);
                }
            }
        }
    }
    return polygons;
}
