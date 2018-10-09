$( document ).ready(function() {
    $('.dot-nav--item').on('click', function(e){
        $this = $(this),
        $siblings = $this.siblings();
        
        $this.addClass('is-active');
        $siblings.removeClass('is-active');

        var navHeight = $('.navbar').outerHeight(true);
        $('html, body').animate({
            scrollTop: $($(this).find('a').attr('href')).offset().top - navHeight
        }, 500, 'linear');
    })

    $(document).on('scroll', function() {
        var sectionIds = [];
        $("body").find("section").each(function(){ sectionIds.push("#" + this.id); });
        $.each(sectionIds, function(index, sectionId){
            if(isScrolledIntoView(sectionId)){
                updateSidebar(sectionId);
            }
        })
    })
});

function isScrolledIntoView(elem){
    var half_height = $(window).height()/2;
    var top = $(elem).position().top - half_height;
    var length = $(elem).position().top + $(elem).outerHeight() - half_height;

    return ($(this).scrollTop()>=top && $(this).scrollTop()<=length);
}

function updateSidebar(elem){
    $("a[href='"+elem+"']").closest('li').addClass('is-active');
    $("a[href='"+elem+"']").closest('li').siblings().removeClass('is-active');
}