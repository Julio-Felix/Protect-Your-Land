import 'phaser';
// import logoImg from "../assets/logo.png";
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    console.log("test4")
    // this.load.image("logo", logoImg);
  }
 
  create () {
    this.scene.start('Preloader');
    
  }
};