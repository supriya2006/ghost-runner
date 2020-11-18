var towerImg,tower;
var doorImg,door,doorGroup;
var climberImg,climber,climberGroup;
var ghost,ghostImg;
var ib,ibG;
var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
  ghostImg=loadImage("ghost-standing.png");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  doorGroup=new Group();
  climberGroup=new Group();
  ibG=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
}
function draw(){
  background(0);
  if(gameState==="play"){
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
      
    }
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    if(tower.y>400){
      tower.y=300;
    }
    spanDoors();
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(ibG.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
    
  }
  if(gameState==="end"){
    textSize(30);
    text("gameover",230,250);
  }
  
  drawSprites();
  
}
function spanDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var ib=createSprite(200,15);
    ib.width=climber.width;
    ib.height=2;
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    ib.x=door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY=1;
    climber.velocityY=1;
    ib.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth+=1;
    door.lifetime=800;
    climber.lifetime=800;
    ib.lifetime=800;
    doorGroup.add(door);
    ib.debug=true;
    climberGroup.add(climber);
    ibG.add(ib);
    
  }
}