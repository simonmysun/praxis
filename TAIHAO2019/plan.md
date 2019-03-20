# Geburtstag feiern Witze für Taihao

## Flags

## Problems

### Poker
This is a mathematical problem. I chose the problem by these conditions:
* Should be easy to validate
* Should be inspiring
* Should lead to much mathematical knowledge during the exploration of solution
* Should not be too easy or too hard for a level of a non-mathematics bachelor student

There wasn't too many options. A lot of interesting problems were opted out for not satisfying one or more conditions. This one was found in Matrix67's blog.

The problem is about group theory. The shuffling procedure is a permutation $\sigma$. We know $\sigma^2=\bigl(\begin{smallmatrix}
  A & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & J & Q & K \\
  10 & 9 & Q & 8 & K & 3 & 4 & A & 5 & J & 6 & 2 & 7
\end{smallmatrix}\bigr)$, and it cannot be decomposed into disjoint cycles. Thus, $\sigma$ also cannot be decomposed into disjoint cycles, which means, $\sigma^{13}=\mathrm{id}$, $\left(\sigma^2\right)^7=\sigma$. Then we know $\sigma=\bigl(\begin{smallmatrix}
  A & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & J & Q & K \\
  9 & A & 4 & Q & J & 7 & 3 & 2 & 10 & 5 & K & 8 & 6
\end{smallmatrix}\bigr)$

To avoid computation you can write the permutation in the form of matrix $M$ and calculate $\left(M^2\right)^2\cdot M^2 \cdot M)$, which requires $4$ matrix multiplication instead of $7$.

Answer: 9,A,4,Q,J,7,3,2,10,5,K,8,6
Key: 21161

### Multiplication
Match correct multiplication statements in the domain ^x+\*x+=x+$ using only the ECMAScript subset of regex functionality.

This problem is chosen because regex is within the boundary. The problem itself, as far as I could see, was firstly proposed by Davidebyzero.

During my search I realized that there are far more things regex can do than I ever thought:
* https://codegolf.stackexchange.com/questions/126373/am-i-a-fibonacci-number (I would use this if it is not so hard)
* https://codegolf.stackexchange.com/questions/3503/hard-code-golf-regex-for-divisibility-by-7 (This is left as an exercise of Regex Golf Triple problem)
* https://codegolf.stackexchange.com/questions/36384/find-the-smoothest-number/178889#178889
* https://codegolf.stackexchange.com/questions/121731/is-this-number-a-factorial#178979
* https://github.com/Davidebyzero/RegexGolf/blob/master/regex%20for%20matching%20OEIS%20A033286.txt

And in later levels of Regex Golf, there are quine regex or regex validating addition(numbers themselves rather than their length), etc. I haven't solved them yet by now, and haven't got any answer from the internet either.

Solutions to be done.

key: 422

### Snake
* https://blog.csdn.net/fox64194167/article/details/1996506
* http://www.hawstein.com/posts/snake-ai.html
* https://github.com/ganhang/SnakeAI

key: 16799

### Small Game
#### Small Game 00
index.html
Hidden with color
#### Small Game 01
Welcome
Hidden in source code
#### Small Game 02
AsFastAsYouCan
Redirects
#### Small Game 03
ReverseEngineer
18->19
Hidden with javascript bad decoding
#### Small Game 04
SecretSharing
hidden in jpg+zip
#### Small Game 05
ReverseEngineeringAgain
11111100011
script requires password. Decode / find password / edit memory
#### Small Game 06
ThomasJefferson
ALLESGUTE
http://foreversong.cn/archives/138
#### Small Game 07
AsFastAsYouCan2
Redirect 1024 to indicate scripting is required
#### Small Game 08
SimaYi
高平陵之变
Forensic
#### Small Game 09
SuperSecured
Known plaintext attack
key: MMXIX
attention_it_is_never_secured_if_you_do_not_use_it_correctly
#### Small Game 10
ReverseEngineeringTheThird
Taihao Happy Birthday

---

#### Small Game 11
PauseMachen
Pigpen cipher
step further
#### Small Game 12
Alphametiken

一+一+一+一+一=五
1+1+1+1+1=5

