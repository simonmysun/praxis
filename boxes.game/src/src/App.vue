<template>
  <div id="app">
    <h1><span style="color: rgb(229, 0, 31);">T</span><span style="color: rgb(54, 119, 217);">r</span><span style="color: rgb(229, 184, 0);">y</span><span style="color: rgb(255, 128, 179);">&nbsp;</span><span style="color: rgb(58, 0, 217);">t</span><span style="color: rgb(57, 195, 230);">o</span><span style="color: rgb(58, 0, 217);">&nbsp;</span><span style="color: rgb(102, 204, 170);">g</span><span style="color: rgb(196, 128, 255);">e</span><span style="color: rgb(210, 172, 230);">t</span><span style="color: rgb(204, 0, 255);">&nbsp;</span><span style="color: rgb(204, 0, 82);">t</span><span style="color: rgb(181, 217, 108);">h</span><span style="color: rgb(229, 176, 115);">e</span><span style="color: rgb(58, 0, 217);">&nbsp;</span><span style="color: rgb(58, 0, 217);">h</span><span style="color: rgb(204, 0, 82);">i</span><span style="color: rgb(54, 119, 217);">g</span><span style="color: rgb(255, 128, 179);">h</span><span style="color: rgb(196, 128, 255);">e</span><span style="color: rgb(58, 0, 217);">s</span><span style="color: rgb(238, 255, 0);">t</span><span style="color: rgb(242, 129, 0);">&nbsp;</span><span style="color: rgb(181, 217, 108);">s</span><span style="color: rgb(242, 129, 0);">c</span><span style="color: rgb(238, 255, 0);">o</span><span style="color: rgb(238, 255, 0);">r</span><span style="color: rgb(229, 145, 115);">e</span><span style="color: rgb(191, 217, 255);">!</span></h1>
    <div>
      <label>Difficulty: </label>
      <input type="range" v-model="difficulty" min="1" max="6">
      <span>{{ difficulty }}</span>
    </div>
    <div>
      <label>Amount: </label>
      <input type="range" v-model="amount" min="1" max="8">
      <span>{{ 1 << amount }}</span>
    </div>
    <p>
      Score: {{ fakeScore }}
      <transition-group name="score" tag="div" class="score-changes">
        <div v-for="change in scoreChanges" class="score-item" v-bind:key="change.hash">
          + {{ change.val }}
        </div>
      </transition-group>
      / {{ maximum }}
    </p>
    <div>
      <a href="#" class="btn purple" v-on:click="regenerate">Regenerate</a>
      <a href="#" class="btn green" v-on:click="reload">Reload</a>
    </div>
    <transition-group name="box" tag="div" class="boxes">
      <div v-for="(box, index) in boxes" class="box-item" v-bind:key="box.hash">
        <a href="#" v-on:click="remove(index)" v-bind:style="{ background: colors[box.val] }">{{ box.val }}</a>
      </div>
    </transition-group>
  </div>
