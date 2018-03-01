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

let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player

function preload() {
	game.load.image('sky', 'assets/sky.png')
	game.load.image('ground', 'assets/platform.png')
	game.load.spritesheet('diamond', 'assets/ice.png', 32, 32)
	game.load.spritesheet('woof', 'assets/ghost.png', 32, 32)
}



function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE)
	game.add.sprite(0,0, 'sky')
	
	platforms = game.add.group()
	platforms.enableBody = true
	
	let ground = platforms.create(0, game.world.height - 64, 'ground')
	ground.scale.setTo(2,2)
	ground.body.immovable = true
	
	// top left
	let ledge = platforms.create(-95, 100, 'ground')
	ledge.body.immovable = true 
	
	// top right
	ledge = platforms.create(500, 100, 'ground')
	ledge.body.immovable = true
	
	// second right
	ledge = platforms.create(300, 200, 'ground')
	ledge.body.immovable = true
	
	// third left
	ledge = platforms.create(-130, 290, 'ground')
	ledge.body.immovable = false 
	
	// third right
	ledge = platforms.create(500, 290, 'ground')
	ledge.body.immovable = false 
	
	// fourth left
	ledge = platforms.create(200, 380, 'ground')
	ledge.body.immovable = true  
	
	// fifth left
	ledge = platforms.create(-130, 460, 'ground')
	ledge.body.immovable = true 
	
	// fifth right
	ledge = platforms.create(500, 460, 'ground')
	ledge.body.immovable = false 
	
	
	
	player = game.add.sprite(32, game.world.height - 150, 'woof')
	game.physics.arcade.enable(player)
	player.body.gravity.y = 0.2
	player.body.gravity.y = 800
	player.body.collideWorldBounds = true
	
	player.animations.add('left', [0, 1], 10, true)
  player.animations.add('right', [2, 3], 10, true)
  diamonds = game.add.group()
  diamonds.enableBody = true
  for (var i = 0; i < 20; i++) {
    let diamond = diamonds.create(i * 70, 0, 'diamond')
    diamond.body.gravity.y = 1000
    diamond.body.bounce.y = 0.3 + Math.random() * 0.2
  }
  scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' })
  cursors = game.input.keyboard.createCursorKeys()
	
}

function update () {
  player.body.velocity.x = 0

  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(diamonds, platforms)

  game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

  if (cursors.left.isDown) {
    player.body.velocity.x = -150

    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150

    player.animations.play('right')
  } else {
    player.animations.stop()
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
  if (score === 12) {
    alert('You win!')
    score = 0
  }
}

function collectDiamond (player, diamond) {
  diamond.kill()
  score += 1
  scoreText.text = 'Score: ' + score
}



};
