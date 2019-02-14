function init(w, h) {
    var previousDirection = 2;
    var out = false;
    return function(snake, food) {
        var head = snake[0];
        if(out) {
            if(previousDirection === 3 && snake[0].y === h - 1) {
                previousDirection = 0;
                out = false;
                return previousDirection;
            }
            if(previousDirection === 3) {
                return previousDirection;
            }
            if(previousDirection === 0) {
                previousDirection = 3;
                return previousDirection;
            }
            if(previousDirection === 1 && snake[0].y > food[0].y && food[0].x === snake[0].x) {
                return previousDirection;
            }
            previousDirection = 0;
            return previousDirection;
        } else {
            if(snake[0].x === 0 && snake[0].y === 0) {
                previousDirection = 2;
                return previousDirection;
            }
            if(snake[0].x === w - 1 && snake[0].y === 0) {
                previousDirection = 3;
                return previousDirection;
            }
            if(snake[0].x === 0 && snake[0].y === h - 1) {
                previousDirection = 1;
                return previousDirection;
            }
            if(snake[0].x === w - 1 && snake[0].y === h - 1) {
                previousDirection = 0;
                return previousDirection;
            }
            if(snake[0].x === food[0].x && snake[0].y === h - 1) {
                out = true;
                previousDirection = 1;
                return previousDirection;
            }
            return previousDirection;
        }
    };
}