</template>
v
<script>
 const removeBoxes = function(boxes) {
   const color = Array(boxes.length + 1).fill(-1);
   const len = Array(boxes.length + 1).fill(0);
   let pos = 0;
   let cnt = 0;
   for(let i = 0; i < boxes.length; i += 1) {
     if(boxes[i] == color[pos]) {
       len[pos] += 1;
     } else {
       pos += 1;
       color[pos] = boxes[i];
       len[pos] += 1;
     }
   }
   const dp = [];
   for(let i = 0; i < boxes.length + 1; i += 1) {
     dp[i] = [];
     for(let j = 0; j < boxes.length + 1; j += 1) {
       dp[i][j] = Array(boxes.length + 1).fill(0);
     }
   }
   var d = (i, j, k) => {
     if(dp[i][j][k]) {
       return dp[i][j][k];
     }
     if(i - j == 1 && k == 0) {
       return 0;
     }
     dp[i][j][k] = d(i, j - 1, 0) + (len[j] + k) * (len[j] + k);
     for(let p = i; p < j; p += 1) {
       if(color[p] == color[j]) {
         dp[i][j][k] = Math.max(dp[i][j][k], d(i, p, k + len[j]) + d(p + 1, j - 1, 0));
       }
     }
     return dp[i][j][k];
   }
   return d(1, pos, 0);
 };
 export default {
   data() {
     return {
       test: 'hello',
       score: 0,
       fakeScore: 0,
       maximum: -1,
       difficulty: 4,
       amount: 6,
       colors: [],
       boxes: [],
       lastBoxes: [],
       scoreChanges: [],
     };
   },
   methods: {
     regenerate() {
       this.colors.length = 0;
       for(let i = 0; i < (1 << this.amount); i += 1) {
         this.colors.push(`#${('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)}`);
       }
       this.boxes.length = 0;
       setTimeout(() => {
         this.boxes.length = 1 << this.amount;
         for(let i = 0; i < (1 << this.amount); i += 1) {
           this.boxes[i] = {
             val: (Math.random() * Math.random() * Math.min(1 << this.difficulty, 1 << this.amount)) | 0,
             hash: Math.random().toString(),
           };
         }
         this.score = 0;
         this.maximum = removeBoxes(this.boxes.map(x => x.val));
         this.lastBoxes = this.boxes.slice();
         this.$forceUpdate();
       }, 100);
     },
     reload() {
       this.boxes.length = 0;
       setTimeout(() => {
         this.boxes = this.lastBoxes.slice();
         this.score = 0;
         this.$forceUpdate();
       }, 100);
     },
     remove(idx) {
       let left = idx;
       while(left > 0 && this.boxes[left - 1].val === this.boxes[idx].val) {
         left -= 1;
       }
       let right = idx;
       while(right < this.boxes.length - 1 && this.boxes[right + 1].val === this.boxes[idx].val) {
         right += 1;
       }
       let len = right - left + 1;
       this.scoreChanges.push({
         val: len * len,
         hash: Math.random().toString(),
       });
       setTimeout(((sc) => {
         return () => {
           sc.shift();
         };
       })(this.scoreChanges), 50);
       this.score += len * len;
       this.boxes.splice(left, len);
     },
   },
   mounted() {
     this.regenerate();
     setInterval(((vm) => {
       return () => {
         vm.fakeScore += Math.ceil(Math.abs(vm.score - vm.fakeScore) / 2) * (vm.score > vm.fakeScore ? 1 : -1);
       };
     })(this), 50);
   },
 }
</script>

<style>
 @import url(https://fonts.googleapis.com/css?family=Audiowide);
 html, body {
   background: #313;
   user-select: none;
 }
 * {
   color: #fff;
   font-family: 'Audiowide', cursive;
 }
 .boxes {
   width: 100%;
   white-space: nowrap;
   overflow: auto;
 }
 .box-item {
   display: inline-block;
   line-height: 65px;
   width: 60px;
 }
 .box-item>a:after {
   content: "";
   position: absolute;
   top: 10px;
   right: 5px;
   bottom: 5px;
   left: 10px;
   border-color: rgba(255, 255, 255, 0.7);
   border-style: solid;
   border-width: 0px 2px 2px 0;
   border-radius: 5px 0;
 }
 .box-item>a {
   display: block;
   text-align: center;
   position: relative;
   padding: 20px;
   margin-left: 1px;
   text-decoration: none;
   text-shadow: -1px -1px 1px #333;
   color: #fff;
   border-radius: 5px;
 }
 .box-enter-active, .box-leave-active {
   transition: margin 0.1s;
 }
 .box-enter, .box-leave-to /* .list-leave-active for <2.1.8 */ {
   opacity: 0;
   margin-left: -60px;
 }
 .score-changes {
   width: 60px;
   display: inline-block;
   position: relative;
 }
 .score-item {
   width: 60px;
   position: absolute;
   bottom: 0;
   text-shadow:
   -2px -2px 0 #313,  
   2px -2px 0 #313,
   -2px 2px 0 #313,
   2px 2px 0 #313;
 }
 .score-enter-active, .score-leave-active {
   transition: all 1s;
 }
 .score-enter {
   opacity: 1;
 }
 .score-leave-to /* .list-leave-active for <2.1.8 */ {
   opacity: 0;
   transform: translateY(-20px);
 }
 .btn {
   color: #fff;
   display: inline-block;
   padding: 10px;
   border-radius: 4px;
   text-decoration: none;
   background: #000;
   margin-bottom: 20px;
 }
 .purple {
   background: #770077
 }
 .green {
   background: #005512;
 }
</style>

