;(function(doc){
    var oLeft,
        oTop,
        _self;
    var initdrag = function(opt){
        this.dragTitle = doc.getElementsByClassName(opt.title)[0];
        this.wrapper = doc.getElementsByClassName(opt.wrapper)[0];
        _self = this;
    }
    initdrag.prototype = {
        bindEvent(){
            addEvent('mousedown', _self.dragTitle, this.mouseDown);
        },
        mouseDown (e){
            var e = e || window.event;
                oLeft = pagePos(e).X - parseInt(getStyle(_self.wrapper, 'left')),
                oTop = pagePos(e).Y - parseInt(getStyle(_self.wrapper, 'top'));  
            addEvent('mousemove', document, _self.mouseMove);
            addEvent('mouseup', document, _self.mouseUp);
        },
        mouseMove (e){
            var e = e || window.event,
                viewWidth = getViewportSize().width -parseInt(getStyle(_self.wrapper,'width')),
                viewHeight = getViewportSize().height -parseInt(getStyle(_self.wrapper,'height')),
                moveLeft = pagePos(e).X - oLeft,
                moveTop = pagePos(e).Y - oTop,
                nLeft,
                nTop;
            if(moveLeft <= 0){
                nLeft = 0;
            }else if(moveLeft >= viewWidth){
                nLleft = viewWidth + 'px';
            }else{
                nLeft = moveLeft +'px';
            }
            _self.wrapper.style.left = nLeft;

            if(moveTop <= 0){
                nTop = 0;
            }else if(moveTop >= viewHeight){
                nTop = viewHeight + 'px';
            }else{
                nTop = moveTop + 'px';
            }
            
            _self.wrapper.style.top =nTop;
        },
        mouseUp (e){
            var e = e || window.event;
            removeEvent('mousemove', document, _self.mouseMove);
            removeEvent('mouseup', document, _self.mouseUp);
        }
    }
    window.initdrag = initdrag;
})(document)

var i = new initdrag({
    title: 'drag-title',
    wrapper: 'wrapper'
}).bindEvent();