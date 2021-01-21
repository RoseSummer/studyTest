window.onload = function(){
    init();
}
function init(){
    searchInput();
}
var searchInput = (function(){

    var oInput = document.getElementById('J_input'),
        recommeData = JSON.parse(document.getElementById('J_recomme_data').innerHTML),
        recommeText = document.getElementById('recomme-text'),
        key = 0,
        t = null;

    function bindEvent(){
        addEvent('focus', oInput, function(){
           clearInterval(t);
           recommeText.style.color = '#ccc';
        })
        addEvent('blur', oInput, function(){
            autoShow(this.value, true);
        });
        addEvent('input', oInput, function(){
            autoShow(this.value, false);
        });
        addEvent('propertychange', oInput, function(){
            autoShow(this.value, false);
        });
    }

    function autoKeywords(){
        var len = recommeData.length;
        recommeText.innerHTML = recommeData[key];
        key = key >= len-1 ? 0 : ++key;
    }
    
    function autoPlay(){
        autoKeywords();
        t = setInterval(autoKeywords, 3000);
    }
   
    function autoShow(val, isBlur){
        if(val.length > 0){
            recommeText.className = 'recomme hide';
        }else{
            recommeText.className = 'recomme show';
            recommeText.style.color = isBlur ? '#989898': '#ccc';
            isBlur && (t = setInterval(autoKeywords, 3000))
        }
    }
    return function(){
        bindEvent();
        autoPlay();
    }
})()