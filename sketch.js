var Start = 1;
var Play = 2;
var Wall1 = 3;
var Wall2 = 4;
var End = 0;
var gameState = Start;

var play1, play1Img, play2, play2Img;
var soldier, soldierImg, soldierWall;
var dog, dogImg;
var bag, bagImg;
var bullet, bulletImg;
var wall1, wall1Img, wall1Stop, wall2, wall2Img, wall2Stop;
var crack1, crack1Img, crack2, crack2Img;

function preload()
{
  play1Img = loadImage("play1.png");
  play2Img = loadImage("play2.png");
  soldierImg = loadImage("soldier.png");
  dogImg = loadImage("dog.png");
  bagImg = loadImage("bag.png");
  bulletImg = loadImage("bullet.png");
  wall1Img = loadImage("wall1.png");
  wall2Img = loadImage("wall2.png");
  crackImg = loadImage("crack.png");
}

function setup()
{
  createCanvas(1000,600);

  play2 = createSprite(500,300)
  play2.addImage(play2Img);
  play2.scale = 0.3;
  play2.visible = false;

  play1 = createSprite(340,400);
  play1.addImage(play1Img);
  play1.scale = 0.1;
  play1.visible = false;

  playWall = createSprite(600,400,20,300);
  playWall.visible = false;

  soldier = createSprite(200,-160);
  soldier.addImage(soldierImg);
  soldier.scale = 0.8;
  soldier.visible = false;

  soldierWall = createSprite(200,550,300,8);
  soldierWall.visible = false;

  dog = createSprite(260,486)
  dog.addImage(dogImg);
  dog.scale = 1;
  dog.visible = false;

  bag = createSprite(66,-60);
  bag.addImage(bagImg);
  bag.scale = 1;
  bag.visible = false;

  wall1 = createSprite(807,354)
  wall1.addImage(wall1Img);
  wall1.scale = 0.149;
  wall1.visible = false;

  wall2 = createSprite(807,354)
  wall2.addImage(wall2Img);
  wall2.scale = 0.149;
  wall2.visible = false;

  wall1Stop = createSprite(843,360,20,300);
  wall1Stop.visible = false;

  wall2Stop = createSprite(760,360,20,300);
  wall2Stop.visible = false;

  bullet = createSprite(310,270);
  bullet.addImage(bulletImg);
  bullet.scale = 0.4;
  bullet.visible = false;

  crack1 = createSprite(840,280);
  crack1.addImage(crackImg);
  crack1.scale = 1;
  crack1.visible = false;

  crack2 = createSprite(760,280);
  crack2.addImage(crackImg);
  crack2.scale = 1;
  crack2.visible = false;
}

function draw()
{
  background(0);
  drawSprites();

  if(gameState === Start)
  {
    play1.visible = true;
    play2.visible = true;

    if(mousePressedOver(play1))
    {
      gameState = Play;
    }
  }

  if(gameState === Play)
  {
    soldier.visible = true;
    dog.visible = true;
    bag.visible = true;

    if(mousePressedOver(play1))
    {
    play1.velocityX = 10;
    soldier.velocityY = 10;
    bag.velocityY = 10;
    }

    if(playWall.isTouching(play1))
    {
      play1.velocityX = -20;
    }

    if(soldierWall.isTouching(soldier))
    {
      soldier.velocityY = 0;
      bag.velocityY = 0;
      gameState = Wall1;
    }
  }
  
  if(gameState === Wall1)
  {
   if(soldierWall.isTouching(soldier))
   {
   wall1.visible = true;
   }

   if(keyDown("space"))
   {
     bullet.visible = true;
     bullet.velocityX = 40;
   }

   if(bullet.isTouching(wall1Stop))
   {
     bullet.velocityX = 0;
     crack1.visible = true;

     fill("cyan");
     stroke("green");
     strokeWeight(5);
     textSize(20);
     text("Press r to change wall",20,200)

     fill("brown");
     stroke("black");
     strokeWeight(5);
     textSize(20);
     text("Damage : 12.43",600,100);

     fill("red");
     stroke("pink");
     strokeWeight(5);
     textSize(60);
     text("NOT SAFE!", 300,300);
   }

   if(keyDown("r"))
   {
    wall2.visible = true;
    bullet.visible = false;
    bullet.velocityX = 0;
    bullet.x = 310;
    crack1.visible = false;
    gameState = Wall2;
   }

   if(bullet.isTouching(soldier))
   {
    fill("yellow");
    stroke("green");
    strokeWeight(5);
    textSize(22);
    text("Press Space to Shoot!", 360,500);
   }
  }

  if(gameState === Wall2)
  {
  if(soldierWall.isTouching(soldier))
   {
    wall1.visible = false;
    wall2.visible = true;
   }

   if(keyDown("space"))
   {
     bullet.visible = true;
     bullet.velocityX = 40;
   }

   if(bullet.isTouching(wall2Stop))
   {
     bullet.velocityX = 0;
     crack2.visible = true;

     fill("cyan");
     stroke("green");
     strokeWeight(5);
     textSize(20);
     text("The wall is accepted!",20,200)

     fill("brown");
     stroke("black");
     strokeWeight(5);
     textSize(20);
     text("Damage : 3.68",600,100);

     fill("green");
     stroke("darkgreen");
     strokeWeight(5);
     textSize(60);
     text("SAFE!", 360,300);
   }

   if(bullet.isTouching(soldier))
   {
    fill("yellow");
    stroke("green");
    strokeWeight(5);
    textSize(22);
    text("Press Space to Shoot!", 360,500);
   }
  }
}