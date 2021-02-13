/*

Usage
1. Include file sliding-nav.js before tag</body> in a HTML file.

<script src="/path/to/sliding-nav.js"></script>

2. Use class name sliding-nav in a navigation bar element，and use .active for a selected menu item.
3. Use following attributes to change its color,radius and height:sn-color, sn-radius,sn-height. (if no these attributes, default settings following will be used)

<ul class="nav sliding-nav" sn-color="#F00" sn-radius="0px" sn-height="3px">
    <li class="active">menu-item 1</li>
    <li>menu-item 2</li>
    <li>menu-item 3</li>
<ul>     

使用方法
1、在</body>标记结束前，引用sliding-nav.js文件
2、在需要滑动条的菜单容器上加类名 sliding-nav，当前项使用类名：active
3、使用属性来定定外观:sn-color="颜色" sn-radius="圆度" sn-height="高度"


<script src="/path/to/sliding-nav.js"></script>
<ul class="nav sliding-nav" sn-color="#F00" sn-radius="0px" sn-height="3px">
    <li class="active">菜单项1</li>
    <li>菜单项2</li>
    <li>菜单项3</li>
<ul>
    
Sliding Navigation Bar By yan,ZHANG 
Mailto: 26959368@qq.com
2020.02.06
*/


window.onload = function() {
    init();
};

function bind(elem, ev, callback) {
    if (document.all) {
        elem.attachEvent("on" + ev, callback);
    } else {
        elem.addEventListener(ev, callback, false);
    }
}

function unbind(elem, ev, callback) {
    if (typeof(callback) == "function") {
        if (document.all) {
            elem.detachEvent("on" + ev, callback);
        } else {
            elem.removeEventListener(ev, callback, false);
        }
    } else {
        if (document.all) {
            elem.detachEvent("on" + ev);
        } else {
            elem.removeEventListener(ev, false);
        }
    }
}

function hover(elem, overCallback, outCallback) { //实现hover事件
    var isHover = false; //判断是否悬浮在上方
    var preOvTime = new Date().getTime(); //上次悬浮时间
    function over(e) {
        var curOvTime = new Date().getTime();
        isHover = true; //处于over状态
        if (curOvTime - preOvTime > 10) { //时间间隔超过10毫秒，认为鼠标完成了mouseout事件
            overCallback && overCallback(e, elem);
        }
        preOvTime = curOvTime;
    }

    function out(e) {
        var curOvTime = new Date().getTime();
        preOvTime = curOvTime;
        isHover = false;
        setTimeout(function() {
            if (!isHover) {
                outCallback && outCallback(e, elem);
            }
        }, 10);
    }
    bind(elem, "mouseover", over);
    bind(elem, "mouseout", out);
};




function init() {

    var navs = document.getElementsByClassName('sliding-nav');

    for (var i = 0; i < navs.length; i++) {


        //创建一个DIV与当前导航竖向对齐
        var indi = document.createElement("div");
        indi.id = "slna-indicator"

        indi.style.borderRadius = navs[i].getAttribute("sn-radius") || "0px"
        indi.style.height = navs[i].getAttribute("sn-height") || "3px"
        indi.style.backgroundColor = navs[i].getAttribute("sn-color") || "#F00"

        indi.style.position = "absolute"
        indi.style.transition = "0.5s"

        //查找当前子菜单项,如果有类名active或者是selected就视为当前项，如果没有使用第1项
        var selected = navs[i].getElementsByClassName('active')
        if (selected.length == 0) {
            selected = navs[i].getElementsByClassName('selected')
        }
        if (selected.length == 0) {
            selected = navs[i].children
        }

        if (selected.length == 0) {
            throw Error('Sorry, Navigation bar has no item at all!');
        }

        selected = selected[0];

        indi.style.width = selected.offsetWidth + "px";
        indi.style.top = selected.offsetHeight + "px";
        indi.style.left = selected.offsetLeft + "px";
        navs[i].parentElement.insertBefore(indi, navs[i]);

        for (var j = 0; j < navs[i].children.length; j++) {

            hover(navs[i].children[j], function(e, elem) {

                indi.style.width = elem.offsetWidth + "px";
                indi.style.left = elem.offsetLeft + "px";

            });

            //移出导航就恢复默认
            hover(navs[i], null, function(e, elem) {
                indi.style.width = selected.offsetWidth + "px";
                indi.style.left = selected.offsetLeft + "px";
            });

        }




    }

}