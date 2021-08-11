const mic = new Tone.UserMedia();
const toneMeter = new Tone.Meter({ channels: 2 });
mic.connect(toneMeter);

const toneFFT = new Tone.FFT();
mic.connect(toneFFT);

const toneWaveform = new Tone.Waveform();
mic.connect(toneWaveform);

// bind the GUI
drawer().add({
  tone: mic,
  title: "Microphone",
});
meter({
  tone: toneMeter,
  parent: document.querySelector("#content")
});
fft({
  tone: toneFFT,
  parent: document.querySelector("#content")
});
waveform({
  tone: toneWaveform,
  parent: document.querySelector("#content")
});

const micButton = document.querySelector("tone-mic-button");
micButton.supported = Tone.UserMedia.supported;

micButton.addEventListener("open", () => mic.open());
micButton.addEventListener("close", () => mic.close());

const delay = new Tone.Delay(1).toDestination();
let monitor = false;
document.getElementById('monitor').addEventListener('click', (e) => {
  if(monitor) {
    mic.disconnect(delay);
    monitor = false;
    e.target.innerText = 'Monitor Off';
  } else {
    mic.connect(delay);
    monitor = true;
    e.target.innerText = 'Monitor On';
  }
});
