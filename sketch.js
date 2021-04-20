// link of the database
// https://console.firebase.google.com/project/p35-airballoon-ride/database/p35-airballoon-ride-default-rtdb/data

var balloon,balloonImage1,balloonImage2;

var database, position;

function preload(){
   bg =loadImage("cityImage.png");

   balloonImage1=loadAnimation("hotairballoon1.png");

   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);

  database = firebase.database();

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale = 0.5;

  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readPosition, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-1,0);
    //changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(1,0);
    //changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-1);
    //changePosition(0,-1);
    balloon.scale = balloon.scale - 0.001;
  }
  else if(keyDown(DOWN_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,1);
    //changePosition(0,1);
    balloon.scale = balloon.scale + 0.001;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}

function changePosition(x,y) {
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError() {
  console.log("error is hi-lighted");
}

function writePosition(x,y) {
  database.ref("balloon/position").set({
      x: position.x+x,
      y: position.y+y
  })
}