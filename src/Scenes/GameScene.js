import 'phaser';
import HealthBar from '../Objects/HealthBar.js'
// import logoImg from "../assets/logo.png";
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');

  }
 
  preload () {
    console.log(this.scene)
    // this.load.image("logo", logoImg);
    // this.load.image("tiles2",pngbarn)
    // this.load.image("tiles4",decorative_obj)
    // this.load.image("background",background)
    // this.load.tilemapTiledJSON("map",Map)
    // this.load.spritesheet("PC",playerPNG,{ frameWidth: 32, frameHeight: 48 })
  }
  create() {
    this.scene.bringToTop('HUDScene')
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
    
    // console.log(scene.textures)
    console.log(this.textures)
    
    
    
    // Player

    this.player = this.physics.add.sprite(0,850,"Player","Idle (1).png")
    this.player.setScale(0.1, 0.1);
    console.log(this.player)
    this.physics.add.collider(this.player, ground);
    this.player.setGravityY(600)

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



    // Slime
    this.slime = this.physics.add.sprite(90,850,"slime",0)
    // this.slime.setScale(0.5, 0.5);
    this.physics.add.collider(this.slime, ground);
    this.slime.setGravityY(600)
    this.slime_movement = 300


    // Slime Animation
    this.anims.create({
      key: 'left_slime',
      frames:this.anims.generateFrameNames('slime', { start: 0, end: 3}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'right_slime',
      frames: this.anims.generateFrameNames('slime', { start: 6, end: 9}),
      frameRate: 20,
      repeat: -1
    });


    // JAVALI
    this.javali = this.physics.add.sprite(90,850,"javali",0)
    // this.slime.setScale(0.5, 0.5);
    this.physics.add.collider(this.javali, ground);
    this.javali.setGravityY(600)
    this.javali_movement = 300


    // JAVALI Animation
    this.anims.create({
      key: 'left_javali',
      frames:this.anims.generateFrameNames('javali', { start: 7, end: 13}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'right_javali',
      frames: this.anims.generateFrameNames('javali', { start: 0, end: 6}),
      frameRate: 20,
      repeat: -1
    });
    
    




    // this.textLife = this.add.text(0, 400,'Test',null)
    // Cameras Main
    this.camera = this.cameras.main
    this.camera.startFollow(this.player,true)
    this.camera.setBounds(0,0,map.widthInPixels,map.heightInPixels)
    this.camera.setZoom(2.5);

    
    // this.textLife.setScrollFactor(0,0);

    this.player_healthBar = new HealthBar(this,0,550);


  
  }
  update(){

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
      this.player.body.setVelocityY(-900)
  
    } else if(cursors.down.isDown){
      this.player.anims.play('turn', true);
      this.player.body.setVelocity(0)
  
    }else{
        if(prevVelocity.y < 0) {
          this.player.body.setVelocityY(prevVelocity.y + 100)
        }else{
          this.player.body.setVelocity(0)
          this.player.anims.stop()
          if(prevVelocity.x < 0) this.player.setTexture("Player","Idle (1).png")
          else if(prevVelocity.x > 0) this.player.setTexture("Player","Idle (1).png")
        }
        // else if(prevVelocity.x > 0)
    }

    if(this.slime.body.blocked.down) this.slime.body.setVelocityY(200)

    if(this.slime.body.blocked.left) this.slime_movement=200

    if(this.slime.body.blocked.right) this.slime_movement=-200
    
    if(this.slime_movement > 0) this.slime.anims.play('right_slime',true) 
    else this.slime.anims.play('left_slime',true)
    this.javali.anims.play('left_javali',true)
    this.slime.body.setVelocityX(this.slime_movement)
      
    }
};