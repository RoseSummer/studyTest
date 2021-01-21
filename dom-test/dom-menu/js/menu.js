
    window.onload = function(){
        init();
    }
    function init(){
        initMenu();
    }
    var initMenu = (function(){
        var oMenu = document.getElementsByClassName('menu')[0],
            wrap = document.getElementsByClassName('wrapper')[0],
            oMenuItems = document.getElementsByClassName('menu-item'),
            cateParts = document.getElementsByClassName('cate-part'),
            catePop = document.getElementsByClassName('cate-pop')[0],
            wrapper = document.getElementsByClassName('wrapper')[0],
            mousePos = [],
            oMenuItemsLen = oMenuItems.length,
            menuItem,
            partItem,
            toDelay,
            t = null,
            isSub = false,
            isFirst = true;

        addEvent('mouseenter', oMenu, function(){
            addEvent('mousemove',oMenu, mouseMove);
        });

        addEvent('mouseleave', wrapper, mouseHide);

        
        for(var i = 0; i < oMenuItemsLen; i++){
            menuItem = oMenuItems[i];
            addEvent('mouseenter', menuItem, mouseItemShow);
        }
       
        addEvent('mouseenter',catePop, function(){
            isSub = true;
        })
        addEvent('mouseleaver',catePop, function(){
            isSub = false;
        })
        function mouseItemShow(e){
            var e = e || wondow.event,
                tar = e.target || e.srcElement,
                tarIdx = Array.prototype.indexOf.call(oMenuItems, tar),
                mouseLen = mousePos.length,
                curPos = mousePos[mouseLen -1] || {x:0,y:0},
                lastPos = mousePos[mouseLen -2] || {x:0,y:0};
                console.log(this)
            console.log(mousePos, isFirst, toDelay, 111111)
            
            toDelay =  doTime(curPos, lastPos);
            if(t){
                clearTimeout(t);
            }
            if(!isFirst){
                if(toDelay){

                    t = setTimeout(function(){
                        if(isSub){
                            return;
                        }
                        addActive(tarIdx);
                        t = null;
                    },300)
                }else{

                    addActive(tarIdx);
                }
            }else{
                addActive(tarIdx);
                isFirst = false;
            }
            catePop.className = 'cate-pop';
        }
    
        function addActive(index){
            removeActive();
            oMenuItems[index].className +=' active';
            cateParts[index].className +=' cur';
        }
    
        function removeActive(){
            for(var i = 0; i < oMenuItemsLen; i++){
                menuItem = oMenuItems[i];
                partItem = cateParts[i];
                menuItem.className = 'menu-item';
                partItem.className = 'cate-part';
            }
        }
    
        function mouseHide(e){
            var e = e || window.event;
            catePop.className = 'cate-pop hide';

            removeActive();
            removeEvent('mousemove', document, mouseMove)
        }
        function mouseMove(e){
            var e = e || window.event;
            mousePos.push({
                x: pagePos(e).X,
                y: pagePos(e).Y
            })
            if(mousePos.length >= 3){
                mousePos.shift();
            }
        }
        function doTime(curPos, lastPos){
            var oLeftTop = {
                x: parseInt(getStyles(wrap,'margin-left')) + parseInt(getStyles(oMenu, 'width')),
                y: parseInt(getStyles(wrap,'margin-top'))
            },
            oLeftBottom = {
                x: parseInt(getStyles(wrap,'margin-left')) + parseInt(getStyles(oMenu, 'width')),
                y: parseInt(getStyles(wrap,'margin-top')) + parseInt(getStyles(oMenu, 'height'))
            };
            console.log(oLeftTop,oLeftBottom,curPos,lastPos)
            return pointInTriangle({
                curPos: curPos,
                lastPos: lastPos,
                oLeftTop:oLeftTop,
                oLeftBottom: oLeftBottom
            })
        }
    });
    
