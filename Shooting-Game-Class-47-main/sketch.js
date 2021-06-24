   
   
   var gameState = "play";
   var score =0;
   var shoot,

   function preload(){
    spaceImage= loadImage("images/bgspace.jpg");
    enemyImage= loadImage("images/enemy.png");
    spaceshipImage= loadImage("images/spaceShip.png");
    shoot= loadSound("shooting.wav")
   }
   
   function setup(){
    createCanvas(displayWidth,displayHeight-80)
    space = createSprite(width, height);
    space.addImage(spaceImage);  
    space.scale=5
    space.y = space.height/2;
    
    player = createSprite(width/2, height-200);
    player.addImage(spaceshipImage);
    

    EnemyGroup = new Group();
    BulletGroup = new Group();
    textSize(25);
    fill("yellow")
   }


   
   function draw() {
  
   background("black");
   
   if(gameState === "play"){
  
    if(keyWentDown("space"))  {
      generateBullets();  
      shoot.play();
   }

     space.velocityY= 5;
     player.x = World.mouseX;
   
     if (space.y > height) {       
       space.y = space.height/2;
     }
  
     generateEnemy();
       
   }
   
   for (var i = 0; i < EnemyGroup.length; i++) {
   var temp=EnemyGroup.get(i);
   if(temp.isTouching(BulletGroup)){
     temp.destroy();
     score = score+1;
   }
 }  
 
   for (var i = 0; i < EnemyGroup.length; i++) {
     var temp1=EnemyGroup.get(i);
     if(temp1.y>height+50){
     temp1.destroy();
     score = score-1;
   }
 }  
   
   drawSprites();
    
     text("Score:  "+score,300,30); 
   }
  
  function generateEnemy() {
   if(World.frameCount%40===0){
     var enemy = createSprite(300,0);
     enemy.addImage(enemyImage);
    enemy.x = random(20,width-20);
     enemy.velocityY = 5;
     enemy.scale = 0.5;
     enemy.lifetime = 300;
     EnemyGroup.add(enemy);
   }
 }
 
 function generateBullets() {
   var bullet = createSprite(300,380,5,10);
   bullet.x = player.x;
   bullet.y = player.y;
   bullet.shapeColor = "red"; 
   bullet.velocityY = -10;
   bullet.depth = player.depth-1;
   bullet.lifetime = 200;  
   BulletGroup.add(bullet);
   
 }  
 
   
