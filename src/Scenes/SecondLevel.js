import 'phaser';
import EventCenter from '../Objects/EventCenter.js'
// import logoImg from "../assets/logo.png";
export default class SecondLevel extends Phaser.Scene {
  constructor () {
    super('SecondLevel');
  }

  create(){
    console.log("Test")

    const map = this.make.tilemap({key :  "map_second_level"})
    const tileset2 = map.addTilesetImage("Peças","tiles2")
    const tileset3 = map.addTilesetImage("generic_platformer_tiles","tileset3")
    const tileset4 = map.addTilesetImage("decorative_obj","tiles4")

    // Layers
    const ground = map.createStaticLayer("ground",[tileset2,tileset4], 0, 0)
    const background = map.createStaticLayer("background",[tileset2,tileset3], 0, 0)
    const aboveCollider = map.createStaticLayer("aboveCollider",[tileset2,tileset4], 0, 0)

    //Config of Map
    ground.setCollisionByProperty({"collider":true})
    // ground.setDepth(10)
    // aboveCollider.setDepth(5)
    this.physics.world.setBounds(0, 0, map.widthInPixels,map.heightInPixels);

    // Spawns
    map.findObject('Player', function(object) {
      this.player = this.physics.add.sprite(object.x,object.y,"Player","Idle (1).png")
    }, this)


    //Players Config
    this.player.setScale(0.1, 0.1);
    this.physics.add.collider(this.player, ground);
    this.player.setGravityY(600)
    this.player.body.collideWorldBounds = true;


    // Player Anims

    this.anims.create({
      key: 'left',
      frames:this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Walk (', suffix:') left.png' }),
      frameRate: 20,
      repeat: -1
    });
  
    this.anims.create({
      key: 'turn',
      frames:  this.anims.generateFrameNames('Player', { start: 4, end: 4 }),
      frameRate: 20
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Walk (', suffix:').png' }),
      frameRate: 20,
      repeat: -1
    });



  }
}