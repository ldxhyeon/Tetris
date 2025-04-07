const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

/* 게임판 */
const row = 20;
const col = 13;
const blockSize = 30;

const tetrisBoard = Array.from({ length: row }, () => Array(col).fill(0));

/* 블럭들 */
const zBlock1 = [
  [1, 1, 0],
  [0, 1, 1]
];
const zBlock2 = [
  [0, 1, 1],
  [1, 1, 0]
];
const sBlock = [
  [1, 1],
  [1, 1]
];
const oBlock = [
  [1, 1, 1, 1]
];
const tBlock = [
  [1, 1, 1],
  [0, 1, 0]
];
const lBlock1 = [
  [1, 0, 0],
  [1, 1, 1]
];
const lBlock2 = [
  [0, 0, 1],
  [1, 1, 1]
];

const blocks = [zBlock1, zBlock2, sBlock, oBlock, tBlock, lBlock1, lBlock2];

let blockColor;
let blockColorList = [
  "yellow", "#00B050", "#C0504D", "#93CDDD", "#FFC000", "#558ED5", "#B3A2C7"
];

let block;
let x;
let y;

/* 블럭 생성 */
function createBlock() {
  const randomBlock = Math.floor(Math.random() * blocks.length);
  block = blocks[randomBlock];
  blockColor = randomBlock + 1;
  x = Math.floor((col - block[0].length) / 2);
  y = 0;
}

