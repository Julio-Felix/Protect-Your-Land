import 'phaser';
import Monster from '../Objects/Monster.js';
import EventCenter from '../Objects/EventCenter.js'
export default class Slime extends Monster {

    constructor(scene, x, y,spritesheet,frame){
        super(scene,x,y,spritesheet,frame)
        this.type = 'Monster'
        this.specie = "Slime"
        this.setMaxVelocity(50)
    }

    Movement(){
        if(this.active){
          if(!this.scene.soundSlime.isPlaying && this.scene.model.soundOn)this.scene.soundSlime.play()
          // if(this.body.blocked.down) this.body.setVelocityY(200)
    
          if(this.body.blocked.left) this.movement_ac= 1
      
          if(this.body.blocked.right) this.movement_ac= -1
          
          if(this.movement_ac > 0) {this.anims.play('right_slime',true); this.movement_ac+=15}
          else {this.anims.play('left_slime',true);this.movement_ac-=15;}
          
          
          if(this.already_attack) this.body.setVelocityX(this.movement_ac)
          
          if(this.body.blocked.down && !this.already_attack) this.body.setAccelerationX(this.movement_ac)
        }
    
        
    }
    Attack(monster,player){
        monster.attacking = true
        EventCenter.emit('DecreaseLifeOfPlayer',30);
        
        player.immune = true;
        player.body.x > monster.body.x ? monster.movement_ac = -1 : monster.movement_ac = 1
        player.healthBar.isDead() ? null : this.scene.time.delayedCall(1000, function() {
          player.immune = false;
          monster.movement_ac = monster.movement_ac * -1
          monster.attacking = false;
          // enemy.follow = true;
        }, this);
        monster.body.setVelocityX(0)
        // player.body.setVelocityX(monster.body.velocity.x / 2)
    }

}