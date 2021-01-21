
var addBtn = document.getElementsByClassName('add-btn')[0],
    editBtn = document.getElementsByClassName('edit-btn')[0],
    deleteBtn = document.getElementsByClassName('delete-btn')[0],
    textInp = document.getElementsByClassName('text-input')[0],
    oUl = document.getElementsByTagName('ul')[0],
    item = '';



    addEvent('click', addBtn, function(){
        var e = e || window.event,
            tar = e.target || e.srcElement,
            btnText = tar.innerText,
            inpVal = textInp.value;
        if(!!inpVal){
            if(btnText === 'add'){
                item += '<li class="list-item">'+
                '<a href="javascript:;">'+
                    '<span>'+ inpVal +'</span>'+
                    '<button class="edit-btn">edit</button>'+
                    '<button class="delete-btn">delete</button>'+
                '</a>'+
            '</li>';
                oUl.innerHTML = item;
            }else{
                var i = Number(btnText.split(' ')[1]),
                oLi = oUl.getElementsByTagName('li'),
                oSpan = oLi[i].childElement()[0].childElement()[0];
                oSpan.innerText = inpVal;
                tar.innerText = 'add';
            }
            
            textInp.value = '';
        }
    }, false);

    addEvent('click', oUl, function(){
        var e = e || window.event,
            tar = e.target || e.srcElement,
            oLi = oUl.getElementsByTagName('li'),
            selectLi = tar.parentNode.parentNode,
            index = Array.prototype.indexOf.call(oLi, selectLi),
            text = tar.innerText,
            preTar = tar.previousElement();
            if(text === 'delete'){
                selectLi.remove();
            }else{
                textInp.value = preTar.innerText;
                addBtn.innerText = 'edit '+ (index + 1) +' item';
            }
            
    })

