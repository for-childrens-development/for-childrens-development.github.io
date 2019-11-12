var c = document.getElementById('moveable-content');
var btn = document.getElementsByClassName('btn-lg');
Array.from(btn).forEach(element => {
    element.addEventListener('click', function(ev){
        c.style.marginTop = '0%';
    },false);    
});


function displayElementHideList(el, list) {
    var x = document.getElementById(el);
    list.forEach(element => {
        var y = document.getElementById(element);
        y.style.display = "none";
    });
    if (x.style.display === "none") {
      x.style.display = "block";
    } 
}

function displayElement(el) {
    var x = document.getElementById(el);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}