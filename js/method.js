function arrIndexOf(arr, v) {

	for (var i=0; i<arr.length; i++) {

		if (arr[i] == v) {

			return i;

		};

	};

	return -1;

};

function addClass(obj, className) {

	if (obj.className == '') {

		obj.className = className;

	} else {

		var arrClassName = obj.className.split(' ');

		if ( arrIndexOf(arrClassName, className) == -1 ) {

			obj.className += ' ' + className;

		};

	};

};

function removeClass(obj, className) {

	if (obj.className != '') {

		var arrClassName = obj.className.split(' ');
		var _index = arrIndexOf(arrClassName, className);

		if ( _index != -1 ) {

			arrClassName.splice(_index, 1);
			obj.className = arrClassName.join(' ');

		};

	};

};

function getOffsetToBody(obj,attr){
	if (obj == document.body || obj == null) {
		return 0;
	};
	return getOffsetToBody(obj.offsetParent,attr) + obj[attr];
};

function setBgInImgColor(obj){
	RGBaster.colors(document.getElementsByClassName('bg')[0], {
		success: function(payload) {
	    // payload.dominant是主色，RGB形式表示
	    // payload.secondary是次色，RGB形式表示
	    // payload.palette是调色板，含多个主要颜色，数组
			obj.style.backgroundColor = payload.secondary;
		}
	});
};

function createBox(title,src,name,width,height,top,left){
	var appBox = document.createElement('div');
	appBox.className = 'appBox';
	var appBoxTop = document.createElement('div');
	appBoxTop.className = 'appBoxTop';
	var appBoxTitle = document.createElement('div');
	appBoxTitle.className = 'appBoxTitle';
	var appBoxMenu = document.createElement('div');
	appBoxMenu.className = 'appBoxMenu';
	var appBoxHidden = document.createElement('div');
	appBoxHidden.className = 'appBoxHidden';
	var appBoxClose = document.createElement('div');
	appBoxClose.className = 'appBoxClose';
	var iFfome = document.createElement('iframe');

	appBoxHidden.onclick = function(){
		appBox.itop = this.offsetTop;
		appBox.ileft = this.offsetLeft;
		appBox.style.display = 'none';

		if (appBox.onOff) {
			appBox.onOff = false;
		} else{
			appBox.onOff = true;
		}
	};

	appBoxClose.onclick = function(){
		removeWebMenu(name);
	};

	appBox.appendChild(appBoxTop);
	appBox.appendChild(iFfome);
	appBoxTop.appendChild(appBoxTitle);
	appBoxTop.appendChild(appBoxMenu);
	appBoxMenu.appendChild(appBoxHidden);
	appBoxMenu.appendChild(appBoxClose);

	appBoxTitle.innerHTML = title;
	appBox.dataset.name = name;
	appBox.dataset.name = name;
	appBox.style.width = width;
	appBox.style.height = height;
	appBox.dataset.top = top;
	appBox.dataset.left = left;
	appBox.dataset.width = width;
	appBox.dataset.height = height;
	appBox.style.top = top;
	appBox.style.left = left;
	iFfome.src = src;
//	setBgInImgColor(appBoxTop)
	iFfome.style.background = '#fff'
	iFfome.frameBorder = '0';
	iFfome.style.width = width;
	iFfome.style.height = parseFloat(height) - 30 + 'px';
	document.body.appendChild(appBox);

	addWebMenu(name,appBox);
};

function addWebMenu(name,obj){
	var webMenu = document.getElementById('webMenu');
	var div = document.createElement('div');
	div.className = 'webMenu_' + name;
	div.dataset.name = name;
	var div1 = null;

	div.onclick = function(){
		obj.zIndex++;
		obj.style.top = obj.itop;
		obj.style.left = obj.ileft;
		if (obj.onOff) {
			obj.style.display = 'block';
			obj.onOff = false;
		} else{
			obj.style.display = 'none';
			obj.onOff = true;
		}
	};

	div.onmouseover = function(){
		div1 = document.createElement('div');
		var nowMenu = getBox(name).cloneNode(true);
		var top = parseFloat(nowMenu.dataset.top)
		var left = parseFloat(nowMenu.dataset.left)
		var width = parseFloat(nowMenu.dataset.width)
		var height = parseFloat(nowMenu.dataset.height)
		div1.appendChild(nowMenu);
		div1.className = 'nowMenu';
		div1.style.width = 150/height*width + 'px';
		div1.style.height = 150 + 'px';
		div1.style.top = -(height-150)/2 - top + this.offsetTop - 150 + 'px';
		div1.style.left = -(width - 150/height*width)/2 - left + getOffsetToBody(this,'offsetLeft') - 150/height*width/2 + 15 +'px';
		nowMenu.style.transform = 'scale('+ 150/parseFloat(getBox(name).dataset.height) +')';
		nowMenu.style.display = 'block';
		this.appendChild(div1);
	};

	div.onmouseout = function(){
		this.removeChild(div1);
	};

	webMenu.appendChild(div);
};

function removeWebMenu(name){
	var webMenu = document.getElementById('webMenu');
	document.body.removeChild(getBox(name));
	webMenu.removeChild(getwebMenu(name));
};

function getBox(name){
	var appBox = document.getElementsByClassName('appBox');
	for (var i=0; i<appBox.length; i++) {
		if (appBox[i].dataset.name == name) {
			return appBox[i];
		};
	};
};

function getwebMenu(name){
	var webMenu = document.getElementById('webMenu');
	var webMenuChild = webMenu.children;
	for (var i=0; i<webMenuChild.length; i++) {
		if (webMenuChild[i].dataset.name == name) {
			return webMenuChild[i];
		};
	};
};

function IaunchFullscreen(element){
	if (element.requestFullscreen) {
		element.requestFullscreen();
	}else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	}else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	};
};

function exitFullscreen(){
	if (document.exitFullscreen) {
		document.exitFullscreen();
	}else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	}else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	};
};
