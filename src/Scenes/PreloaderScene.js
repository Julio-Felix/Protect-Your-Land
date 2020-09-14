import 'phaser';
import Map from "../assets/RealesedMap.json"

import background from "../assets/background.png";
import pngbarn from "../assets/pngbarn (1).png";
import qmc from "../assets/1_qmckz-4ppRl9i8-tEmGmHw.png";
import decorative_obj from "../assets/decorative_obj.png";
import tiles3 from "../assets/generic_platformer_tiles.png";
import playerPNG from "../assets/dude.png"
import Player from '../assets/Player/Knight.json'
import kn1 from '../assets/Player/Knight-0.png'
import kn2 from '../assets/Player/Knight-1.png'
import kn3 from '../assets/Player/Knight-2.png'
import kn4 from '../assets/Player/Knight-3.png'
import kn5 from '../assets/Player/Knight-4.png'
import kn6 from '../assets/Player/Knight-5.png'
//Tutorial 
import PhaserLogo from '../assets/tutorial/assets/logo.png';
import greyBox from '../assets/tutorial/assets/ui/grey_box.png';
import checkbox from '../assets/tutorial/assets/ui/blue_boxCheckmark.png';
import TownThemeMusic from '../assets/tutorial/assets/TownTheme.mp3';
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
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
   
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
   
    var GameNameText = this.make.text({
      x: width / 2,
      y: height / 2 - 70,
      text: 'Protect your Land',
      style: {
        font: '48px fantasy',
        fill: '#ffffff'
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
    this.load.image('blueButton1', ButtonBlue);
    this.load.image('blueButton2', ButtonBlue3);


    this.load.atlas({
      key: 'Player',
      textureURL: kn1,
      atlasURL: Player
    });
    this.load.atlas({
      key: 'Player',
      textureURL: kn2,
      atlasURL: Player
    });
    this.load.atlas({
      key: 'Player',
      textureURL: kn3,
      atlasURL: Player
    });
    this.load.atlas({
      key: 'Player',
      textureURL: kn4,
      atlasURL: Player
    });
    this.load.atlas({
      key: 'Player',
      textureURL: kn5,
      atlasURL: Player
    });
    this.load.atlas({
      key: 'Player',
      textureURL: kn6,
      atlasURL: Player
    });


    this.load.image("tiles2",pngbarn)
    this.load.image("tileset3",tiles3)
    this.load.image("tiles4",decorative_obj)
    this.load.image("background",background)
    this.load.tilemapTiledJSON("map",Map)
    this.load.spritesheet("PC",playerPNG,{ frameWidth: 32, frameHeight: 48 })
  }
 
  create () {
  }
};