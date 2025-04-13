const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

/* 게임판 */
const row = 20; // 행 == height 600 / 30 == 20
const col = 13; // 열 == width 390 / 13 == 13
const blockSize = 30; // 블럭 사이즈

// 바닥에 떨어지는 블록 저장
// row 행 , col 열 만큼 배열을 만들고 값을 0으로 채움 == 20행 13열
const tetrisBoard = Array.from({ length: row, }, () => Array(col).fill(0));
console.table(tetrisBoard); // 테이블 확인


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

/* 랜덤으로 꺼내기 위한 배열 */
const blocks = [zBlock1, zBlock2, sBlock, oBlock, tBlock, lBlock1, lBlock2];

/* 컬러 리스트의 값 꺼내서 담는 변수 */
let blockColor;

/* 블럭 컬러 정의 */
let blockColorList = [
  "yellow",    // zBlock1
  "#00B050",   // zBlock2
  "#C0504D",   // sBlock
  "#93CDDD",   // oBlock
  "#FFC000",   // tBlock
  "#558ED5",   // lBlock1
  "#B3A2C7"    // lBlock2
]

let block;
let x; // x 좌표
let y; // y 좌표


/* 블럭 만들기 */
function createBlock() {
  const randomBlock = Math.floor(Math.random() * blocks.length); // 랜덤 숫자 뽑기(블럭 길이만큼)
  // console.log(randomBlock);
  block = blocks[randomBlock]; // 0 ~ 6까지 랜덤 숫자
  console.log(block);
  blockColor = randomBlock + 1 // 블럭 컬러 지정
  x = Math.floor((col - block[0].length) / 2); // 가운데 좌표
  y = 4; // y 좌표 4부터 시작
}


let dx = 0; // 수평 좌표
let dy = 1; // 수직 좌표


// 아래에 값이 있는지 없는지 확인후 y++
/* 충돌 감지 정의 */
function checkCollision() {
  for(let i = 0; i < block.length; i++) {
    for(let j = 0; j < block[i].length; j++) { 
      if(block[i][j] == 1) { // 2차원 배열 값이 1이면
        const cx = x + j + dx;  // 블럭의 x 좌표  5 , 6, 7
        const cy = y + i + dy;  // 블럭의 y 좌표  5,  5  5

        // cx가 왼쪽 벽보다 작으면 true, cx가 col(벽 우측) 크거나 같으면 true,
        // cy가 row(아래 바닥) 보다 크거나 같으면 true
        // 테트리스 보드판 행과 열에 값이 있다면 true
        if(cx < 0 || cx >= col || cy >= row || tetrisBoard[cy][cx]) {
          return true;
        }
      }
    }
  }

  return false;
}


let gameOver = false; // 게임 끝 설정

/* 보드판 좌표에 값 저장 */
function fixBlock() {

  // 4번째 줄에 이미 블록이 있다면 게임 오버
  for (let j = 0; j < block[0].length; j++) {
    if (tetrisBoard[4][x + j]) { // y 4번에 값이 있다면 실행
      gameOver = true;
      alert("게임 끝!");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스판 초기화
      break;
    }
  }

  for(let i = 0; i < block.length; i++) {
    for(let j = 0; j < block[i].length; j++) {
      if(block[i][j] == 1) {
        console.log(y,x);
        tetrisBoard[y + i][x + j] = blockColor; // 해당 좌표에 색상코드 저장
        console.table(tetrisBoard); // 테이블 확인
      }
    }
  }
  createBlock(); // 새로운 블럭 생성
}


/* 블럭 크기 및 생상 정의 */
function draw() {

  // true이면 블럭 만들지 않음
  if(gameOver) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스판 초기화

  /* 떨어진 블럭 */
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (tetrisBoard[i][j]) { // 배열의 값이 있다면 블럭 그리기
        ctx.fillStyle = blockColorList[tetrisBoard[i][j] - 1]; // ex) 4의 값이 있다면 -1 하여 ColorList 값 꺼내오기
        ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(j * blockSize, i * blockSize, blockSize, blockSize);
      }
    }
  }

  /* 떨어지는 블럭 */
  for (let i = 0; i < block.length; i++) { // 블럭 i 길이 2
    for (let j = 0; j < block[i].length; j++) { // 블럭 j의 길이 3 or 4
      if (block[i][j] == 1) {
        ctx.fillStyle = blockColorList[blockColor - 1]; // 리스트 - 1 컬러
        ctx.fillRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "#333";
        ctx.strokeRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
      }
    }
  }

  if(checkCollision()) { 
    fixBlock();
  }else {
    y++; // false이면 y좌표 증가
  }

}

createBlock();
setInterval(draw, 300); // 비동기 함수 계속 실행

