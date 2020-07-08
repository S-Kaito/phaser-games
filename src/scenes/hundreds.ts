import * as Phaser from "phaser";

let game;
const gameOptions = {
	ballSpeed: 300,
	balls: 8,
	ballRadius: 50,
	growRate: 1
}

export default class Game extends Phaser.Scene{
	ballGroup = null;
	ballArray = [];
	textArray = [];
	score = 0;
	buttonGroup:Phaser.GameObjects.Group = null;
	ballToGrow = null;
	scoreText = null;

	constructor(){
		super("PlayGame");
	}
	init(){

	}
	preload(){
		this.load.image("ball", "ball.png");
		this.load.image("button", "button.png");
	}
	create(){
		this.ballGroup = this.physics.add.group();
		this.ballArray = [];
		this.textArray = [];
		this.score = 0;
		let scale = this.game.scale;
		let gameArea = new Phaser.Geom.Rectangle(0, 0, scale.width, scale.height);
		let buttonsPerRow = gameOptions.balls / 2;
		let buttonWidth = game.config.width / buttonsPerRow;
		this.buttonGroup = this.add.group();
		for(let i = 0;i < gameOptions.balls; i++){
			let randomPotision = Phaser.Geom.Rectangle.Random(gameArea, new Phaser.Geom.Point());
			let directionVector = Phaser.Math.RandomXY(new Phaser.Math.Vector2, gameOptions.ballSpeed);
			let ball = this.ballGroup.create(randomPotision.x, randomPotision.y, "ball");
			this.ballArray.push(ball);
			ball.setCircle(256);
			ball.displayHeight = gameOptions.ballRadius;
			ball.displayHeight = gameOptions.ballRadius;
			ball.index = i;
			ball.setCollideWorldBounds(true);
			ball.setVelocity(directionVector.x, directionVector.y);
			ball.setBounce(1);
			let ballText = this.add.text(randomPotision.x, randomPotision.y, i, {
				fontFamily: "Arial",
				fontSize: 24,
				color: "#000000"
			});
			ballText.setOrigin(0.5, 0.5);
			this.textArray.push(ballText);
			let button = this.add.sprite(buttonWidth * (i % (gameOptions.balls / 2)), scale.width + buttonWidth * Math.floor(i / (gameOptions.balls / 2)), "button");
			button.setOrigin(0, 0);
			button.index = i;
			button.displayWidth = buttonWidth;
			button.displayHeight = buttonWidth;
			this.buttonGroup.add(button);
			let buttonText = this.add.text(button.getBounds().centerX, button.getBounds().centerY, i, {
				fontFamily: "Arial",
				fontSize: 64,
				color: "#000000"
			});
			buttonText.setOrigin(0.5, 0.5);
		}
		this.ballToGrow = null;
		this.scoreText = this.add.text(0, scale.height, "Score: 0", {
			fontFamily: "Arial",
			fontSize: 64
		})
		this.input.on("pointerdown", this.startGrowing, this);
		this.input.on("pointerup", this.startGrowing, this);
		this.physics.add.overlap(this.ballGroup, this.ballGroup, this.handleOverlap, null,this);
	}
	startGrowing(pointer){
		this.buttonGroup.getChildren().forEach(button =>{
			if(Phaser.Geom.Rectangle.Contains(button.getBounds(), pointer.x, pointer.y) && button.alpha == 1){
				button.alpha = 0.5;
				this.ballToGrow = button.index;
				this.ballArray[this.ballToGrow].body.onOverlap = true;
			}
		}, this);
	}
}