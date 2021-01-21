//获取子元素节点，传参时返回对应节点，不传参时返回所有子元素节点
Element.prototype.elemChildren = function(n){
    var childs = this.childNodes,
        len = childs.length,
        type = typeof(n),
        temp = {
            "length": 0,
            "push": Array.prototype.push,
            "splice": Array.prototype.splice
        },
        item;
        for(var i = 0; i< len; i++){
            item = childs[i];
            if(item.nodeType === 1){
                temp.push(item)
            }
        }
        if(n !== undefined && type !== 'number'){
            return undefined;
        }
        temp = n === undefined ? temp : temp[n]
        return temp;
}

//寻找父元素节点，传参为要找的祖元素标签名称,不传参默认为父元素
Element.prototype.findParents= function(parent){
    var elem = this;
    while(elem){
        if(elem.nodeType === 1){
            elem = elem.parentNode;
        }
        if(elem.nodeName.toLowerCase() === parent || parent === undefined ){
            break;
        }
    }
    return elem;
}

//事件绑定函数兼容性
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

//阻止事件冒泡兼容函数
function cancelBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else if(e.cancelBubble){
        e.cancelBubble = true;
    }
}