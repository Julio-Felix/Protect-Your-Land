import 'phaser';
import config from '../Config/config.js'
export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }
  BackButton() {
    this.backButton = this.add.sprite(-50, -150, 'blueButton1').setInteractive();

    this.optionsText = this.add.text(-50, -150, 'Voltar', { fontSize: '32px', fill: '#fff' });

    this.backButton.on('pointerdown', function (pointer) {
      this.scene.start('Title');
    }.bind(this));

    Phaser.Display.Align.In.TopLeft(
      this.backButton,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.optionsText,
      this.backButton
    );

  }
  preload () {
  }
 
  create () {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Julio Felix', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);
    
    this.BackButton();

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );
    
    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );
    
    this.madeByText.setY(1000);
  }
};