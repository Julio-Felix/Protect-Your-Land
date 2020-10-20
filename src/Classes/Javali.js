import 'phaser';
import Monster from '../Objects/Monster.js';
export default class Javali extends Monster {

    constructor(scene, x, y,spritesheet,frame){
        super(scene,x,y,spritesheet,frame)
    }

    Movement(){
        if(this.active){
          // if(this.body.blocked.down) this.body.setVelocityY(200)
    
          if(this.body.blocked.left) this.movement_ac= 1
      
          if(this.body.blocked.right) this.movement_ac= -1
          
          if(this.movement_ac > 0) {this.anims.play('right_slime',true); this.movement_ac+=10}
          else {this.anims.play('left_slime',true);this.movement_ac-=10;}
    
          
          if(this.already_attack) this.body.setVelocityX(this.movement_ac)
        }
    
        if(this.body.blocked.down && !this.already_attack) this.body.setAccelerationX(this.movement_ac)
    }

}