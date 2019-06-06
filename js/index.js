import bianliang from "./bianliang.js";
import BackGround from "./BackGround.js";
import Hero from "./Hero.js";
import Enemy from "./Enemy.js";
import Tool from "./Tool.js";


//第一件事情,先获取画布(模拟屏幕)
// #game代表id="game"
var game = document.querySelector("#game");
//第二件事情,在这里获取绘画用的笔





var ctx = game.getContext("2d");
//加载完资源以后开始游戏
bianliang.loading(function(){
	//游戏资源加载好以后要做的事情,资源加载好后显示“开始游戏”按钮
	document.querySelector(".btnStart").style.display = "inline-block";
	//点击按钮  开始游戏
	document.querySelector(".btnStart").onclick = function(){
		startGame();
		document.querySelector(".startDiv").style.display = "none";
	}
});

// bianliang.loading(startGame);

//定义一个开始游戏的方法 与loading相对应
var bg = null; //定义一个背景变量
var hero = null; //定义一个空的玩家对象
var time0 = null; //第一个定时器
var time1 = null; //第二个游戏定时器

function startGame() {
	bg = new BackGround();
	hero = new Hero();
	//接下来，要不停的去画自己，用到JS里面的定时器
	time0 = setInterval(function() {
		bg.draw(ctx); //画背景
		hero.draw(ctx); //画玩家飞机
		addEnemy(); //检测并添加敌人的飞机
		addTool(); //检测并添加道具
		isCrash(); //每次绘画之前，做一次碰撞检测

		//遍历所有的子弹，把所有的子弹画出来
		for (var i = 0; i < bianliang.bulletList.length; i++) {
			bianliang.bulletList[i].draw(ctx);
		}
		//把敌人的飞机画出来
		for (var i = 0; i < bianliang.enemyList.length; i++) {
			bianliang.enemyList[i].draw(ctx);
		}
		//把道具画出来
		for (var i = 0; i < bianliang.toolList.length; i++) {
			bianliang.toolList[i].draw(ctx);
		}
		//绘制爆炸动画
		for (var i = 0; i < bianliang.boomList.length; i++) {
			bianliang.boomList[i].draw(ctx);
		}
		//绘制玩家得分
		ctx.fillStyle="white";
		ctx.font="18pt 华文行楷";
		ctx.fillText("得分："+bianliang.score,20,30);
	}, 50);

	//这个定时器是专门用于玩家飞机发射子弹的
	time1 = setInterval(function() {
		hero.fire();
	}, 250);
}

//当鼠标在屏幕上移动的时候
game.onmousemove = function(event) {
	if (hero != null) {
		//event是鼠标事件的对象
		var x = event.clientX - game.getBoundingClientRect().left;
		if (x > 480 - hero.width) {
			x = 480 - hero.width;
		}
		hero.x = x;
		var y = event.clientY - game.getBoundingClientRect().top;
		if (y > 850 - hero.height) {
			y = 850 - hero.height;
		}
		hero.y = y;
	}
}

//定一个方法 ，专门用于去添加敌人的飞机
function addEnemy() {
	//屏幕上面最多少能出现8架飞机
	if (bianliang.enemyList.length < 8) {
		//说明飞机不够    计算还差多少架飞机
		var count = 8 - bianliang.enemyList.length;
		//通过for循环去添加飞机   注意import导入Enemy
		for (var i = 0; i < count; i++) {
			var e = new Enemy();
			bianliang.enemyList.push(e);
		}
	}
}

//要写一个方法去添加这个道具
function addTool() {
	/**
	 * 问题：1.我们不能添加过多的道具，一次只能添加一个，如果屏幕上面已经有了道具，则不添加
	 *      2.不能够随时产生道具，应该有一个概率去产生，我们希望这个概率是2% 
	 */
	//提示，注意在头部去导入import Tool from "./Tool.js";
	if (bianliang.toolList.length < 1) {
		//说明道具不存在，这时候，我可以随机的产生道具  
		//怎么样去控制它的随机概率
		var temp = parseInt(Math.random() * 100); //0~99之间的随机数
		if (temp >= 98) {
			var t = new Tool(); //创建一个新的道具对象
			//把它添加到集合当中去
			bianliang.toolList.push(t);
		}
	}
}


//碰撞检测 ，也叫相交检测，检测两个物体是否有相交
function checkCrash(a, b) {
	if (a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y) {
		//代表没有相交
		return false;
	} else {
		return true;
	}
}

//我们现在就要检测游戏在进行的过程当中，有那些相交的情况

function isCrash() {
	//----------------------第一种情况，玩家飞机与道具发生了相交----------------------
	for (var i = 0; i < bianliang.toolList.length; i++) {
		//现在调用刚刚写好的checkCrash的方法来判断一下，两个物体是否有发生相交的过程
		var result = checkCrash(hero, bianliang.toolList[i]);
		//如果你是双排子弹，我就给你双排子弹，如果你是原子弹，我就让所有的飞机都爆炸
		if (result == true) {
			if (bianliang.toolList[i].type == 0) {
				//说明这个道具是一个双排的子弹
				//怎么样将玩家的飞机设置成双排子弹
				hero.isTwo = true; //把它变成双排子弹
				//道具应该要消失,所以，我们要移除当前的道具
				bianliang.toolList.splice(i, 1);
				//现在，我们要定一个定时器，过一段时间以后就恢复成单排
				//一次性定时器 
				setTimeout(function() {
					hero.isTwo = false; //10秒钟以后，我就把你恢复成单排的子弹
				}, 10000);
			} else if (bianliang.toolList[i].type == 1) {
				//说明是原子弹
				for(var j=bianliang.enemyList.length-1;j>=0;j--){
					bianliang.enemyList[j].life=0;
					bianliang.enemyList[j].isDie();
				}
				bianliang.toolList.splice(i,1);
			}
		}
	}


	//------------------------检测玩家飞机的子弹与敌人飞机发生碰撞以后----------------------
	/**
	 * 1.子弹消失	 * 2.敌人飞机消失  	 * 提示：两个for循环   遍历的时候，为什么要倒着遍历
	 * 如果正着去遍历索引，后期改变集合长度的时候，它们的索引会改变
	 */
	for (var i = bianliang.bulletList.length - 1; i >= 0; i--) { //找到了所有的子弹
		for (var j = bianliang.enemyList.length - 1; j >= 0; j--) { //找到所有的敌机
			//要将每一颗子弹与每一颗敌机都做一次碰撞检测
			var result = checkCrash(bianliang.bulletList[i], bianliang.enemyList[j]);
			//如果result为true.则说明玩家子弹与敌人飞机发生了碰撞，又说明玩家的子弹打中了敌人的飞机
			if (result) {
				//1.先移除子弹
				bianliang.bulletList.splice(i, 1);
				//2.减少敌机的生命值
				bianliang.enemyList[j].life--;
				//3.判断这个敌机有没有死
				bianliang.enemyList[j].isDie();


				break; //跳出这个循环，下入下一颗子弹
			}
		}
	}
	//--------------------玩家飞机与敌机碰撞----------------------------
	for(var i = bianliang.enemyList.length - 1;i>=0;i--){
		//遍历所有敌机
		var result = checkCrash(bianliang.enemyList[i],hero);
		if(result == true){
			//说明发生了碰撞,gameover
			clearInterval(time0);
			clearInterval(time1);
			
			//游戏结束时应该吧分数显示出来
			document.querySelector(".center").innerText = bianliang.score;
			//显示结束的盒子
			document.querySelector(".endDiv").style.display = "block";
		}
	}
}
