$(document).ready(function() {
     var url =  "https://api.github.com/repos/restfb/restfb/releases";
     $.getJSON(url + "?callback=?", null, function(releases) {
        
	if (releases.data.length > 0) {
	    var tag = releases.data[0].tag_name.substring(1);
	    var date = new Date(releases.data[0].created_at).toString("MMMM d, yyyy");
	    $("#restfb-version").text("Version " + tag);
	    $("#restfb-release-date").text("(released " + date + ")");
	}
    });
});


