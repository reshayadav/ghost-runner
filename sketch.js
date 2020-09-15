var tower, towerImg;
var ghost, ghostImg;
var doorImg, climberImg;
var PLAY =1;
var END = 0;
var gameState =PLAY;
var invisibleBlockGroup;
var climberGroup;


function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300)
  tower.addImage(towerImg);
  tower.velocityY = -1;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  invisibleBlockGroup = new Group();
  climberGroup = new Group();
  
  ghost.debug = true;
  
}

function draw(){
  background(0);
  if(gameState === PLAY){
  
  spookySound.play();
  
  if(tower.y <0){
    tower.y = tower.height/2;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY +0.5;
  
  if(keyDown("right")){
     ghost.x = ghost.x +5;
     }
  if(keyDown("left")){
    ghost.x = ghost.x -5;
  }
  
  ghost.collide(climberGroup);
  
  spawnObstacle();
    if(ghost.y >600 || ghost.isTouching(invisibleBlockGroup)){
      gameState = END;
    }
  drawSprites()
  }
  else if(gameState === END){
     fill("yellow");
    textSize(20);
    text("GAME OVER", 300,300);
   
  }
}

function spawnObstacle(){
  if(frameCount%240===0){
    var door= createSprite(200,-50);
    var climber = createSprite(200,10);
    var iBlock = createSprite(200,15);
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    iBlock.x = climber.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = +1;
    climber.velocityY = +1;
    iBlock.velocityY = +1;
    door.lifetime = 650;
    climber.lifetime = 600;
    iBlock.width = climber.width;
    iBlock.height = 15;
    iBlock.visible = false;
    iBlock.lifetime = 600;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth +1;
    
    iBlock.debug = true;
    
    climberGroup.add(climber);
    invisibleBlockGroup.add(iBlock);
 }
}