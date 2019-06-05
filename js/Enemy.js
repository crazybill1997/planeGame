/**
 * 敌人飞机
 * 能不能在一个对象里面区分成三种类型的飞机呢？
 * 我们在这个地方只需要给它定义一个type类型      this.type=0或1或2
 * type=0则代表小飞机，type=1则代表中飞机，type=2则代表大飞机
 * 在此处需要得到一个随机数概率的问题
 * 大飞机概率5%，中飞机10%，小飞机85%
 * 我们要对不同的飞机做出不同的生命值处理
 */
import bianliang from "./bianliang.js";
import Boom from "./Boom.js";		//导入爆炸的对象

class Enemy {
	constructor() {
		//0~100之间的随机数，那么，每个数随机出现的概率都是1%
		var temp = parseInt(Math.random() * 100); // 我现在产生一个0~100之间的随机数
		if (temp >= 95) {
			//大飞机
			this.type = 2;
			this.img = bianliang.resObj[5];
			//根据飞机的类型来定义一个速度属性
			this.speed = 3;
			this.life = 10;
			this.score = 50;
		} else if (temp >= 85) {
			//中飞机
			this.type = 1;
			this.img = bianliang.resObj[4];
			this.speed = 4;
			this.life=3;
			this.score = 30;
		} else {
			//小飞机
			this.type = 0;
			this.img = bianliang.resObj[3];
			this.speed = 5;
			this.life =1;
			this.score = 10;
		}

		
		//希望把飞机的横坐标随机产生  ,这个时候就需要使用到随机数    0~480
		//Math.random()只能产生0~1之间随机数
		this.x = parseInt(Math.random() * 480);
		this.width = this.img.width;
		this.height = this.img.height;
		//怎么样防止飞机的X横坐标跑到外边去了
		if (this.x > 480 - this.width) {
			this.x = 480 - this.width;
		}
		this.y=this.height*(-1);

	}
	//代表敌机从上向下移动的方法
	move() {
		//飞机根据它的速度在进行移动
		this.y += this.speed;
		//当飞机移动到最下边去了以后，就要把它移除掉
		if (this.y >= 850) {
			//找到当前飞机的索引，
			var index = bianliang.enemyList.indexOf(this);
			//然后根据这个索引去删除它
			bianliang.enemyList.splice(index, 1);
		}
	}

	//绘画自己的方法 
	draw(ctx) {
		this.move();
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
	//判断当前飞机是否死亡
	isDie(){
		if(this.life<=0){
			//说明这个飞机已经死了  、
			//播放爆炸动画   导入刚刚创建的爆炸对象   import Boom from "./Boom.js"
			//飞机在哪里死亡，爆炸就在哪里产生
			var b = new Boom(this.x,this.y,this.type);
			bianliang.boomList.push(b);   //将爆炸对象添加到集合当中去
			
			//当飞机死亡时，把分数值拿出进行积分
			bianliang.score += this.score;
			
			//移除自己
			var index = bianliang.enemyList.indexOf(this);
			bianliang.enemyList.splice(index,1);
			
		}
		else{
			//说明飞机只是中弹了，但是没有死，
			//这个时候，我们应该换一个破损的飞机图片
			//根据飞机的类型来换
			if(this.type==1){
				//说明是中飞机
				this.img = bianliang.resObj[8];
			}
			else if(this.type==2){
				//说明你是大飞机
				this.img = bianliang.resObj[9];
			}
		}
	}
}

export default Enemy;
