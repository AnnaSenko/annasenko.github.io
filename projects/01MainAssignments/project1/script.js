//sheres
let theta = 0;

let myFont;
let letters = ['Z  Z  Z  Z ', 'H  H  H  H  H', 'd  d  d  d ', 'K  K  K  K'];
let letterIndex = 0;
let textureZ;
let textureH;
let textureD;
let textureK;

//lines
let a = 0;
let diameter = 8;

function preload() {
  myFont = loadFont('Poppins-SemiBold.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
	
	textureZ = createLetterTexture(letters[0]);
	textureH = createLetterTexture(letters[1]);
	textureD = createLetterTexture(letters[2]);
	textureK = createLetterTexture(letters[3]);
}

function draw() {
	theta += mouseX* 0.000012;
	let camX = 700 * cos(theta);
  let camZ = 700 * sin(theta);
  camera(camX, 0, camZ, 0, 0, 0, 0, 1, 0);
	
 //orbitControl();
  background(255);
  noStroke();
	
	//line
				push();
						translate(-width / 2, -550, 50); 
						sinWave(0);
				pop();
				push();
					translate(-width / 2,-330,0); 
					sinWave(4)
				pop();
				push();
					translate(-width / 2,-150,0); 
					sinWave(2);
				pop();
	
	
  //Z
  push();
		translate(-400, -150, -150);
	  rotateY(mouseX * 0.003);
			push()
				createSphereLight();
				sphere(175);
			pop()
		texture(textureZ);
		sphere(190);
  pop();

  //H
  push();
		translate(250, -110, 150);
		rotateY(mouseX * 0.003);
			push();
				createSphereLight();
				sphere(85);
			pop();	
		texture(textureH);
		sphere(100);
  pop();

  //d
  push();
		translate(-140, 50, 100);
		rotateY(mouseX* 0.003);
			push();
				createSphereLight();
				sphere(30);
			pop();
		texture(textureD);
		sphere(35);
  pop();

  //K
  push();
		translate(90, 250, -150);
		rotateY(mouseX * 0.003);
			push();
					 createSphereLight();
					sphere(115);
				pop();
	  texture(textureK);
		sphere(130);
  pop();
	
	//donuts
	let sprinklesTexture = createSprinklesTexture(400, 400);

	donut(0, -160, 150, color(3,217,221), sprinklesTexture)
	donut(450, 100, -150, color(249,131,79), sprinklesTexture)
	donut(-450, 200, 50, color(128,255,0), sprinklesTexture)
	
	//console.log(frameRate())
}

function donut(x,y,z,color, sprinklesTexture) {
	push();
		translate(x, y, z);
		rotateX(frameCount * 0.019);
		rotateY(frameCount * 0.019);
    ambientLight(255);
	
			push();
				ambientMaterial(color);
				let dirX_s1 = (mouseX / width - 0.5) * 2;
				let dirY_s1 = (mouseY / height - 0.5) * 2;
				directionalLight(92, 250, 253, -dirX_s1, -dirY_s1, -1);
				noStroke();
				torus(39, 19) 
			pop();

			push();
				translate(0, 0, -5);
				ambientMaterial(211,185,115);
				torus(41, 19)
			pop() ;
		
	 texture(sprinklesTexture);
	 torus(40, 20)
 pop();	
}

function createSphereLight() {
	ambientLight(255);
  ambientMaterial(204, 62, 204);
  let dirX_z = (mouseX / width - 0.5) * 3;
  let dirY_z = (mouseY / height - 0.5) * 3;
  directionalLight(255, 153, 255, -dirX_z, -dirY_z, -1);
  noStroke();
}

function createLetterTexture(string) {
		let letterTexture_z = createGraphics(200, 160);
		letterTexture_z.textSize(44);
	  letterTexture_z.textFont(myFont);
	  letterTexture_z.fill(255);
		letterTexture_z.text(string, 10, 100);
	return letterTexture_z
}

function createSprinklesTexture(w, h) {
  let textureImg = createGraphics(w, h);
  textureImg.noStroke();
  
  for (let i = 0; i < 500; i++) {
    let sprinkleSize = random(3, 10);
    let sprinkleColor = color(random(255), random(255), random(255));
    let x = random(w);
    let y = random(h);
    
    textureImg.fill(sprinkleColor);
    textureImg.ellipse(x, y, sprinkleSize, sprinkleSize);
  }
	
  return textureImg;
} 

function sinWave(offset2) {
			for (let i = 0; i < width; i += 10) {
				let offset = offset2 + i / 20;
				let y = sinMovement(a, offset, 400, 370);
				fill(255, 255, 0);
		
			push();
				translate(i, y, 0);
				ellipse(0, 0, diameter, diameter); 
			pop();
			}

			const increment = TWO_PI / 180;
			a += increment;
			
		function sinMovement(angle, offset, minVal, maxVal) {
			let factor = sin(angle + offset);
			let sinMovementVal = map(factor, -1, 1, minVal, maxVal);
			return sinMovementVal;
		} 
}