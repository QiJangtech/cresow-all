$(document).ready(function(){
    $('.eco-slider').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
    });

    $('.eco-slider').slickLightbox({
        itemSelector        : 'a',
        navigateByKeyboard  : false
    });
});