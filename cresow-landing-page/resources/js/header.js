$( document ).ready(function() {
	var navHeight = $('.navbar').outerHeight(true);
	$(window).scroll(function() {
		if ($(document).scrollTop() > navHeight) {
			$('header').addClass("scrolling")
		} else {
			$('header').removeClass("scrolling")
		}
	});
	$('#nav-icon1').click(function(){
		$(this).toggleClass('open');
		$('#hamburger-menu').toggleClass('collapsed');
		$(this).siblings('.navbar-brand').toggleClass('hidden');
	});
});