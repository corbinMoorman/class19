var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();

  invisibleBlockGroup = new Group();

  climbersGroup = new Group();
  
  ghost = createSprite(300,300,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
  
  
}

function draw() {
  background(200);
  //spookySound.loop();
   
  if(gameState === "play"){
 if(keyDown("left")){
   ghost.x = ghost.x -2
 }
  
 if(keyDown("right")){
   ghost.x = ghost.x +2
 }

 if(keyDown("space")){
   ghost.velocityY = -10
 }
 ghost.velocityY = ghost.velocityY+0.8;
if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0
  ghost.velocityX = 0
}
 if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
   ghost.destroy();
   gameState = "end"
 }
  if(tower.y > 400){
      tower.y = 300
    }
    drawSprites()
    spawnDoor()
}
if(gameState === "end"){
  textSize(40);
  text("gameover",300,300);
}
}
function spawnDoor(){
  if(frameCount % 250 === 0){
  door = createSprite(Math.round(random(100,500)),0);
  door.addImage(doorImg);
  door.velocityY = 1;
  door.lifetime = 800;
  doorsGroup.add(door);

  climber = createSprite(door.x,50)
  climber.addImage(climberImg);
  climber.velocityY = 1
  climber.lifetime = 800
  climbersGroup.add(climber)

invisibleBlock = createSprite(door.x,65,climber.width,2)
invisibleBlock.velocityY =1;
invisibleBlock.lifetime = 800
invisibleBlockGroup.add(invisibleBlock);

  ghost.depth = door.depth;
  ghost.depth = ghost.depth +1;
  }}