import 'phaser';
import HealthBar from '../Objects/HealthBar.js'
import Button_func from '../Objects/Button_func'
import config from '../Config/config.js'
import Button from '../Objects/Button.js';
import EventCenter from '../Objects/EventCenter.js'
export default class HUDScene extends Phaser.Scene {
  init(){
    this.sceneA = this.scene.get('Game');
  }

  create () {
    this.sceneA.player.healthBar = new HealthBar(this,5,5,2.5);
    // this.player_healthBar = new HealthBar(this,5,5,2.5);

    EventCenter.on('DecreaseLifeOfPlayer', function(amount){
      this.sceneA.player.healthBar.decrease(amount)
    }, this)
    

    EventCenter.on('Player_Death', function(){
      this.time.delayedCall(2000, function() {
        var x = config.width / 2;
        var y = config.height / 2;
        var gameOvertext = this.make.text({
          x: x,
          y: y - 100,
          text: 'Game Over',
          style: {
            font: '32px fantasy',
            fill: '#ffffff'
          }
        });
        gameOvertext.setOrigin(0.5, 0.5);
        this.restartButton = new Button_func(this, x, y, 'blueButton1', 'blueButton2', 'Restart', 'Game');
        this.mainMenuButton = new Button(this, x, y + 100, 'blueButton1', 'blueButton2', 'Main Menu', 'Title');
      },[], this);
    }, this)

    this.Turn = this.make.text({
      x: 730,
      y: 30,
      text: 'Turno: 1',
      style: {
        font: '32px fantasy',
        fill: '#ffffff'
      }
    });
    this.Turn.setOrigin(0.5, 0.5);

    this.Score = this.make.text({
      x: 730,
      y: 80,
      text: 'Score: 0',
      style: {
        font: '32px fantasy',
        fill: '#ffffff'
      }
    });
    this.Score.setOrigin(0.5, 0.5);

    EventCenter.on('setTurn&Score', function(obj){
      if(obj.turn == 5) {
        this.scene.launch("FinishGame",{ score: obj.score }).stop('Game').stop();
      }
      this.Turn.setText("Turno: "+obj.turn)
      this.Score.setText("Score: "+obj.score)
    }, this)

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventCenter.off('DecreaseLifeOfPlayer')
      EventCenter.off('Player_Death')
      EventCenter.off('setTurn&Score')
    },this)
  }
  
  update () {
    if(!this.sceneA.player.healthBar.isDead()){
      this.sceneA.player.healthBar.increase(0.01)
    }
    
    // this.text.setText('Score:\n\n' + this.game.loop.frame);
  }
}