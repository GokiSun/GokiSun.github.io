var radiu = 1;
//小球半径
var number = 200;
//小球数量
var canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var ctx = canvas.getContext('2d');
ctx.width = document.documentElement.clientWidth;
ctx.height = document.documentElement.clientHeight;

var balls = [];
function renderball(balls) {
	ctx.fillStyle = "rgba(200,200,200,.5)";
	for (let i = 0; i < balls.length; i++) {

		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,radiu,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
}
function creatballs(){
//初始化小球
	for (let i = 0; i < number; i++) {
		var ball = {};
		//小球位置
		ball.x = Math.random()*ctx.width;
		ball.y = Math.random()*ctx.height;
		//小球移动矢量速度
		ball.vx = Math.pow(-1,Math.ceil(Math.random()*100))*Math.random();
		ball.vy = Math.pow(-1,Math.ceil(Math.random()*100))*Math.random();

		balls.push(ball);
	}

	renderball(balls);
}
function toline(){
//球之间连线
	for (var i = 0; i < balls.length; i++) {
		for (var j = i+1; j < balls.length-1; j++) {
			let distant = Math.sqrt((balls[i].x-balls[j].x)**2+(balls[i].y-balls[j].y)**2);
			if(distant <= 50){
				ctx.strokeStyle = "rgba(200,200,200,.2)";
				ctx.beginPath();
				ctx.moveTo(balls[i].x,balls[i].y);
				ctx.lineTo(balls[j].x,balls[j].y);
				ctx.closePath();
				ctx.stroke();
			}

		}
	}
//球与鼠标连线
	for (var i = 0; i < balls.length; i++) {
			let distant = Math.sqrt((balls[i].x-balls[number-1].x)**2+(balls[i].y-balls[number-1].y)**2);
			if(distant <= 120){
				ctx.strokeStyle = "rgba(200,200,200,.2)";
				ctx.beginPath();
				ctx.moveTo(balls[i].x,balls[i].y);
				ctx.lineTo(balls[number-1].x,balls[number-1].y);
				ctx.closePath();
				ctx.stroke();
			}
	}

}
var mouse = {};
function getposition(event) {
	balls.pop();
	var e = event || window.event;

	mouse.x = e.clientX;
	mouse.y = e.clientY;

	var ball = {};
	ball.x = e.clientX;
	ball.y = e.clientY;
	ball.vx = Math.pow(-1,Math.ceil(Math.random()*100))*Math.random();
	ball.vy = Math.pow(-1,Math.ceil(Math.random()*100))*Math.random();

	balls.push(ball);
	// console.log(balls[149]);
}

function tomove(){
	setInterval(function(){

		for (var i = 0; i < balls.length - 1; i++) {
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			if((balls[i].x>=ctx.width)||(balls[i].x<=0)) balls[i].vx = -balls[i].vx;
			if((balls[i].y>=ctx.height)||(balls[i].y<=0)) balls[i].vy = -balls[i].vy;

			let distant = Math.sqrt((balls[i].x-mouse.x)**2+(balls[i].y-mouse.y)**2);

			if(distant >= 100 && distant <= 150){
				//靠近鼠标吸附效果
				var xx = mouse.x - balls[i].x;
				var yy = mouse.y - balls[i].y;
				
				var dis = distant - 100;
				balls[i].x += dis*(xx/distant)/7;
				balls[i].y += dis*(yy/distant)/7;

			}
		}
		ctx.clearRect(0,0,ctx.width,ctx.height);
		renderball(balls);
		toline();
	},30);
}
creatballs();

tomove();