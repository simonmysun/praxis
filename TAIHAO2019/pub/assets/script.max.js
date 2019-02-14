/*

  This file includes all the validations of the game. It is not recommanded to hack. However, if you really do so, you might get three keys from it without solving the problems themselves. That will be too easy and less interesting. 

*/

var base = '^.*/TAIHAO2019/pub';
var para = '(\\?.*)?';

var addAchievement = function(name, description) {
    var status = JSON.parse(localStorage.status);
    if(status.achievements.map(x => x.name).indexOf(name) === -1) {
        status.achievements.push({
            name: name,
            description: description
        });
    }
    localStorage.status = JSON.stringify(status);
};

var getStatus = function(id) {
    var status = JSON.parse(localStorage.status);
    return status[id];
};

var setStatus = function(id, n) {
    if(getStatus(id) === n) {
        return;
    }
    var status = JSON.parse(localStorage.status);
    if((id !== 'd' && n === 1) || n > 10) {
        var sumSolved = 0;
        sumSolved += status.a > 0 ? 1: 0;
        sumSolved += status.b > 0 ? 1: 0;
        sumSolved += status.c > 0 ? 1: 0;
        sumSolved += status.d > 0 ? 1: 0;
        sumSolved += status.e > 0 ? 1: 0;
        if(sumSolved === 0) {
            addAchievement('First Blood', 'Solving first problem');
            status = JSON.parse(localStorage.status);
        }
        if(sumSolved === 3) {
            addAchievement('Further', '4 / 5');
            status = JSON.parse(localStorage.status);
        }
        if(sumSolved === 4) {
            addAchievement('AK(All Killed)', 'All problems solved');
            status = JSON.parse(localStorage.status);
        }
    }
    if(n === 0) {
        var sumUnsolved = 0;
        sumUnsolved += status.a === 0 ? 1: 0;
        sumUnsolved += status.b === 0 ? 1: 0;
        sumUnsolved += status.c === 0 ? 1: 0;
        sumUnsolved += status.d === 0 ? 1: 0;
        sumUnsolved += status.e === 0 ? 1: 0;
        if(sumUnsolved > 1) {
            addAchievement('Parallelization', 'Trying to solve three problems at the same time');
            status = JSON.parse(localStorage.status);
        }
    }
    status[id] = n;
    localStorage.status = JSON.stringify(status);
};

