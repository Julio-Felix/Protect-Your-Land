import Phaser from "phaser";
import config from './Config/config.js';
import GameScene from './Scenes/GameScene.js';
import SecondLevel from './Scenes/SecondLevel.js';
import BootScene from './Scenes/BootScene.js';
import PreloaderScene from './Scenes/PreloaderScene.js';
import TitleScene from './Scenes/TitleScene.js';
import OptionsScene from './Scenes/OptionsScene.js';
import CreditsScene from './Scenes/CreditsScene.js';
import HUDScene from './Scenes/HUDScene.js';
import Model from './Model.js';
class Game extends Phaser.Game {
  constructor(){
    super(config);
    
    const model = new Model();	
    this.globals = { model, bgMusic: null };


    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('HUDScene', HUDScene);
    this.scene.add('Game', GameScene);
    this.scene.add("SecondLevel",SecondLevel)
    this.scene.start('Boot')
  }
  
}

window.game = new Game()

// const config = {
//   type: Phaser.AUTO,
//   parent: "phaser-example",
//   width: 800,
//   height: 600,
//   physics: {
//     default: 'arcade',
//     arcade: {
//         gravity: { y: 900 },
//         debug: false
//     }
// },
//   scene: {
//     preload: preload,
//     create: create,
//     update:update
//   }
// };
// var player = 0
// var camera = 0
// const game = new Phaser.Game(config);

// function preload() {
//   this.load.image("logo", logoImg);
//   this.load.image("tiles2",pngbarn)
//   this.load.image("tiles4",decorative_obj)
//   this.load.image("background",background)
//   this.load.tilemapTiledJSON("map",Map)
//   this.load.spritesheet("PC",playerPNG,{ frameWidth: 32, frameHeight: 48 })
// }

// function create() {
//   const map = this.make.tilemap({key :  "map"})
//   const tileset2 = map.addTilesetImage("pngbarn (1)","tiles2")
//   const tileset4 = map.addTilesetImage("decorative_obj","tiles4")
//   this.add.image(520,700, "background")
//   const ground = map.createStaticLayer("ground",[tileset2,tileset4], 0, 0)
//   const aboveCollider = map.createStaticLayer("aboveCollider",[tileset2,tileset4], 0, 0)

//   ground.setCollisionByProperty({"collider":true})
//   console.log(map)
//   aboveCollider.setDepth(10)
  

//   player = this.physics.add.sprite(20,875,"PC")
//   // player.setBounce();
//   // player.setCollideWorldBounds(true);
//   player.setGravityY(600)
//   this.physics.add.collider(player, ground);
  
  
//   this.anims.create({
//     key: 'left',
//     frames: this.anims.generateFrameNumbers('PC', { start: 3, end: 0 }),
//     frameRate: 10,
//     repeat: -1
//   });

//   this.anims.create({
//     key: 'turn',
//     frames:  this.anims.generateFrameNumbers('PC', { start: 4, end: 4 }),
//     frameRate: 20
//   });
//   this.anims.create({
//     key: 'right',
//     frames: this.anims.generateFrameNumbers('PC', { start: 5, end: 8 }),
//     frameRate: 10,
//     repeat: -1
//   });
//   console.log("map widit",map)
//   player.setGravity
//   camera = this.cameras.main
//   camera.startFollow(player)
//   camera.setBounds(0,-2500,map.widthInPixels)

// }

// function update(){
//   // this.anims.clear()
//   // player.anims.stop()
//   const prevVelocity = player.body.velocity.clone()
//   const cursors = this.input.keyboard.createCursorKeys()
//   if(cursors.left.isDown && cursors.up.isDown){
//     player.body.setVelocityX(-200)
//     player.body.setVelocityY(-600)
//   }else if(cursors.right.isDown && cursors.up.isDown){
//     player.body.setVelocityX(200)
//     player.body.setVelocityY(-600)
//   }else if(cursors.left.isDown){
//     player.body.setVelocityX(-200)
//     player.anims.play('left', true);

//   } else if(cursors.right.isDown){
//     player.body.setVelocityX(200)
//     player.anims.play('right', true);

//   } else if(cursors.up.isDown){
//     player.body.setVelocityY(-900)

//   } else if(cursors.down.isDown){
//     player.anims.play('turn', true);
//     player.body.setVelocity(0)

//   }else{
//       player.body.setVelocity(0)
//       player.anims.stop()
//       if(prevVelocity.x < 0) player.setTexture("PC","left")
//       else if(prevVelocity.x > 0) player.setTexture("PC","right")
//       // else if(prevVelocity.x > 0)
//   }

  
// }