/* 충돌 체크 */
function checkCrash(dx = 0, dy = 1) {
  for (let i = 0; i < block.length; i++) {
    for (let j = 0; j < block[i].length; j++) {
      if (block[i][j]) {
        const nx = x + j + dx;
        const ny = y + i + dy;
        if (
          nx < 0 || nx >= col || ny >= row || tetrisBoard[ny][nx]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

/* 블럭 고정 */
function fixBlock() {
  for (let i = 0; i < block.length; i++) {
    for (let j = 0; j < block[i].length; j++) {
      if (block[i][j]) {
        tetrisBoard[y + i][x + j] = blockColor;
      }
    }
  }
  createBlock();
}

/* 블럭 및 배경 그리기 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 바닥 블럭 먼저 그리기
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (tetrisBoard[i][j]) {
        ctx.fillStyle = blockColorList[tetrisBoard[i][j] - 1];
        ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(j * blockSize, i * blockSize, blockSize, blockSize);
      }
    }
  }

  // 현재 블럭 그리기
  for (let i = 0; i < block.length; i++) {
    for (let j = 0; j < block[i].length; j++) {
      if (block[i][j]) {
        ctx.fillStyle = blockColorList[blockColor - 1];
        ctx.fillRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "#333";
        ctx.strokeRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
      }
    }
  }

  // 바닥에 닿았는지 확인
  if (!checkCrash()) {
    y++;
  } else {
    fixBlock();
  }
}

createBlock();
setInterval(draw, 300); // 블럭 내려가는 속도 조절














// const canvas = document.getElementById("tetris");
// const ctx = canvas.getContext("2d");

// /* 게임판 행 열 */
// const col = 13; // 열 == width 390 / 13 == 13
// const row = 20; // 행 == height 600 / 20 == 30 
// const blockSize = 30; // 블럭 사이즈


// // 바닥에 떨어지는 블록 저장
// const board = Array.from({ length: row }, () => Array(col).fill(0));

// /* z 블럭 */
// const zBlock1 = [
//   [1, 1, 0],
//   [0, 1, 1]
// ]

// /* 역 z 블럭 */
// const zBlock2 = [
//   [0, 1, 1],
//   [1, 1, 0]
// ]

// /* 네모 블럭 */
// const sBlock = [
//   [1, 1],
//   [1, 1]
// ]

// /* 일자 블럭 */
// const oBlock = [
//   [1, 1, 1, 1]
// ]

// /* T 블럭 */
// const tBlock = [
//   [1, 1, 1],
//   [0, 1, 0]
// ]

// /* L 블럭 */
// const lBlock1 = [
//   [1, 0, 0],
//   [1, 1, 1]
// ]

// /* 역 L 블럭 */
// const lBlock2 = [
//   [0, 0, 1],
//   [1, 1, 1]
// ]


// /* 블록 배열 */
// const blocks = [zBlock1, zBlock2, sBlock, oBlock, tBlock, lBlock1, lBlock2];
// console.log(blocks);

// /* 블록 색상 지정 */
// let blockColor;

// const colorList = [
//   "yellow",    // zBlock1
//   "#00B050",   // zBlock2
//   "#C0504D",   // sBlock
//   "#93CDDD",   // oBlock
//   "#FFC000",   // tBlock
//   "#558ED5",   // lBlock1
//   "#B3A2C7"    // lBlock2
// ];

// let block;
// let x; // x 좌표
// let y; // y 좌표

// // 블럭 새로 만들기
// function createBlock() {
//   /* 랜덤 정수 출력 */
//   const randomBlock = Math.floor(Math.random() * blocks.length);
//   /* block 랜덤숫자 해당하는 배열위치를 block 담기 */
//   block = blocks[randomBlock];
//   /* 블럭 컬러는 랜덤블럭 숫자 + 1 */
//   blockColor = randomBlock + 1;
//   /* 블럭 시작 좌표가 가운데에 맞추게끔 계산  */
//   x = Math.floor((col - block[0].length) / 2);
//   y = 0;
// }

// // 충돌 확인
// function checkCrash(dx = 0, dy = 1) {
//   for (let i = 0; i < block.length; i++) { // 블럭의 길이만큼 0 또는 0 ~ 1
//     for (let j = 0; j < block[i].length; j++) { // 블럭의 0 의 길이만큼 0 ~ 2 또는 0 ~ 1
//       if (block[i][j] == 1) { // 배열의 값이 1이면
//         const nx = x + j + dx; // x 좌표 + j + dx == ex) 5 + 0 + 0
//         const ny = y + i + dy; // 1
//         if (nx < 0 || nx >= col || ny >= row || board[ny][nx]) {
//           return true;
//         } 
//       }
//     }
//   }
//   return false;
// }

// // 블럭 멈추고 맵에 저장
// function fixBlock() {
//   for (let i = 0; i < block.length; i++) {
//     for (let j = 0; j < block[i].length; j++) {
//       if (block[i][j]) {
//         board[y + i][x + j] = blockColor;
//       }
//     }
//   }
//   createBlock();
// }

// // 블럭 하나 그리기
// function drawOne(xPos, yPos, colorIdx) {
//   ctx.fillStyle = colorList[colorIdx - 1];
//   ctx.fillRect(xPos * blockSize, yPos * blockSize, blockSize, blockSize);
//   ctx.strokeStyle = "#333";
//   ctx.strokeRect(xPos * blockSize, yPos * blockSize, blockSize, blockSize);
// }

// // 전체 그리기
// function render() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // 바닥 블럭
//   for (let i = 0; i < row; i++) {
//     for (let j = 0; j < col; j++) {
//       if (board[i][j]) {
//         drawOne(j, i, board[i][j]);
//         console.log(j);
//       } 
//     }
//   }

//   // 움직이는 블럭
//   for (let i = 0; i < block.length; i++) {
//     for (let j = 0; j < block[i].length; j++) {
//       if (block[i][j]) drawOne(x + j, y + i, blockColor);
//     }
//   }

//   // 내려갈 수 있나 확인
//   if (checkCrash()) {
//     fixBlock();
//   } else {
//     y++;
//   }
// }

// function rotate(block) {
//   const newBlock = [];
//   for (let i = 0; i < block[0].length; i++) {
//     newBlock[i] = [];
//     for (let j = block.length - 1; j >= 0; j--) {
//       newBlock[i][block.length - 1 - j] = block[j][i];
//     }
//   }
//   return newBlock;
// }


// document.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "ArrowLeft":
//       if (!checkCrash(-1, 0)) x--;
//       break;
//     case "ArrowRight":
//       if (!checkCrash(1, 0)) x++;
//       break;
//     case "ArrowDown":
//       if (!checkCrash(0, 1)) y++;
//       break;
//     case "ArrowUp":
//       const rotated = rotate(block);
//       const oldBlock = block;
//       block = rotated;
//       // 회전 후 충돌하면 되돌림
//       if (checkCrash(0, 0)) block = oldBlock;
//       break;
//   }
// });


// createBlock();
// setInterval(render, 300);
