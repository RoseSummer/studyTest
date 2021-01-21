;(function(node){
    var showIpt = false,
        addText = 'add',
        curIdx = 0,
    ToDolist = function(){
        this.node = node;
        this.config = this.getConfig();
        this.defalutConfig = {
            "showInput": "",
            "inputWrap": "",
            "inputContent": "",
            "listContent": "",
            "addBtn": "",
        }
        
        for(var key in this.defalutConfig){
            if(!this.config.hasOwnProperty(key)){
                console.log(errorInfo(key));
                return;
            }
        }
        this.setConfig();
        this.bindEvent();
    }
    ToDolist.prototype = {
        getConfig (){
            return JSON.parse(this.node.getAttribute('data-config'));
        },
        setConfig (){
            var node = this.node,
            config = this.config;
            this.addBtn = document.getElementsByClassName(config.addBtn)[0];
            this.showInput = document.getElementsByClassName(config.showInput)[0];
            this.inputWrap = document.getElementsByClassName(config.inputWrap)[0];
            this.inputContent = document.getElementsByClassName(config.inputContent)[0];
            this.oUl = document.getElementsByClassName(config.listContent)[0];
        },
        bindEvent (){
            var _self = this;
            addEvent('click',this.showInput,function(){
                _self.inputShow();
            })
            addEvent('click',this.addBtn,function(){
                var e = e || window.event,
                tar = e.target || e.srcElement;
                _self.addItem(tar);
            })
            addEvent('click',this.oUl,function(e){
                var e = e || window.event,
                    tar = e.target || e.srcElement;
                _self.editItem(tar);
            })
        },
        inputShow (){
            if(showIpt){
                this.inputWrap.style.display = 'none';
                showIpt = false;
            }else{
                this.inputWrap.style.display = 'block';
                showIpt = true;
                this.inputContent.value = '';
                this.addBtn.innerText = '增加项目';
                addText = 'add';
            }
            
        },
        addItem (tar){
            var inpVal = this.inputContent.value,
            oItems = this.oUl.getElementsByClassName('list-item'),
            len = oItems.length,
            liParent = oItems[curIdx],
            item,
            pText;
            if(!!inpVal){
                if( addText === 'edit'){
                    pText = elemChildren(liParent)[0];
                    pText.innerText = this.inputContent.value;
                    
                }else if(addText === 'add'){
                    for(var i = 0; i < len; i++){
                        item = oItems[i],
                        pText = elemChildren(item)[0];
                        if(inpVal === pText.innerText){
                            alert('已存在该项目');
                            this.inputShow();
                            return;
                        }
                    }
                    var oLi = document.createElement('li');
                    oLi.className = 'list-item';
                    oLi.innerHTML = template(inpVal);
                    this.oUl.appendChild(oLi);
                }
               
            }
            
            this.inputShow();
        },
        editItem (tar){
            console.log(tar)
            var liParent = elementParent(tar, 2),
            pText = elemChildren(liParent)[0],
            oItems = this.oUl.getElementsByClassName('list-item'),
            index = Array.prototype.indexOf.call(oItems, liParent);
            curIdx = index;
            if(tar.className === 'edit-btn fa fa-edit'){
                this.inputShow();
                this.addBtn.innerText = '编辑第'+ (index + 1) +'项';
                this.inputContent.value = pText.innerText;
                addText = 'edit';
            }else if(tar.className === 'delete-btn fa fa-times'){
                liParent.remove();
            }
        }
    }

    function errorInfo (key){
        return new Error(
            '您没有配置参数' + key + '\n' + 
             '必须配置的参数列表如下：\n' +
             '打开输入框按钮元素类名： showInput \n'+
             '输入框区域元素类名：inputWrap \n'+
             '输入框元素类名： inputContent \n' +
             '增加项目按钮元素类名：addBtn \n' +
             '列表承载元素类名：list-content \n'
        )
        
     }
    function template(text){
        return(
            '<p class="item-text">'+ text +'</p>'+
            '<div class="btn-group">'+
                '<a href="javascript:;" class="edit-btn fa fa-edit"></a>'+
                '<a href="javascript:;" class="delete-btn fa fa-times"></a>'+
            '</div>'
        )
    }
    new ToDolist();
})(document.getElementsByClassName('config')[0])