let gameState = "menu";

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "cardGames") {
    // Add your card games code here
  } else if (gameState === "ticTacToe") {
    // Add your tic-tac-toe game code here
  } else if (gameState === "rockPaperScissors") {
    // Add your rock-paper-scissors game code here
  }
}

function drawMenu() {
  background(220);
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text("Choose a Game:", width / 2, 100);

  // Card Games Button
  if (mouseX > 150 && mouseX < 250 && mouseY > 150 && mouseY < 200) {
    fill(200, 0, 0);
    if (mouseIsPressed) {
      gameState = "cardGames";
    }
  } else {
    fill(255);
  }
  rect(150, 150, 100, 50);
  fill(0);
  text("Flip Monster", 200, 180);

  // Tic-Tac-Toe Button
  if (mouseX > 150 && mouseX < 250 && mouseY > 220 && mouseY < 270) {
    fill(200, 0, 0);
    if (mouseIsPressed) {
      gameState = "ticTacToe";
    }
  } else {
    fill(255);
  }
  rect(150, 220, 100, 50);
  fill(0);
  text("Snake", 200, 250);

  // Rock-Paper-Scissors Button
  if (mouseX > 150 && mouseX < 250 && mouseY > 290 && mouseY < 340) {
    fill(200, 0, 0);
    if (mouseIsPressed) {
      gameState = "Snake";
    }
  } else {
    fill(255);
  }
  rect(150, 290, 100, 50);
  fill(0);
  text("Snake", 200, 320);
}

