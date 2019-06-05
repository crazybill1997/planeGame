//首先肯定是要加载这个游戏所需要的图片资源
//定义一个数组，这个数组代表我需要加载的图片资源
var res = [
	"R/background.png",
	"R/hero1.png",
	"R/bullet2.png",             //如果你们想用新的图片，就把这个名子换掉
	"R/enemy0.png",				 //小飞机的图片
	"R/enemy1.png",				 //中飞机的图片
	"R/enemy2.png",				 //大飞机的图片
	"R/prop_type_0.png",		//双排子弹的道具图片
	"R/prop_type_1.png"			//原子弹的道具
];

var resObj = [];  //用于保存已经加载的图片对象
var bulletList =[];  //创建一个集合用于保存玩家飞机子弹
var enemyList =[];   //创建一个集合用于保存敌人的飞机
var toolList = [];   //创建一个集合，用于存放道具

//写一个加载图片方法
function loading(startGame){
	var count = 0; //默认加载图片的数量是0
	//这个方法专门用来加载图片
	for(var i=0; i<res.length; i++){
		var img = new Image();
		img.src = res[i];
		resObj.push(img);   //保存已经加载的图片对象
		//从服务器上面加载这张图片
		img.onload = function(){
			count++;
			//当你已经加载的图片与总图片相同时
			//说明图片加载完了，这个时候要开始游戏了
			if(count==res.length){
				//调用开始游戏的方法
				startGame();
			}
		}
	}
}
//通过最新的语法，导出刚刚加载好的图片对象
export default {
	resObj:resObj,
	loading:loading,
	bulletList:bulletList,
	enemyList:enemyList,
	toolList:toolList
}