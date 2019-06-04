//目前只写双排子弹的道具
import bianliang from "./bianliang.js";

class Tools{
	constructor() {
	    var t = parseInt(Math.random()*2);
		if(t == 0){
			this.type = 0;
			this.img = bianliang.resObj[6];
		}else if(t == 1){
			this.type = 1;
			this.img = bianliang.resObj[7];
		}
		this.width = this.img.width;
		this.height = this.img.height;
		this.x = parseInt(Math.random()*480);
		if(this.x>480 - this.width){
			this.x = 480 - this.width;
		}
		this.y = this.height*(-1);
	}
	move(){
		this.y += 10;
		//当道具离开屏幕以后，移除道具
		if(this.y >= 850){
//			 this.y -= 2;
			var index = bianliang.toolsList.indexOf(this);
			bianliang.toolsList.splice(index,1);
		}
	}
	
	//道具自己绘制的方法
	draw(ctx){
		this.move();
		ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
	}
	
}

export default Tools;