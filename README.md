# **bleep.js**

Simple function to playback multi voice "bleeps"

**Usage**

Include dist/bleep.js in your page

`<script src="dist/bleep.js"></src>`

Create a new instance

`var bleeper = new bleep();`

Play sounds by passing arrays of objects to bleeper.play().

For a single note

`bleeper.play(
[
		{
			"gain": 1.0,
			"duration": 0.1,
			"freq": 440,
			"pan": 0.5}
]);`
	
Multiple notes together

`bleeper.play(
[
		{	
			"gain": 0.2,
			"duration": 0.1,
			"freq": 440,
			"pan": 0.1
		},
		{	
			"gain": 0.4,
			"duration": 0.5,
			"freq": 220,
			"pan": 0.9
		}
]);
`

* duration: seconds
* pan: 0.0 - 1.0 (0.0 = Left, 1.0 = Right)
* freq: frequency in Hz
* gain: 0.0 - 1.0 `
