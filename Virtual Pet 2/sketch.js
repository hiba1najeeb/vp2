var dog,happyDog,sadDog,database,foodS,foodStock;
var sadDogImg,happyDogImg;
var feedButton,addFoodButton;
var food;
var fedTime;
var readState,gameState;
var f1;
function preload()
{
  sadDogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  bg =loadImage("123.jpg")
  f1 =loadImage("Milk.png")
}

function setup() {
  database = firebase.database();
  createCanvas(700,500);
  dog = createSprite(550,420,15,15);
  dog.addImage(sadDogImg);
  dog.scale = 0.200;

  f2 = createSprite(450,445,15,15);
  f2.addImage(f1)
  f2.scale =0.1
  f2.visible = false
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  food = new Food();
  fedTime = database.ref('fedTime');
  fedTime.on("value",function(data){
    fedTime = data.val();
  });
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  feedButton = createButton("Feed The Dog");
  feedButton.position(695,80);
  feedButton.mousePressed(feedDog);
  addFoodButton = createButton("Add Food");
  addFoodButton.position(610,80);
  addFoodButton.mousePressed(addFood);

}
function draw() {
  background(bg)
  currentTime = hour();
  
  food.display();
  drawSprites();

  if(fedTime>=12)
        {
        fill("black");
        textSize(25); 
        text("Last Fed : "+ fedTime%12 + " PM", 100,430);
        }
        else if(fedTime==0)
        {
            fill("black");
            textSize(25); 
             text("Last Fed : 12 AM",100,430);
        }
        else
        {
            fill("black");
            textSize(25); 
            text("Last Fed : "+ fedTime + " AM", 100,430);
        }
}
function readStock(data)
{
  foodS = data.val();
  food.updateFoodStock(foodS);
}
function feedDog()
{
    dog.addImage(happyDogImg);
  f2.visible = true
    foodS--;
    database.ref('/').update({
      Food : foodS
    })
    fedTime = hour(); 
}
function addFood()
{
  dog.addImage(sadDogImg);
f2.visible = false
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}