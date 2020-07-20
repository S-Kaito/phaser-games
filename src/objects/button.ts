import * as Phaser from "phaser"

export default class Button extends Phaser.GameObjects.Container {
	seKey: string = "";
	text: Phaser.GameObjects.Text = null;
	container: Phaser.GameObjects.Rectangle = null;
	constructor (scene: Phaser.Scene, x, y, text, width = 120, height = 80, { align = 'center', fontSize = 15, color = "black" } = {}) {
		super(scene, x, y)
		this.scene = scene;
		this.scene.add.existing(this);

		this.setSize(width, height).setInteractive();

		const alignLeft = align === 'left';
		this.text = scene.add.text(alignLeft ? -width / 2 + 0 : 0, -1, text, { align, fontSize , color}).setOrigin(alignLeft ? 0 : 0.5, 0.5).setPadding(0, 2, 0, 0)
		this.text.setColor("black");

		this.container = scene.add.rectangle(20, 20, width / 2, height / 2);

		this.add([this.container, this.text])
		this.on('pointerover', () => {
			this.text.setColor("white");
		})
		this.on('pointerout', () => {
			console.log("aaa");
			this.text.setColor("black");
		})
		this.on('pointerup', p => {
		})
	}

	setSeKey(key){
		this.seKey = key
		return this
	}
	setText (text) {
		this.text.setText(text)
		return this
	}
}