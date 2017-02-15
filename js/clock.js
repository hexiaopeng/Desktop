var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width/200;

//没有时针的时钟（画圆,刻度,数字）
function drawBackground(){
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 10*rem;
	ctx.arc(0,0,r - ctx.lineWidth/2,0,2*Math.PI,false);
	ctx.strokeStyle = '#666';
	ctx.stroke();
	
	var hourNumber =[3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = 16*rem+'px 微软雅黑';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	
			//数字
	hourNumber.forEach(function(number,i){
		var rad = 2*Math.PI/12*i;
		var x = Math.cos(rad)*(r-30);
		var y = Math.sin(rad)*(r-30);
		ctx.fillText(number,x,y)
	});
//		点
	for(var i=0;i<60;i++){
		var rad = 2*Math.PI/60*i;
		var x = Math.cos(rad)*(r-18);
		var y = Math.sin(rad)*(r-18);
		ctx.beginPath();
		if(i%5===0){
			ctx.fillStyle = '#000';
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		ctx.fill();	
	}
}

function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	
	ctx.strokeStyle = '#000';
	var rad = 2*Math.PI/12*hour;
	var mrad = 2*Math.PI/12/60*minute;
	ctx.rotate(rad+mrad);
	
	ctx.lineWidth = 5*rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r/2+12);
	
	ctx.stroke();
	ctx.restore();
}
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	
	ctx.strokeStyle = '#000';
	var rad = 2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3*rem;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r+40*rem);
	
	ctx.stroke();
	ctx.restore();
}
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = 'red';
	var rad = 2*Math.PI/60*second;
	ctx.rotate(rad);
	ctx.moveTo(-2,20*rem);
	ctx.lineTo(2,20*rem);
	ctx.lineTo(-1,-r+18*rem);
	ctx.lineTo(-1,-r+18*rem);
	
	ctx.fill();
	ctx.restore();
}
//中心点
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.arc(0,0,3,0,2*Math.PI,false);
	ctx.fill();
}

function draw(){
	ctx.clearRect(0,0,width,height)
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}

draw();
setInterval(draw,1000)
