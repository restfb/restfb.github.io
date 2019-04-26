// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 56
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// shuffle dom elements, thanks to (https://css-tricks.com/snippets/jquery/shuffle-dom-elements/)
(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);

// fetch download information from github api
$(document).ready(function () {
	
	$('#scrollbox li').shuffle();
	
	$('#scrollbox').scrollbox({
		direction: 'h',
		switchItems: 1
	});
	
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
	
});
