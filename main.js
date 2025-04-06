const canvas = document.getElementById("tetirs");
const ctx = canvas.getContext("2d");


/* z 블럭 */
const zBlock1 = [
  [1, 1, 0],
  [0, 1, 1]
]

/* 역 z 블럭 */
const zBlock2 = [
  [0, 1, 1],
  [1, 1, 0]
]

/* 네모 블럭 */
const sBlock = [
  [1, 1],
  [1, 1]
]

/* 일자 블럭 */
const oBlock = [
  [1, 1, 1, 1]
]

/* T 블럭 */
const tBlock = [
  [1, 1, 1],
  [0, 1, 0]
]

/* L 블럭 */
const lBlock1 = [
  [1, 0, 0],
  [1, 1, 1]
]

/* 역 L 블럭 */
const lBlock2 = [
  [0, 0, 1],
  [1, 1, 1]
]

// 블록 사이즈
const blockSize = 30;

/* 떨어지는 속도 */
let dy = 2;
/* 블럭 시작 높이 */
let y = 130;

// 블럭 떨어지는 속도

/* 블록 배열 */
const blocks = [zBlock1, zBlock2, sBlock, oBlock, tBlock, lBlock1, lBlock2];
console.log(blocks);


/* 랜덤 블록 변수 */
const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
console.log(randomBlock);

/* 블록 색상 지정 */
let blockColor;

if (randomBlock == zBlock1) {
  blockColor = "yellow";
} else if (randomBlock == zBlock2) {
  blockColor = "#00B050";
} else if (randomBlock == sBlock) {
  blockColor = "#C0504D";
} else if (randomBlock == oBlock) {
  blockColor = "#93CDDD";
} else if (randomBlock == tBlock) {
  blockColor = "#FFC000";
} else if (randomBlock == lBlock1) {
  blockColor = "#558ED5";
} else if (randomBlock == lBlock2) {
  blockColor = "#B3A2C7";
}

/* 보드판 중간 위치 */
/* (전체너비 - 블럭 한개당 30px) / 2  */
const boardWidth = (canvas.width - (randomBlock[0].length * blockSize)) / 2;
console.log(boardWidth);

/* 블록 그리기 함수 정의 */
function draw() {

  /* 캔버스 판 초기화 */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = blockColor; // 블록 색깔

  /* 2차원 배열에서 값이 1이면 블록 사이즈만큼 그리기 */
  for (let row = 0; row < randomBlock.length; row++) { // 0 ~ 1
    for (let col = 0; col < randomBlock[row].length; col++) { // 0 ~ 2 까지 또는 0 ~ 1
      if (randomBlock[row][col] === 1) {
        ctx.fillRect(boardWidth + col * blockSize, y + row * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(boardWidth + col * blockSize, y + row * blockSize, blockSize, blockSize);
      }
    }
  }

  /* y + 블럭 길이 * 블럭 사이즈 > */
  if(y + randomBlock.length * blockSize > canvas.height) {
    dy = 0;
    for(let i = 0; i < blocks.length; i++) {
      if(blocks[i] == randomBlock) {
        break;
      }
    }
  }else {
    y += dy;
  }
  
}

/* 캔버스에 블록 표시 */
setInterval(draw, 10);
