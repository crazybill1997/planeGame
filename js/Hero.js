/**
 * 这是玩家飞机的对象
 */
import bianliang from "./bianliang.js";
import Bullet from "./Bullet.js";

class Hero {
	constructor() {
		this.x = 200; //飞机初始横坐标
		this.y = 500; //飞机初始纵坐标
		this.img = bianliang.resObj[1]; //飞机的图片
		//根据飞机的图片设置对象的大小
		this.width = this.img.width;
		this.height = this.img.height;
		
		this.isTwo = false;
	}


	//每一个游戏对象最后都是要绘制在虚拟屏上面的
	draw(ctx) {
		//在指定的坐标（x,y）画指定的图片(img),按指定的大小来画(width,height)
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	/*玩家飞机发射子弹的方法*/
	fire() {
		if(this.isTwo == false){
			//玩家飞机在哪里，子弹就在哪里？
			var b = new Bullet(this.x, this.y);
			//修正子弹的横坐标
			b.x = b.x + this.width / 2 - b.width / 2;
			bianliang.bulletList.push(b);
		}else{
			var b_left = new Bullet(this.x,this.y);
			b_left.x = b_left.x + this.width/4 - b_left.width/2;
			
			var b_right = new Bullet(this.x,this.y);
			b_right.x = b_left.x + this.width/4*3 - b_right.width/2;
			
			bianliang.bulletList.push(b_left);
			bianliang.bulletList.push(b_right);
		}
		
	}
}

//导出这个对象
export default Hero;
