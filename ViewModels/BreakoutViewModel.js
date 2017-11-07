function BreakoutViewModel() {
    var self = this;

    self.Load = function () {
    }
    self.RunGame = function () {
       StartGame();
    }

    self.Load();
}

var ballX = 75;
var ballSpeedX = 5;
var ballY = 75;
var ballSpeedY = 5;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_COLS = 10;
const BRICK_GAP = 2;
const BRICK_ROWS = 14;
var brickGrid = [];
var bricksLeft = 0;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var mouseX;
var mouseY;

function StartGame() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);
    brickReset();
    ballReset();

    canvas.addEventListener('mousemove', updateMousePos)

}

function brickReset() {
    bricksLeft = 0;
    for (i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
        if (i < BRICK_COLS * 3) {
            brickGrid[i] = false;
        }
        else {
            brickGrid[i] = true;
            bricksLeft++;
        }
    }
}

function ballReset() {
    ballY = canvas.height / 2;
    ballX = canvas.width / 2;
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - (PADDLE_WIDTH / 2);
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 4;
    // ballspeedY = -4;
}

function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if ((ballX > canvas.width && ballSpeedX > 0.0) || (ballX < 0 && ballSpeedX < 0.0)) {
        ballSpeedX *= -1;
    }
    if (ballY < 0 && ballSpeedY < 0.0) {
        ballSpeedY *= -1;
    }

    if (ballY > canvas.height) {
        ballReset();
        brickReset();
    }
}

function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

    if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
        ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

        if (IsBrickAtColRow(ballBrickCol, ballBrickRow)) {
            brickGrid[brickIndexUnderBall] = false;
            bricksLeft--;
            console.log("bricks left: ", bricksLeft)

            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / BRICK_W);
            var prevBrickRow = Math.floor(prevBallY / BRICK_H);

            var bothTestsFailed = true;
            if (prevBrickCol != ballBrickCol) {
                if (IsBrickAtColRow(prevBrickCol, ballBrickRow)) {
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }
            }
            if (prevBrickRow != ballBrickRow) {
                if (IsBrickAtColRow(ballBrickCol, prevBrickRow)) {
                    ballSpeedY *= -1;
                    bothTestsFailed = false;

                }
            }
            if (bothTestsFailed) {
                ballSpeedX *= -1;
                ballSpeedY *= -1;


            }
        }
    }
}
function IsBrickAtColRow(col, row) {
    if (col >= 0 && col < BRICK_COLS &&
        row >= 0 && row < BRICK_ROWS) {
        var brickIndexUnderCoord = rowColToArrayIndex(col, row);
        return brickGrid[brickIndexUnderCoord];
    }
    else {
        return false
    }
}

function ballPaddleHandling() {
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

    if (ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY &&
        ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX) {
        ballSpeedY *= -1

        var centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
        var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;

        ballSpeedX = ballDistFromPaddleCenterX * .35;

        if (bricksLeft == 0) {
            brickReset();
        }
    }
}

function moveAll() {
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();

}

function drawBricks() {
    for (var row = 0; row < BRICK_ROWS; row++) {
        for (var col = 0; col < BRICK_COLS; col++) {
            var arrayIndex = rowColToArrayIndex(col, row);
            if (brickGrid[arrayIndex]) {
                colorRect(BRICK_W * col, BRICK_H * row, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
            }
        }
    }
}

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}

function colorRect(topleftX, topleftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor
    canvasContext.fillRect(topleftX, topleftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
    canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY)
}

function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    drawBricks();

    colorCircle(ballX, ballY, 10, "white")

    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

    var mouseBrickCol = Math.floor(mouseX / BRICK_W);
    var mouseBrickRow = Math.floor(mouseY / BRICK_H);
    var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol, mouseBrickRow)

    //colorText(mouseBrickCol + "," + mouseBrickRow + ": " + brickIndexUnderMouse, mouseX, mouseY, "yellow");



}

function updateAll() {
    moveAll();
    drawAll();
}
