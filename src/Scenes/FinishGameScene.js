import 'phaser';
import EventCenter from '../Objects/EventCenter.js'
import Button from '../Objects/Button.js';
// import logoImg from "../assets/logo.png";
export default class FinishGame extends Phaser.Scene {
  constructor () {
    super('FinishGame');
    
  }
  init(data){
      this.finalScore = data.score;
  }
  create(){
    this.add.image(0, 0, 'background_gameover').setOrigin(0).setScale(2);

    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

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
    
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 80,
      text: 'Obrigado por Jogar\n'+
            'Score:' + this.finalScore,
      style: {
        font: '20px fantasy',
        fill: '#000'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
   
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '=)',
      style: {
        font: '38px monospace',
        fill: '#000'
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
    //     fill: '#000'
    //   }
    // });
    // GameNameText.setOrigin(0.5, 0.5);



  }
}