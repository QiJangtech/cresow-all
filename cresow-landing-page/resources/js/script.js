(function ($) {
	$(function () {

		var newYear = new Date();
		newYear = new Date(newYear.getFullYear()+1, 1-1, 1);

		newYear = new Date( "03-12-2018".replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") )
		$('.countdown-container').countdown({until: newYear });

		// $('.countdown-container').countdown('pause');

	});
})(jQuery); 