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