const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
	{ x: 200, y: 200 }, 
	{ x: 190, y: 200 }, 
	{ x: 180, y: 200 },
	{ x: 170, y: 200 }, 
	{ x: 160, y: 200 },
];

// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

// Get the canvas element
const snakeboard = document.getElementById("snakeCanvas");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
// Start game
main();

document.addEventListener("keydown", change_direction);
// main function called repeatedly to keep the game running
function main() {
	if (has_game_ended()) return;
	changing_direction = false;
	setTimeout(function onTick() {
		clear_board();
		move_snake();
		drawSnake();
		// Call main again
		main();
	}, 100)
}

// draw a border around the canvas
function clear_board() {
	//  Select the colour to fill the drawing
	snakeboard_ctx.fillStyle = board_background;
	//  Select the colour for the border of the canvas
	snakeboard_ctx.strokestyle = board_border;
	// Draw a "filled" rectangle to cover the entire canvas
	snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
	// Draw a "border" around the entire canvas
	snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function move_snake() {
	const head = { x: snake[0].x + dx, y: snake[0].y };
	snake.unshift(head);
	snake.pop();
}


function drawSnakePart(snakePart) {
	snakeboard_ctx.fillStyle = 'lightblue';
	snakeboard_ctx.strokestyle = 'darkblue';
	snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
	for (let i = 4; i < snake.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
	}
	const hitLeftWall = snake[0].x < 0;
	const hitRightWall = snake[0].x > snakeboard.width - 10;
	const hitToptWall = snake[0].y < 0;
	const hitBottomWall = snake[0].y > snakeboard.height - 10;
	return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function change_direction(event) {
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40;

	// Prevent the snake from reversing

	if (changing_direction) return;
	changing_direction = true;
	const keyPressed = event.keyCode;
	const goingUp = dy === -10;
	const goingDown = dy === 10;
	const goingRight = dx === 10;
	const goingLeft = dx === -10;
	if (keyPressed === LEFT_KEY && !goingRight) {
		dx = -10;
		dy = 0;
	}
	if (keyPressed === UP_KEY && !goingDown) {
		dx = 0;
		dy = -10;
	}
	if (keyPressed === RIGHT_KEY && !goingLeft) {
		dx = 10;
		dy = 0;
	}
	if (keyPressed === DOWN_KEY && !goingUp) {
		dx = 0;
		dy = 10;
	}
}

/*Function that prints the parts*/
function drawSnake() {
	snake.forEach(drawSnakePart);
}

function move_snake() {
	// Create the new Snake's head
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	// Add the new head to the beginning of snake body
	snake.unshift(head);
	snake.pop();
}

