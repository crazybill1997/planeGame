/**
 * 这是玩家飞机的子弹
 */
import bianliang from "./bianliang.js";
class Bullet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.img = bianliang.resObj[2];
		this.width = this.img.width;
		this.height = this.img.height;
	}

	//子弹移动的方法
	move() {
		this.y -= 40; //不断改变子弹的纵坐标
		//当子弹离开了屏幕，跑上最上边去了以后，我们就要移除这一颗子弹
		if (this.y <= 0) {
			//找出这颗子弹的索引
			var index = bianliang.bulletList.indexOf(this);     //当前子弹在集合里面的索引
			bianliang.bulletList.splice(index,1);			    //替换当前的元素，相当于删除
			
		}
	}

	//把自己画到屏幕上去
	draw(ctx) {
		this.move(); //在绘画之前调用一下自己的move方法，让自己移动一下
		//按指定的位置画指定大小的图片
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}

//导出刚刚创建好的游戏对象
export default Bullet;
