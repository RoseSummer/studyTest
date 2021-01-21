
// 绑定事件兼容函数
function addEvent(type, elem, fn){
    if(elem.addEventListener){
        elem.addEventListener(type, fn, false)
    }else if(elem.attachEvent){
        elem.attachEvent('on' + type, function(){
            handle.call(elem)
        })
    }else{
        elem['on' + type] = fn;
    }
}


// 滚动条距离顶部距离兼容函数
function getScrollOffset(){
    if(window.pageYOffset){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else{
        return {
            top: document.body.scrollTop + document.documentElement.scrollTop,
            left: document.body.scrollLeft + document.documentElement.scrollLeft

        }
    }
}

// 窗口可视区域兼容函数  窗口宽高
function getViewportSize(){
    if(window.innerHeight){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else{
        if(document.compatMode === 'BackCompat'){
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        }else{
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHight
            }
        }
    }
}

// 文档宽高兼容函数
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