EINS+EINS+EINS+EINS=VIER
1329+1329+1329+1329=5316

二十一 + 九十九 = 一百二十
681+787=1468

EINS+EINS+EINS+EINS+EINS=FÜNF
1049+1049+1049+1049+1049=5245

ZWEI+VIER+VIER+VIERZIG+VIERZIG=NEUNZIG
8647+2740+2740+2740873+2740873=5495873

1+1+1+1+1=5,1329+1329+1329+1329=5316,681+787=1468,1049+1049+1049+1049+1049=5245,8647+2740+2740+2740873+2740873=5495873

https://www.janko.at/Raetsel/Alphametics/index.htm
https://www.dcode.fr/cryptarithm-solver
#### Small Game 13
Blaise
aka ReverseEngineering4
Pascal
RETRO BUT NOT BACKWARDS!!!
#### Small Game 14
IDN
Crypto
泰豪生日快乐
#### Small Game 15
ReverseEngineeringV
Python
Life is short, you need Python
#### Small Game 16
$ ./e 05022000
No.1: 55363634~55363641

#### Small Game 17
ReverseEngineeringLiu.html

#### Small Game 18

LaTeX
https://rainnic.altervista.org/en/latex-and-2d-structural-mechanics-diagrams?language=it
#### Small Game 19
ModerateDifficulty.html
Design a problem that can stump Taihao for more than 30 minutes.

HelloWorld...html

key: 1283

### LZ77 Quine
Solution:

```
print 0
print 0
print 0
print 4
print 0
print 0
print 0
print 4
repeat 4 4
print 4
repeat 4 4
print 4
repeat 4 4
print 4
repeat 4 4
print 4
print 0
print 0
print 0
print 0
```

Bonus: JavaScript quine

```
<script>var q = String.fromCharCode(34);var s = String.fromCharCode(60);var res = [];var l = ["<script>","var q = String.fromCharCode(34);","var s = String.fromCharCode(60);","var res = [];","var l = [","","];","for(var i = 0; i < 5; i++)","res.push(l[i]);","for(var i = 0; i < l.length; i++)","res.push(l[5] + q + l[i] + q + ',');","for(var i = 6; i < l.length; i++)","res.push(l[i]);","res.push(s+'/script>');","echo(res.join(''));",];for(var i = 0; i < 5; i++)res.push(l[i]);for(var i = 0; i < l.length; i++)res.push(l[5] + q + l[i] + q + ',');for(var i = 6; i < l.length; i++)res.push(l[i]);res.push(s+'/script>');echo(res.join(''));</script>
```

Bonus: Regex quine

key: 16641

## Validation
### Winning the game
Win the game by solving 3 of 5 problems.
http://www.matrix67.com/blog/archives/1261
http://www.matrix67.com/blog/archives/5100

M % [ 3917, 13217, 23489, 33131, 39182 ] = [ 422, 1283, 21161, 16641, 16799 ]
M = 713264129503


### Achievement system
* First Blood: Solving first problem
* Further: 4 / 5
* AK(All Kill): All problems solved
* AK+(All Kill Plus): All problems solved, including bonus ones
* Forever Alone: Attempts at Friday or Saturday nights
* Parallelization: Trying to solve three problems at the same time
* Advanced: Cut corners in "Small Game"
* Advanced II: Finishing the bonus level before the normal one in "Quine"

* Regex Beginners: More-than-200-characters Regex
* LOC 1000: 1000+ lines of code in "Snake"

* Poker Master: Finishing "Poker"
* I Know Regex: Finishing "Multiplication"
* AI Expert: Finishing "Snake"
* A small step to a hacker: Finishing "Small Game"
* Achievement of achievement: Finishing "Quine"

https://gist.github.com/simonmysun/3fbf7ca01d7171b7cd76dc74ff997834


sum(map(ord,'A \'Happy B-day\' To Tobias'))
// sum(map(ord,'Happy\n Birthday\n Taihao'))
// sum(map(ord,'HAPPY 19TH BIRTHDAY TO TAIHAO!\n'))

## Credit
* http://www.matrix67.com/blog/archives/3172
* https://github.com/Davidebyzero/RegexGolf
