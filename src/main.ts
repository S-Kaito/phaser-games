import * as Phaser from "phaser";
import { Preload } from "./scenes/preload";
import Hundreds from "./scenes/hundreds";
import { GameFrame } from "./gameParameters";


class Main extends Phaser.Game {
	constructor() {
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.WEBGL,
			width: GameFrame.w,
			height: GameFrame.h,
			scale: {
				mode: Phaser.Scale.NONE,
				autoCenter: Phaser.Scale.CENTER_BOTH,
			},
			physics: {
					default: "arcade",
			},
		};
		super(config);

		this.scene.add("preload", Preload, false);
		this.scene.add("hundreds", Hundreds, false);
		this.scene.start("preload");
	}
}

window.onload = () => {
	const GameApp: Phaser.Game = new Main();
};