
var canvas = document.getElementById("Canvas1");
var ctx = canvas.getContext("2d");
// Ball stuff
var x = canvas.width/2;
var y = canvas.height -30;
var speed = 2;
var dx = 1 * speed;
var dy = -1 * speed;
var ballRadius = 10;

// Paddle stuff
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleSpeed = 5;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 37) leftPressed = true;
    else if (e.keyCode == 39) rightPressed = true;
}

function keyUpHandler(e) {
    if (e.keyCode == 37) leftPressed = false;
    else if (e.keyCode == 39) rightPressed = false;
}

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height -paddleHeight, paddleWidth, paddleHeight);
    fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y , ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius ) dx = -dx;    
    if (y + dy < ballRadius )  dy = -dy;
    else if ( y + dy > canvas.height-ballRadius){

         document.location.reload();
    }


    if (rightPressed && paddleX < canvas.width- paddleWidth) paddleX += 1 * paddleSpeed;
    else if (leftPressed && paddleX > 0 ) paddleX -= 1 * paddleSpeed;

    x += dx;
    y += dy;

}

setInterval(draw, 10);