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
    this.cameras.main.setBounds(0, 0, 4000, 4000);
    this.physics.world.setBounds(0, 0, 4000, 4000);
    /*
    background images is 500x500 world is 4000x4000
    This image does not scael well, another option
    would be to display it not scaled 4 times 0,0 0,500 500,0 500,500
    */
    this.add.image(0, 0, 'background').setOrigin(0).setScale(1);


    var width = config.width;
    var height = config.height;
    var game_name = this.make.text({
      x: width / 2,
      y: height / 2 - 175,
      text: 'Protect Your Land',
      style: {
        font: '38px fantasy',
        color:'#000'
      }
    });
    
    game_name.setOrigin(0.5, 0.5);
    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');
    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');
    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    // Instructions
    this.instructionsButton = new Button(this, config.width/2, config.height/2 + 200, 'blueButton1', 'blueButton2', 'Instruções', 'Instructions');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      	
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.sys.game.globals.bgMusic = this.bgMusic;
      this.model.bgMusicPlaying = true;
      
    }
  }
};