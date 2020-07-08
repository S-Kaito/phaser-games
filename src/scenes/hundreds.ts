import * as Phaser from "phaser";

const gameOptions = {
	ballSpeed: 200,
	balls: 8,
	ballRadius: 25,
	growRate: 1,
	scale:{
		width: 350,
		height: 700
	}
}

export default class hundreds extends Phaser.Scene{
	ballGroup = null;
	ballArray = [];
	textArray = [];
	score = 0;
	buttonGroup:Phaser.GameObjects.Group = null;
	ballToGrow = null;
	scoreText = null;

	init(){
		console.log("hundreds");
	}
	preload(){
		this.load.image("ball", "../assets/sprites/ball.png");
		this.load.image("button", "../assets/sprites/button.png");
		this.scale.resize(gameOptions.scale.width, gameOptions.scale.height);

	}
	create(){
		const scale = this.game.scale;
		this.physics.world.setBounds(0, 0, scale.width, scale.height / 2);
		this.ballGroup = this.physics.add.group();
		this.ballArray = [];
		this.textArray = [];
		this.score = 0;
		let gameArea = new Phaser.Geom.Rectangle(0, 0, scale.width, scale.height);
		let buttonsPerRow = gameOptions.balls / 2;
		let buttonWidth = scale.width / buttonsPerRow;
		this.buttonGroup = this.add.group();
		for(let i = 0;i < gameOptions.balls; i++){
			let randomPotision = Phaser.Geom.Rectangle.Random(gameArea, new Phaser.Geom.Point());
			let directionVector = Phaser.Math.RandomXY(new Phaser.Math.Vector2, gameOptions.ballSpeed);
			let ball = this.ballGroup.create(randomPotision.x, randomPotision.y, "ball");
			this.ballArray.push(ball);
			ball.setCircle(256);
			ball.displayHeight = gameOptions.ballRadius;
			ball.displayWidth = gameOptions.ballRadius;
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
			console.log(scale.width, scale.height);
			console.log(buttonWidth * (i % (gameOptions.balls / 2)), (scale.height / 2) + buttonWidth * Math.floor(i / (gameOptions.balls / 2)))
			let button = this.add.sprite(buttonWidth * (i % (gameOptions.balls / 2)), (scale.height / 2) + buttonWidth * Math.floor(i / (gameOptions.balls / 2)), "button");
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
		this.scoreText = this.add.text(0, scale.height - 30, "Score: 0", {
			fontFamily: "Arial",
			fontSize: 30
		})
		this.input.on("pointerdown", this.startGrowing, this);
		this.input.on("pointerup", this.stopGrowing, this);
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
	stopGrowing(){
		this.ballToGrow = null;
	}
	handleOverlap(ball1, ball2){
		if(this.ballToGrow != null && (ball1.index == this.ballToGrow || ball2.index == this.ballToGrow)){
			this.cameras.main.flash();
			ball1.displayWidth = Math.max(ball1.displayWidth / 2, gameOptions.ballRadius);
			ball2.displayWidth = Math.max(ball1.displayWidth / 2, gameOptions.ballRadius);
			ball1.displayHeight = ball1.displayWidth;
			ball2.displayHeight = ball2.displayWidth;
			this.ballToGrow = null;
		}
	}
	update(){
		this.score = 0;
		for(let i = 0; i < gameOptions.balls; i++){
			this.textArray[i].x = this.ballArray[i].x;
			this.textArray[i].y = this.ballArray[i].y;
			this.score += this.ballArray[i].displayWidth - gameOptions.ballRadius;
		}
		this.scoreText.text = "Score: " + this.score;
		if(this.ballToGrow != null){
			console.log("grow");
			this.ballArray[this.ballToGrow].displayWidth += gameOptions.growRate;
			this.ballArray[this.ballToGrow].displayHeight += gameOptions.growRate;
		}
	}
}