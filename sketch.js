//Global Variables
var ground,monkey, banana, stone;

var groundimg,monkey_running, bananaimg, stoneimg;

var bananaGroup,stoneGroup;

var edges,invisibleGround;

var score=0;
var gameState="play";
function preload(){
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  groundimg=loadImage("jungle.jpg");

  bananaimg=loadImage("banana.png");

  stoneimg=loadImage("stone.png")
}


function setup() {
  createCanvas(800,400);

edges=createEdgeSprites();

  ground=createSprite(300,200);
  ground.addImage("ground",groundimg)
  ground.velocityX=-2;

  monkey=createSprite(50,330)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.05

  invisibleGround=createSprite(50,380,100,10);
  invisibleGround.visible=false;

  stoneGroup=new Group();
  bananaGroup= new Group();
}


function draw(){
 background("pink"); 
console.log(ground.x)
 if(ground.x<300){
   ground.x=width/2;
 }

 if(keyDown("space")){
   monkey.velocityY=-10;
 }
 monkey.velocityY=monkey.velocityY+0.98;

 monkey.collide(invisibleGround);

 stoneSpawn()
 bananaSpawn()

 if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach()
   score=score+1;
   monkey.scale=monkey.scale+0.1
 }
 if(monkey.isTouching(stoneGroup)){
   gameState="end";
 }
 if(gameState==="end"){
   monkey.destroy()
   bananaGroup.setVelocityEach(0,0);
  stoneGroup.setVelocityEach(0,0);
  bananaGroup.destroyEach()
  stoneGroup.destroyEach()
  ground.destroy()
  text("Game over",400,200)
 }
 drawSprites()
 fill("black")
 textSize(25);
 text("Score: "+score,650,50)
}

function stoneSpawn(){
if(frameCount%200===0){
  stone=createSprite(850,360)
  stone.velocityX=-2;
  stone.addImage("stone",stoneimg)
  stoneGroup.add(stone);
  stone.scale=random(0.05,0.3)
  stone.lifetime=450;
}
}

function bananaSpawn(){
   if(frameCount%250===0){
     banana=createSprite(850,360);
     banana.y=random(100,320);
     banana.addImage("banana",bananaimg);
     bananaGroup.add(banana)
     banana.lifetime=450;
     banana.scale=0.1
     banana.velocityX=-2;
   }
}