import 'phaser';
import EventCenter from '../Objects/EventCenter.js'
import Button from '../Objects/Button.js';
// import logoImg from "../assets/logo.png";
export default class InstructionsScene extends Phaser.Scene {
  constructor () {
    super('Instructions');
  }

  create(){
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var welcomeText = this.make.text({
      x: width / 2,
      y: height / 2 - 150,
      text: 'Instruções de Jogo',
      style: {
        font: '20px fantasy',
        fill: '#ffffff'
      }
    });
    welcomeText.setOrigin(0.5, 0.5);
   
    var intructionsText = this.make.text({
      x: width / 2 - 50,
      y: height / 2,
      text: 'WASD - Movimentação do Jogador\n'+
      'A - Attack\n'+
      'D - Dash\n'
    //   '\n'+
    //   '\n' 
    ,
      style: {
        font: '38px monospace',
        fill: '#ffffff'
      }
    });
    intructionsText.setOrigin(0.5, 0.5);
    
    this.continueButton = new Button(this, width / 2, height / 2 + 150, 'blueButton1', 'blueButton2', 'Jogar', 'Game');

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