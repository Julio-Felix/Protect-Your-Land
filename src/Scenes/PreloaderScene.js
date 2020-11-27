import 'phaser';
import Map from "../assets/RealesedMap.json"

import second_map from "../assets/ReleasedMap2.json"


import pngbarn from "../assets/pngbarn (1).png";
import qmc from "../assets/1_qmckz-4ppRl9i8-tEmGmHw.png";
import decorative_obj from "../assets/decorative_obj.png";
import tiles3 from "../assets/generic_platformer_tiles.png";
import playerPNG from "../assets/dude.png"
import slime from "../assets/Monsters/slime-autentico.png"
import javali from "../assets/Monsters/javalisPNGAutentico.png"

import Player from '../assets/Player/Knight.json'
import kn1 from '../assets/Player/Knight-0.png'
import kn2 from '../assets/Player/Knight-1.png'
import kn3 from '../assets/Player/Knight-2.png'
// import kn4 from '../assets/Player/Knight-3.png'
// import kn5 from '../assets/Player/Knight-4.png'
// import kn6 from '../assets/Player/Knight-5.png'
// import kn7 from '../assets/Player/Knight-6.png'
// import kn8 from '../assets/Player/Knight-7.png'
// import kn9 from '../assets/Player/Knight-8.png'
// import kn10 from '../assets/Player/Knight-9.png'
// import kn11 from '../assets/Player/Knight-10.png'
//Tutorial 
import PhaserLogo from '../assets/tutorial/assets/logo.png';
import greyBox from '../assets/tutorial/assets/ui/grey_box.png';
import checkbox from '../assets/tutorial/assets/ui/blue_boxCheckmark.png';
import TownThemeMusic from '../assets/tutorial/assets/TownTheme.mp3';
import Javali_sound from '../assets/Sound/animals_bear_growl_grunt_001.mp3';
import Slime_sound from '../assets/Sound/zapsplat_cartoon_slime_bubbles_001_54614.mp3';
import ButtonBlue from '../assets/tutorial/assets/ui/blue_button02.png';
import ButtonBlue3 from '../assets/tutorial/assets/ui/blue_button03.png';







export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  init () {
    console.log("test2")
    this.readyCount = 0;
  }
   
  ready () {
    this.scene.start('Title');
    // this.scene.start('Title');
    // this.readyCount++;
    // if (this.readyCount === 2) {
      
    // }
  }


  preload () {
    this.cameras.main.setBounds(0, 0, 4000, 4000);
    this.physics.world.setBounds(0, 0, 4000, 4000);
    /*
    background images is 500x500 world is 4000x4000
    This image does not scael well, another option
    would be to display it not scaled 4 times 0,0 0,500 500,0 500,500
    */
    this.add.image(0, 0, 'background').setOrigin(0).setScale(1);
    // this.add.image(400, 200, 'logo');
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: 'Loading...',
      style: {
        font: '20px fantasy',
        color:'#000',
        // fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
   
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        // fill: '#ffffff'
        color:'#000'
      }
    });
    percentText.setOrigin(0.5, 0.5);
   
    var GameNameText = this.make.text({
      x: width / 2,
      y: height / 2 - 70,
      text: 'Protect your Land',
      style: {
        font: '48px fantasy',
        // fill: '#ffffff',
        color:'#000'
      }
    });
    GameNameText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
        console.log(value);
        percentText.setText(parseInt(value * 100) + ' %')
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });
                
    this.load.on('fileprogress', function (file) {
        console.log(file.src);
    });
    
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      GameNameText.destroy();
      console.log('complete');
      this.ready();
    }.bind(this));
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);


    this.load.image('phaserLogo', PhaserLogo);
    this.load.image('box', greyBox);
    this.load.image('checkedBox', checkbox);
    this.load.audio('bgMusic', [TownThemeMusic]);
    this.load.audio('slime-sound', Slime_sound)
    this.load.audio('javali-sound', Javali_sound)
    this.load.image('blueButton1', ButtonBlue);
    this.load.image('blueButton2', ButtonBlue3);

    // Player.textures.forEach((e)=>{
    //   e.image = kn
    // })
    Player.textures[0].image = kn1
    Player.textures[1].image = kn2
    Player.textures[2].image = kn3
    // Player.textures[3].image = kn4
    // Player.textures[4].image = kn5
    // Player.textures[5].image = kn6
    // Player.textures[6].image = kn7
    // Player.textures[7].image = kn8
    // Player.textures[8].image = kn9
    // Player.textures[9].image = kn10
    // Player.textures[10].image = kn11

    this.load.multiatlas('Player', Player);
    // this.load.atlas('Player', [ kn1, kn2, kn3, kn4, kn5, kn6 ], Player);


    // this.load.multiatlas('Player',Player,'/');
    // this.textures.addAtlas('Player',kn1,Player);

    this.load.image("tiles2",pngbarn)
    this.load.image("tileset3",tiles3)
    this.load.image("tiles4",decorative_obj)
    
    this.load.tilemapTiledJSON("map",Map)
    this.load.tilemapTiledJSON("map_second_level",second_map)
    this.load.spritesheet("slime",slime,{ frameWidth: 110, frameHeight: 90 })
    this.load.spritesheet("javali",javali,{ frameWidth: 103, frameHeight: 84 })
  }
 
  create () {

  }
};