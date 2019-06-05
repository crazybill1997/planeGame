/**
 * 道具对象
 */
//目前,我们只写双排子弹的道具
import bianliang from "./bianliang.js";

class Tool {
	constructor() {
		//在这里，怎么样根据随机数来决定它的图片类型
		var temp = parseInt(Math.random()*2);   //产生一个0~1之间的随机数
		if(temp==0){
			//双排子弹
			this.type = 0;
			this.img = bianliang.resObj[6];
		}
		else if(temp==1){
			//原子弹
			this.type = 1;
			this.img = bianliang.resObj[7];
		}
		
		
		this.width = this.img.width;
		this.height = this.img.height;
		this.x = parseInt(Math.random() * 480);
		//防止道具的横坐标跑到外边去了
		if (this.x > 480 - this.width) {
			this.x = 480 - this.width;
		}
		this.y = this.height * (-1);
	}

	//首具也需要从天而降，所以它也有一个移动的方法
	move() {
		this.y += 2; //让它的纵坐标在这里去改变
		//当这个道具一旦离开这个屏幕以后  就应该把它移除掉
		if (this.y > 850) {
			//现在在bianliang.toolList里面去删除自己
			var index = bianliang.toolList.indexOf(this);
			bianliang.toolList.splice(index,1);
		}
	}

	//道具绘制自己的方法 
	draw(ctx) {
		
		//每次绘画自己之前，把自己调用一下
		this.move();
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}
//导出这个对象
export default Tool;  

