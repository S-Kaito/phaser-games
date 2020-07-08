import * as Phaser from "phaser";

const option = {
  size: {
    width: 100,
    height: 50
  },
  padding: {
    x: 10,
    y: 10
  }
}

export class Preload extends Phaser.Scene {
  private startText?: Phaser.GameObjects.Text // 追加
  private buttons = [[null, null, null],[null, null, null],[null, null, null]]
  private bk_color: string = '0xe08734' // 追加
  private fontStyle: Phaser.Types.GameObjects.Text.TextSyle = { 
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

    this.buttons[0][0] = this.add.text(scale.width / 2 - option.size.width - option.padding.x, scale.height / 2 - option.size.height - option.padding.y, "hundreds", this.fontStyle)
    this.buttons[0][0].setOrigin(0.5)
    this.buttons[0][0].setInteractive()
    this.buttons[0][0].on('pointerdown', () => {
      this.scene.start('hundreds')
    })
  }
  // ここまで
}