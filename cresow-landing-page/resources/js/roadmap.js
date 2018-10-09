$(document).ready(function(){
    $('.roadmap-slider').slick({
        arrows: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: 'unslick'
            }
        ]
    });

    $('.roadmap-slider').on('swipe', function(event, slick, direction){
        $slide = $('.slick-active')
        $slide.siblings().find('.current').removeClass('current');
        initializeSlider(direction == "left");
        checkControl();
    });

    initializeSlider(true);
    checkControl();

    $('.roadmap-control .next').on('click', function(){
        current = $('.roadmap-item.current')
        current.removeClass('current');
        if(current.is(':last-child')){
            $('.roadmap-slider').slick('slickNext');
            initializeSlider(true);
        }else{
            current.next().addClass('current');
        }
        checkControl();
        current.next().find('.desc').addClass('fadeIn');
    })

    $('.roadmap-control .previous').on('click', function(){
        current = $('.roadmap-item.current')
        current.removeClass('current');
        if(current.is(':first-child')){
            $('.roadmap-slider').slick('slickPrev');
            initializeSlider(false);
            $group = $('.slick-active').find('.roadmap-group');
        }else{
            current.prev().addClass('current');
        }
        checkControl();
        current.find('.desc').removeClass('fadeIn');
        current.prev().find('.desc').addClass('fadeIn');
    })

    $('.roadmap-item>.track').on('click', function(){
        item = $(this).parent();
        current = $('.roadmap-item.current')
        current.removeClass('current');
        item.addClass('current');
        checkControl();
        item.prevAll().find('.desc').addClass('fadeIn');
        item.find('.desc').addClass('fadeIn');
        item.nextAll().find('.desc').removeClass('fadeIn');
    })
});

function findItemCount(){
    $group = $('.slick-active').find('.roadmap-group');
    return $group.children().length;
}

function initializeSlider(flag){
    $group = $('.slick-active').find('.roadmap-group');
    $item_count = $group.children().length;
    $group.find('.roadmap-item').css({'width' : 'calc(100%/' + $item_count + ')'});
    if(flag){
        $group.find('.roadmap-item').siblings().removeClass('current');
        $group.find('.roadmap-item').first().addClass('current');
    }else{
        $group.find('.roadmap-item').siblings().removeClass('current');
        $group.find('.roadmap-item').last().addClass('current');
    }
    $group.find('.current>.desc').addClass('fadeIn');
}

function checkControl(){
    $slide = $('.roadmap-slider').find('.slick-active');
    $current = $slide.find('.roadmap-item.current');
    if($slide.is(':first-child') && $current.is(':first-child')){
        $('.roadmap-control').find('.previous').addClass('disabled');
        $('.roadmap-control').find('.previous').attr("disabled", true);
    }else{
        $('.roadmap-control').find('.previous').removeClass('disabled');
        $('.roadmap-control').find('.previous').attr("disabled", false);
    }

    if($slide.is(':last-child') && $current.is(':last-child')){
        $('.roadmap-control').find('.next').addClass('disabled');
        $('.roadmap-control').find('.next').attr("disabled", true);
    }else{
        $('.roadmap-control').find('.next').removeClass('disabled');
        $('.roadmap-control').find('.next').attr("disabled", false);
    }
}