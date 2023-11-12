let board;
let currentPlayer;
let canvasSize = 400;

function setup() {
  createCanvas(canvasSize, canvasSize);
  currentPlayer = 'X';
  board = createBoard(5, 5);
  updateBackgroundColor();
  winnerText = createP('');
  winnerText.position(canvasSize / 2 - 50, canvasSize / 2 - 20);
  winnerText.style('font-size', '32px');
  winnerText.style('color', 'black');
  winnerText.style('text-align', 'center');
  winnerText.hide(); // Hide the text initially
}

function draw() {
  background(220);
  board.display();
}

function mousePressed() {
  let i = floor(mouseX / (canvasSize / 5));
  let j = floor(mouseY / (canvasSize / 5));

  if (board.available(i, j)) {
    board.place(i, j, currentPlayer);
    if (board.checkWin(i, j, currentPlayer)) {
      alert(currentPlayer + ' wins!');
      board.reset();
    } else if (board.isFull()) {
      alert('It\'s a tie!');
      board.reset();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateBackgroundColor();
    }
  }
}

function updateBackgroundColor() {
  if (currentPlayer === 'X') {
    document.body.style.backgroundColor = 'lightcoral';
  } else if (currentPlayer === 'O') {
    document.body.style.backgroundColor = 'lightblue';
  }
}

class Cell {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.value = '';
  }

  display() {
    rect(this.x, this.y, this.s, this.s);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(this.value, this.x + this.s / 2, this.y + this.s / 2);
  }
}

class Board {
  constructor(rows, cols, s) {
    this.rows = rows;
    this.cols = cols;
    this.grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.grid[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        this.grid[i][j] = new Cell(i * s, j * s, s);
      }
    }
  }

  display() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].display();
      }
    }
  }

  available(i, j) {
    return this.grid[i][j].value === '';
  }

  place(i, j, player) {
    this.grid[i][j].value = player;
  }

  checkWin(row, col, player) {
    // Check row
    let win = true;
    for (let i = 0; i < this.cols; i++) {
      if (this.grid[row][i].value !== player) {
        win = false;
        break;
      }
    }
    if (win) return true;

    // Check column
    win = true;
    for (let i = 0; i < this.rows; i++) {
      if (this.grid[i][col].value !== player) {
        win = false;
        break;
      }
    }
    if (win) return true;

    // Check diagonal (if applicable)
    if (row === col) {
      win = true;
      for (let i = 0; i < this.rows; i++) {
        if (this.grid[i][i].value !== player) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }

    // Check anti-diagonal (if applicable)
    if (row + col === this.rows - 1) {
      win = true;
      for (let i = 0; i < this.rows; i++) {
        if (this.grid[i][this.rows - 1 - i].value !== player) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }

    return false;
  }

  isFull() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].value === '') {
          return false;
        }
      }
    }
    return true;
  }

  reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].value = '';
      }
    }
  }
}

function createBoard(rows, cols) {
  const cellSize = canvasSize / rows;
  return new Board(rows, cols, cellSize);
}