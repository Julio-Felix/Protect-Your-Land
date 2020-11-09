import 'phaser';
import HealthBar from '../Objects/HealthBar.js';
export default class Monster extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y,spritesheet,frame)
    {
        super(scene,x,y,spritesheet,frame)
        //Config the World
        scene.physics.world.enable(this);
        scene.add.existing(this);
        
        this.healthbar = new HealthBar(scene,x,y,1)
        
        this.already_attack = false
        this.movement_ac = 1

        this.setCollideWorldBounds(true)
        this.setGravityY(600)
        this.setScale(0.5,0.5)
        this.setMaxVelocity(150)
    }
    preUpdate(time,delta){
        this.anims.update(time, delta);
        
        this.active ? this.healthbar.setXandY(this.x,this.y - 50, 20, 10) : false
    }

    death(){
        this.destroy();
        this.healthbar.bar.destroy();
    }

    update(){
    }
    

}