import * as Phaser from "phaser";

const option = {
	size: {
		width: 100,
		height: 50
	},
	padding: {
		x: 100,
		y: 100
	}
}

const scenes = [["hundreds", "", ""], ["", "", ""], ["", "", ""]]

export class Preload extends Phaser.Scene {
	private startText?: Phaser.GameObjects.Text
	private buttons: Phaser.GameObjects.Text[][] = [[null, null, null],[null, null, null],[null, null, null]]
	private bk_color: string = '0xe08734'
	private fontStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
		color: 'red', 
		fontSize: '25px' 
	}

	init() {
		console.log("Preloading");
	}

	preload () {
		console.log("Load things necessary for Game scene")
	}

	// ここから追加
	create() {
		const scale = this.scale;
		this.cameras.main.setBackgroundColor(this.bk_color)

		for(let i = 0;i < 3; i++){
			for(let j = 0; j < 3; j++){
				const x = scale.width / 2 + (option.size.width + option.padding.x) * (i - 1);
				const y = scale.height / 2 + (option.size.height + option.padding.y) * (j - 1);
				this.buttons[i][j] = this.add.text(x, y, scenes[i][j], this.fontStyle)
				this.buttons[i][j].setOrigin(0.5)
				this.buttons[i][j].setInteractive()
				this.buttons[i][j].on('pointerdown', () => {
					this.scene.start(scenes[i][j]);
				})
				this.buttons[i][j].on('pointerover', () => {
					this.buttons[i][j].setText("wow");
				})
				this.buttons[i][j].on('pointerout', () => {
					this.buttons[i][j].setColor("green");
				})
			}
		}
	}
	// ここまで
}