See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/reference/user/feed">Graph API documentation</a>
					
Publishing a checkin works like publishing a normal post to a user's feed. You simply have to provide a `place` parameter with a `place id`. If you only have longitude and latitude, you have to search for places in the given area first and let the user select the correct place. Publishing via longitude/latitude is not possible since Graph API version 2.0. (see <a href="http://stackoverflow.com/questions/11626783/post-location-on-facebook-with-latitude-and-longitude-coordinates-only" target="_blank">Stackoverflow question</a>)
	
{% highlight java %}
FacebookType publishCheckinResponse = facebookClient.publish("me/feed",
  FacebookType.class, Parameter.with("message", "I'm here!"),
    Parameter.with("place", 1234)));

out.println("Published checkin: " + publishCheckinResponse.getId());
{% endhighlight %}