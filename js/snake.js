const board_border = '#ff8c73';
const board_background = "#222222";
const snake_col = 'lightblue';
const snake_border = 'darkblue';
const food_col = "#ff8c73";
const food_border = "black";
const score_col = "lightblue";
const score_border = "darkblue";
const score_font = "16px Arial"
const title_col ="#e20047" 
const title_font = "36px Arial"

let snake = [
	{ x: 200, y: 200 }, 
	{ x: 190, y: 200 }, 
	{ x: 180, y: 200 },
	{ x: 170, y: 200 }, 
	{ x: 160, y: 200 },
];

let score = 0;
// True if changing direction
let changing_direction = false;
let game_has_started = false;

let food_x;
let food_y;
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

gen_food();

document.addEventListener("keydown", change_direction);
document.addEventListener("keydown", start_game);
// main function called repeatedly to keep the game running
function main() {
	clear_board();
	game_has_started = false;
	console.log("game started: " + game_has_started)
	changing_direction=false;
	draw_start_screen();
	score = 0
}

function cycle(){
	if (has_game_ended()){
		main();
		return;
	}
	changing_direction = false;
	setTimeout(function onTick() {
		clear_board();
		drawFood();
		move_snake();
		drawSnake();
		draw_score();
		// Call main again
		cycle();
	}, 60)
}

function draw_start_screen(){
	snakeboard_ctx.fillStyle = title_col
	snakeboard_ctx.font = title_font
	snakeboard_ctx.fillText("Last Score", snakeboard.width/2, 36)
	snakeboard_ctx.fillText(score.toString(), snakeboard.width/2, 72)
	snakeboard_ctx.fillText("Snake", snakeboard.width/2 - (5*10), snakeboard.height/2 - 36)
	snakeboard_ctx.fillText("Press Any Button To Start", snakeboard.width/2 - (16*10), snakeboard.height/2 +18)
}

function start_game(event){
	if(!game_has_started){
		console.log("start game")
		game_has_started = true;

		snake = [
			{ x: 200, y: 200 }, 
			{ x: 190, y: 200 }, 
			{ x: 180, y: 200 },
			{ x: 170, y: 200 }, 
			{ x: 160, y: 200 },
		];
		cycle();
	}
}

// draw a border around the canvas
function clear_board() {
	//  Select the colour to fill the drawing
	snakeboard_ctx.fillStyle = board_background;
	//  Select the colour for the border of the canvas
	snakeboard_ctx.strokeStyle = board_border;
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

function draw_score(){

	//  Select the colour to fill the drawing
	snakeboard_ctx.fillStyle = score_col;
	snakeboard_ctx.font = score_font;
	//  Select the colour for the border of the canvas
	// Draw a "filled" rectangle to cover the entire canvas
	snakeboard_ctx.fillText("score: " + score.toString() , snakeboard.width-((score.toString().length + 7)*8), 20)
}

function drawSnakePart(snakePart) {
	snakeboard_ctx.fillStyle = snake_col;
	snakeboard_ctx.strokeStyle = snake_border;
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
	const LEFT_KEY = 65;
	const RIGHT_KEY = 68;
	const UP_KEY = 87;
	const DOWN_KEY = 83;

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

function drawFood() {
	snakeboard_ctx.fillStyle = food_col;
	snakeboard_ctx.strokeStyle = food_border;
	snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
	snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function random_food(min, max) {
	return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
	// Generate a random number the food x-coordinate
	food_x = random_food(0, snakeboard.width - 10);
	// Generate a random number for the food y-coordinate
	food_y = random_food(0, snakeboard.height - 10);
	// if the new food location is where the snake currently is, generate a new food location
	snake.forEach(function has_snake_eaten_food(part) {
		const has_eaten = part.x == food_x && part.y == food_y;
		if (has_eaten) gen_food();
	});
}

function move_snake() {
	// Create the new Snake's head
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };
	// Add the new head to the beginning of snake body
	snake.unshift(head);
	const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
	if (has_eaten_food) {
		// Increase score
		score += 10;

		// !!!! DISPLAY SCORE HERE


		// Generate new food location
		gen_food();
	} else {
		// Remove the last part of snake body
		snake.pop();
	}
}

