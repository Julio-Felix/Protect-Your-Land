import 'phaser';
import HealthBar from '../Objects/HealthBar.js'
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

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventCenter.off('DecreaseLifeOfPlayer', function(amount){
        this.sceneA.player.healthBar.decrease(amount)
      }, this)
    })
  }
  
  update () {
    // this.text.setText('Score:\n\n' + this.game.loop.frame);
  }
}