var routes = [
    {
        path: '.*',
        init: () => {
            window.MathJax = {
                tex2jax: {
                    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                    processEscapes: true
                }
            };
            if(localStorage.status === undefined) {
                localStorage.status = JSON.stringify({
                    a: -1, // -1: unopened; 0: opened, unsolved, 1+: solved
                    b: -1,
                    c: -1,
                    d: -1,
                    e: -1,
                    achievements: []
                });
            }
        }
    },
    {
        path: '/(index\.html)?',
        init: () => {
            document.getElementsByTagName('form')[0].setAttribute('onsubmit', 'return validate()');
            window.validate = () => {
                var el = document.getElementsByTagName('input')[0];
                var answer = el.value;
                if(md5(answer + '\n') === 'f30bc8b9f9d0459116656b9ff5e5a61b') {
                    alert('Success! ');
                } else {
                    alert('Fail. ');
                }
                return false;
            }
            var status = JSON.parse(localStorage.status);
            if(status.achievements.length > 0) {
                var h = document.createElement('h2');
                h.innerHTML = 'Achievements: ';
                var el = document.getElementById('nau');
                el.parentNode.insertBefore(h, el);
                document.getElementById('nau').innerHTML = status.achievements.map(x => `<li>${x.name}: ${x.description}</li>`).join('');
            }
        }
    },
    {
        path: '/Poker/(index\.html)?',
        init: () => {
            if(getStatus('a') === -1) {
                setStatus('a', 0);
            }
            document.getElementsByTagName('form')[0].setAttribute('onsubmit', 'return validate()');
            window.validate = () => {
                var el = document.getElementsByTagName('input')[0];
                var answer = el.value;
                if(md5(answer + '\n') === '5133624be1ee45e8fb8cd97a3fa48a35') {
                    alert('Success! The key is '+ (answer.split('').map(x => x.charCodeAt(0)).reduce((a, c) => (a * 13 + c) % 6091) * 23 + 691) + '. ');
                    setStatus('a', 1);
                    addAchievement('Poker Master', 'Finishing "Poker"');
                } else {
                    alert('Fail. ');
                }
                return false;
            }
        }
    },
    {
        path: '/Multiplication/(index.html)?',
        init: () => {
            if(getStatus('b') === -1) {
                setStatus('b', 0);
            }
            Array.from(document.getElementsByTagName('li')).map(li => li.setAttribute('data-ori', li.innerText));
            document.getElementsByTagName('input')[0].setAttribute('onchange', 'validate()');
            document.getElementsByTagName('input')[0].setAttribute('onkeyup', 'validate()');
            window.validate = function() {
                var text = document.getElementsByTagName('input')[0].value;
                if(text.length > 200) {
                    addAchievement('Regex Beginners', 'More-than-200-characters Regex');
                }
                var regex = new RegExp(text);
                var numFail = 0;
                Array.from(document.getElementsByTagName('li')).map(li => {
                    li.innerHTML = li.getAttribute('data-ori').replace(regex, '<b><u>$&</u></b>');
                    if(li.innerHTML === li.getAttribute('data-ori')) {
                        li.innerHTML += ' <small>(not matched)</small>';
                        li.classList.remove('matched');
                        li.classList.add('unmatched');
                        if(li.classList.contains('match')) {
                            numFail += 1;
                        }
                    } else {
                        li.classList.remove('unmatched');
                        li.classList.add('matched');
                        if(li.classList.contains('unmatch')) {
                            numFail += 1;
                        }
                    }
                });
                if(numFail === 0) {
                    console.log('presuccess');
                    for(var i = 1; i <= 12; i += 1) {
                        for(var j = 1; j <= 12; j += 1) {
                            for(var k = 1; k <= 144; k += 1) {
                                var test = '';
                                test += new Array(i).fill('x').join('');
                                test += '*';
                                test += new Array(j).fill('x').join('');
                                test += '=';
                                test += new Array(k).fill('x').join('');
                                var res = test.replace(regex, '<b><u>$&</u></b>');
                                if((i * j === k) === (test === res)) {
                                    if(i * j === k) {
                                        document.getElementById('should').innerHTML += `<li class="match" data-ori="${test}"></li>`;
                                        validate();
                                        return;
                                    } else {
                                        document.getElementById('should-not').innerHTML += `<li class="unmatch" data-ori="${test}"></li>`;
                                        validate();
                                        return;
                                    }
                                }
                            }
                        }
                    }
                    setStatus('b', 1);
                    addAchievement('I Know Regex', 'Finishing "Multiplication"');
                    alert('Success! The key is ' + `${2*2}${2}${2}` + '. ');
                }
            };
        }
    },
    {
        path: '/Snake/(index\.html)?',
        init: () => {
            if(getStatus('c') === -1) {
                setStatus('c', 0);
            }
            var editor = ace.edit('editor');
            editor.setTheme('ace/theme/monokai');
            editor.session.setMode('ace/mode/javascript');
            if(localStorage.aceRecover === undefined) {
                localStorage.aceRecover = `function init(w, h) {
                    return function(snake, food) {
                    }
                }`;
            }
            editor.session.setValue(localStorage.aceRecover);
            editor.session.on('change', function(delta) {
                localStorage.aceRecover = editor.getValue();
                if(editor.session.getLength() >= 1000) {
                    addAchievement('LOC 1000', '1000+ lines of code in "Snake"');
                }
            });
            var canvas = document.getElementsByTagName('canvas')[0];
            var ctx = canvas.getContext('2d');
            var cellWidth = canvas.width / 20;
            var Para = function() {
                this.delay = 300;
            };
            var para = new Para();
            var gui = new dat.GUI();
            gui.add(para, 'delay', 0, 500);
            var w = 20;
            var h = 15;
            var roundScore = 0;
            var finalScore = 0;
            var steps = 10000;
            var food = [];
            var snake = [];
            var lastDir = {
                dx: 1,
                dy: 0
            };
            var initSnake = function() {
                snake = [
                    {
                        x: 4,
                        y: 0
                    },
                    {
                        x: 3,
                        y: 0
                    },
                    {
                        x: 2,
                        y: 0
                    },
                    {
                        x: 1,
                        y: 0
                    },
                    {
                        x: 0,
                        y: 0
                    }
                ];
            };
            initSnake();
            var getColor = function(i) {
                var center = 144;
                var width = 117;
                var freq = 0.27;
                return [
                    Math.sin(freq * i + Math.PI * 1 / 3) * width + center,
                    Math.sin(freq * i + Math.PI * 3 / 3) * width + center,
                    Math.sin(freq * i + Math.PI * 5 / 3) * width + center
                ];
            };
            var octacon = [];
            var stats2 = new Stats();
            stats2.showPanel(0);
            stats2.dom.style.position = 'fixed';
            stats2.dom.style.top = 'auto';
            stats2.dom.style.right = '0';
            stats2.dom.style.bottom = '48px';
            stats2.dom.style.left = 'auto';
            document.body.appendChild(stats2.dom);
            var render = function() {
                stats2.begin();
                ctx.fillStyle = '#111';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#333';
                ctx.font = canvas.height * 0.85 + 'px Impact, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(roundScore.toString(), canvas.width / 2, canvas.height * .95);
                ctx.font = canvas.height * 0.1 + 'px Impact, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(finalScore.toString(), canvas.width / 2, canvas.height * .24);

                ctx.font = canvas.height * 0.1 + 'px Impact, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(steps.toString(), canvas.width / 2, canvas.height * .12);
                for(var p in food) {
                    var x = food[p].x;
                    var y = food[p].y;
                    ctx.fillStyle = '#0074D9';
                    ctx.strokeStyle = 'white';
                    ctx.beginPath();
                    ctx.moveTo(x * cellWidth + octacon[0][0], y * cellWidth + octacon[1][0]);
                    for(var i = 1; i < 8; i += 1){
                        ctx.lineTo(x * cellWidth + octacon[0][i], y * cellWidth + octacon[1][i]);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
                for(var p in snake) {
                    var x = snake[p].x;
                    var y = snake[p].y;
                    var color = getColor(p);
                    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${(1 - 0.7 * (p / snake.length)).toString()})`;
                    ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
                    ctx.strokeStyle = 'white';
                    ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
                }
                stats2.end();
                requestAnimationFrame(render);
            };
            window.addEventListener('resize', () => {
                canvas.width = window.innerHeight * 4 / 3;
                canvas.height = window.innerHeight;
                cellWidth = canvas.width / 20;
                octacon = [
                    [
                        (1 + Math.sin(0.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.sin(1.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.sin(2.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.sin(3.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.sin(4.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.sin(5.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.sin(6.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.sin(7.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2
                    ],
                    [
                        (1 + Math.cos(0.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.cos(1.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.cos(2.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.cos(3.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.cos(4.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.cos(5.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.cos(6.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2,
                        (1 + Math.cos(7.5 * Math.PI * 2 / 8) * 0.8) * cellWidth / 2
                    ]
                ];                
                render();
            });
            window.dispatchEvent(new Event('resize'));
            requestAnimationFrame(render);
            var keyPressed = [];
            document.body.addEventListener('keydown', function (e) {
                if(e.keyCode > 36 && e.keyCode < 41) {
                    if(keyPressed.indexOf(e.keyCode) === -1) {
                        keyPressed.push(e.keyCode);
                        var key = 1 << (keyPressed[keyPressed.length - 1] - 37);
                        lastDir = {
                            dx: !!(key & 4) - !!(key & 1),
                            dy: !!(key & 8) - !!(key & 2)
                        };
                    }
                }
            });
            document.body.addEventListener('keyup', function (e) {
                if(e.keyCode > 36 && e.keyCode < 41) {
                    keyPressed = keyPressed.filter(x => x != e.keyCode);
                    if(keyPressed.length > 0) {
                        var key = 1 << (keyPressed[keyPressed.length - 1] - 37);
                        lastDir = {
                            dx: !!(key & 4) - !!(key & 1),
                            dy: !!(key & 8) - !!(key & 2)
                        };
                    }
                }
            });
            var accessible = function(x, y) {
                if(x < 0 || y < 0 || x >= w || y >= h) {
                    return false;
                }
                for(var p in snake) {
                    if(x === snake[p].x && y === snake[p].y) {
                        return false;
                    }
                }
                return true;
            };
            var addFood = function() {
                var empty = [];
                for(var i = 0; i < w; i += 1) {
                    for(var j = 0; j < h; j += 1) {
                        if(accessible(i, j)) {
                            empty.push({
                                x: i,
                                y: j
                            });
                        }
                    }
                }
                var random = Math.floor(Math.random() * empty.length);
                if(empty.length > 0) {
                    food.push({
                        x: empty[random].x,
                        y: empty[random].y
                    });
                }
            };
            addFood();
            var dir = function() {
                if(keyPressed.length > 0) {
                    var key = 1 << (keyPressed[keyPressed.length - 1] - 37);
                    lastDir = {
                        dx: !!(key & 4) - !!(key & 1),
                        dy: !!(key & 8) - !!(key & 2)
                    };
                }
                return lastDir;
            };
            var iterate = function() {
                steps -= 1;
                if(steps === 0) {
                    finalScore += roundScore * roundScore;
                    roundScore = 0;
                    initSnake();
                    food = [];
                    addFood();
                    lastDir = {
                        dx: 1,
                        dy: 0
                    };
                    if(finalScore >= 19000) {
                        var k = (finalScore / finalScore << 3) - 1;
                        alert('Success! The key is ' + (k * k * k * k * k - k - 1) + '.');
                        setStatus('c', 1);
                        addAchievement('AI Expert', 'Finishing "Snake"');
                    }
                    return;
                }
                var d = dir();
                var head = {
                    x: snake[0].x,
                    y: snake[0].y
                };
                if(head.x + d.dx === snake[1].x && head.y + d.dy === snake[1].y) {
                    d = {
                        dx: head.x - snake[1].x,
                        dy: head.y - snake[1].y
                    };
                }
                var tail = {
                    x: snake[snake.length - 1].x,
                    y: snake[snake.length - 1].y
                };
                if(!(accessible(snake[0].x + d.dx, snake[0].y + d.dy)
                     || (head.x + d.dx === tail.x &&
                         head.y + d.dy === tail.y)) || snake.length === w * h) {
                    finalScore += roundScore * roundScore;
                    roundScore = 0;
                    initSnake();
                    food = [];
                    addFood();
                    lastDir = {
                        dx: 1,
                        dy: 0
                    };
                    return;
                }
                var grow = false;
                for(var p in food) {
                    if(head.x + d.dx === food[p].x && head.y + d.dy === food[p].y) {
                        grow = true;
                        roundScore += 1;
                        food = food.filter((x, i) => i != p);
                        break;
                    }
                }
                for(var p = snake.length - 1; p > 0; p -= 1) {
                    snake[p] = {
                        x: snake[p - 1].x,
                        y: snake[p - 1].y
                    }
                }
                snake[0] = {
                    x: head.x + d.dx,
                    y: head.y + d.dy
                };
                if(grow) {
                    snake.push(tail);
                }
                if(food.length < 1) {
                    addFood();
                }
                return;
            };
            var stats = new Stats();
            stats.showPanel(1);
            stats.dom.style.top = 'auto';
            stats.dom.style.right = '0';
            stats.dom.style.bottom = '0';
            stats.dom.style.left = 'auto';
            document.body.appendChild(stats.dom);
            var startGame = function() {
                var worker = new Worker('./worker.js');
                stats.begin();
                worker.postMessage({
                    type: 'init',
                    scriptUrl: 'data:text/javascript;base64,' + btoa(editor.getValue()),
                    w: w,
                    h: h
                });
                worker.onmessage = function(m) {
                    var data = m.data;
                    if(data >= 0 || data === -1) {
                        if(data > 0) {
                            lastDir = {
                                dx: !!(data & 4) - !!(data & 1),
                                dy: !!(data & 8) - !!(data & 2)
                            };
                        }
                        iterate();
                        stats.end();
                        if(steps > 0) {
                            setTimeout(function() {
                                stats.begin();
                                worker.postMessage({
                                    type: 'next',
                                    data: JSON.stringify({
                                        snake: snake,
                                        food: food
                                    })
                                });
                            }, para.delay);
                        }
                    } else if(data === -10) {
                        worker.postMessage({
                            type: 'next',
                            data: JSON.stringify({
                                snake: snake,
                                food: food
                            })
                        });
                    }
                }
            };
            startGame();
            document.getElementById('game').addEventListener('click', function() {
                document.getElementsByClassName('intro')[0].classList.add('hidden');
                document.getElementsByClassName('editor')[0].classList.add('hidden');
            });
            document.getElementById('intro').addEventListener('click', function() {
                document.getElementsByClassName('intro')[0].classList.remove('hidden');
                document.getElementsByClassName('editor')[0].classList.add('hidden');
            });
            document.getElementById('code').addEventListener('click', function() {
                document.getElementsByClassName('intro')[0].classList.add('hidden');
                document.getElementsByClassName('editor')[0].classList.remove('hidden');
            });
        }
    },
    {
        path: '/SmallGame/(index\.html)?',
        init: () => {
            if(getStatus('d') === -1) {
                setStatus('d', 0);
            }
        }
    },
    {
        path: '/SmallGame/.*/(index\.html)?',
        init: () => {
            if(getStatus('d') < window.currentLevel - 1) {
                addAchievement('Advanced', 'Cut corners in "Small Game"');
            }
            setStatus('d', window.currentLevel);
            if(window.key !== undefined) {
                alert('Success! The key is ' + window.key + '. ');
                setStatus('d', 1);
                addAchievement('A small step to a hacker', 'Finishing "Small Game"');
            }
        }
    },
    {
        path: '/Quine/(index\.html)?',
        init: () => {
            if(getStatus('e') === -1) {
                setStatus('e', 0);
            }
            document.getElementById('source').setAttribute('onchange', 'update()');
            document.getElementById('source').setAttribute('onkeyup', 'update()');
            var syntax = /^(((print\s\d+)|(repeat\s\d+\s\d+))\n)*$/;
            window.update = function() {
                var input = document.getElementById('source').value;
                if(!input.endsWith('\n')) {
                    input += '\n';
                };
                var inputForCompare = '' + input;
                var outputEl = document.getElementById('target');
                if(!syntax.test(input)) {
                    input = input.split(/\n/).slice(0, -1);
                    var lineSyntax = /(^print\s\d+$)|(^repeat\s\d+\s\d+$)/;
                    for(var i = 0; i < input.length; i += 1) {
                        if(!lineSyntax.test(input[i])) {
                            outputEl.value = `ERR: Syntax error at Line ${i + 1}. `;
                            return;
                        }
                    }
                }
                input = input.split(/\n/).slice(0, -1).map(line => line.split(/\s/));
                var res = [];
                for(var i = 0; i < input.length; i += 1) {
                    if(input[i][0] === 'print') {
                        input[i][1] = parseInt(input[i][1]);
                        if(input[i][1] + i >= input.length) {
                            outputEl.value = `ERR: No enough lines to print at Line ${i + 1}. `;
                            return;
                        }
                        for(var j = input[i][1]; j > 0; j -= 1){
                            i += 1;
                            res.push(input[i].join(' '));
                        }
                    } else {
                        input[i][1] = parseInt(input[i][1]);
                        input[i][2] = parseInt(input[i][2]);
                        if(res.length < input[i][2]) {
                            outputEl.value = `ERR: No enough lines to repeat at Line ${i + 1}. `;
                            return;
                        }
                        var rep = [];
                        for(var j = 0; j < input[i][1]; j += 1) {
                            rep.push(res[res.length - input[i][2] + j % input[i][2]]);
                        }
                        res = res.concat(rep);
                    }
                }
                outputEl.value = res.join('\n');
                if(outputEl.value + '\n' === inputForCompare) {
                    alert('Success! The key is ' + (129*129) + '. ');
                    setStatus('b', 1);
                    addAchievement('Achievement of Achievement', 'Finishing "Quine"');
                }
            }
        }
    },
    {
        path: '/Quine/bonus\.html',
        init: () => {
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

            // Listen to message from child window
            eventer(messageEvent, function(e) {
                if(e.data === 'Win') {
                    if(getStatus('e') < 1) {
                        addAchievement('Advanced II', 'Finishing the bonus level before the normal one in "Quine"');
                    }
                    addAchievement('Quine expert', 'Finishing the bonus level in "Quine"');
                    alert('Success! ');
                }
                console.log('parent received message!: ', e.data);
            }, false);

            window.validate = function() {
                var mf = `<${''}script>function win() {
  parent.postMessage("Win");
}
window.echo = function(t) {
  if(btoa(t) === \`${btoa(document.getElementById('ans').value)}\`) {
    win();
  } else {
    console.log(t + \`\n(That's not a quine)\`);
  }
}<${''}/${''}script>${document.getElementById('ans').value}`;

                document.getElementById('test').srcdoc = mf;
                return false;
            }
        }
    }
];

routes.forEach(r => new RegExp(base + r.path + para + '$').test(location.href) ? r.init() : null);
