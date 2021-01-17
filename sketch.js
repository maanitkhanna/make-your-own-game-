const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder,polygon,ground;
var stand1,stand2,towerimg;
var polygon;
var slingShot;
var polygon_img, backgroundImg;
var score=0;
var bg = "images/light.jpg";
var bombs=[];
function preload(){
  getBackgroundImage();
  polygon_img=loadImage("images/polygon.png");
  heroimg=loadImage("images/hero.png");
  monsterimg=loadImage("images/monster.png");
  towerimg=loadImage("images/tower.png");
}
function setup() {
  createCanvas(900,400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ground = new Ground();

 
  //level one
  block1 = new Block(600,325,50,100);
  console.log(block1);
  block2 = new Block(800,325,50,100);
  block3 = new Block(750,325,50,100);
  block4 = new Block(700,325,50,100);
  block5 = new Block(650,325,50,100);
  block6 = new Block(500,325,50,100);
  block7 = new Block(550,325,50,100);
 
  //polygon holder with slings
  polygon = Bodies.circle(180,120,20);
  World.add(world,polygon);
  
  slingShot = new Slingshot(this.polygon,{x:180,y:120});

}
function draw() {
  //background(56,44,44); 
  if(backgroundImg) {
    background(backgroundImg);
  //Engine.update(engine);
  text(mouseX + ',' + mouseY, mouseX, mouseY);
  image(heroimg,140,70,50,100);
  image(towerimg,130,150,100,250);
  textSize(20);
  fill("lightyellow");
  text("Drag the polygon to destroy the blocks",300,30);
  text("SCORE : "+score,750,40);
  textSize(10);
  text("Press Space to get a second Chance to Play!!",650 ,350);
  ground.display();
  image(monsterimg,785,37,100,200);
  strokeWeight(2);
  stroke(15);
  fill("skyblue");
  block1.display();
  block2.display();
  block3.display();
  block4.display();
  block5.display();
  block6.display();
  block7.display();
 
  fill("gold");
  imageMode(CENTER)
  image(polygon_img ,polygon.position.x,polygon.position.y,40,40);

  slingShot.display();
  }
  block1.score();
  block2.score();
  block3.score();
  block4.score();
  block5.score();
  block6.score();
  block7.score();

  if(frameCount%60===0){
    bombs.push(new Bomb(random(600, 850), 10,25));
    score++;
  }

  for (var j = 0; j < bombs.length; j++) {
   
    bombs[j].display();
  }
}

function mouseDragged(){
  Matter.Body.setPosition(this.polygon,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.polygon);
  }
}
async function getBackgroundImage(){
   var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
   var responseJSON = await response.json();

   var datetime = responseJSON.datetime;
   var hour = datetime.slice(11, 13);
   //console.log(hour);

   if (hour >= 06 && hour <= 18) {
     bg = "images/light.jpg";
   } else {
     bg = "images/dark.jpg";
   }

   backgroundImg = loadImage(bg);
   console.log(backgroundImg);
}
