function addEvent(type, elem, fn){
    if(elem.addEventListener){
        return elem.addEventListener(type, fn, false);
    }else if(elem.attachEvent){
        return elem.attachEvent('on' + type, function(){
            fn.call(elem);
        })
    }else{
        elem['on' + type] = fn;
    }
}

Element.prototype.childElement = function(){
    var list = this.childNodes,
        len = list.length,
        temp = {
            length: 0,
            push: Array.prototype.push,
            splice: Array.prototype.splice
        },
        item;
        for(var i = 0; i < len; i++){
            item = list[i];
            if(item.nodeType === 1){
                temp.push(item)
            }
        }
        return temp;
}
Element.prototype.previousElement = function(){
    if(this.previousElementSibling){
        return this.previousElementSibling
    }else{
        return this.previousSibling;
    }
}