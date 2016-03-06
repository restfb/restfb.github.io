See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4#fieldexpansion">Graph API documentation</a>
	
Some requests need additional parameters. With Graph API 2.4 for example it is mandatory to provide the `fields` parameter to get a <a href="https://developers.facebook.com/blog/post/2015/07/08/graph-api-v2.4/" target="_blank">more extensive response</a>. RestFB provides the `Parameter` class to serve this purpose.

The `Parameter` class needs a name and a value to be sent to Facebook. The value is internally processed by a
json mapper, so you can provide a `JsonObject`, a primitive java type (like `String`, `Boolean` and so on), or a class that uses the `@Facebook` annotation (for example the RestFB types or custom ones).

{% highlight java %}
// You can pass along any parameters you'd like to the Facebook endpoint.

Date oneWeekAgo = new Date(currentTimeMillis() - 1000L * 60L * 60L * 24L * 7L);

Connection<Post> filteredFeed = facebookClient.fetchConnection("me/feed", Post.class,
  Parameter.with("limit", 3), Parameter.with("until", "yesterday"),
    Parameter.with("since", oneWeekAgo));

out.println("Filtered feed count: " + filteredFeed.getData().size());
{% endhighlight %}