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
      }
    }
  }
}

/* 캔버스에 블록 표시 */
drawPiece();