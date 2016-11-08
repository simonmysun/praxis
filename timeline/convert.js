var data = require('./locationhistory.json');

//console.log(data);

var result = `{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"LineString","coordinates":[`;

var tmp = [];
var count = 0;

//console.log(data.locations.length);

data.locations.map(function(step) {
  if(step.timestampMs < new Date('23:59:59 Nov 5, 2016') || step.timestampMs > new Date('00:00:00 Nov 7, 2016')) {
    return;
  }
  if(step.accuracy > 100) {
    return;
  }
  
  tmp.push(step.accuracy);
  result += `[${step.longitudeE7 * 0.0000001},${step.latitudeE7 * 0.0000001},-1,${step.timestampMs}],`;
});

result = result.slice(0, -1)

result += ']}}]}';

console.log(result);

//console.log(tmp.join(','));
