init();
function init(){
    console.log(initTodoList);
    //undefined   调用函数时，还没进行赋值,只是变量声明提升
    initTodoList;
}
var initTodoList = (function(){
    var showInput = document.getElementsByClassName('j-show-input')[0],
        inputWrap = document.getElementsByClassName('input-wrap')[0],
        addBtn = inputWrap.getElementsByClassName('add-btn')[0],
        inputContent = inputWrap.getElementsByClassName('input-content')[0],
        oUl = document.getElementsByClassName('list-content')[0],
        showStatus = false,
        curIdx = null,
        addText = 'add';
        addEvent('click', showInput, function(){
            var oItems = oUl.getElementsByClassName('list-item');
            if(!!showStatus){
                inputShow('close');
            }else{
                inputShow('open');
            }
            addActive(oItems);
        });
        addEvent('click', addBtn, function(e){
            var e = e ||window.event,
                oItems =oUl.getElementsByClassName('list-item'),
                inpVal = inputContent.value,
                pText;  
            if(inpVal <= 0){
                return ;
            }
            
            
            if(addText === 'edit'){
                pText = elemChildren(oItems[curIdx])[0]
                pText.innerText = inpVal;
                
            }else if(addText === 'add'){
                for(var i = 0; i < oItems.length; i++){
                    if(inpVal === elemChildren(oItems[i])[0].innerText){
                        alert('项目已存在');
                        inputShow('close');
                        return ;
                    }
                }
                var oLi =document.createElement('li');
                oLi.className = 'list-item';
                oLi.innerHTML = templa(inpVal);
                oUl.appendChild(oLi);
                
            }
            
            inputShow('close');
            addActive(oItems);
        });
        addEvent('click', oUl, function(e){
            var e = e || window.event,
                target = e.target || e.srcElement,
                tarParent = elementParent(target, 2),
                tarClassName = target.className,
                oItems = oUl.getElementsByClassName('list-item'),
                pText = elemChildren(tarParent)[0].innerText,
                tarIdx = Array.prototype.indexOf.call(oItems, tarParent);
                
            curIdx = tarIdx; 
            if(tarClassName === 'edit-btn fa fa-edit'){
                addActive(oItems, curIdx);
                inputShow('open');
                addBtn.innerText = '编辑第' + (tarIdx + 1) + '项';
                inputContent.value = pText;
                addText = 'edit';
                
            }else{
                tarParent.remove();
            }
        })

        function addActive(elem, index){
            var len = elem.length,
                item;
            for(var i = 0; i < elem.length; i++){
                item = elem[i];
                item.className = 'list-item';
            }
            if(!!index){
                elem[index].className += ' active';
            }
        }

        function templa(text){
            return (
                '<p class="item-text">'+ text +'</p>'+
                '<div class="btn-group">'+
                    '<a href="javascript:;" class="edit-btn fa fa-edit"></a>'+
                    '<a href="javascript:;" class="delete-btn fa fa-times"></a>'+
                '</div>'
            )
        }

        function inputShow(state){
            if(state === 'open'){
                inputWrap.style.display = 'block';
                showStatus = true;
            }else if(state === 'close'){
                inputWrap.style.display = 'none';
                showStatus = false;
                inputContent.value = '';
                addBtn.innerText = '增加项目';
                addText = 'add';
            }
        }
})();