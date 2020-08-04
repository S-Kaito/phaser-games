import * as Phaser from "phaser"

interface Props{
	width?: number;
	height?: number;
	onClick?: Function;
}

export default class Button extends Phaser.GameObjects.Container {
	seKey: string = "";
	text: Phaser.GameObjects.Text = null;
	container: Phaser.GameObjects.Rectangle = null;

	constructor (scene: Phaser.Scene, x, y, text, props: Props, { align = 'center', fontSize = 15, color = "black" } = {}) {
		super(scene, x, y)

		const {
			width = 200,
			height = 40,
			onClick
		} = props

		this.scene = scene;
		this.scene.add.existing(this);

		this.setSize(width, height).setInteractive();

		const alignLeft = align === 'left';
		this.text = scene.add.text(alignLeft ? -width / 2 + 0 : 0, -1, text, { align, fontSize , color}).setOrigin(alignLeft ? 0 : 0.5, 0.5).setPadding(0, 2, 0, 0)
		this.text.setColor("black");

		this.container = scene.add.rectangle(0, 0, width, height);
		this.container.setStrokeStyle(1, 0xf0f0f0).setOrigin(alignLeft ? 0 : 0.5, 0.5)

		this.add([this.container, this.text])
		this.on('pointerover', () => {
			this.text.setColor("white");
		})
		this.on('pointerout', () => {
			console.log("aaa");
			this.text.setColor("black");
		})
		this.on('pointerup', p => {
			onClick && onClick(p);
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