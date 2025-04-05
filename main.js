<<<<<<< HEAD
const canvas = document.getElementById("test2");
var ctx = canvas.getContext("2d");

/* 공 반지름 */
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

/* 패들 변수 */
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

/* 패들 움직임 우, 좌 */
var rightPressed = false;
var leftPressed = false;

/* 벽돌 변수 */
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

/* 벽돌 배열 선언 2차원! x, y 초기값 0 , status 1 */
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

/* 벽돌 부수기 */
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
        }
=======
var canvas = document.getElementById("myTetris");
var ctx = canvas.getContext("2d");

/* 게임 판 */
const board = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

/* z 블럭 */
const zBlock1 = [
  [1,1,0],
  [0,1,1]
]

/* 역 z 블럭 */
const zBlock2 = [
  [0,1,1],
  [1,1,0]
]

/* 네모 블럭 */
const sBlock = [
  [1,1],
  [1,1]
]

/* 일자 블럭 */
const oBlock = [
  [1,1,1,1]
]

/* T 블럭 */
const tBlock = [
  [1,1,1],
  [0,1,0]
]

/* L 블럭 */
const lBlock1 = [
  [1,0,0],
  [1,1,1]
]

/* 역 L 블럭 */
const lBlock2 = [
  [0,0,1],
  [1,1,1]
]

const blockSize = 30; // 블록 사이즈

/* 블록 배열 */
const blocks = [zBlock1, zBlock2, sBlock, oBlock, tBlock, lBlock1, lBlock2];

/* 랜덤 블록 선택 */
const currentBlock = blocks[Math.floor(Math.random() * blocks.length)];

/* 블록 그리기 */
function drawPiece() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  ctx.fillStyle = "blue"; // 블록 색깔

  for (let row = 0; row < currentBlock.length; row++) {
    for (let col = 0; col < currentBlock[row].length; col++) {
      if (currentBlock[row][col] === 1) {
        ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(col * blockSize, row * blockSize, blockSize, blockSize);
>>>>>>> cb80727fa2b2a6a4b5771c62a6c4b0e088a2245a
      }
    }
  }
}

<<<<<<< HEAD
/* 공 */
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

/* 패들 */
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

/* 벽돌 그리기 */
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      if (y = y - paddleHeight) {
        dy = -dy;
      }
    }
    else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);
=======
/* 캔버스에 블록 표시 */
drawPiece();
>>>>>>> cb80727fa2b2a6a4b5771c62a6c4b0e088a2245a
