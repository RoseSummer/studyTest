
var initCourseTab = (function(doc){
    var oCourseTabLks = doc.getElementsByClassName('item-lk'),
        oCourseCardList = doc.getElementsByClassName('js-course-list')[0],
        oSearchInput = doc.getElementById('js-search-input'),
        courseData = JSON.parse(doc.getElementById('js-course-data').innerHTML),
        cardItemTpl = doc.getElementById('js-card-item-tpl').innerHTML,
        oCourseTabLksLen = oCourseTabLks.length;
    return {
        searchCourse (){
            var val = oSearchInput.value,
                len = val.length;
            if(len > 0){
                var data = this.searchData(courseData, val);
                if(data && data.length > 0){
                    oCourseCardList.innerHTML = this.makeList(data);
                }else{
                    oCourseCardList.innerHTML = this.showTip('没有搜索到相关课程');
                }
                
            }else{
                this.restoreList();
            }
        },
        
       //点击切换tab
        tabClick (e){
            var e = e || window.event,
                tar = e.target || e.srcElement,
                tarClassName = tar.className,
                item;
                console.log(tar,tar.className,tarClassName)
            
            if(tarClassName === 'item-lk'){
                var filed = tar.getAttribute('data-filed');
                //点击那个添加上激活状态样式，其他去除
                this.changeTabCurrent(tar);
                /* 原本this指向调用点击时间的dom对象,
                通过bind改变后指向 initTabCourse对象 
                console.log(this)
                */
               oCourseCardList.innerHTML = this.makeList(this.filterData(filed, courseData));
            }
            
        },
       
        //渲染列表
        makeList(data){
            var list = '';
            data.forEach(function(elem){
                list += cardItemTpl.replace(/{{(.*?)}}/g, function(node, key){
                    return {
                        img: elem.img,
                        course: elem.course,
                        classes: elem.classes,
                        isFree: elem.is_free === '1' ? 'free' : '',
                        price: elem.price === '0' ? '免费' : ('￥' + elem.price +'.00')
                    }[key]
                })
            })
            return list;
        },
        //搜索数据匹配
        searchData(data, keyword){
            return data.reduce(function(prev, elem){
                var res = elem.course.indexOf(keyword);
                res !== -1 && prev.push(elem);
                return prev;
            }, [])
        },
        //tab数据匹配
        filterData(filed, data){
            if(filed === 'all'){
                return data;
            }
            return data.filter(function(elem){
                switch(filed){
                    case 'free':
                        return elem.is_free === '1';
                        break;
                    case 'vip':
                        return elem.is_free === '0';
                        break;
                    default:
                        return true;
                }
            })
        },
        //初始化默认列表
        initCourseList (){
            oCourseCardList.innerHTML = this.makeList(courseData);
        },
        //恢复初始状态
        restoreList(){
            oCourseCardList.innerHTML = this.makeList(courseData);
            this.changeTabCurrent(oCourseTabLks[0]);
        },
        //改变tab选中状态
        changeTabCurrent(currentDom){
            for(var i = 0; i< oCourseTabLksLen; i++){
                item = oCourseTabLks[i];
                item.className = 'item-lk';
            }
            currentDom.className += ' current';
        },
        showTip (text){
            return '<div class="show-tip">'+ text +'</div>'
        }
    }
})(document);

;(function(doc){
    var oSearchInput = doc.getElementById('js-search-input'),
        oTabList = doc.getElementsByClassName('js-course-tab-list')[0];
    var init = function(){
        initCourseTab.initCourseList();
        bindEvent();
    }
    function bindEvent(){
        addEvent('input', oSearchInput, initCourseTab.searchCourse.bind(initCourseTab));
        addEvent('click', oTabList, initCourseTab.tabClick.bind(initCourseTab));
    }
    init();
})(document)