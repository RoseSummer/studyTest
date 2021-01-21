var initCourseTab = (function(doc){
    var courseData = JSON.parse(doc.getElementById('js-course-data').innerHTML),
        tplText = doc.getElementById('js-card-item-tpl').innerHTML,
        oCourseList = doc.getElementsByClassName('js-course-list')[0],
        searchInput = doc.getElementById('js-search-input'),
        oItems = doc.getElementsByClassName('item-lk'),
        len = oItems.length,
        item;
    return {
        courseData: courseData,
        searchCourse (){
            var val = searchInput.value,
                len = val.length;
            if(len  > 0){
                var data = this.searchData(courseData, val);
                if(data && data.length){
                    this.initCourseList(data);
                }else{
                    oCourseList.innerHTML = this.showTip('没有搜到相关课程');
                }
               
            }else{
                this.restoreList(oItems[0],this.courseData);
            }
        },

        tabClick (e){
            var e = e || window.event,
                tar = e.target || e.srcElement,
                tarClassName = tar.className;
                if(tarClassName === 'item-lk'){
                    var filed = tar.getAttribute('data-filed'),
                    data = this.filterData(filed, courseData);
                    this.restoreList(tar, data);
                }
        },

        changeCurrentTab (curDom){
            for(var i = 0; i < len; i++){
                item = oItems[i];
                item.className = 'item-lk';
            }
            curDom.className += ' current';
        },

        filterData (filed, data){
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

        searchData (data, keyword){
            return data.reduce(function(prev, elem){
                var res = elem.course.indexOf(keyword);
                res !== -1 && prev.push(elem);
                return prev;
            }, [])
        },

        tplList (data){
            var list = '';
            data.forEach(function(elem){
                list += tplText.replace(/{{(.*?)}}/g, function(node, key){
                    return {
                        img: elem.img,
                        course: elem.course,
                        classes: elem.classes,
                        isFree: elem.is_free === '1' ? 'free' : '',
                        price: elem.price === '0' ? '免费' : ('￥' + elem.price + '.00')
                    }[key]
                })
            })
            return list;
        },
        initCourseList (data){
            oCourseList.innerHTML = this.tplList(data);
        },
        restoreList (curDom, data){
            this.changeCurrentTab(curDom);
            this.initCourseList(data);
        },

        showTip (text){
            return '<div class="show-tip">'+ text +'</div>'
        }
    }

})(document)

;(function(doc){
    var oCourseTabList = doc.getElementsByClassName('js-course-tab-list')[0],
        searchInput = doc.getElementById('js-search-input');
    var initTabList = function(){
        initCourseTab.initCourseList(initCourseTab.courseData);
        bindEvent();
    }
    function bindEvent(){
        addEvent('input', searchInput, initCourseTab.searchCourse.bind(initCourseTab));
        addEvent('click', oCourseTabList, initCourseTab.tabClick.bind(initCourseTab));
    }
    initTabList();
})(document)