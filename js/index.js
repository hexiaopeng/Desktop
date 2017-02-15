window.onload = function(){
	
	var calendar = document.getElementById('calendar'); //日历主框架
	var dayView = calendar.getElementsByClassName('day-view')[0]; //单页框架
	var solar = dayView.getElementsByClassName('solar')[0]; //阳历
	var lunar = dayView.getElementsByClassName('lunar')[0]; //阴历+日历
	var yearsDayTitle = solar.getElementsByClassName('yearsDay-title')[0]; //阳历标题
	var jumpToday = solar.getElementsByClassName('jump-today')[0]; //跳转今天
	var viewToggle = document.getElementById('view-toggle'); //日月切换
		viewToggle.status = 'day';
	var prev = solar.getElementsByClassName('prev')[0]; //上一日
	var next = solar.getElementsByClassName('next')[0]; //下一日
	var numberMain = solar.getElementsByClassName('main')[0]; //中间日期信息
	var numberMainLis = numberMain.getElementsByTagName('li'); //日期动画li
	var solarImg1 = numberMainLis[0].getElementsByTagName('img')[0];
	var solarWeek1 = numberMainLis[0].getElementsByClassName('week')[0];
	var solarImg2 = numberMainLis[1].getElementsByTagName('img')[0];
	var solarWeek2 = numberMainLis[1].getElementsByClassName('week')[0];
	
	var lunar = dayView.getElementsByClassName('lunar')[0]; //农历
	var lunarTitle = dayView.getElementsByClassName('title')[0]; //农历标题
	var lunarNote = lunar.getElementsByClassName('note')[0];
	
	var noteBtn = document.getElementById('noteBtn'); //添加备忘录
		noteBtn.status = 'add'
	var closeNote = lunar.getElementsByClassName('close-note')[0]; //关闭备忘录
	var saveNote = lunar.getElementsByClassName('save-note')[0]; //保存备忘录
	
	var editTitle = lunar.getElementsByClassName('edit-title')[0]; //编辑标题
	var editContent = lunar.getElementsByClassName('edit-content')[0]; //编辑内容
	
	var noteDetails = lunar.getElementsByClassName('note-details')[0]; //备忘录详情
		noteDetails.onOff = false;
	
	var DetailsTitle = noteDetails.getElementsByClassName('title')[0];
	var DetailsContent = noteDetails.getElementsByClassName('details')[0];
	
//	var barBtn = document.getElementById('barBtn'); //月备忘录编辑
//		barBtn.status = 'small';
		
//	var monthView = solar.getElementsByClassName('month-view')[0]; //月视图
//	var monthViewUl = monthView.getElementsByTagName('ul')[0];
	
//	var bgMask = solar.getElementsByClassName('bg-mask')[0]; //背景图
	
	
	//获取当前日期
	var _date = new Date();
	var iY = _date.getFullYear();
	var iM = _date.getMonth();
	var iD = _date.getDate();
	var iW = _date.getDay();
	var tY = iY;
	var tM = iM;
	var tD = iD;
	var tW = iW;

	//一.渲染数据
	/*------------------------------------------------------------------------------*/
	//渲染阳历标题
	yearsDayTitle.innerHTML = iY + '.' + (iM + 1);
	
	//渲染阳历数据
	fnLessTen(iD,solarImg1);
	fnLessTen(iD,solarImg2);
	
	solarImg1.src = 'img/dayview/number/'+ iD +'.png';
	solarImg2.src = 'img/dayview/number/'+ iD +'.png';
	solarWeek1.innerHTML = fnChangeWeek(iW);
	solarWeek2.innerHTML = fnChangeWeek(iW);
	
	//渲染农历标题
	var lunarObj = switchLunar.solar2lunar(iY,iM+1,iD);
	lunarTitle.innerHTML = '农历&nbsp;&nbsp;' + lunarObj.IMonthCn + lunarObj.IDayCn;

	//渲染农历备忘录
	lunarNote.innerHTML = fnMemo(iY,iM,iD,noteBtn);
	var lunarNoteLis = lunarNote.getElementsByTagName('li');
	/*------------------------------------------------------------------------------*/
	
	
	
	//二.功能编辑
	/*------------------------------------------------------------------------------*/
	//1.添加备忘录
	noteBtn.onclick = function(){
		
		if ( this.status == 'add' ) {
			
			editTitle.style.display = 'block';
			editContent.style.display = 'block';
			this.className = 'save-note';
			this.style.display = 'block';
			this.innerHTML = '保存'
			this.status = 'save';
			
		} else if ( this.status == 'save' ) {
			if ( noteDetails.onOff ) {
				if ( editTitle.value == '' && editTitle.style.display == 'block' ) {
					if ( confirm('无标题是否关闭编辑窗口') ) {
	
						editTitle.style.display = '';
						editContent.style.display = '';
						closeNote.style.display = 'block';
						this.className = 'add-note';
						this.innerHTML = '';
						this.status = 'add';
						this.style.display = 'none';
						
					}
				} else {
					
					if ( editTitle.style.display == 'block' ) {
						noteData[this.noteDate].noteTitle[this.noteNum] = editTitle.value;
						DetailsTitle.innerHTML = editTitle.value;
					}
					
					if ( editContent.style.display == 'block' ) {
						noteData[this.noteDate].noteContent[this.noteNum] = editContent.value;
						DetailsContent.innerHTML = editContent.value;
					}
					
					lunarNote.innerHTML = fnMemo(iY,iM,iD,noteBtn);
					lunarNoteLis = lunarNote.getElementsByTagName('li');
					
					for (var i = 0; i < lunarNoteLis.length; i++) {
						fn(i);
					}
					
					this.className = 'add-note';
					this.innerHTML = '';
					this.status = 'add';
					this.style.display = 'none';
					closeNote.style.display = 'block';
					
					editTitle.value = '';
					editContent.value = '';
					editTitle.style.display = '';
					editContent.style.display = '';
					
				}
				
			} else{
				if ( editTitle.value == '' ) {
					
					if ( confirm('无标题是否关闭编辑窗口') ) {
						editTitle.style.display = '';
						editContent.style.display = '';
						this.className = 'add-note';
						this.innerHTML = '';
						this.status = 'add';
						this.style.display = 'block';

					} else {
						editTitle.style.display = 'block';
						editContent.style.display = 'block';
						return true;
					}
				} else {

					this.className = 'add-note';
					this.innerHTML = '';
					this.status = 'add';

					if ( this.index ) {
						noteData[this.index].noteTitle.push(editTitle.value);
						noteData[this.index].noteContent.push(editContent.value);
					} else {
						noteData.push({
							noteContent : [editContent.value],
							noteTitle : [editTitle.value],
							sj : [iY,iM+1,iD]
						})
					}

					lunarNote.innerHTML = fnMemo(iY,iM,iD,noteBtn);
					lunarNoteLis = lunarNote.getElementsByTagName('li');
					
					for (var i = 0; i < lunarNoteLis.length; i++) {
						fn(i);
					}
					
					editTitle.value = '';
					editContent.value = '';
					editTitle.style.display = '';
					editContent.style.display = '';
				}

			}
			
		}
		
	}
	
	//2.备忘录编辑
	for (var i = 0; i < lunarNoteLis.length; i++) {
		fn(i);
	}
	function fn(n){
		lunarNoteLis[n].ondblclick = function(){
			
			var thisP = this.getElementsByTagName('p')[0].innerHTML;
			var lis1P = lunarNoteLis[0].getElementsByTagName('p')[0].innerHTML;

			if ( thisP == '' && lis1P == '' ) {
				noteBtn.index = null;
				noteBtn.onclick();
				return;
			} else if ( thisP == '' && lis1P != '' ) {
				noteBtn.onclick();
				return;
			}
			
			noteBtn.noteNum = this.getAttribute('data-note-num');
			noteBtn.noteDate = this.getAttribute('data-note-date');
			noteBtn.style.display = 'none';

			var _this = this;
			
			move (noteDetails,{top:0},100,'easeIn',function(){
				
				DetailsTitle.innerHTML = noteData[_this.getAttribute('data-note-date')].noteTitle[_this.getAttribute('data-note-num')];
				DetailsContent.innerHTML = noteData[_this.getAttribute('data-note-date')].noteContent[_this.getAttribute('data-note-num')];
				
				DetailsTitle.ondblclick = function(){
					editTitle.style.display = 'block';
					editTitle.value = this.innerHTML;
					closeNote.style.display = 'none';
					noteBtn.style.display = 'block';
					noteBtn.className = 'save-note';
					noteBtn.innerHTML = '保存'
					noteBtn.status = 'save';
					noteDetails.onOff = true;
				}
				DetailsContent.ondblclick = function(){
					editContent.style.display = 'block';
					editContent.value = this.innerHTML;
					closeNote.style.display = 'none';
					noteBtn.style.display = 'block';
					noteBtn.className = 'save-note';
					noteBtn.innerHTML = '保存'
					noteBtn.status = 'save';
					noteDetails.onOff = true;
				}
				
				closeNote.onclick = function(){
					move (noteDetails,{top:-154},100,'easeIn',function(){
						noteBtn.style.display = '';
						noteBtn.className = 'add-note';
						noteBtn.innerHTML = '';
					});
				}
				
			});
			
			
		}
	};
	
	//3.左右切换/跳转到今天
	prev.onclick = function(){
		
		if ( this.onOff ) {
			return;
		}
		this.onOff = true;
		
		if ( noteBtn.status == 'save' ) {
			if ( noteBtn.onclick() ) {
				this.onOff = false;
				return;
			}
		}
		move(noteDetails,{top:-154},200,'easeIn');
		noteBtn.style.display = 'block';
		noteBtn.className = 'add-note';
		
		_date.setDate(iD - 1);
		iY = _date.getFullYear();
		iM = _date.getMonth();
		iD = _date.getDate();
		iW = _date.getDay();
		
		numberMain.style.left = '-338px';
		
		solarImg1.src = 'img/dayview/number/'+iD+'.png';
		solarWeek1.innerHTML = fnChangeWeek(iW);
		
		move(numberMain,{left:0},500,'easeIn',function(){
			
			solarImg2.src = solarImg1.src;
			solarWeek2.innerHTML = solarWeek1.innerHTML;;
			
			//渲染阳历
			yearsDayTitle.innerHTML = iY + '.' + (iM + 1);
			
			//渲染农历标题
			var lunarObj = switchLunar.solar2lunar(iY,iM+1,iD);
			lunarTitle.innerHTML = '农历&nbsp;&nbsp;' + lunarObj.IMonthCn + lunarObj.IDayCn;

			//渲染农历备忘录
			lunarNote.innerHTML = fnMemo(iY,iM,iD,noteBtn);
			lunarNoteLis = lunarNote.getElementsByTagName('li');
			
			for (var i = 0; i < lunarNoteLis.length; i++) {
				fn(i);
			}
			
			if ( iY != tY || iM != tM || iD != tD ) {
				jumpToday.style.display = 'block';
			}
			
			prev.onOff = false;
			
		})
		
	}
	
	next.onclick = function(){
		
		if ( this.onOff ) {
			return;
		}
		this.onOff = true;
		
		if ( noteBtn.status == 'save' ) {
			if ( noteBtn.onclick() ) {
				this.onOff = false;
				return;
			}
		}
		move(noteDetails,{top:-154},200,'easeIn');
		noteBtn.style.display = 'block';
		noteBtn.className = 'add-note';
		
		_date.setDate(iD + 1);
		iY = _date.getFullYear();
		iM = _date.getMonth();
		iD = _date.getDate();
		iW = _date.getDay();
		
		solarImg2.src = 'img/dayview/number/'+iD+'.png';
		solarWeek2.innerHTML = fnChangeWeek(iW);
		
		move(numberMain,{left:-338},500,'easeIn',function(){
			
			solarImg1.src = solarImg2.src;
			solarWeek1.innerHTML = solarWeek2.innerHTML;
			numberMain.style.left = 0;
			
			//渲染阳历
			yearsDayTitle.innerHTML = iY + '.' + (iM + 1);
			
			//渲染农历标题
			var lunarObj = switchLunar.solar2lunar(iY,iM+1,iD);
			lunarTitle.innerHTML = '农历&nbsp;&nbsp;' + lunarObj.IMonthCn + lunarObj.IDayCn;

			//渲染农历备忘录
			lunarNote.innerHTML = fnMemo(iY,iM,iD,noteBtn);
			lunarNoteLis = lunarNote.getElementsByTagName('li');
			
			for (var i = 0; i < lunarNoteLis.length; i++) {
				fn(i);
			}

			if ( iY != tY || iM != tM || iD != tD ) {
				jumpToday.style.display = 'block';
			}

			next.onOff = false;
			
		})
		
	}
	
	jumpToday.onclick = function(){
		
		if ( noteBtn.status == 'save' ) {
			if ( noteBtn.onclick() ) {
				return;
			}
		}
		move(noteDetails,{top:-154},200,'easeIn');
		noteBtn.style.display = 'block';
		noteBtn.className = 'add-note';

		//渲染阳历标题
		yearsDayTitle.innerHTML = tY + '.' + (tM + 1);
		
		//渲染阳历数据
		fnLessTen(tD,solarImg1);
		fnLessTen(tD,solarImg2);
		
		solarImg1.src = 'img/dayview/number/'+ tD +'.png';
		solarImg2.src = 'img/dayview/number/'+ tD +'.png';
		solarWeek1.innerHTML = fnChangeWeek(tW);
		solarWeek2.innerHTML = fnChangeWeek(tW);
		
		//渲染农历标题
		var lunarObj = switchLunar.solar2lunar(tY,tM+1,iD);
		lunarTitle.innerHTML = '农历&nbsp;&nbsp;' + lunarObj.IMonthCn + lunarObj.IDayCn;
	
		//渲染农历备忘录
		lunarNote.innerHTML = fnMemo(tY,tM,tD,noteBtn);
		lunarNoteLis = lunarNote.getElementsByTagName('li');
		
		for (var i = 0; i < lunarNoteLis.length; i++) {
			fn(i);
		}
		
		this.style.display = 'none';
		
	}


	//4.查看当月视图
//	viewToggle.onclick = function(){
//		
//		if ( this.status == 'day' ) {
//			
//			this.status = 'month';
//			this.className = 'view-month';
//			lunar.style.bottom = 0;
//			lunar.style.height = '100px';
//			barBtn.className = 'bar-up';
//			noteBtn.style.top = '14px';
//			lunarNote.style.height = '60px';
//			bgMask.style.height = '285px';
//			bgMask.style.zIndex = '997';
//			monthView.style.display = 'block';
//			
//		} else if ( this.status == 'month' ) {
//			
//			this.status = 'day';
//			this.className = 'view-day';
//			
//		}
//		
//	}
	
	//5.放大备忘录
//	barBtn.onclick = function(){
		
//		if ( this.status == 'small' ) {
//			
//			this.status = 'big';
//			this.className = 'bar-down';
//			lunar.style.height = '270px';
//			lunarNote.style.height = '230px';
//			
//		} else if ( this.status == 'big' ) {
//			
//			this.status = 'small';
//			this.className = 'bar-up';
//			lunar.style.height = '100px';
//			lunarNote.style.height = '';
//			
//		}
//		
//	}

}