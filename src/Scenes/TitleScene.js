import 'phaser';
import config from '../Config/config.js'
import Button from '../Objects/Button.js';
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  preload () {
  }

  create () {
    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');
    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');
    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      	
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.sys.game.globals.bgMusic = this.bgMusic;
      this.model.bgMusicPlaying = true;
      
    }
  }
};