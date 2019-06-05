/**
 * 我们现在在这里要封装一个背景的对象
 * 思考：背景对象里面应该包含那些属性
 * x代表横坐标 ，y代表纵坐标
 */
import bianliang from "./bianliang.js";

class BackGround {
	/*JS里面的构造方法*/
	constructor() {
		this.x = 0;
		this.y = -850;  //由0换成-850以后
		this.img = bianliang.resObj[0];
	}
	//如果要让背景图从上向下移动，这个时候就要改变它的纵坐标
	move(){
		this.y+=2.5;  //在原来的位置+2.5
		if(this.y>=0){
			this.y = -850;   //防止背景图跑过了
		}
	}
	
	
	//定义一个方法 ，让它去画到屏幕上面去
	//注意：class对象里面的方法不用加function
	draw(ctx){
		//我在每次画自己的时候，把自己移动一下
		this.move();
		ctx.drawImage(this.img,this.x,this.y);
	}
}

//最后,导出这个对象
export default BackGround;