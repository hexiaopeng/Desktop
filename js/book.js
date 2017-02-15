/**
 * Created by Administrator on 2017/2/8 0008.
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
var Book=function(){this.initialize()};

Book.prototype={
    initialize :function () {
        var _this=this;
        this.middle=$('header_middle');
        //获取头部显示列表
        this.fontIcon=$('iconBox');
        this.fontIcons=$$('div',this.fontIcon);
        //获取头部隐藏列表
        this.detail=$('iconBox_detail');
        this.details=$$$('details',this.detail);
        this.header();
        this.nav();
        this.sideToolBar();
        //滚轮到底加载文本
        window.onmousewheel=function () {
            if(document.body.scrollTop+document.documentElement.clientHeight==document.body.scrollHeight&&_this.page<data.length-1) {
                _this.page++;
                _this.contentFn(data[_this.page])
            }
            //章节选中颜色变化
            for(var i=0;i<li.length;i++){
                li[i].style.color='';
                li[_this.page].style.color='#ff5f5a';
            }
        };
        this.content.addEventListener('click',function(){_this.restoreFn()});
        //初始化加载文本
        if(location.search.split('=')[0]=='?section'){
            var arr=[];var arr2=[];
            for(var i=0;location.search.indexOf('=',i)!=-1;i=location.search.indexOf('=',i)+2){
                arr.push(location.search.indexOf('=',i))
            }
            for(var i=0;location.search.indexOf('&',i)!=-1;i=location.search.indexOf('&',i)+2){
                arr2.push(location.search.indexOf('&',i))
            }
            var t=location.search.substring(arr[0]+1,arr2[0]);
            _this.fontFamily=Number(location.search.substring(arr[1]+1,arr2[1]));
            _this.colorNum=Number(location.search.substring(arr[2]+1,arr2[2]));
            _this.size=Number(location.search.substring(arr[3]+1,arr2[3]));
            _this.width=Number(location.search.substring(arr[4]+1,arr2[4]));
            var Data = data[t];
            _this.contentFn(Data)
        }else{
            //初始化背景颜色
            _this.fontFamily=0;
            _this.size=18;
            _this.width=1000;
            _this.colorNum=0;
            var t=0;
            var Data = data[t];
            _this.contentFn(Data)
        }
        //加载页数
        this.page=t;
        //插入li目录
        var navList=$('nav_list');
        var nav_catalog=$$$('nav_catalog',navList)[0];
        var ul=$$('ul',nav_catalog)[0];
        for(var i=0;i<data.length;i++){
            var li=document.createElement('li');
            li.innerHTML=data[i].section;
            (li.onclick=function(){
                location.search='?section='+(arguments.callee.i+1)+'&fontfamily='+_this.fontFamily+'&bg='+_this.colorNum+'&fontsize='+_this.size+'&width='+_this.width;
                _this.page=arguments.callee.i;
            }).i=i;
            ul.appendChild(li);
        }
        //初始化章节列表选中颜色
        var li=$$('li',ul);
        for(var i=0;i<li.length;i++){
            li[this.page].style.color='#ff5f5a';
        }
    },
    header :function () {
        var _this=this;
        //获取文本
        this.body=$('text');
        this.head=$$$('header',this.body)[0];
        this.content=$$$('content',this.body)[0];
        this.section=$$('section',this.content);
        this.headerRight=$('header_right');
        //头部点击列表
        for(var i=0;i<this.fontIcons.length-1;i++){
            this.fontIcons[i].index=i;
            this.fontIcons[i].onoff=true;
            this.fontIcons[i].addEventListener('click',function(){
                var oThis=this;
                for(var i=0;i<_this.fontIcons.length-1;i++){
                    (function(i){
                        move(_this.details[i],{opacity:0},100,'linear',function(){_this.details[i].style.display=''})
                    })(i);
                }
                if(this.onoff){
                    for(var i=0;i<_this.fontIcons.length-1;i++){
                        _this.fontIcons[i].onoff=true;
                    }
                    _this.details[this.index].style.display='inline-block';
                    move(_this.details[this.index],{opacity:1},100,'linear');
                    this.onoff=false;
                }else{
                    move(_this.details[this.index],{opacity:0},100,'linear',function(){
                        _this.details[oThis.index].style.display=''});
                    this.onoff=true;
                }
            });
        }
        //字体切换
        var fonts=$$('li',this.details[0]);
        for(var i=0;i<fonts.length;i++){
            fonts[i].index=i;
            fonts[i].addEventListener('click',function(){
                _this.fontFamily=this.index;
                _this.content.style.fontFamily=this.title;
                for(var i=0;i<fonts.length;i++) {
                    fonts[i].style.color = '';
                }
                this.style.color='#ff5f5a';
            });
        }
        //背景颜色改变
        var color=$$('span',this.details[1]);
        for(var i=0;i<color.length;i++){
            color[i].index=i;
            color[i].onclick=function(){
                _this.colorNum=this.index;
                //清除选中效果
                for(var i=0;i<color.length;i++) {
                    color[i].className = 'bg_' + (i + 1);
                }
                this.className+=' bg_select';
                //改变背景颜色
                _this.content.className='content cColor'+(_this.colorNum+1);
                //改变文本颜色
                for(var i=0;i<_this.section.length;i++){
                    _this.section[i].className='content_section sColor'+(_this.colorNum+1);
                }
                //夜色模式
                if(_this.colorNum==color.length-1){
                    _this.head.className='header headColor';
                    _this.onav.className='nav navColor';
                    _this.side.className='side-toolbar sideColor';
                }else{
                    _this.head.className='header';
                    _this.onav.className='nav';
                    _this.side.className='side-toolbar';
                }
            }
        }
        //字体大小改变
        var fontSize=$$('span',this.details[2]);
        var fontP=$$('p',this.content);
        fontSize[0].addEventListener('click',function(){
            _this.size-=2;
            if(_this.size<12){_this.size=12}
            for(var i=0;i<fontP.length;i++){
                fontP[i].style.fontSize=_this.size+'px';
            }
            fontSize[1].innerHTML=_this.size;
        });
        fontSize[2].addEventListener('click',function(){
            _this.size+=2;
            if(_this.size>28){_this.size=28}
            for(var i=0;i<fontP.length;i++){
                fontP[i].style.fontSize=_this.size+'px';
            }
            fontSize[1].innerHTML=_this.size;
        });
        //文本宽度改变
        var fontWidth=$$('span',this.details[3]);
        fontWidth[0].addEventListener('click',function(){
            _this.width-=200;
            if(_this.width<400){_this.width=400}
            for(var i=0;i<_this.section.length;i++){
                _this.section[i].style.width=_this.width+'px';
            }
            fontWidth[1].innerHTML=_this.width;
        });
        fontWidth[2].addEventListener('click',function(){
            _this.width+=200;
            if(_this.width>1600){_this.width=1600}
            for(var i=0;i<_this.section.length;i++){
                _this.section[i].style.width=_this.width+'px';
            }
            fontWidth[1].innerHTML=_this.width;
        });
        //查找功能
        var search=$('search');
        var searchSelect=$('search_select');
        var close=$('search_close');
        var searchBtn=$$$('search_button',this.headerRight)[0];
        var SelectBtn=$$$('search_button',searchSelect);
        //查找文字
        searchBtn.addEventListener('click',function(){
            _this.str=search.value;
            _this.contentArr=_this.content.innerHTML.split(_this.str);
            if(_this.str){
                _this.content.innerHTML=_this.contentArr.join('<span style="background: #ff6668">'+_this.str+'</span>');
                //_this.content.innerHTML=_this.contentArr[0].join('<span style="background: #ff6668">'+str+'</span>');
                //_this.searchSelect.style.display='inline-block';
                //_this.searchBtn.style.display='none';
            }
            close.addEventListener('click',fnClose);
            close.addEventListener('click',textRecover);
        });
        //清除输入框内容
        close.onclick=fnClose;
        //清除输入框函数&&恢复文本函数
        function fnClose(){
            search.value='';
            this.style.display='none';
            move(search,{width:120},300,'easeOut')
        }
        function textRecover(){_this.content.innerHTML=_this.contentArr.join(_this.str);}
        //输入框内容改变显示
        search.oninput=function(){
            if(this.value){close.style.display='block'}else{close.style.display='none';textRecover()}
        };
        search.onfocus=function(){move(search,{width:160},300,'easeOut')};
        search.onblur=function(){if(!search.value){move(search,{width:120},300,'easeOut')}};
    },
    nav :function () {
        var _this=this;
        var CatalogueBtn=$('nav_catalogue');
        this.onav=$$$('nav',this.body)[0];
        var navList=$('nav_list');
        var list=$$('dt',navList);
        var listDetail=$$('dd',navList);
        var backBtn=$$$('nav_list_back',navList);
        var onOff=true;
        _this.content.addEventListener('click',function(){onOff=true});
        //侧边栏展开关闭
        CatalogueBtn.onclick=function () {
            if(onOff){
                move(_this.onav,{left:0},280,'easeOut',function(){
                    move(navList,{left:0},380,'easeOut')
                });
                onOff=false
            }else{
                move(_this.onav,{left:-200},280,'easeOut',function () {
                    move(navList,{left:-242},380,'easeIn')
                });
                onOff=true
            }
        };
        //侧边栏详情展开关闭
        for(var i=0;i<list.length;i++){
            //设置测边栏高度出现滚动条
            listDetail[i].style.height=document.documentElement.clientHeight-this.head.offsetHeight+'px';
            (list[i].onclick=function () {
                move(listDetail[arguments.callee.i],{marginLeft:0},280,'easeOut')
            }).i=i;
            (backBtn[i].onclick=function () {
                move(listDetail[arguments.callee.i],{marginLeft:-242},280,'easeOut')
            }).i=i;
        };
    },
    sideToolBar :function (){
        this.side=$$$('side-toolbar',this.body)[0];
        var BackTop=$('iconBackTop');
        BackTop.onclick=function(){window.scrollTo(0,0)}
    },
    restoreFn :function(){
        var _this=this;
        var nav=$$$('nav',this.body)[0];
        var navList=$('nav_list');
        var list=$$('dt',navList);
        var listDetail=$$('dd',navList);
        for(var i=0;i<_this.fontIcons.length-1;i++){
            this.fontIcons[i].onoff=true;
            (function(i){
                move(_this.details[i],{opacity:0},100,'linear',function(){_this.details[i].style.display=''})
            })(i);
        }
        move(nav,{left:-200},280,'easeOut',function () {
            move(navList,{left:-242},380,'easeIn')
        });
        for(var i=0;i<list.length;i++){
            move(listDetail[i],{marginLeft:-242},280,'easeOut')
        };
    },
    contentFn :function(data){
        var _this=this;
        var section=document.createElement('section');
        section.className='content_section sColor'+(_this.colorNum+1);
        this.content.appendChild(section);
        var title=document.createElement('h3');
        title.className='content_title';
        title.innerHTML=data.section;
        section.appendChild(title);
        var p=document.createElement('p');
        p.innerHTML=data.context;
        section.appendChild(p);

/************用刷新前保存的search渲染页面效果************************************************************************************/

        var color=$$('span',this.details[1]);
        for(var i=0;i<color.length;i++) {
            color[i].className = 'bg_' + (i + 1);
        }
        color[_this.colorNum].className+=' bg_select';
        //改变背景颜色
        _this.content.className='content cColor'+(_this.colorNum+1);
        //改变文本颜色
        for(var i=0;i<_this.section.length;i++){
            _this.section[i].className='content_section sColor'+(_this.colorNum+1);
        }
        //夜色模式
        if(_this.colorNum==color.length-1){
            _this.head.className='header headColor';
            _this.onav.className='nav navColor';
            _this.side.className='side-toolbar sideColor';
        }else{
            _this.head.className='header';
            _this.onav.className='nav';
            _this.side.className='side-toolbar';
        }

        var fonts=$$('li',this.details[0]);
        _this.content.style.fontFamily=fonts[this.fontFamily].title;
        fonts[_this.fontFamily].style.color='#ff5f5a';

        var fontSize=$$('span',this.details[2]);
        var fontP=$$('p',this.content);
        for(var i=0;i<fontP.length;i++){
            fontP[i].style.fontSize=_this.size+'px';
        }
        fontSize[1].innerHTML=_this.size;

        var fontWidth=$$('span',this.details[3]);
        for(var i=0;i<_this.section.length;i++){
            _this.section[i].style.width=_this.width+'px';
        }
        fontWidth[1].innerHTML=_this.width;
    }
};

window.onload=function(){
    var head=new Book();
};