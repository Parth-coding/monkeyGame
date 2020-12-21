var PLAY = 1;
var END = 0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,food,ground;
var gameState=PLAY;

function preload(){
  
  
 monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 400);

 
  monkey = createSprite(50,380,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(200,390,1000,20);
  ground.velocityX=-4;
  ground.x = ground.width /2;

  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bannanaGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,10,500);
  monkey.debug = true;
  
  score = 0;
  food =0;
  

  
}


function draw() {
 
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  text("food eaten: "+ food, 100,50);
  
  obstaclesGroup.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  
  
  
  
  if(gameState === PLAY){

    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y>320) {
monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn the clouds
    spawnbannana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
   gameState = END; 
    }
    
     if(bannanaGroup.isTouching(monkey)){
food=food+1; 
       bannanaGroup.destroyEach();
    }
    
    
    
  }
   else if (gameState === END) {

     
      ground.velocityX = 0;
      
      monkey.velocityY=15;     
    
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bannanaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bannanaGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  monkey.collide(ground);

  drawSprites();
}

function reset(){
  gameState=PLAY;
  score=0;
  obstaclesGroup.destroyEach();
  bannanaGroup.destroyEach();
   ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);


}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,380,10,40);
   obstacle.velocityX = -(6 + score/100);
     obstacle.addImage("obstacle",obstacleImage);
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbannana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,320));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bannanaGroup.add(banana);
  }




}






