import 'phaser';
import background from "../assets/background.png";
import background_finish from "../assets/background_gameover.jpg"
// import logoImg from "../assets/logo.png";
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    console.log("test4")
    // this.load.image("logo", logoImg);
    this.load.image("background",background)
    this.load.image("background_gameover",background_finish)
  }
 
  create () {
    this.scene.start('Preloader');
    
  }
};