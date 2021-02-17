var canvas;
var score = 0;
var fuel = 5
var gameState = 0
function preload(){
//loaded the images
  bg = loadImage("space.png")
  sp = loadImage("spaceshipr.png")
  ast = loadImage("astroid.png")
  asi = loadImage("alienSpace.png")
  p1I = loadImage("planet1.png")
  p2I = loadImage("planet2.png")
  a1I = loadImage("ufo1.png")
  f1I = loadImage("fire1.png")
  f = loadImage("fuel1.png")
  bs = loadSound("melodyloops-preview-space-slot-machine-2m30s.mp3")
  bc = loadImage("dims.jpg")
  d1I = loadImage("daimondreal.png")
  b2I = loadImage("bullet.png")
}



function setup(){
  canvas = createCanvas(1310,620);
  backg = createSprite(395,10)
  backg.addImage(bg)
  backg.scale=3
  backg.velocityY= 10
  

   bs.loop()
   bs.loop()
 //creating the spaceShip
  sps = createSprite(730,570)
  sps.addImage(sp)
  //sps.debug=true
  sps.setCollider("rectangle",1,1,100,200)

//creating some groups
fireg = new Group()
astrg= new Group()
fuelg = new Group()
spacesg = new Group()
bulletg = new Group()
a1g =new Group()
bulletg2 =new Group()
}


function draw(){
  background(0);

 if(gameState===0){
   //making the background infinite
if (backg.y>680){
backg.y = 0

}

if(keyDown("S")){
gameState=0

}
//creating the red spaceship
if(frameCount% 200===0){
  alienS = createSprite(random(20,1450), 0)
  alienS.addImage(asi)
  alienS.velocityY = 20
  alienS.lifeTime= 1
  alienS.scale=0.4
  spacesg.add(alienS)
  //alienS.debug = true
  
  }
  //moving the spaceship using arrow keys
if(keyDown(LEFT_ARROW)){
sps.x-=20;

}

if(keyDown(RIGHT_ARROW)){
  sps.x+=20;
  
  }
  //increasing the speed of the background

if(keyWentDown(UP_ARROW)){
    backg.velocityY= backg.velocityY+100;
   
 }
if(keyWentUp(UP_ARROW)) {
  backg.velocityY =  10
  
}
// creating the astroids
if(frameCount% 60===0){
  astr = createSprite(random(20,1450), 0)
  astr.addImage(ast)
  astr.velocityY = 5
  astr.lifeTime= 3
  astrg.add(astr)
  //astr.debug=true
  astr.setCollider('rectangle',1,1,70,70)
  }

  //increasing the score
  if(frameCount% 10===0){
   score= score+1
    }
  
// creating the blue planet
  if(frameCount% 1500===0){
    p1 = createSprite(random(20,1450), 0)
    p1.addImage(p1I)
    p1.velocityY = 5
    p1.lifeTime= 1
    p1.scale= 0.3
    


    }

 //creating the yellow planet   
    if(frameCount% 2000===0){
      p2 = createSprite(random(20,1450), 0)
      p2.addImage(p2I)
      p2.velocityY = 5
      p2.lifeTime= 1
      p2.scale= 0.3
      
      }
 //creating the UFO    
      if(frameCount% 700===0){
        a1 = createSprite(random(20,1450), 0)
        a1.addImage(a1I)
        a1.velocityY = 5
        a1.lifeTime= 1
        a1.scale= 0.3
        a1g.add(a1)
        }
//creating the fire
if(frameCount% 100===0){
f1 = createSprite(random(20,1450), 0)
f1.addImage(f1I)
f1.velocityY = 35
f1.lifeTime= 1
f1.scale= 0.3
fireg.add(f1)
//f1.debug = true

}
// creating the daimonds
if(frameCount% 2500===0){
  d1 = createSprite(random(20,1450), 0)
  d1.addImage(d1I)
  d1.velocityY = 5
  d1.lifeTime= 1
  
  dg.add(d1)
  //d1.debug = true
  
  }






//creating the fuel
if(frameCount% 300===0){
  f2 = createSprite(random(20,1450), 0)
  f2.addImage(f)
  f2.velocityY = 10
  f2.lifeTime= 1
  f2.scale= 0.5
     fuelg.add(f2)       
  }

//inceasing the fuel  
if(sps.isTouching(fuelg)){
fuel = fuel+2
fuelg.destroyEach()

}

//setting the position of camera
camera.position.x = sps.x
camera.position.x = sps.y

//decreasing the fuel
  if(frameCount% 250===0){
   fuel = fuel-1
              
    }
  
  }
// making the gameState end
 if(sps.isTouching(astrg)||sps.isTouching(fireg)||sps.isTouching(spacesg)||sps.isTouching(a1g)){
       backg.velocityY= 0
       gameState = 1

      }
//creating the bullets
if(keyWentDown("space")){
bullet = createSprite(sps.x,sps.y,20,20)
bullet.addImage(f1I)
bullet.velocityY = -50
bullet.scale = 0.09
bulletg.add(bullet)

}
if(keyWentDown("G")){
  bullet2 = createSprite(sps.x,sps.y,20,20)
  bullet2.addImage(b2I)
  bullet2.velocityY = -50
  bullet2.scale = 0.45
  bulletg2.add(bullet2)
  
  }

//if the bullet touches the objects
if(bulletg.isTouching(astrg)){
astrg.destroyEach()


}
if(bulletg.isTouching(a1g)){
  a1g.destroyEach()
  

}
if(bulletg2.isTouching(spacesg)){
  spacesg.destroyEach()
  

}


  drawSprites();

  //if the fuel is over
  if(fuel===0){
   gameState=1
   textSize(30)
  fill("white")
  text("your fuel was finished!!", 400,200)

  }

  // score and fuel text
  textSize(30)
  fill("white")
  text("SCORE : "+score, 1010,70)
  text("FUEL : "+ fuel, 40,70)
  textSize(20)
  text("press 'space' to shoot ", -60,580)
  text("use arrow keys to move", -60,605)
  text("press 'G' to shoot the red spaceship", -60,550)

  // in the endstate
  if (gameState ===1 ){
    background(bc)
    push()
    textSize(80)
    fill("white")
    stroke("black")
    strokeWeight(4)
    text("GAME OVER ", 400,160)
    textSize(30)
    text("OOPS!", 570,80)
    text("YOUR SCORE : "+score, 530,300)
    text("press 'ctrl+ R ' to replay", 500,470)
    pop()   
    
    }
    
}
