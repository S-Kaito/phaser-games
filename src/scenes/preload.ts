import * as Phaser from "phaser";
import Button from "../objects/button";

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

const scenes = [["hundreds", "breakout", ""], ["", "", ""], ["", "", ""]]

export class Preload extends Phaser.Scene {
	private startText?: Phaser.GameObjects.Text
	private buttons: Button[][] = [[null, null, null],[null, null, null],[null, null, null]]
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

	create() {
		const scale = this.scale;
		this.cameras.main.setBackgroundColor(this.bk_color)

		for(let i = 0;i < 3; i++){
			for(let j = 0; j < 3; j++){
				const x = scale.width / 2 + (option.size.width + option.padding.x) * (i - 1);
				const y = scale.height / 2 + (option.size.height + option.padding.y) * (j - 1);
				this.buttons[i][j] = new Button(this, x, y, scenes[i][j], {
					onClick: () =>{
						this.scene.start(scenes[i][j]);
					}
				})
			}
		}
	}
}