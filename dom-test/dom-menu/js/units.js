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

function removeEvent(type, elem, fn){
    if(elem.removeEventListener){
        elem.removeEventListener(type, fn, false);
    }else if(elem.detachEvent){
        elem.detachEvent('on' + type, fn)
    }else{
        elem['on' + type] = null;
    }
}
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
function pagePos(e){
    var oLeft = getScrollOffset().left,
        oTop = getScrollOffset().top,
        cLeft = document.documentElement.clientLeft || 0,
        cTop = document.documentElement.clientTop || 0;
        return {
            X: e.clientX + oLeft - cLeft,
            Y: e.clientY + oTop -cTop
        }
}

function getStyles(elem, prop){
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
var pointInTriangle = (function(){
    function vec(a,b){
        return {
            x: b.x - a.x,
            y: b.y - a.y
        }
    }
    
    function vecProduct(v1,v2){
        return v1.x * v2.y - v2.x * v1.y;
    }
    
    function sameSymbols(a, b){
        return ( a ^ b) >= 0;
    }
    
    return function(opt){
        var PA = vec(opt.curPos, opt.lastPos),
            PB = vec(opt.curPos, opt.oLeftTop),
            PC = vec(opt.curPos, opt.oLeftBottom),
            R1 = vecProduct(PA, PB),
            R2 = vecProduct(PB, PC),
            R3 = vecProduct(PC, PA);
        return sameSymbols(R1, R2) && sameSymbols(R2, R3);
    }
})()
