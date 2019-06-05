/**
 * 创建一个爆炸的动画
 * 1.敌机在哪里死亡，爆炸就在哪里产生
 */
import bianliang from "./bianliang.js";
class Boom {
	//type指的是敌机的类型
	constructor(x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type;
		//现在要根据敌机的类型来决定飞机的爆炸图片
		if (this.type == 0) {
			//小飞机爆炸  10~13这4张图片
			//this.imgs = [bianliang.resObj[10], bianliang.resObj[11], bianliang.resObj[12], bianliang.resObj[13]];
			this.imgs = bianliang.resObj.slice(10, 14); //从第10个开始。到第14个（不包含第14个）

		} else if (this.type == 1) {
			//中飞机爆炸  14~17  这4张图片
			this.imgs = bianliang.resObj.slice(14, 18); //从第14个开始。到第18个（不包含第18个）
		} else if (this.type == 2) {
			//大飞机爆炸   18~23  这6张图片
			this.imgs = bianliang.resObj.slice(18, 24); //从第18个开始。到第24个（不包含第24个）
			//slice是截取数组集合中的元素
		}
		this.width = this.imgs[0].width; //取数组当中的第一张图片的宽度与高度
		this.height = this.imgs[0].height;
		this.isPlay = false; //爆炸动画还没有开始播放
	}

	//在这里，写一个方法 把自己画出来
	draw(ctx) {
		//动画自己循环调用自己就行了，不需要外边调用
		if (this.isPlay == false) {
			this.isPlay = true;    //告诉外边，这个时候，爆炸动画已经开始播放了
			//爆炸动画应该是多张图片在轮流切换
			var count = 0;
			//这个count应该是每隔一段时间就自己改变，然后图片改变
			var id = setInterval(function() {
				ctx.drawImage(this.imgs[count], this.x, this.y, this.width, this.height);
				count++;
				//现在还要判断一下，这个动画的图片是否都已经画完了
				if (count >= this.imgs.length) {
					//说明所有的图片都画完了，这个时候，我们就要清除这个定时器
					clearInterval(id); //除尖id这个定时器
					//当爆炸动画播放完成以后，要把自己移除掉
					var index =bianliang.boomList.indexOf(this);
					bianliang.boomList.splice(index,1);
					
				}
			//当在定时器里面使用了this关键字以后，要加上一下代码
			}.bind(this), 50);
		}

	}
}

//导出对象
export default Boom;
