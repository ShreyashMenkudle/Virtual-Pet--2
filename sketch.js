var dog, happyDog, database, foodS, foodStock;
var feed,addFood;
var fedTime, lastFed;
var foodObj;
var dogImg,happyDogImg;

function preload(){
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  
   foodStock = database.ref("Food");
   foodStock.on("value", readStock);

   foodObj =new Food();

   dog = createSprite(800,200,10,60);
   dog.addImage(dogImg);
   dog.scale = 0.2;

   feed = createButton("Feed the Dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood = createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoodS);
}


function draw() {  
  background("green");

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
       lastFed = data.val();
  })
  
  fill(255);
  textSize(20);
  if (lastFed >=12){
    text("Last Feed :" + lastFed%12 + "PM",350,30);
  }else if(lastFed === 0){
    text("Last Feed : 12 PM",350,30);
  }else{
    text("Last Feed :" + lastFed + "AM",350,30);
  }

//    if(keyWentUp(UP_ARROW)){
//      dog.addImage(dogImg);
//    }
  
//    if (foodS === 0){
//      foodS = 20;
//    }
foodObj.display();
    drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}



function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()- 1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoodS(){
  foodS ++;
  database.ref('/').update({
  Food: foodS
  })  
}