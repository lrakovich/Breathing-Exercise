// center point
let centerX = 0.0, centerY = 0.0;
let radius = 150, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0009, damping = 0.98;

//corner nodes
let nodes = 9;

//zero fill arrays
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// soft-body dynamics
let organicConstant = 0.5;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');

  //center shape in window
  centerX = width / 2;
  centerY = height / 2;

  //initialize arrays to 0
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeY[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // iniitalize frequencies for corner nodes
  for (let i = 0; i < nodes; i++){
    frequency[i] = random(5, 12);
  }

  
  frameRate(30);
  
  background(0);
  //strokeWeight(0.75);
}


function windowResized() {
  resizeCanvas(windowWidth,windowHeight)
  background(0);
}



function draw() {
  //fade background
  fill(0, 20);
  drawShape();
  moveShape();
  cursor(CROSS);
}

function drawShape() {
  //  calculate node  starting locations
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
    nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
    rotAngle += 360.0 / nodes;
  }

  // draw polygon
  curveTightness(organicConstant);
  //fill(0);
  stroke(250);
  beginShape();
  for (let i = 0; i < nodes; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
 
  endShape(CLOSE);
}

function moveShape() {
  //move center point
  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  // create springing effect
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // move predator's center
  centerX += accelX;
  centerY += accelY;

  // slow down springing
  accelX *= damping;
  accelY *= damping;

  // change curve tightness
  organicConstant = 1 - ((abs(accelX) + abs(accelY)) * 0.1);

  //move nodes
  for (let i = 0; i < nodes; i++){
    nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 2) * (1.5);
    nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 2) * (1.5);
    angle[i] += frequency[i];
  }
}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('breathingexercise.png');
}