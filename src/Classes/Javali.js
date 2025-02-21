import 'phaser';
import Monster from '../Objects/Monster.js';
import EventCenter from '../Objects/EventCenter.js'
export default class Javali extends Monster {

    constructor(scene, x, y,spritesheet,frame){
        super(scene,x,y,spritesheet,frame)
        this.type = 'Monster'
        this.specie = "Javali"

    }

    Movement(PlayerinDistance){
        if(this.active){
          if(!this.scene.soundJavali.isPlaying && this.scene.model.soundOn)this.scene.soundJavali.play()
          // if(this.body.blocked.down) this.body.setVelocityY(200)
    
          if(this.body.blocked.left) this.movement_ac= 1
      
          if(this.body.blocked.right) this.movement_ac= -1
          
          if(this.movement_ac > 0) {this.anims.play('right_javali',true); this.movement_ac+=25}
          else {this.anims.play('left_javali',true);this.movement_ac-=25;}
        
          
          if(this.already_attack) this.body.setVelocityX(this.movement_ac)

          if(this.body.blocked.down && !this.already_attack) this.body.setAccelerationX(this.movement_ac)
        }
    
        
    }

    Attack(monster,player){
        monster.attacking = true
        EventCenter.emit('DecreaseLifeOfPlayer',10);
        player.immune = true;
        player.body.x > monster.body.x ? monster.movement_ac = -1 : monster.movement_ac = 1
        player.healthBar.isDead() ? null : this.scene.time.delayedCall(1000, function() {
          player.immune = false;
          monster.movement_ac = monster.movement_ac * -1
          monster.attacking = false;
          // enemy.follow = true;
        }, this);
        player.body.setVelocityY(monster.body.velocity.x / 2)
        monster.body.setVelocityX(0)
        
    }

}