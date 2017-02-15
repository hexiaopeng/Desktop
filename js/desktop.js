(function(){
	var search = document.getElementById('search');
	var searchText = search.getElementsByClassName('searchText')[0];
	var searchBtn = search.getElementsByClassName('searchBtn')[0];
	var desktopBg = document.getElementById('desktopBg');
	var bg = document.getElementsByClassName('bg')[0];
	var taskbar = document.getElementById('taskbar');
	var windowsConZ = taskbar.getElementsByClassName('windowsConZ')[0];
	var webApp = document.getElementById('webApp');
	var music = webApp.getElementsByClassName('music')[0];
	var book = webApp.getElementsByClassName('book')[0];
	var game = webApp.getElementsByClassName('game')[0];
	var taskbarTime = document.getElementById('taskbar_time');
	var time = taskbarTime.getElementsByClassName('time')[0];
	var taskbarDate = taskbarTime.getElementsByClassName('date')[0];
	var timer = null;
	var clock = document.getElementById('clock');
	var calendar = document.getElementById('calendar');

	searchText.onmouseover = function(){
		addClass(this,'focus');
	};

	searchText.onmouseout = function(){
		removeClass(this,'focus');
	};

	searchText.onclick = function(ev){
		removeClass(this,'focus');
		addClass(this,'active');
		if(ev.stopPropagation){
            ev.stopPropagation();
       	}else{
            ev.cancelBubble=true;
        };
        return false;
	};

	document.addEventListener('click',function(){
		removeClass(searchText,'active');
	});

	searchBtn.onmouseover = function(){
		addClass(this,'focus');
	};

	searchBtn.onmouseout = function(){
		removeClass(this,'focus');
	};

//	setBgInImgColor(taskbar);
//	setBgInImgColor(windowsConZ);

	searchBtn.onclick = function(){
		if (this.onOff) {
			this.onOff = false;
		}else{
			createBox('百度搜索','https://www.baidu.com/s?wd='+searchText.value,'search',document.documentElement.clientWidth + 'px',document.documentElement.clientHeight - taskbar.offsetHeight + 'px','0px','0px');
			this.onOff = true;
		}
	};

	music.onclick = function(){
		if (this.onOff) {
			this.onOff = false;
		}else{
			createBox('音乐','music.html','music',document.documentElement.clientWidth + 'px',document.documentElement.clientHeight - taskbar.offsetHeight + 'px','0px','0px');
			this.onOff = true;
		};
	};

	game.onclick = function(){
		if (this.onOff) {
			this.onOff = false;
		}else{
			createBox('别踩白块儿','game.html','game','340px','630px','50px','700px');
			this.onOff = true;
		};
	};

	book.onclick = function(){
		if (this.onOff) {
			this.onOff = false;
		}else{
			createBox('电子书','home.html','book',document.documentElement.clientWidth + 'px',document.documentElement.clientHeight - taskbar.offsetHeight + 'px','0px','0px');
			this.onOff = true;
		};
	};

	setTime()

	function setTime(){
		var nowDate = new Date;
		var hours = nowDate.getHours();
		var minutes = nowDate.getMinutes();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1;
		var day = nowDate.getDate();

		time.innerHTML = hours + ':' + minutes;
		taskbarDate.innerHTML = year + '/' + month + '/' + day;
	};

	timer = setInterval(setTime,1000);

	taskbarTime.onclick = function(){
		calendar.style.display = 'block';
	};

	taskbarTime.onmouseover = function(){
		clock.style.display = 'block';
	};

	taskbarTime.onmouseout = function(){
		clock.style.display = 'none';
	};

	document.oncontextmenu = function(ev){
		if(ev.stopPropagation){
            ev.stopPropagation();
       	}else{
            ev.cancelBubble=true;
        };
        return false;
	};

	calendar.onmousedown = function(ev){
		var ev = ev||event;
		var oldX = ev.clientX - calendar.offsetLeft;
		var oldY = ev.clientY - calendar.offsetTop;
		document.onmousemove = function(ev){
			var ev = ev||event;
			var t = ev.clientY-oldY;
			var l = ev.clientX-oldX;
			var h = document.documentElement.clientHeight;
			var w = document.documentElement.clientWidth;
			if (t<0) {
				t=0;
			};
			if(l<0){
				l=0;
			};
			if(t>h-50-calendar.clientHeight){
				t=h-50-calendar.clientHeight;
			};
			if(l>w-calendar.clientWidth){
				l=w-calendar.clientWidth;
			};
			calendar.style.top = t + 'px';
			calendar.style.left = l + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}

})()
