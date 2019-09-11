var c = document.getElementById('moveable-content');
var btn = document.getElementsByClassName('btn-lg');
Array.from(btn).forEach(element => {
    element.addEventListener('click', function(ev){
        c.style.marginTop = '0%';
    },false);    
});