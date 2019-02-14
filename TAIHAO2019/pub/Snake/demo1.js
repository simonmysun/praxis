function init(w, h) {
    return function(snake, food) {
        if(snake[0].y === 0) {
            if(snake[0].x === w - 1) {
                return 3;
            } else {
                return 2;
            }
        } else if(snake[0].y === 1) {
            if(snake[0].x === 0) {
                return 1;
            } else if(snake[0].x % 2 === 1) {
                return 3;
            } else {
                return 0;
            }
        } else if(snake[0].y === h - 1) {
            if(snake[0].x % 2 === 0) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if(snake[0].x % 2 === 0) {
                return 1;
            } else {
                return 3;
            }
        }
    };
}
