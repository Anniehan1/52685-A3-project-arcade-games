let snake;
let rez = 20;
let food;
let w;
let h;
let gameOver = false;
let playAgain = false;

function setup() {
  createCanvas(1500, 800);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(15);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() { 
  if (!gameOver && !playAgain) {
    if (keyCode === LEFT_ARROW) {
      snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
      snake.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW) {
      snake.setDir(0, 1);
    } else if (keyCode === UP_ARROW) {
      snake.setDir(0, -1);
    } else if (key == ' ' && gameOver) {
      snake.grow();
    }
  }
  if (playAgain) {
      resetGame();
    
  }
}

function draw() {
    scale(rez);
    background(220);
    if (!gameOver && !playAgain) {
      if (snake.eat(food)) {
        foodLocation();
      }
      snake.update();
      snake.show();
    } else if (playAgain) {
      showGameOver();
      if (key === 'Y' || key === 'y') {
        resetGame();
      }
    }
  
    if (snake.endGame()) {
      gameOver = true;
      showGameOver();
    }
  
    noStroke();
    fill(255, 2, 0);
    rect(food.x, food.y, 1, 1);
  }
  

function showGameOver() {
  background(255, 0, 0);
//   fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  const playAgain = window.confirm("You Died. Press 'OK' to play again");
  if (playAgain) {
    resetGame();
  }
}

function resetGame() {
  snake = new Snake();
  foodLocation();
  gameOver = false;
  playAgain = false;
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
      gameOver = true;
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        gameOver = true;
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
