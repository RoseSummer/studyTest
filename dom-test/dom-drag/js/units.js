
//绑定事件兼容函数
function addEvent(type, elem, fn){
    if(elem.addEventListener){
        elem.addEventListener(type, fn, false);
    }else if(elem.attachEvent){
        elem.attachEvent('on' + type, function(){
            fn.call(elem);
        })
    }else{
        elem['on' + type] = fn;
    }
}

//解绑事件兼容函数
function removeEvent(type, elem, fn){
    if(elem.removeEventListener){
        elem.removeEventListener(type, fn, false);
    }else if(elem.detachEvent){
        elem.detachEvent('on' + type, function(){
            fn.call(elem);
        })
    }else{
        elem['on' + type] = null;
    }
}

//获取滚动条距离兼容函数
function getScrollOffset(){
    if(window.pageYOffset){
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else{
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//获取可视区域宽高兼容函数
function getViewportSize(){
    if(window.innerWidth){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === 'BackCompat'){
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        }
    }else{
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight

        }
    }
}

//获取文档宽高兼容函数
function getScrollSize(){
    if(document.body.scrollWidth){
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    }else{
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}


//获取样式兼容函数
function getStyle(elem, prop){
    if(window.getComputedStyle){
        if(!!prop){
            return getComputedStyle(elem, null)[prop];
        }else{
            return getComputedStyle(elem, null);
        }
        
    }else{
        if(!!prop){
            return elem.currentStyle[prop];
        }else{
            return elem.currentStyle;
        }
    }
}

//获取鼠标点击的点的位置坐标兼容函数（同pageY）
function pagePos(e){
    var sLeft = getScrollOffset().left,
        sTop = getScrollOffset().top,
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;
    return {
        X: e.clientX + sLeft - cLeft,
        Y: e.clientY + sTop - cTop
    }
}

//阻止冒泡事件兼容
function cancelBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}

//取消默认行为兼容事件
function preventDefault(e){
    if(e.preventDefault){
        e.preventDefalut();
    }else if(e.returnValue){
        e.returnValue = false;
    }else{
        return false;
    }
}