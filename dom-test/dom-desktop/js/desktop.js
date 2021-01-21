;(function(node){
    var curIdx = 0,
        count = 0,
        startTime = 0,
        endTime = 0;
    var Desktop = function(){
        this.node = node;
        this.oUl = this.node.elemChildren(0);
        this.bindEvent();
        console.log(this.oUl);
    }
    Desktop.prototype = {
        bindEvent (){
            var _self = this;
            addEvent('click', this.oUl, function(e){
                var e = e || window.event,
                    tar = e.target || e.srcElement,
                    oItems = this.elemChildren(),
                    tarLi = tar.findParents('li'),
                    index = Array.prototype.indexOf.call(oItems, tarLi);
                    cancelBubble(e);//阻止事件冒泡
                    console.log(index, curIdx)
                    // count = 1;
                    
                    // endTime = 0;
                    // if(curIdx === index){
                    //     count ++;
                    // }
                    oItems[curIdx].className = 'list-item';
                    curIdx = index;
                    oItems[index].className += ' active';
                    
                    // if(count === 1){
                    //     startTime = new Date().getTime();
                    // }
                    // if(count === 2){
                    //     endTime = new Date().getTime();
                    // }
                    // console.log(!!endTime)
                    // if(endTime-startTime < 100 && endTime){
                    //     console.log(1)
                    // }
                    
                    // console.log(endTime,startTime,endTime-startTime)
                    // //startTime = endTime;

            });
            addEvent('click', document, function(e){
                var oItems = _self.oUl.elemChildren();
                oItems[curIdx].className = 'list-item';
            })

        }
    }
    new Desktop();
})(document.getElementsByClassName('wrapper')[0])