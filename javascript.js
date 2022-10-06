const canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 4;

let tilecount = 20;
let headx = 10;
let heady = 10;
let tilesize = 18;

let xvelocity = 0;
let yvelocity = 0;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let foodx = 5;
let foody = 5;

const snakeparts = [];
let taillength = 2;

let score = 0;

//Main Game Loop
function game(){
    let result = game_over();
    xvelocity = inputsXVelocity;
    yvelocity = inputsYVelocity;
    snakeposition();
    if(result){
        document.getElementById("score").textContent = "Your Score is " + score;
        document.querySelector('.result').style.display = 'block';
        document.querySelector('.game').style.filter = 'blur(3px)';
        return;
    }
    screen();
    food_collission();
    food();
    snake();
    setTimeout(game,1000/speed);
}

function game_over(){
    let gameOver = false;

    if(yvelocity===0&&xvelocity===0){
        return false;
    }

    if(headx<0){
        gameOver = true;
    }
    if(headx===tilecount){
        gameOver = true;
    }
    if(heady<0){
        gameOver = true;
    }
    if(heady===tilecount){
        gameOver = true;
    }

    // for(let i=0;i<snakeparts.length;i++){
    //     let part = snakeparts[i];
    //     if(part.x===headx&&part.y==heady)
    //     gameOver = true;
    //     break;
    // }

    return gameOver;
}

function screen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function snake(){

    ctx.fillStyle = 'blue';
    for(let i=0;i<snakeparts.length;i++){
        let part = snakeparts[i];
        ctx.fillRect(tilecount*part.x,tilecount*part.y,tilesize,tilesize)
    }


    snakeparts.push(new SnakePart(headx,heady));
    if(snakeparts.length>taillength){
        snakeparts.shift();
    }

    ctx.fillStyle = 'cyan';
    ctx.fillRect(tilecount*headx,tilecount*heady,tilesize,tilesize)
}

function snakeposition(){
    headx = headx+xvelocity;
    heady = heady+yvelocity;
}

function food(){
    ctx.fillStyle = 'red';
    ctx.fillRect(foodx*tilecount,foody*tilecount,tilesize,tilesize);
}

function food_collission(){
    if(foodx==headx && foody==heady){
        foodx = Math.floor(Math.random()*tilecount);
        foody = Math.floor(Math.random()*tilecount);
        taillength++;
        speed++;
        score++;
    }
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event) {
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
      //87 is w
      if (inputsYVelocity == 1) return;
      inputsYVelocity = -1;
      inputsXVelocity = 0;
    }
  
    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
      // 83 is s
      if (inputsYVelocity == -1) return;
      inputsYVelocity = 1;
      inputsXVelocity = 0;
    }
  
    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
      // 65 is a
      if (inputsXVelocity == 1) return;
      inputsYVelocity = 0;
      inputsXVelocity = -1;
    }
  
    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
      //68 is d
      if (inputsXVelocity == -1) return;
      inputsYVelocity = 0;
      inputsXVelocity = 1;
    }
  }

function reload_button(){
    location.reload();
}

function up_button(){
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
}

function down_button(){
    if (inputsYVelocity == -1) return;
      inputsYVelocity = 1;
      inputsXVelocity = 0;
}

function left_button(){
    if (inputsXVelocity == 1) return;
      inputsYVelocity = 0;
      inputsXVelocity = -1;
}

function right_button(){
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
}

game();