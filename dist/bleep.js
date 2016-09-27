function bleep() {
	this.ctx = new AudioContext();
}

bleep.prototype.play = function(note) {

	var oscs = [],
		gains = [],
		envs = [],
		splitter = [],
		merger = [],
		output = null,
		now = 0,
		attack = 0,
		hold = 0,
		release = 0,
		panL = [],
		panR = [];

	for (var idx = 0; idx < note.length; idx++) {
		// Start time
		now = this.ctx.currentTime;
		// Attack ramp 
		attack = now + 0.001;
		// Hold length
		hold = attack + note[idx].duration - 0.05;
		// Release ramp
		release = hold + 0.005;

		// Oscillator
		oscs[idx] = this.ctx.createOscillator();
		oscs[idx].frequency.value = note[idx].freq;

		// Gain per voice
		gains[idx] = this.ctx.createGain();
		gains[idx].gain.value = note[idx].gain

		// Envelope (ASR)
		envs[idx] = this.ctx.createGain();
		envs[idx].gain.value = 0;

		// Panning
		splitter[idx] = this.ctx.createChannelSplitter(2);
		merger[idx] = this.ctx.createChannelMerger(2);
		panL[idx] = this.ctx.createGain();
		panR[idx] = this.ctx.createGain();
		panL[idx].gain.value = (1 - note[idx].pan)
		panR[idx].gain.value = note[idx].pan;

		// Scaled output
		output = this.ctx.createGain();
		output.gain.value = 1 / note.length;
		
		// Connect the nodes
		oscs[idx].connect(panL[idx]);
		oscs[idx].connect(panR[idx]);
		panL[idx].connect(merger[idx],0,0);
		panR[idx].connect(merger[idx],0,1);
		merger[idx].connect(gains[idx]);
		gains[idx].connect(envs[idx]);
		envs[idx].connect(output);
		output.connect(this.ctx.destination);

		// Schedule the note and its envelope
		envs[idx].gain.setValueAtTime(0, now);
		envs[idx].gain.linearRampToValueAtTime(1.0, attack);
		envs[idx].gain.setValueAtTime(1, hold);
		envs[idx].gain.linearRampToValueAtTime(0, release);
		oscs[idx].start(now);
		oscs[idx].stop((now + note[idx].duration));
	}
};