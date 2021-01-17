class Block{
    constructor(x, y, width, height) {
        var options = {
           
            restitution :0.4,
            friction :1,
            density:0.5
            //isStatic:true
           
        }
        this.visibility = 225;
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        World.add(world, this.body);

        this.image=loadImage("images/hut.png");
        
      }
      score(){
        if(this.visibility<0 && this.visibility >-105){
          score++;
        }
      }
      display(){
        console.log(this.body.speed);
        if(this.body.speed <3){
        var angle = this.body.angle;
        var pos= this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.width, this.height);
        pop();
      }else{
        World.remove(world, this.body);
        push();
        this.visibility = this.visibility -5;
        tint(255,94,1,255);
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,this.width, this.height);

        pop(); 
      }
    }
}