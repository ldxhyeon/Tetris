const canvas = document.getElementById("tetirs");
const ctx = canvas.getContext("2d");

var dx = 2;
var dy = -2;

/* 테트리스 블럭 */
const block = [1,1,1,1]


function blockMove() {

}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blockMove();
}

var interval = setInterval(draw, 10);