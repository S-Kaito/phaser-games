import * as Phaser from "phaser";

const gameOptions = {
	ballSpeed: 200,
	ballRadius: 25,
	scale:{
		width: 700,
		height: 350
	},
	block:{
		width: 10,
		height: 6
	}
}

export default class Breakout extends Phaser.Scene{
	ballGroup:Phaser.GameObjects.Group = null;
	ball:Phaser.GameObjects.Image = null;
	score:number = 0;
	blockGroup:Phaser.GameObjects.Group = null;
	scoreText: Phaser.GameObjects.Text = null;

	init(){
		console.log("hundreds");
	}
	preload(){
		this.load.image("ball", "../assets/sprites/ball.png");
		this.scale.resize(gameOptions.scale.width, gameOptions.scale.height);

	}
	create(){
		const scale = this.game.scale;
		this.physics.world.setBounds(0, 0, scale.width, scale.height);
		this.ballGroup = this.physics.add.group();
		this.score = 0;
		let gameArea = new Phaser.Geom.Rectangle(0, 0, scale.width, scale.height);
		let buttonWidth = scale.width / gameOptions.block.width;
		this.blockGroup = this.add.group();
		
		let directionVector = Phaser.Math.RandomXY(new Phaser.Math.Vector2, gameOptions.ballSpeed);
		let ball = this.ballGroup.create(scale.width / 2, 100, "ball");
		this.ballGroup.add(ball);
		ball.setCircle(256);
		ball.displayHeight = gameOptions.ballRadius;
		ball.displayWidth = gameOptions.ballRadius;
		ball.setCollideWorldBounds(true);
		ball.setVelocity(directionVector.x, directionVector.y);
		ball.setBounce(1);
		
		this.scoreText = this.add.text(0, scale.height - 30, "Score: 0", {
			fontFamily: "Arial",
			fontSize: 30
		})
		this.physics.add.overlap(this.ballGroup, this.blockGroup, this.handleOverlap, null,this);
	}

	handleOverlap(ball1, ball2){
		
	}
	
	update(){
		this.scoreText.text = "Score: " + this.score;
	}
}