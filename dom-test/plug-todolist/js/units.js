
// 绑定事件兼容函数
function addEvent(type, elem, fn){
    if(elem.addEventListener){
        elem.addEventListener(type, fn, false)
    }else if(elem.attachEvent){
        elem.attachEvent('on' + type,function(){
            fn.call(elem)
        })
    }else{
        elem['on' + type] = fn;
    }
}

// 获取元素的第n层父级元素
function elementParent(elem, n){
    var type = typeof(n);
    if(type === 'undefined'){
        return elem.parentNode;
    }
    if(n < 0 || type !== 'number'){
        return null;
    }
    while(n){
        if(elem.nodeName !== 'HTML'){
            elem= elem.parentNode;
        }
        n--;
    }
    return elem;
}

//查找子元素节点
function elemChildren(elem){
    var childs = elem.childNodes,
        len = childs.length,
        temp = {
            length: 0,
            push: Array.prototype.push,
            splice: Array.prototype.splice
        },
        item;
        for(var i = 0; i < len; i++){
            item = childs[i];
            if(item.nodeType === 1){
                temp.push(item)
            }
        }
    return temp;
}