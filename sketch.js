var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var obstacle1
var edges
var PLAY=1;
var END=0
var score;
var cloudsGroup
var gameState=PLAY

function preload(){
  trex_running = loadAnimation("girl1.png","girl2.png","girl3.png","girl4.png","girl5.png","girl6.png","girl7.png");

/* here is a note anna in this file you have not added collided animation 
i have added trex collided animation you can change the animation from the file don't do any changes
in code ,just added a die image */



  trex_collided = loadImage("trex_collided.png");
  obstacle1=loadImage("spike_pixel.png")
  groundImage = loadImage("pixelforest.jpg");
cloudImage=loadImage("obstacle1.png")
 
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  cloudsGroup=createGroup()
  clouds1Group=createGroup()
  //create a ground sprite
  ground = createSprite(100,50,1000,100);
  ground.addImage(groundImage)
  ground.x = ground.width /2;
  
  ground.velocityX = -2;
  ground.scale=0.98
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collided)
  trex.scale = 0.5;
  //creating invisible ground
  invisibleGround = createSprite(300,190,1200,10);
  invisibleGround.visible = false;
  invisibleGround.velocityX=-20

  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  //obstacle1=createSprite(600,100,40,10)
  //obstacle1.addImage(cloudImage)
  //obstacle1.setCollider("rectangle",0,0,600,10)
  //obstacle1.scale=0.2
}

function draw() {

  //set background color
  background(180);
  
 // console.log(trex.y)
  
  if(gameState===PLAY){
  
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
 
  invisibleGround.x=trex.x
  //stop trex from falling down
  trex.collide(invisibleGround);
  if(keyDown("right")){
  trex.x=trex.x+5
  }
  
  if(ground.x<0){
    ground.x=ground.width/2
   }
    
  if(invisibleGround.x<0){
    invisibleGround.x=invisibleGround.width/2
   }
 spawnObstacles()
  spawnClouds()
  
  if(clouds1Group.isTouching(trex)){
    gameState = END;
}
  }
 if (gameState === END) {
// gameOver.visible = true;
// restart.visible = true;
cloudsGroup.setVelocityXEach(0);
clouds1Group.setVelocityXEach(0);
clouds1Group.setLifetimeEach(-1)
trex.changeAnimation("collide",trex_collided)
cloudsGroup.setLifetimeEach(-1)
console.log("hello")
ground.velocityX=0


}
drawSprites();
trex.collide(cloudsGroup)
}
//function to spawn the clouds




function spawnClouds(){
  if (frameCount%100 === 0){ 
    cloud=createSprite(600,100,40,10);
      cloud.y=Math.round(random(80,120))
      cloud.velocityX=-2
   
    cloud.scale=0.2
    
      cloud.addImage(cloudImage)
      
      cloudsGroup.add(cloud)
     
      cloud.debug=true 
      cloud.setCollider("rectangle",0,0,600,10)
     
      cloud.lifetime=300
    
  }  
}


function spawnObstacles(){
if (frameCount%100 === 0){ 

obstacle=createSprite(600,80,40,10)



  obstacle.y=Math.round(random(80,120))
  obstacle.debug=true

obstacle.velocityX=-2

obstacle.scale=0.1
  
  obstacle.addImage(obstacle1)
  
  clouds1Group.add(obstacle)
 

  obstacle.setCollider("rectangle",0,0,20,20)

  obstacle.lifetime=300;

  // obstacle.depth=trex.depth;
  // trex.depth=trex.depth+1
}


}
// function spawnClouds(){

// }



