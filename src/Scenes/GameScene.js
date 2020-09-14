import 'phaser';
// import logoImg from "../assets/logo.png";
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    // this.load.image("logo", logoImg);
    // this.load.image("tiles2",pngbarn)
    // this.load.image("tiles4",decorative_obj)
    // this.load.image("background",background)
    // this.load.tilemapTiledJSON("map",Map)
    // this.load.spritesheet("PC",playerPNG,{ frameWidth: 32, frameHeight: 48 })
  }
  create() {
    this.power = 0
    const map = this.make.tilemap({key :  "map"})
    const tileset2 = map.addTilesetImage("pngbarn (1)","tiles2")
    const tileset3 = map.addTilesetImage("generic_platformer_tiles","tileset3")
    const tileset4 = map.addTilesetImage("decorative_obj","tiles4")
    // this.add.image(520,700, "background")
    const ground = map.createStaticLayer("ground",[tileset2,tileset4], 0, 0)
    const background = map.createStaticLayer("background",[tileset2,tileset3], 0, 0)
    const aboveCollider = map.createStaticLayer("aboveCollider",[tileset2,tileset4], 0, 0)
  
    ground.setCollisionByProperty({"collider":true})
    console.log(map)
    ground.setDepth(10)
    aboveCollider.setDepth(20)
    
  
    this.player = this.physics.add.sprite(20,875,"Player","png/Idle (2).png")
    this.player.setScale(0.1, 0.1);
    
    // player.setBounce();
    this.physics.add.collider(this.player, ground);
    // this.player.setCollideWorldBounds(true,map.widthInPixels,map.heightInPixels * 2);
    this.player.setGravityY(600)
    
    
    


    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('Player', { start: 1, end: 10,zeroPad:5,prefix:'Walk (', suffix:').png' }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'turn',
      frames:  this.anims.generateFrameNumbers('Player', { start: 4, end: 4 }),
      frameRate: 20
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('Player', { start: 1, end: 10,zeroPad:5,prefix:'Walk (', suffix:').png' }),
      frameRate: 10,
      repeat: -1
    });

    console.log("map widit",map)
    // player.setGravity
    this.camera = this.cameras.main
    this.camera.startFollow(this.player)
    this.camera.setBounds(0,0,map.widthInPixels,map.heightInPixels)
  
  }
  update(){
      // this.anims.clear()
      // player.anims.stop()
      const prevVelocity = this.player.body.velocity.clone()
      const cursors = this.input.keyboard.createCursorKeys()
      if(cursors.up.isDown){
        console.log('ccima')
      }
      if(cursors.left.isDown && cursors.up.isDown && this.player.body.blocked.down){
        this.player.body.setVelocityX(-400)
        this.player.body.setVelocityY(-350)
      }else if(cursors.right.isDown && cursors.up.isDown && this.player.body.blocked.down){
        this.player.body.setVelocityX(400)
        this.player.body.setVelocityY(-350)
      }else if(cursors.left.isDown){
        this.player.body.setVelocityX(-400)
        this.player.anims.play('left', true);
    
      } else if(cursors.right.isDown){
        this.player.body.setVelocityX(400)
        this.player.anims.play('right', true);
    
      } else if(cursors.up.isDown && this.player.body.blocked.down){
        // this.player.body.velocity.y = -350;
        this.player.body.setVelocityY(-350)
    
      } else if(cursors.down.isDown){
        this.player.anims.play('turn', true);
        this.player.body.setVelocity(0)
    
      }else{
          this.player.body.setVelocity(0)
          this.player.anims.stop()
          if(prevVelocity.x < 0) this.player.setTexture("PC",0)
          else if(prevVelocity.x > 0) this.player.setTexture("PC",7)
          // else if(prevVelocity.x > 0)
      }
    
      
    }
};