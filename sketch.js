var monkey,banana,stone,ground;
var bananaI,stoneI,monkeyR,bgI;
var bg,score=0;
var stoneGroup,bananaGroup;
var health=2;
var PLAY=1,END=0,gameState=1;

function preload() {
  monkeyR=
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bgI=loadImage("jungle.jpg");
  bananaI=loadImage("banana.png");
  stoneI=loadImage("stone.png");
}

function setup() {
  createCanvas(600, 280);
  
  ground=createSprite(200,265,400,5);
  ground.visible = false;
  
  bg=createSprite(200,25,400,400);
  bg.addImage(bgI);
  bg.velocityX=-5;
  bg.x=bg.width/2;
  
  monkey = createSprite(40,230,10,10);
  monkey.addAnimation("MonkeyG",monkeyR);
  monkey.scale=0.09;
  monkey.velocityY=10;
  
  bananaGroup=createGroup();
  stonesGroup=createGroup();
}

function draw() {
  background(220);
  
  monkey.collide(ground);
  
  if(gameState===PLAY){
    if(bg.x<100){
      bg.x=bg.width/2;
    }

    if(keyDown("space") && monkey.y>200){
      monkey.velocityY=-16;
    }
    
    //console.log(monkey.y);
    
    monkey.velocityY=monkey.velocityY+0.8;

    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score=score+2;
    }
    
    if(health===0){
       gameState=END;
       }
    
    spawnBanana();
    spawnStones();
    monkeyLife();
    
  }else if(gameState===END){
    monkey.pause();
    bg.velocityX=0;
    stonesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    stonesGroup.setVelocityEach(0,0);
    bananaGroup.setVelocityEach(0,0);
  }

  drawSprites();
  
  textSize(18);
  stroke(255);
  fill(255);
  text("Score = "+score,500,20);
  text("Health = "+health,15,20);
}

function spawnBanana(){
  if (frameCount%120===0) {
    banana = createSprite(610, 347,10,10);
    banana.x=610;
    banana.y=random(100,150);
    banana.addImage(bananaI);
    banana.velocityX=-5;
    banana.lifetime=122;
    banana.scale=0.08;
    bananaGroup.add(banana);
  }
}

function spawnStones(){ 
  if (frameCount%200===0) {
    stone = createSprite(610, 247,10,10);
    stone.x=610 ;
    stone.addAnimation( "Stone",stoneI);
    stone.velocityX=-5;
    stone.lifetime=122;
    stone.scale=0.15;
    stone.setCollider("rectangle",0,0,350,350);
    stonesGroup.add(stone);
  }
}

function monkeyLife(){
  if(monkey.isTouching(stonesGroup)){
    stonesGroup.destroyEach();
    monkey.scale=0.09;
    health=health-1;
  }
  
      switch(score){
    case 10: monkey.scale=0.10;
       break;
    case 20: monkey.scale=0.12;
       break;
    case 30: monkey.scale=0.14;
       break;
    case 40:monkey.scale=0.16;
       break; 
    case 50:monkey.scale=0.18;
       break;
    case 60:monkey.scale=0.20;  
       break;
    case 70:monkey.scale=0.22;
       break;
    case 80:monkey.scale=0.24;
       break;
    default: break;
         }
}

