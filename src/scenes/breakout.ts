import * as Phaser from "phaser";

const gameOptions = {
	ballSpeed: 200,
	ballRadius: 20,
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
	ballGroup:Phaser.Physics.Arcade.Group = null;
	ball:Phaser.Physics.Arcade.Image = null;
	score:number = 0;
	blockGroup:Phaser.Physics.Arcade.StaticGroup = null;
	scoreText: Phaser.GameObjects.Text = null;

	init(){
	}

	preload(){
		this.load.image("ball", "../assets/sprites/ball.png");
		this.load.image("button", "../assets/sprites/button.png");
		this.scale.resize(gameOptions.scale.width, gameOptions.scale.height);
	}

	create(){
		const scale = this.game.scale;
		this.physics.world.setBounds(0, 0, scale.width, scale.height);
		this.ballGroup = this.physics.add.group();
		this.blockGroup = this.physics.add.staticGroup();
		this.score = 0;

		for(let i = 0;i < gameOptions.block.height; i++){
			for(let j = 0; j < gameOptions.block.width; j++){
				let x = this.blockGroup.scene.scale.width / gameOptions.block.width * j;
				let y = this.blockGroup.scene.scale.height / 2 / gameOptions.block.height * i;
				console.log(x, y, this.blockGroup.isFull())
				let block: Phaser.Physics.Arcade.Image = this.blockGroup.create(x, y, "button");
				block.setSize(x / j - 5, y / i - 5);
				block.setDisplaySize(x / j - 5, y / i - 5);
			}
		}
		
		let directionVector = new Phaser.Math.Vector2(gameOptions.ballSpeed, -gameOptions.ballSpeed)
		this.ball = this.ballGroup.create(scale.width / 2, scale.height / 4 * 3, "ball");
		this.ball.setSize(gameOptions.ballRadius, gameOptions.ballRadius);
		this.ball.setCollideWorldBounds(true);
		this.ball.setVelocity(directionVector.x, directionVector.y);
		this.ball.setBounce(1);
		this.ball.setDisplaySize(gameOptions.ballRadius, gameOptions.ballRadius);
		this.physics.add.collider(this.ballGroup, this.blockGroup, this.handleOverlap, null,this);
		
		this.scoreText = this.add.text(0, scale.height - 30, "Score: 0", {
			fontFamily: "Arial",
			fontSize: 30
		})
	}

	handleOverlap(ball: Phaser.Types.Physics.Arcade.GameObjectWithBody, block: Phaser.Types.Physics.Arcade.GameObjectWithBody){
		console.log("bbb");
		block.destroy();
		this.score += 10;
	}
	
	update(){
		this.scoreText.text = "Score: " + this.score;
	}
}