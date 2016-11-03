// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
	target: '#navbarscroll'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// fetch download information from github api
$(document).ready(function () {
    var url = "https://api.github.com/repos/restfb/restfb/releases";
    $.getJSON(url + "?callback=?", null, function (releases) {

	if (releases.data.length > 0) {
	    var tag = releases.data[0].tag_name.substring(1);
	    var date = new Date(releases.data[0].created_at);
		var prettyDate = $.format.date(date.getTime(), "MMMM d, yyyy");
	    $("#restfb-version").text("Version " + tag);
	    $("#restfb-release-date").text("(released " + prettyDate + ")");
	    var zipURL = releases.data[0].html_url;
	    if ("application/zip" == releases.data[0].assets[0].content_type) {
		zipURL = releases.data[0].assets[0].browser_download_url;
	    }

	    if ("application/zip" == releases.data[0].assets[1].content_type) {
		zipURL = releases.data[0].assets[1].browser_download_url;
	    }

	    $("#downloadURL").attr("href", zipURL);
	}
    });
	$(".owl-carousel").owlCarousel({
		loop:true,
		items:8,
		merge:true,
		autoplay:true,
		autoplayHoverPause:true,
		margin:10,
		autoplayTimeout:3000
	});
});
