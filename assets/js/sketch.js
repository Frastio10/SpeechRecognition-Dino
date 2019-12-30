let unicorn;
let uImg;
let tImg;
let bImg;
let trains = [];
let soundClasifier;
function preload() {
	const options = { probabilityThreshold: 0.95 };
	soundClasifier = ml5.soundClassifier('SpeechCommands18w', options);
	uImg = loadImage('assets/images/unicorn.png');
	tImg = loadImage('assets/images/train.png');
	bImg = loadImage('assets/images/bg.jpg');

}

function setup() {
	createCanvas(800, 450);
	unicorn = new Unicorn();
	soundClasifier.classify(gotCommand);
}

function gotCommand(error, result) {
	if (error) {
		console.error(error);
	}
	console.log(result[0].label, result[0].confidence);
	if (result[0].label == 'up') {
		unicorn.jump();
	}
}

function keyPressed() {
	if(key == ' ') {
		unicorn.jump();
	}
}

function draw() {
	if (random(1) < 0.005) {
		trains.push(new Train());
	}

	background(bImg);

	for(let t of trains){
		t.move();
		t.show();

		if (unicorn.hits(t)) {
			console.log("game over");
			noLoop();
		}
	}

	unicorn.show();
	unicorn.move();

	
}