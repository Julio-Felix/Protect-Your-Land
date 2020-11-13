import 'phaser';
import EventCenter from '../Objects/EventCenter.js'
import Slime from '../Classes/Slime.js'
import Javali from '../Classes/Javali.js'
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
    // this.load.image("backthis.ground",backthis.ground)
    // this.load.tilemapTiledJSON("map",Map)
    // this.load.spritesheet("PC",playerPNG,{ frameWidth: 32, frameHeight: 48 })
  }
  create() {
    this.scene.bringToTop('HUDScene')
    this.turn = 1
    this.power = 0



    // Map Config
    this.map = this.make.tilemap({key :  "map"})
    const tileset2 = this.map.addTilesetImage("pngbarn (1)","tiles2")
    const tileset3 = this.map.addTilesetImage("generic_platformer_tiles","tileset3")
    const tileset4 = this.map.addTilesetImage("decorative_obj","tiles4")
    // this.add.image(520,700, "background")
    this.ground = this.map.createStaticLayer("ground",[tileset2,tileset4], 0, 0)
    const background = this.map.createStaticLayer("background",[tileset2,tileset3], 0, 0)
    const aboveCollider = this.map.createStaticLayer("aboveCollider",[tileset2,tileset4], 0, 0)
  
    this.ground.setCollisionByProperty({"collider":true})
    this.ground.setDepth(10)
    aboveCollider.setDepth(20)
    
    this.physics.world.setBounds(0, 0, this.map.widthInPixels,this.map.heightInPixels);




    // Player


    // Player Anims

    this.anims.create({
      key: 'left',
      frames:this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Walk (', suffix:') left.png' }),
      frameRate: 60,
      repeat: -1
    });
  
    this.anims.create({
      key: 'turn_left',
      frames:  this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Idle (', suffix:') left.png' }),
      frameRate: 60
    });
    this.anims.create({
      key: 'turn_right',
      frames:  this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Idle (', suffix:').png' }),
      frameRate: 60
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Walk (', suffix:').png' }),
      frameRate: 60,
      repeat: -1
    });


    this.anims.create({
      key: 'attack_right',
      frames: this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Attack (', suffix:').png' }),
      frameRate: 300,
      repeat:0
    });
    

    this.anims.create({
      key: 'attack_left',
      frames:this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Attack (', suffix:') left.png' }),
      frameRate: 300,
      repeat:0
    });

    this.anims.create({
      key: 'dead_right',
      frames: this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Dead (', suffix:').png' }),
      frameRate: 60,
      repeat:0
    });

    this.anims.create({
      key: 'dead_left',
      frames: this.anims.generateFrameNames('Player', { start: 1, end: 10,prefix:'Dead (', suffix:') left.png' }),
      frameRate: 60,
      repeat:0
    });
    
    // Slime
    // this.slime = this.physics.add.sprite(90,850,"slime",0)

    this.monsters = this.add.group();
    this.javalis = this.add.group();
    // this.slime.setScale(0.5, 0.5);
    this.map.findObject('Enemies', function(object) {
      // Slimes
      if (object.type === 'slime') {

        let slime = new Slime(this,object.x,object.y,"slime",0)
        //  this.physics.add.sprite(object.x,object.y,"slime",0)
        this.physics.add.collider(slime, this.ground);
        this.monsters.add(slime);
      }

      if (object.type === 'Hibrid') {
        let n = Math.random() * 10
        if(n > 5){
          let javali = new Javali(this,object.x,object.y,"javali",0)
          //  this.physics.add.sprite(object.x,object.y,"slime",0)
          this.physics.add.collider(javali, this.ground);
          this.monsters.add(javali);
        }else{
          let slime = new Slime(this,object.x,object.y,"slime",0)
          //  this.physics.add.sprite(object.x,object.y,"slime",0)
          this.physics.add.collider(slime, this.ground);
          this.monsters.add(slime);
        }
      }

      if (object.type === 'Javali') {

        let javali = new Javali(this,object.x,object.y,"javali",0)
        //  this.physics.add.sprite(object.x,object.y,"slime",0)
        this.physics.add.collider(javali, this.ground);
        this.monsters.add(javali);
      }
    }, this);

    this.map.findObject('Player',function(object){
      this.player = this.physics.add.sprite(object.x,object.y,"Player","Idle (1).png");
      this.player.setScale(0.1, 0.1);
      this.physics.add.collider(this.player, this.ground);
      this.player.setGravityY(600);
      this.player.body.collideWorldBounds = true;
      this.player.type = "Player";
      this.player.score = 0;
      this.player.on("animationcomplete",function(animation,frame,gameobject){
        if(animation.key == "attack_right" || animation.key == "attack_left"){ 
          // this.player.body.setVelocity(0);
          if(animation.key == "attack_left") this.player.anims.play('turn_left', true);
          else if(animation.key == "attack_right") this.player.anims.play('turn_right', true);
  
          Phaser.Actions.Call(this.monsters.getChildren() , function(monster) {
            monster.already_attack = false;
          },this);
  
        }
      },this);
    },this);


    // this.physics.add.collider(this.slime, this.ground);
    // this.slime.setGravityY(600)
    // this.slime.body.collideWorldBounds = true;
    // this.slime_movement = 300


    // Slime Animation
    this.anims.create({
      key: 'left_slime',
      frames:this.anims.generateFrameNames('slime', { start: 0, end: 3}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'right_slime',
      frames: this.anims.generateFrameNames('slime', { start: 4, end: 7}),
      frameRate: 20,
      repeat: -1
    });


    // JAVALI
    // this.javali = this.physics.add.sprite(90,850,"javali",0)
    // // this.slime.setScale(0.5, 0.5);
    // this.physics.add.collider(this.javali, this.ground);
    // this.javali.setGravityY(600)
    // this.javali.body.collideWorldBounds = true;
    // this.javali_movement = 300


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
    
    // Cameras Main
    this.camera = this.cameras.main
    this.camera.startFollow(this.player,true)
    this.camera.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels)
    this.camera.setZoom(1.5);



    this.input.keyboard.on('keydown', this.onKeyInput, this);


    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventCenter.off('DecreaseLifeOfPlayer', function(amount){
        this.player_healthBar.decrease(amount)
        this.input.keyboard.off('keydown')
      }, this)
    })
    // this.events.emit('gameCountDown',{countDown:10});

    // this.physics.add.overlap(this.player, this.slimes, this.PlayerAttack, function (player,monsters){
    //   if(player.anims.getCurrentKey() == "attack_left" || player.anims.getCurrentKey() == "attack_right"){
    //     return true
    //   }else{
    //     return false
    //   }
    // }, this);


    this.timedEvent = this.time.addEvent({
      delay: 500,
      callback: this.moveMonsters,
      callbackScope: this,
      loop: true
    });

    this.spawnerEvent = this.time.addEvent({
      delay:5000,
      callback:function () {
        this.map.findObject('Enemies', function(object) {
          if (object.type === 'Hibrid' && this.monsters.countActive() < this.turn) {
            let n = Math.random() * 10
            if(n > 5){
              let javali = new Javali(this,object.x,object.y,"javali",0)
              //  this.physics.add.sprite(object.x,object.y,"slime",0)
              this.physics.add.collider(javali, this.ground);
              this.monsters.add(javali);
            }else{
              let slime = new Slime(this,object.x,object.y,"slime",0)
              //  this.physics.add.sprite(object.x,object.y,"slime",0)
              this.physics.add.collider(slime, this.ground);
              this.monsters.add(slime);
            }
          }
        },this)

        
      },
      callbackScope: this,
      loop: true
    })
    this.physics.add.overlap(this.monsters, this.player, this.MonsterAttack, function (monsters,player){
      if(this.CheckIfPlayerIsImmune() || this.player.healthBar.isDead()){
        return false
      }else{
        return true
      }
    }, this);

  }






  onKeyInput(event){    
    if(event.code == "KeyA" && !this.player.healthBar.isDead()){
      this.player.body.setVelocity(0)
      if(this.player.anims.getCurrentKey() == "left" || this.player.anims.getCurrentKey() == "turn_left"){
        this.player.anims.play('attack_left', true);
        let bodies = this.physics.overlapRect(this.player.x - 40,this.player.y,20,20)
        bodies.forEach(body => {
          if(body === this.player) return;
          if(body.gameObject.type == "Monster"){
            this.PlayerAttack(this.player,body.gameObject)
          }
          
        })
      }
      
      if(this.player.anims.getCurrentKey() == "right" || this.player.anims.getCurrentKey() == "turn_right"){
        this.player.anims.play('attack_right', true);
        let bodies = this.physics.overlapRect(this.player.x + 20,this.player.y,20,20)
        bodies.forEach(body => {
          if(body.gameObject.type == "Monster"){
            this.PlayerAttack(this.player,body.gameObject)
          }
        })

      }
    }
  }

  PlayerAttack(player, monster){
    if(!monster.already_attack){
      let isDead = monster.healthbar.decrease_custom(10 * this.turn);
      monster.already_attack = true
      monster.body.setVelocityY(-200)
      player.immune = true;
      
      monster.tint = 0xb50000;
      if(isDead && monster.active) {
        monster.death() 
        player.score+=50
        player.immune = false;
        this.turn = parseInt(player.score / 100) + 1
        EventCenter.emit('setTurn&Score',{'turn':this.turn,'score':player.score});
      }else{
        player.body.x > monster.body.x ? monster.movement_ac = 1 : monster.movement_ac = -1
        this.time.delayedCall(1000, function() {

          monster.tint = 16777215;
          monster.movement_ac = monster.movement_ac * -1
          monster.already_attack = false
          player.immune = false;
          
          // enemy.follow = true;
        }, this);
      }
      // monster.movement_ac = (monster.movement_ac * -1) > 0 ? 1 : -1
      
      
      // if (monster.anims.getCurrentKey() == "right_slime")monster.movement_ac = -1;
      // if (monster.anims.getCurrentKey() == "left_slime") monster.movement_ac = 1;
    }
    
  }


  PlayerDeath(){
    if(this.player.healthBar.isDead()){
      this.player.immune = true;
      if(this.player.anims.getCurrentKey() == "right" || this.player.anims.getCurrentKey() == "turn_right"){
        this.player.anims.play('dead_right', true);
      }
      if(this.player.anims.getCurrentKey() == "left" || this.player.anims.getCurrentKey() == "turn_left"){
        this.player.anims.play('dead_left', true);
      }
      EventCenter.emit('Player_Death');

    }
  }

  MonsterAttack(monster, player){
    if(!this.CheckIfPlayerIsImmune()){
      monster.Attack(monster,player)
      this.PlayerDeath()
    }
    
  }

  moveMonsters(){
    Phaser.Actions.Call(this.monsters.getChildren() , function(monster) {
      if(monster.active){
        monster.Movement()
      }
      // if(monster)
      // let distance = this.player.x - monster.x
      // distance = distance > 0 ? distance : distance * -1
      // let PlayerinDistance = distance > 90 ? false : true
      // if(monster.specie == "Javali") console.log("Distance " + PlayerinDistance)
      
    },this)
  }
  
  update(){
    
    // let i = this.events.emit('DecreaseLifeOfPlayer',{countDown:1});
    // console.log(i)
    // this.count-=1
    if(!this.CheckIfPlayerIsAttacking() && !this.player.healthBar.isDead()){
      const prevVelocity = this.player.body.velocity.clone()
      const cursors = this.input.keyboard.createCursorKeys()
      if(cursors.left.isDown && cursors.up.isDown && this.player.body.blocked.down){
        this.player.body.setVelocityX(-120)
        this.player.body.setVelocityY(-350)
      }else if(cursors.right.isDown && cursors.up.isDown && this.player.body.blocked.down){
        this.player.body.setVelocityX(120)
        this.player.body.setVelocityY(-350)
      }else if(cursors.left.isDown){
        this.player.body.setVelocityX(-120)
        this.player.anims.play('left', true);
    
      } else if(cursors.right.isDown){
        this.player.body.setVelocityX(120)
        this.player.anims.play('right', true);
    
      } else if(cursors.up.isDown && this.player.body.blocked.down){
        // this.player.body.velocity.y = -350;
        this.player.body.setVelocityY(-900)
    
      } else if(cursors.down.isDown){
        // this.player.anims.play('turn', true);
        this.player.anims.play('dead_right', true);
        this.player.body.setVelocity(0)
    
      }else{
          if(prevVelocity.y < 0) {
            this.player.body.setVelocityY(prevVelocity.y + 100)
          }else{
            this.player.anims.stop()
            if(this.player.anims.getCurrentKey() == "left") this.player.setTexture("Player","Idle (1) left.png")
            else if(this.player.anims.getCurrentKey() == "right") this.player.setTexture("Player","Idle (1).png")
            this.player.body.setVelocity(0)
          }
          // else if(prevVelocity.x > 0)
      }
    }

    // Phaser.Actions.Call(this.slimes.getChildren(), function(slime) {
    //   slime.Movement()
    // },this)

    // this.javali.anims.play('left_javali',true)
    
  }


  CheckIfPlayerIsAttacking(){
    if((this.player.anims.getCurrentKey() == "attack_right" || this.player.anims.getCurrentKey() == "attack_left") ){
      return true
    }else{
      return false
    }
  }

  CheckIfPlayerIsImmune(){
    if(this.player.immune){
      return true
    }else{
      return false
    }
  }
  
};