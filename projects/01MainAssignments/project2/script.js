// Loading the font and sound file
let mySound;
let myFont;

function preload() {
  myFont = loadFont('Poppins-SemiBold.otf'); 
	soundFormats('mp3');
	mySound = loadSound('Sakura-Girl-Hope-chosic.com_.mp3');
	
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  userStartAudio();
  
	mySound.setVolume(0); 
	mySound.play();
	fft = new p5.FFT();
}

let value = 0;

	function draw() {
	let spectrum = fft.analyze();
	background(0);
		

    
      
    

  // Calculating the angle based on mouse position
  let mouseAngle = atan2(mouseY - height / 2, mouseX - width / 2) + PI / 2;

  if (mouseAngle < 0) {
    mouseAngle += TWO_PI;
  }

  //console.log(degrees(mouseAngle));
	
	let newVolume = map(mouseAngle, 0, TWO_PI, 0, 1); 
  mySound.setVolume(newVolume);

		// Rotate and draw rectangles
push(); 
  translate(width / 2, height / 2); 
  rotate(-PI / 2); 

    for (let i = 0; i < 21; i++) {
    let angle = (PI / 10.5) * i;
		
		// Check if mouse angle is greater than the current rectangle's angle
		if (mouseAngle > angle) {
      fill(255, 255, 0);
			value = i;
    } else {
      fill(255);
    }

		// Calculating position and size of rectangles
    let x = cos(angle) * 100;
    let y = sin(angle) * 100;

		// Adjust bar distance based on frequency spectrum
    push();
			translate(x, y);
			rotate(angle);
			
			let index = floor((spectrum.length/100)*i);
			let barDistance = spectrum[index]*mouseAngle*0.1
			translate(barDistance,0);
			
			rect(0, 0, 50, 5);
    pop();
    //userStartAudio();
  }

pop(); 

  fill(255);
	textFont(myFont);
  textSize(32);
  text(value * 5, width / 10 * 4.8, height / 10 * 8.5);
  text("%", width / 10 * 5.15, height / 10 * 8.5);
} 

