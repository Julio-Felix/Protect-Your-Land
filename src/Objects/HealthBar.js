import 'phaser';
export default class HealthBar {

    constructor (scene, x, y,scale)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        // console.log(this.bar)
        this.bar.setScale(scale)
        this.bar.setDepth(100)
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;
        
        this.draw();

        scene.add.existing(this.bar);
    }


    isDead(){
        if(this.value == 0){
            return true
        }
        return false
    }

    decrease (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    setXandY(x,y,width,height){
        this.x = x
        this.y = y;
        this.p = (width - 4) / 100;
        this.draw_custom(width,height);
    }
    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
    draw_custom (width,height)
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, width, height);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, width - 4 , height- 4 );

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, height - 4);
    }
    decrease_custom (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw_custom();

        return (this.value === 0);
    }
    update(){
        if(this.value < 100){

        }
    }

}