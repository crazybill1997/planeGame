//首先肯定是要加载这个游戏所需要的图片资源
//定义一个数组，这个数组代表我需要加载的图片资源
var res = [
	"R/background.jpg",
	"R/hero0.gif",
	"R/bullet.gif", //如果你们想用新的图片，就把这个名子换掉
	"R/newE0.png", //小飞机的图片
	"R/newE1.png", //中飞机的图片
	"R/newE2.png", //大飞机的图片
	"R/prop.jpg", //双排子弹的道具图片
	"R/prop1.jpg", //原子弹的道具
	"R/newE1_hit.png", //中飞机的破损图片
	"R/newE2_hit.png", //大飞机的破损图片
	"R/newE0_down1.png", //小飞机的爆炸图片
	"R/newE0_down2.png",
	"R/newE0_down3.png",
	"R/enemy0_down4.png",
	"R/newE1_down1.png", //中飞机爆炸图片
	"R/newE1_down2.png",
	"R/newE1_down3.png",
	"R/enemy1_down4.png",
	"R/newE2_down1.png", //大飞机的爆炸图片
	"R/newE2_down2.png",
	"R/newE2_down3.png",
	"R/newE2_down4.png",
	"R/newE2_down5.png",
	"R/enemy2_down6.png"
];

var resObj = []; //用于保存已经加载的图片对象
var bulletList = []; //创建一个集合用于保存玩家飞机子弹
var enemyList = []; //创建一个集合用于保存敌人的飞机
var toolList = []; //创建一个集合，用于存放道具
var boomList = []; //创建一个集合，用于存放爆炸的动画
var score = 0;   //玩家的得分

//写一个加载图片方法
function loading(startGame) {
	var count = 0; //默认加载图片的数量是0
	//这个方法专门用来加载图片
	for (var i = 0; i < res.length; i++) {
		var img = new Image();
		img.src = res[i];
		resObj.push(img); //保存已经加载的图片对象
		//从服务器上面加载这张图片
		img.onload = function() {
			count++;
			//当你已经加载的图片与总图片相同时
			//说明图片加载完了，这个时候要开始游戏了
			if (count == res.length) {
				//调用开始游戏的方法
				startGame();
			}
		}
	}
}
//通过最新的语法，导出刚刚加载好的图片对象
export default {
	resObj: resObj,
	loading: loading,
	bulletList: bulletList,
	enemyList: enemyList,
	toolList: toolList,
	boomList: boomList,
	score:score
}
