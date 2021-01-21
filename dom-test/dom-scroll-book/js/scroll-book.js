var comeBack = document.getElementsByClassName('come-back')[0],
    box = document.getElementsByClassName('box')[0];
addEvent('scroll', window, function(){
    console.log(1)
    var sTop = getScrollOffset().top;
    if(sTop > 0){
        comeBack.style.display = 'block';
    }else{
        comeBack.style.display = 'none';
    }
})
addEvent('click', comeBack, function(){
    window.scrollTo (0, 0);
})
addEvent('click', box, function(){
    window.scrollTo (0, 0);
})