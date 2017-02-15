//日期转换
function fnChangeWeek(num){

	switch (num){
		case 1:
			return '星期一';
			break;
		case 2:
			return '星期二';
			break;
		case 3:
			return '星期三';
			break;
		case 4:
			return '星期四';
			break;
		case 5:
			return '星期五';
			break;
		case 6:
			return '星期六';
			break;
		case 0:
			return '星期日';
			break;
	}
	
}

//检测当前日期是否小于10
function fnLessTen(num,obj){
	if ( num < 10 ) {
		return obj.style.marginLeft = '-50px';
	}
}

//渲染当日备忘录
function fnMemo(Y,M,D,btn){
	var html = '';
	noteData.forEach(function(a,b){
		if ( Y == a.sj[0] && (M+1) == a.sj[1] && D == a.sj[2] ) {
			var n = a.noteTitle.length;

			btn.index = b;
			
			for (var i = 0; i < a.noteTitle.length; i++) {
				html += '<li data-note-date="'+b+'" data-note-num="'+i+'"><span>'+(i+1)+'</span><p>'+a.noteTitle[i]+'</p></li>'
			}

			if ( n < 4 ) {
				for (var i = 0; i < (4 - n); i++) {
					html += '<li><span></span><p></p></li>';
				}
			}
		}
	})

	if ( !html ) {
		for (var i = 0; i < 4; i++) {
			html += '<li><span></span><p></p></li>';
		}
	}
	
	return html;
}