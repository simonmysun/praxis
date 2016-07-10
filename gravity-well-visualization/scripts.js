var cG = 0.1;

var colorStep = [];
for(var i = 0; i < 6; i ++ ) {
  colorStep[i] = Math.exp(Math.log(i / 5) / 3);
}

var colorScale = [
  [colorStep[0], 'rgb(166,206,227)'],
  [colorStep[1], 'rgb(31,120,180)'],
  [colorStep[2], 'rgb(178,223,138)'],
  [colorStep[3], 'rgb(51,160,44)'],
  [colorStep[4], 'rgb(251,154,153)'],
  [colorStep[5], 'rgb(227,26,28)']
];

var particles = [
  {
    x: 20,
    y: 20,
    m: 180
  },
  {
    x: 40,
    y: 20,
    m: 120
  },
  {
    x: 30,
    y: 35,
    m: 200
  }
];

var vm = new Vue({
  el: '#vis2d',
  data: {
    particles: particles,
    coin: {
      x: 0,
      y: 0,
      m: 10,
      vx: 0,
      vy: 0
    },
    resetter: {
      x: 30,
      y: 41,
      vx: 20,
      vy: 0
    },
    running: true,
    showInitState: true,
    showVelocity: true
  },
  methods: {
    dis: function(a, b) {
      return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    },
    getHeight: function(x, y) {
      var res = 0;
      for(var i in this.particles) {
        res += - this.particles[i].m / this.dis(this.particles[i], {x, y});
      }
      return res;
    },
    add: function() {
      this.particles.push({
        x: 30,
        y: 30,
        m: 100
      });
    },
    remove: function() {
      this.particles.pop();
    },
    pause: function() {
      this.running = ! this.running;
    },
    redraw: function() {
      var heightMap = [];
      var heightMax = - Infinity;
      var heightMin = Infinity;
      for(var y = 0; y < 60; y ++ ) {
        heightMap[y] = [];
        for(var x = 0; x < 60; x ++ ) {
          if(true || ((x - 30) * (x - 30) + (y - 30) * (y - 30) < 900)) {
            heightMap[y][x] = this.getHeight(x, y) / 1000;
          } else {
            heightMap[y][x] = 0;
          }
          if(heightMap[y][x] !== Infinity && heightMap[y][x] !== - Infinity) {
            heightMax = Math.max(heightMax, heightMap[y][x]);
            heightMin = Math.min(heightMin, heightMap[y][x]);
          }
        }
      }
      for(var i in particles) {
        var particle = particles[i];
        heightMap[particle.y][particle.x] = particle.m < 0 ? heightMax : heightMin;
      }
      var data = [
        {
          z: heightMap,
          colorscale: colorScale,
          type: 'surface'
        },
        {
          x: [this.coin.x],
          y: [this.coin.y],
          z: [this.getHeight(this.coin.x, this.coin.y) / 1100],
          mode: 'markers',
          type: 'scatter3d',
          marker: {
            color: 'rgb(23, 190, 207)',
            size: 2
          }
        }
      ];
      Plotly.newPlot('vis3d', data);
    },
    reset: function() {
      this.coin.x = this.resetter.x;
      this.coin.y = this.resetter.y;
      this.coin.vx = this.resetter.vx;
      this.coin.vy = this.resetter.vy;
    },
    step: function() {
      if(this.coin.x < 0 || this.coin.y < 0 || this.coin.x >= 60 || this.coin.y >= 60) {
        console.log('Out of range');
        this.reset();
        return;
      }
      if(this.running) {
        var fs = {
          x: 0,
          y: 0
        };
        for(var i in this.particles) {
          var p = this.particles[i];
          var xd = p.x - this.coin.x;
          var yd = p.y - this.coin.y;
          var dis = Math.sqrt(xd * xd + yd * yd);
          if (dis <= 0.3) {
            console.log('Collision');
            this.reset();
            return;
          } else {
            var f = cG * (p.m * this.coin.m) / (dis * dis);
            fs.x += f * (xd / dis);
            fs.y += f * (yd / dis);
          }
        }
        var v = Math.sqrt(this.coin.vx * this.coin.vx + this.coin.vy * this.coin.vy);
        if(v * v > 1e-9) {
          fs.x -= 0.01 * (this.coin.vx / v);
          fs.y -= 0.01 * (this.coin.vy / v);
        }
        this.coin.vx += fs.x / this.coin.m;
        this.coin.vy += fs.y / this.coin.m;
        this.coin.x += this.coin.vx / 100;
        this.coin.y += this.coin.vy / 100;
      }
    }
  }
});

setInterval(function() {
  vm.step();
}, 15);

vm.reset();
vm.redraw();

if(!true) {
  var data2D = [
    {
      z: heightMap,
      colorscale: colorScale,
      type: 'heatmap' // 'contour'
    }
  ];
  Plotly.newPlot('vis2d', data2D);
}
