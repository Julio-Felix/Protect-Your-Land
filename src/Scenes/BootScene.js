import 'phaser';
import background from "../assets/background.png";
// import logoImg from "../assets/logo.png";
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    console.log("test4")
    // this.load.image("logo", logoImg);
    this.load.image("background",background)
  }
 
  create () {
    this.scene.start('Preloader');
    
  }
};