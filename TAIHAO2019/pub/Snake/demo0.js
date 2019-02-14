function init(w, h) {
    var dir = 'right'
    return function(snake, food) {
        if(dir === 'right') {
            dir = 'down';
            return 3;
        } else {
            dir = 'right';
            return 2;
        }
    }
}
