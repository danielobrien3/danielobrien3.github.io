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

// main function called repeatedly to keep the game running
function main() {
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

