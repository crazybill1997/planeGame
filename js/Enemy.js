import bianliang from "./bianliang.js";
class Enemy{
	constructor() {
		var temp = parseInt(Math.random()*100);
		if(temp>=90){
			this.type = 2;
			this.img = bianliang.resObj[5];
			this.speed = 1;
		}else if(temp>=65){
			this.type = 1;
			this.img = bianliang.resObj[4];
			this.speed = 2;
		}else{
			this.type = 0;
			this.img = bianliang.resObj[3];
			this.speed = 3;
		}
		
		this.x = parseInt(Math.random()*480);
		
		this.width = this.img.width;
		this.height = this.img.height;
		
		if(this.x> 480 - this.width){
			this.x = 480 - this.width;
		}
		this.y = this.height*(-1);
	}
	move(){
		this.y+= this.speed;
		if(this.y>850){
			var index = bianliang.enemyList.indexOf(this);
			bianliang.enemyList.splice(index,1);
		}
	}
	
	draw(ctx){
		this.move();
		ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
	}
}

export default Enemy;