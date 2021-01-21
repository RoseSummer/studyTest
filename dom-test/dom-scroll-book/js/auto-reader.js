;(function(){
    var vHeight = getViewportSize().height,
        sHeight = getScrollSize().height,
        playing = false, //执行状态标记
        timer = null;   //计时器标记
    var AutoReader = function(opt){
        this.sTopBtn = opt.sTopBtn;
        this.playBtn = opt.playBtn;
        var self = this;
            
        //console.log(this)  // this  指向实例化对象
        addEvent('scroll', window, function(){
            //console.log(this); //this指向 window对象
            self.showBtn();
        })
        addEvent('click', this.sTopBtn, function(){
            //console.log(this); //this指向 dom对象 - sTopBtn
            self.backTop();
            clearInterval(timer);
            playing = false;
        })
        addEvent('click', this.playBtn, function(){
            //console.log(this); //this指向 dom对象 - playBtn
            
            self.autoPlay();
        })
    }
    AutoReader.prototype = {
        showBtn(){
            //console.log(this); //this 指向实例对象
            var sTop = getScrollOffset().top;
            if(sTop > 0){
                this.sTopBtn.style.display = 'block';
            }else{
                this.sTopBtn.style.display = 'none';
            }
        },
        backTop(){
            //console.log(this);//this 指向实例化对象
            window.scrollTo(0, 0)
        },
        autoPlay(){
            //console.log(this); // this 实例化对象
            var top = getScrollOffset().top;
               
              if(sHeight <= top + vHeight){
                  return ;
              }
              if(!playing){
                    timer = setInterval(function(){
                        top = getScrollOffset().top;
                        console.log(top + vHeight, sHeight)
                        if(sHeight <= top + vHeight){
                            clearInterval(timer);
                            playing = false;
                        }else{
                            window.scrollBy(0, 1);
                        }
                    }, 100)
                    playing = true;
              }else{
                  clearInterval(timer);
                  playing = false;
              }
        }

    }
    window.AutoReader = AutoReader;
})()