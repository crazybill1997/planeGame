import bianliang from "./bianliang.js";
import BackGround from "./BackGround.js";
import Hero from "./Hero.js";
import Enemy from "./Enemy.js";
import Tools from "./Tools.js";

//第一件事情,先获取画布(模拟屏幕)
// #game代表id="game"
var game = document.querySelector("#game");
//第二件事情,在这里获取绘画用的笔
var ctx = game.getContext("2d");

bianliang.loading(startGame);

//定义一个开始游戏的方法 与loading相对应
var bg = null; //定义一个背景变量
var hero = null; //定义一个空的玩家对象

function startGame() {
	bg = new BackGround();
	hero = new Hero();
	//接下来，要不停的去画自己，用到JS里面的定时器
	setInterval(function() {
		bg.draw(ctx); //画背景
		hero.draw(ctx); //画玩家飞机
		addEnemy(); //检测并添加敌机
		addTools();
		isCrash();

		//遍历所有的子弹，把所有的子弹画出来
		for (var i = 0; i < bianliang.bulletList.length; i++) {
			bianliang.bulletList[i].draw(ctx);
		}
		for (var i = 0; i < bianliang.enemyList.length; i++) {
			bianliang.enemyList[i].draw(ctx);
		}
		//把道具画出来
		for (var i = 0; i < bianliang.toolsList.length; i++) {
			bianliang.toolsList[i].draw(ctx);
		}

	}, 50);

	//这个定时器是专门用于玩家飞机发射子弹的
	setInterval(function() {
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

//定义一个专门添加敌人飞机方法
function addEnemy() {
	if (bianliang.enemyList.length < 8) {
		var count = 8 - bianliang.enemyList.length;
		//通过循环添加敌人
		for (var i = 0; i < count; i++) {
			var e = new Enemy();
			bianliang.enemyList.push(e);
		}
	}
}

function addTools() {
	//问题1：一次只能添加一个道具
	//问题2：不能够时时刻刻产生道具
	if (bianliang.toolsList.length < 1) {
		//说明道具不存在，即可以产生道具
		var temp = parseInt(Math.random() * 100);
		if (temp > 90) {
			var tool = new Tools();
			bianliang.toolsList.push(tool);
		}
	}
}

//碰撞检测
function checkCrash(a, b) {
	if (a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y) {
		return false;
	} else {
		return true;
	}
}

//检测有哪些相交
function isCrash(){
	//玩家飞机与道具相交
	for(var i = 0;i<bianliang.toolsList.length;i++){
		var result = checkCrash(hero,bianliang.toolsList[i]);
		if(result == true){
		if(bianliang.toolsList[i].type == 0){
			//双排子弹
			hero.isTwo = true;			
			bianliang.toolsList.splice(i,1);
			//一次性定时器
			setTimeout(function(){
				hero.isTwo = false;
			},10000);//10000代表10s
		}else if(bianliang.toolsList[i].type == 1){
			//原子弹
			
			}
		}
	}
	
	
}
