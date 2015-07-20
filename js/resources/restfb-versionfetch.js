$(document).ready(function () {
    var url = "https://api.github.com/repos/restfb/restfb/releases";
    $.getJSON(url + "?callback=?", null, function (releases) {

	if (releases.data.length > 0) {
	    var tag = releases.data[0].tag_name.substring(1);
	    var date = new Date(releases.data[0].created_at).toString("MMMM d, yyyy");
	    $("#restfb-version").text("Version " + tag);
	    $("#restfb-release-date").text("(released " + date + ")");
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
