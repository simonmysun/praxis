import './styles.css';
import getComment from './comment';

const dataDiv = document.getElementById('data');

const log = (message) => {
  dataDiv.innerHTML = message;
};

const pastTicksData = [10, 10];
const pastTicksAvg = {
  data: 10,
};

const $lastThrow = document.getElementById('lastThrow');
const $bestThrow = document.getElementById('bestThrow');
const $comment = document.getElementById('comment');
let throwing = false;
let lastThrowTime = 0;
let bestThrowTime = 0;
const windowSize = 2;

const handleDeviceMotion = (e) => {
  const xg = e.accelerationIncludingGravity.x;
  if (xg === null) {
    alert('device not supported'); // eslint-disable-line no-alert
  }
  const yg = e.accelerationIncludingGravity.y;
  const zg = e.accelerationIncludingGravity.z;
  const interval = e.interval > 1 ? e.interval : e.interval * 1000;

  const a = Math.sqrt((xg * xg) + (yg * yg) + (zg * zg));
  pastTicksData.push(a);
  pastTicksAvg.data += a / windowSize;
  pastTicksAvg.data -= pastTicksData.shift(1) / windowSize;

  if (throwing && pastTicksAvg.data < 3) {
    lastThrowTime += interval;
  }
  if (pastTicksAvg.data < 3) {
    throwing = true;
    document.body.className = 'animated';
  } else {
    lastThrowTime = 0;
    throwing = false;
    document.body.className = '';
  }

  if (lastThrowTime > bestThrowTime) {
    bestThrowTime = lastThrowTime;
    const newRecord = (bestThrowTime * bestThrowTime * 0.0000098 * 0.125).toFixed(2);
    document.title = `New Record: ${newRecord}m`;
    $bestThrow.innerHTML = newRecord;
    $comment.innerHTML = getComment(newRecord);
  }

  if (lastThrowTime !== 0) {
    $lastThrow.innerHTML = (lastThrowTime * lastThrowTime * 0.0000098 * 0.125).toFixed(2);
  }

  log(pastTicksAvg.data.toFixed(1));
};

if (window.DeviceMotionEvent) {
  window.ondevicemotion = handleDeviceMotion;
} else {
  log('Device Motion not supported.');
}
