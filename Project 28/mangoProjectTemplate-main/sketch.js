
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObj;
var mango1, mango2, mango3, mango4, mango5, mango6, bird;
var world,boy,stone;

function preload(){
	boy=loadImage("images/boy.png");
	stone = loadImage("images/stone.png");
}
function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1000,100,30);
	mango2=new mango(1100,150,30);
	mango3=new mango(1200,100,30);
	mango4=new mango(1100,250,30);
	mango5=new mango(1000,200,30);
	mango6=new mango(1200,250,30);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);

	stoneObj = new Stone(20,420, 30);

	launcherObj = new slingshot(stoneObj,{x:240,y:420});
	
	Engine.run(engine);

}

function draw() {

	Engine.update(engine);
  background(230);
  //Add code for displaying text here!
  textSize(23);
  text("Press 'Space' for another Turn!", 100,20);
  bird = image(boy ,200,340,200,300);
  

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();

  detectCollision(stoneObj,mango1);
  detectCollision(stoneObj,mango2);
  detectCollision(stoneObj,mango3);
  detectCollision(stoneObj,mango4);
  detectCollision(stoneObj,mango5);
  detectCollision(stoneObj,mango6);

  groundObject.display();

  launcherObj.display();

  stoneObj.display();
}
function detectCollision(lstone,lmango){
	mangoBodyPosition = lmango.body.position
	stoneBodyPosition = lstone.body.position

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
	if(distance<=lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body,false);
	}
}
/*function keyPressed() {
	if(keyCode === 32) {
		Matter.Body.setPosition(stoneObj.body,{x:235,y:420});
		launcherObj = stoneObj,{x:240,y:420};
	}
}*/
function mouseDragged() {
    Matter.Body.setPosition(stoneObj.body,{x:mouseX,y:mouseY});
}
function mouseReleased() {
    launcherObj.fly();
}