/**
 * Created by Administrator on 2017/1/18 0018.
 */
//获取id
var $=function (id) {return typeof id === 'string' ? document.getElementById(id) : id};
//获取tagClass
var $$=function (tagName,oParent) {return (oParent||document).getElementsByTagName(tagName)};
//获取class
var $$$ = function (sClass, oParent) {
    var aClass = [],
        reClass = new RegExp("(\\s|^)" + sClass + "($|\\s)"),
        aElement = $$("*", oParent);
    for (var i = 0; i < aElement.length; i++)reClass.test(aElement[i].className) && aClass.push(aElement[i]);
    return aClass
};

var bookRack=function(){this.initialize()};

bookRack.prototype={
    //初始化
    initialize: function(){
        var _this=this;
        this.book=$('BookBig');
        this.bookList=$('BookList');
        this.bookimgLeft=$$$('BookBig_imgLeft',this.book)[0];
        this.bookimg=$$$('BookBig_img',this.book)[0];
        this.bookimgRight=$$$('BookBig_imgRight',this.book)[0];
        this.body=$$('body')[0];
        this.BookListSwitchover();
        this.styleChange();
        this.bookimg.onclick=function(){
        	window.open('book.html','_self')}
    },
    moveLeft: function(){
        var _this=this;
        for(var i=0;i<_this.selectList.length;i++){
            _this.selectList[i].style.transform='';
        }
        _this.bookimgRight.style.backgroundImage='url('+_this.bookimgSrc+')';
        this.bookimgRight.style.display='inline-block';
        move(this.bookimg,{transform:[0.965926,-0.258819,0.258819,0.965926,-500,1],opacity:0},300,'easeOut');
        move(this.bookimgRight,{transform:[1,0,0,1,0,1],opacity:1},300,'easeOut',function(){
            _this.bookimg.style='';
            _this.bookimg.style.backgroundImage='url('+_this.bookimgSrc+')';
            _this.bookimgRight.style='';
        })
    },
    moveRight: function(){
        var _this=this;
        for(var i=0;i<_this.selectList.length;i++){
            _this.selectList[i].style.transform='';
        }
        _this.bookimgLeft.style.backgroundImage='url('+_this.bookimgSrc+')';
        this.bookimgLeft.style.display='inline-block';
        move(this.bookimg,{transform:[0.965926,0.258819,-0.258819,0.965926,600,1],opacity:0},300,'easeOut');
        move(this.bookimgLeft,{transform:[1,0,0,1,0,1],opacity:1},300,'easeOut',function(){
            _this.bookimg.style='';
            _this.bookimg.style.backgroundImage='url('+_this.bookimgSrc+')';
            _this.bookimgLeft.style='';
        })
    },
    //图书切换
    BookListSwitchover: function(){
        var _this=this;
        this.BookSmallList=$$$('BookSmall_list')[0];
        this.BookBigList=$('BookBigList');
        this.leftBtn=$$$('BookBig_leftBtn',this.BookBigList)[0];
        this.rightBtn=$$$('BookBig_rightBtn',this.BookBigList)[0];
        this.selectList=$$('li',this.BookSmallList);
        this.bookimgList=$$('img',this.BookSmallList);
        var num=0;
        for(var i=0;i<this.selectList.length;i++){
            this.selectList[i].index=i;
            this.selectList[i].onclick=function(){
                num=this.index;
                    _this.bookimgSrc=_this.bookimgList[this.index].src;
                    if(this.index<_this.bookindex){
                        _this.moveRight();
                    }else if(this.index>_this.bookindex||_this.bookindex==undefined){
                        _this.moveLeft();
                    }
                    this.style.transform='scale(1.3)';
                    _this.bookindex=this.index;
            }
        }
        //左切换按钮
        this.leftBtn.addEventListener('click',function(){
            num--;
            if(num<0){
                num=0;
            }else{
                _this.bookimgSrc=_this.bookimgList[num].src;
                _this.moveLeft();
                _this.selectList[num].style.transform='scale(1.3)';
            }
            _this.bookindex=num;
        });
        //右切换按钮
        this.rightBtn.addEventListener('click',function(){
            num++;
            if(num>_this.selectList.length-1){
                num=_this.selectList.length-1
            }else{
                _this.bookimgSrc=_this.bookimgList[num].src;
                _this.moveRight();
                _this.selectList[num].style.transform='scale(1.3)';
            }
            _this.bookindex=num;
        });
    },
    //展示样式切换
    styleChange: function(){
        var _this=this;
        var styleChange=$('checkbox');
        var btn=$$('input',styleChange)[0];
        btn.onclick=function(){
            if(btn.checked){
                _this.book.style.display='none';
                _this.bookList.style.display='inline-block';
            }else{
                _this.book.style.display='inline-block';
                _this.bookList.style.display='none';
            }
        }
    },
    requestFullScreen:function(){
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
        /*function IaunchFullscreen(element){
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
         };*/
    }
};

window.onload=function(){
    var book=new bookRack()
};
