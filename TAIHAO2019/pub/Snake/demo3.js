function init(w,h) {
    var minMap = [];
    var nextFood;
    var bfsqueue;
    for(var x = 0; x < w; x ++ ) {
        minMap[x] = [];
        for(var y = 0; y < h; y ++ ) {
            minMap[x][y] = 99999999;
        }
    }

    function clearMap() {
    for(var x in minMap) {
        for(var y in minMap[x]) {
        minMap[x][y] = 99999999;
        }
    }
    }

    function legal(x, y) {
    if(x >= w || x <= -1 || y >= h || y <= -1) {
        return false;
    } else {
        return true;
    }
    }
    function checkCollision(x, y, s) {
        for(var p in s) {
            if(x === s[p].x && y === s[p].y) {
                return true;
            }
        }
        return false;
    }
    
    function bfs(loc) {
        bfsqueue = [];
        bfsqueue.push({
            x: loc.x
            ,y: loc.y
            ,dist: 0
        });
        while(bfsqueue.length > 0) {
            loc = bfsqueue.shift();
            if(legal(loc.x, loc.y) == false) {
                continue;
            }
            if(checkCollision(loc.x, loc.y)) {
                minMap[loc.x][loc.y] = -1;
                continue;
            }
            if(minMap[loc.x][loc.y] != 99999999) {
                continue;
            }
            minMap[loc.x][loc.y] = loc.dist;
            bfsqueue.push({
                x: loc.x
                ,y: loc.y - 1
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x
                ,y: loc.y + 1
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x - 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x + 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
        }
    }
    
    return function(snake, food) {
        head = snake[0];
        if(nextFood == undefined) {
            nextFood = food[0];
        }
        if(minMap == undefined) {
            minMap = [];
            for(var x = 0; x < width; x ++ ) {
                minMap[x] = [];
                for(var y = 0; y < height; y ++ ) {
                    minMap[x][y] = 99999999;
                }
            }
            bfs(food[0]);
        }
        if(food[0].x != nextFood.x || food[0].y != nextFood.y) {
            clearMap();
            bfs(food[0]);
            nextFood = food[0];
        }
        var minDirect = 2;
        var minDist = 99999999;
        if(legal(head.x + 1, head.y)) {
            if(checkCollision(head.x + 1, head.y) == false) {
                if(minDist > minMap[head.x + 1][head.y] && minMap[head.x + 1][head.y] != -1) {
                    minDirect = 2;
                    minDist = minMap[head.x + 1][head.y];
                }
            }
        }
        if(legal(head.x - 1, head.y)) {
            if(checkCollision(head.x - 1, head.y) == false) {
                if(minDist > minMap[head.x - 1][head.y] && minMap[head.x - 1][head.y] != -1) {
                    minDirect = 0;
                    minDist = minMap[head.x - 1][head.y];
                }
            }
        }
        if(legal(head.x, head.y + 1)) {
            if(checkCollision(head.x, head.y + 1) == false) {
                if(minDist > minMap[head.x][head.y + 1] && minMap[head.x][head.y + 1] != -1) {
                    minDirect = 3;
                    minDist = minMap[head.x][head.y + 1];
                }
            }
        }
        if(legal(head.x, head.y - 1)) {
            if(checkCollision(head.x, head.y - 1) == false) {
                if(minDist > minMap[head.x][head.y - 1] && minMap[head.x][head.y - 1] != -1) {
                    minDirect = 1;
                    minDist = minMap[head.x][head.y - 1];
                }
            }
        }
        return minDirect;
    };
}
