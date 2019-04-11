# Geburtstag feiern Witze für Taihao

## Flags

## Problems

### Poker
This is a mathematical problem. I chose the problem by these conditions:
* Should be easy to validate
* Should be inspiring
* Should lead to much mathematical knowledge during the exploration of solution
* Should not be too easy or too hard for a level of a non-mathematics bachelor student

There wasn't too many options. ;ka;2\xA lot of interesting problems were opted out for not satisfying one or more conditions. This one was found in Matrix67's blog.

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

This is an entry level problem of which the solution cannot be easier. Thelink to the next level was only hidden with color. If you really cannot guess the position of the link, you might also select all, or have a look at its source code.

#### Small Game 01
Welcome

Since you have known how this game works, it's necessary to have a look at everything you get. Right, read the source code. However, you can neither call context menu by right clicking, nor invoke dev tools with keyboard shortcuts. When you find out these actions are prevented, you know you are on the right way. Use 'view-source' URI scheme or use other tools such as cURL instead of your modern browsers. The link to the next level is just commented in source code.

#### Small Game 02
AsFastAsYouCan

The page redirect you to the last level. Using tools such as cURL or disable JavaScript in your browser can stop the redirecting. Then you'll be able to click on the link to the next level.

#### Small Game 03
ReverseEngineer

When you have the habit of looking into source code, you will directly see the password validation process and the password itself.

The password is "18->19".

#### Small Game 04
SecretSharing

A JPEG image with size of 200x267 doesn't need 3 megabytes. There are more information inside. The solution to this problem is not obvious. Some experience tells us that JPEG and ZIP files can be in some way combined. Rename the picture, change its extension to zip and unzip it. The answer is in the file inside.

I was wondering whether it works on different platforms. It turned out satisfying.

Besides, there should be an recursion in the 'Index' part of that PDF but I failed to align the page number.

#### Small Game 05
ReverseEngineeringAgain

Again you need a password here. Reading the source code you will learn a password validation which is no better than the last one. You can still calculate the password with the information you have. You can either imitate the password generation process or use debug tools to read the generated password. You can also patch the code or edit the memory to skip the validation process.

However, you may miss an interesting thing if you skip some of the steps. The password is the binary form of 2019, and this number is calculated from the heading of this page.

The password is "11111100011".

#### Small Game 06
ThomasJefferson

You have a cipher method name, a ciphered message, a key, and a enciphering table. So why don't you try to decipher it.

The answer is "ALLESGUTE".

#### Small Game 07
AsFastAsYouCan2

It's not hard: you only have to click the link 'Teleport'. It's not easy: you will have to click 65535 times.

You may write a script, or automate your mouse clicking, or really click so many times.

#### Small Game 08
SimaYi

The important information you get from the screenshot is: February 5, Sima Yi, Tomb, Wikipedia, and the length and language of the term being searched. With some search you can get some results to give a try. I'm sure you will success.

The answer is: "高平陵之变".

#### Small Game 09
SuperSecured
There is a type of attacking called 'Known plaintext attack'. For some ciphering methods, you can calculate the key with the ciphered message and the original message. Reading the Java code you will get how the ciphering tool works. According the XOR operator's properties, we run the tool with the original message as the key, and encrypted message as the new message to encript.

``` bash
java Main.java encrypted.txt possiblekey.txt message.txt
```

we will get the key, repeated and not completed at the end. We know the repeated part is just the key that is used to encrypt, which is 'MMXIX\n', which is 2019 represented in Roman numerals. Then use this as key to decrypt the encrypted message and you will get the answer.

The answer is "attention_it_is_never_secured_if_you_do_not_use_it_correctly".
#### Small Game 10
ReverseEngineeringTheThird

This is the last level before you get the key number for 'SmallGame'. To be honest I failed to make the difficulty of it under control. There are multiple solutions to it.

The first is to use the information provided to guess the pasword. The information is not enough to calculate the password. From Line 21 you know the password is not case sensitive, only contains letters in 'PiratBoy HD', and after capitalizing first letter of every word and inserting an 'end of line' which is `\n` between words, the sum of their ANSII code is 2019(Line 50). You can also guess how many letters totally from Line 56 and how many upper case letters and how many lower case letters from Line 44. Then you may start guessing.

The second approach is to solve affine cipher the with the string in Line 56.

The password is "Taihao Happy Birthday"(three words in any order, case insensitive).

---

#### Small Game 11
PauseMachen

It is Pigpen cipher. Using image search you will find it.

The answer is: "step further".
#### Small Game 12
Alphametiken

As its name tells, it's only some mathematics puzzles for kids. In order to use less time, you may write a search program to solve this, or use some tools written by others.

These are the answers:

```
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

```

The answer to submit: "1+1+1+1+1=5,1329+1329+1329+1329=5316,681+787=1468,1049+1049+1049+1049+1049=5245,8647+2740+2740+2740873+2740873=5495873".

Source: https://www.janko.at/Raetsel/Alphametics/index.htm

Related tool: https://www.dcode.fr/cryptarithm-solver
#### Small Game 13
Blaise

aka ReverseEngineering4

Blaise Pascal, of course. Since you know pascal, it is easy to edit the code and run `print_password` directly. It is also interesting to look into how the password is validated. I wish you could understand it.

The password is: "RETRO BUT NOT BACKWARDS!!!".
#### Small Game 14
NS

The address of this level means Name Service. The encoding method is called IDN. I made it a link as a hint(maybe too obvious). I tried to add a subdomain 泰豪生日快乐.makelove.expert redirecting to taihao.de but failed to set up the redirect.

The password is "泰豪生日快乐".
#### Small Game 15
ReverseEngineeringV

It's about Python. What you get is a pyc file and you need to decompile it. There are many online tools you can use. When you have the decompiled python code it's easy to see the password.

The password is: "Life is short, you need Python".
#### Small Game 16
EulerscheZahl

Just calculate. Write your own program, or use mine.

``` bash
$ ./e 05022000
No.1: 55363634~55363641
```

The answer is ""

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
My solution:

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

My solution:
```
<script>var q = String.fromCharCode(34);var s = String.fromCharCode(60);var res = [];var l = ["<script>","var q = String.fromCharCode(34);","var s = String.fromCharCode(60);","var res = [];","var l = [","","];","for(var i = 0; i < 5; i++)","res.push(l[i]);","for(var i = 0; i < l.length; i++)","res.push(l[5] + q + l[i] + q + ',');","for(var i = 6; i < l.length; i++)","res.push(l[i]);","res.push(s+'/script>');","echo(res.join(''));",];for(var i = 0; i < 5; i++)res.push(l[i]);for(var i = 0; i < l.length; i++)res.push(l[5] + q + l[i] + q + ',');for(var i = 6; i < l.length; i++)res.push(l[i]);res.push(s+'/script>');echo(res.join(''));</script>
```

Bonus: Regex quine

I currently don't have a solution.

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
