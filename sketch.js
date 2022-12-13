let angle = 0;

let table;
let r = 200;

let earth;

function preload() {
  earth = loadImage('earth.jpg'); //load earth image
  table = loadTable( //load dataset
    'Meteorite_Landings.csv',
    'csv',
    'header'
  );
}

function setup() {
  createCanvas(600, 600, WEBGL); //3-D canvas
}

function draw() {
  background(70); //background color
  rotateY(angle);
  angle += 0.018; //rotation speed
  
  //edit lighting and filter
  directionalLight(128, 128, 128, 0, 0, -1)
  pointLight(255,255,255, 0, 0, 100);
  ambientLight(255);
  pointLight(255,255,255, 50, 50, 225);
  
  //draw the earth
  lights();
  fill(200);
  noStroke();
  texture(earth);
  sphere(r);
  
  //draw the boxes
  for (let row of table.rows) {
    //get latitude, longtitude, mass
    let lat = row.getNum('reclat');
    let long = row.getNum('reclong');
    let mass = row.getNum('mass (g)'); 
    let clas = row.getString('recclass'); 
    clas = clas.substring(0,1);
    
    if (mass > 3000000){
      mass = 3000000; //since the mass of some meteorite is too large, assign a maximum value to mass
    }
        
    let theta = radians(lat);

    let phi = radians(long) + PI;

    let x = r * cos(theta) * cos(phi);
    let y = -r * sin(theta);
    let z = -r * cos(theta) * sin(phi);

    let pos = createVector(x, y, z);

    //h gets the value of mass and is height of the box
    let h = pow(10, log(mass));
    let maxh = pow(10, 15);
    h = map(h, 0, maxh, 10, 100);
    let xaxis = createVector(1, 0, 0);

    let angleb = abs(xaxis.angleBetween(pos));

    let raxis = xaxis.cross(pos);

    push();
    translate(x, y, z);

    rotate(angleb, raxis);
    
    if (clas == 'P' || clas == 'M'){
      fill(98, 118, 37); //stony iron
    }
    else if (clas == 'I'){
      fill(221, 221, 226); //iron
    }
    else{
      fill(168, 142, 122); //stone
    }
    
    box(h, 5, 5);
    pop();
  }
}