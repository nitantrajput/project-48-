//variable image
var zombie,zombieImg;
var peaG, shootG,cherryG,flowerG,wallG,powerG;
var peashooter,sunflower,wallNut,cherryBomb,bg,sunImg,explosion;

var score=0,zombieKill =0;
var zombieHP = 250, wallnutHP=400;
var gameState="title";

function preload(){
  zombieImg= loadAnimation("Images/z1.png","Images/z2.png","Images/z3.png");
  peashooter = loadImage("Images/peashooter.png");
  sunflower = loadImage("Images/sunflower.png");
  wallNut = loadImage("Images/wall nut.png");
  cherryBomb = loadImage("Images/cherry bomb.png");
  bg = loadImage("Images/pvz bg.jpg");
  sunImg = loadImage("Images/sun.png");
  shootImg = loadImage("Images/Pea for Pvz.png");
  explosion = loadImage("Images/explosion.png");

  titleImg = loadImage("Images/title.png ")
  storyImg = loadImage("Images/story.png")
  introImg = loadImage("Images/Introduction.PNG")
}
function setup() {
  createCanvas(displayWidth , displayHeight);
  
  //creating groups
  peaG = createGroup();
  shootG = createGroup();
  cherryG = createGroup();
  flowerG = createGroup();
  sunG = createGroup();
  wallG = createGroup();
  powerG = createGroup();
  zombieG = createGroup();

  //button
  button = createButton("NEXT")
  button.position(550,500)
  button.size(100,60)

  //screens
  screen = createSprite(675,300);
  
  
  
}
function draw() {
  background(bg); 
  textSize(20)
  stroke("black")  
  fill("black") 
  text(gameState, 300,50)
  //text(mouseX +' '+ mouseY, mouseX, mouseY);
  console.log(gameState)
  if(gameState === "title"){
    screen.addImage(titleImg);
    button.mouseClicked(()=>{
      gameState = "story"
    })
  }
  if(gameState === "story"){
    screen.addImage(storyImg);
    button.mouseClicked(()=>{
      gameState = "instruction"
    })
  }
  if(gameState === "instruction"){
    screen.addImage(introImg);
    button.mouseClicked(()=>{
      gameState = "start"
    })
  }
  if(gameState === "start"){
    button.hide();
    screen.visible = false;
    if(frameCount%50 ===0){
      if(keyDown("q")){
        spawnPeas();
      }
      
      if(keyDown("w")){
        spawnSun();
      }

      
      if(keyDown("e")){
        block();
      }

      if(keyDown("r")){
        explode();
      }
    }
    spawnZombie();

    if(shootG.isTouching(zombieG)){
      zombieG.destroyEach()
    }
    if(wallG.isTouching(zombieG)){
      zombieG.setVelocityXEach(0);
    }
    if(cherryG.isTouching(zombieG)){
      //explord 
      zombieG.destroyEach();
      zombieKill += 1;
      cherryG[0].addImage(explosion);
      cherryG.setLifetimeEach(10)
    }
    
    if(mousePressedOver(sunG[0])){
      score = score + 5;
      sunG[0].destroy();
    }
    


    drawSprites();
    textSize(35);
    fill("black");
    text("Score : "+score,800,30 );
    text(mouseX +' '+ mouseY, mouseX, mouseY);
    //text("Zombie killed : "+zombieKill,800,70 );
  }
  
  
  
  if(zombieG.x < 200){
    textSize(35);
    fill("black");
    text("You LOSE",700,300);
  }

  drawSprites();

}

function spawnPeas(){
  var pea = createSprite(100,100,30,30)
  pea.addImage(peashooter)
  pea.scale = 0.1
  pea.x = random(300,500)
  pea.y = random(100,800)
  
  if(frameCount % 40 === 0){
    var shoot = createSprite(pea.x, pea.y-25,30,30);
    shoot.addImage(shootImg);
    shoot.velocityX = 10;
    shoot.scale = 0.2;
    shoot.lifetime =80
    shootG.add(shoot)
 }
 pea.lifetime =100 
 peaG.add(pea)
}
function spawnSun(){
  var flower = createSprite(100,300,30,30);
  flower.addImage(sunflower);
  flower.scale = 0.3;
  flower.x = random(300,500)
  flower.y = random(100,800)
  if(frameCount% 20 === 0){
    var sun = createSprite(Math.round(random(300,1000)),0,10,10);
    sun.velocityY = 4;
    sun.addImage(sunImg);
    sun.lifetime =80
    sunG.add(sun)
  }
  flower.lifetime =100
  flowerG.add(flower);
}
function block(){
  var nut = createSprite(100,500,30,30);
  nut.addImage(wallNut);
  nut.x = random(300,500)
  nut.y = random(100,800)
  nut.scale = 0.7;
  nut.lifetime =100
  //nut.debug = true;
  nut.setCollider("rectangle",0,0,50,50)
  wallG.add(nut);
}
function explode(){
  var cherry = createSprite(300,500,20,20);
  cherry.addImage(cherryBomb);
  cherry.scale = 0.5;
  cherry.x = random(300,500)
  cherry.y = random(100,800)
  cherry.lifetime =100
  cherryG.add(cherry);
}

function spawnZombie(){
  if(frameCount% 200===0){
  var zombies = createSprite(displayWidth, 400,10,10);
  zombies.addAnimation("running",zombieImg);
  //change the animation and have more than one zombie image
  zombies.scale = 0.5;
  zombies.y = Math.round(random(100,500))
  zombies.velocityX = -7;
  zombies.lifetime = displayWidth/8;
  zombieG.add(zombies);
  }
}