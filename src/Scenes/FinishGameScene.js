import 'phaser';
import EventCenter from '../Objects/EventCenter.js'
import Button from '../Objects/Button.js';
// import logoImg from "../assets/logo.png";
export default class FinishGame extends Phaser.Scene {
  constructor () {
    super('FinishGame');
  }

  create(){
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 80,
      text: 'Obrigado por Jogar',
      style: {
        font: '20px fantasy',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
   
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '=)',
      style: {
        font: '38px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    
    this.restartButton = new Button(this, width / 2, height / 2 + 150, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');

    // var GameNameText = this.make.text({
    //   x: width / 2,
    //   y: height / 2 - 70,
    //   text: 'Protect your Land',
    //   style: {
    //     font: '48px fantasy',
    //     fill: '#ffffff'
    //   }
    // });
    // GameNameText.setOrigin(0.5, 0.5);



  }
}