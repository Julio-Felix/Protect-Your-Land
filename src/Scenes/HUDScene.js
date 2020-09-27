import 'phaser';
export default class HUDScene extends Phaser.Scene {
    create () {
    //   this.add.image(0, 0, 'cockpit').setOrigin(0).setScale(2);
    console.log("Tst")
      this.text = this.add.text(0, 400, '');
      this.text.setDepth(0)
    }
    
    update () {
      this.text.setText('Score:\n\n' + this.game.loop.frame);
    }
}