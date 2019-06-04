//首先肯定是要加载这个游戏所需要的图片资源
//定义一个数组，这个数组代表我需要加载的图片资源
var res = [
	"R/background.jpg",
	"R/hero0.gif",
	"R/bullet.gif",             //如果你们想用新的图片，就把这个名子换掉
	"R/newE0.png",
	"R/newE1.png",
	"R/newE2.png",
	"R/prop.jpg",        //双排子弹图片
	"R/prop1.jpg"
];

var resObj = [];  //用于保存已经加载的图片对象
var bulletList =[];  //创建一个集合用于保存玩家飞机子弹
var enemyList = [];
var toolsList = [];  //用于存放道具

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
	toolsList:toolsList
}