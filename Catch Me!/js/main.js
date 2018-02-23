"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var paddle1;
var paddle2;
var ball_launched;
var ball_velocity;
var ball;

var score;
var score_text;

function preload() {
	game.load.image('paddle', 'assets/smallHand.png');
	game.load.image('ball', 'assets/ball.png');
}



function create() {
	paddle1 = hand(0, game.world.centerY);

	ball_launched = false;
	ball_velocity = 400;
	ball = ball(game.world.centerX, game.world.centerY);
	
	game.input.onDown.add(ballMove, this);
	
	score_text = game.add.text(728,40,'0',{
		font: "64px Gabriella",
		fill: "#FFFFFF",
		aligh: "center"
		});
		
	score = 0;
}

function update() {
    score_text.text = score;
	control(paddle1, game.input.y);
	game.physics.arcade.collide(paddle1, ball);
	game.physics.arcade.collide(paddle2, ball);
	
	if(ball.body.blocked.left){
		score -= 1;
	}
	
}

function ball(x,y){
	var ball = game.add.sprite(x,y,'ball');
	ball.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(ball);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.setTo(1,1);
	return ball;
}

function ballMove(){
	if(ball_launched){
		ball.x = game.world.centerX;
		ball.y = game.world.centerY;
		ball.body.velocity.setTo(0,0);
		ball_launched = false;
	}
	else{
		ball.body.velocity.x = -ball_velocity;
		ball.body.velocity.y = ball_velocity;
		ball_launched = true;
	}
}

function control(paddle, y){
	paddle.y = y;
	if(paddle.y < paddle.height/2){
		paddle.y = paddle.height/2;
	}
	else if(paddle.y > game.world.height - paddle.height/2){
		paddle.y = game.world.height - paddle.height/2;
	}
}

function hand(x,y){
	var paddle = game.add.sprite(x,y,'paddle');
	paddle.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(paddle);
	paddle.body.collideWorldBounds = true;
	paddle.body.immovable = true;
	return paddle;
}



};
