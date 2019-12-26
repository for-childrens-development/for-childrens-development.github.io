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
    } else {
      x.style.display = "none";
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

document.getElementById("video-background").playbackRate = 0.5;

/*Scroll to the top */
$(window).scroll(function(){
  if ($(this).scrollTop() > 500) {
    $('.toTop').fadeIn();
  } else {
    $('.toTop').fadeOut();
  }
});

$('.toTop').on('click', function(event) {
  event.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 'slow');         
});
