See <a target="_blank" href="http://developers.facebook.com/docs/api#editing" class="label label-primary">Graph API documentation</a>

Apart from fetching information from Facebook, a main use case is sending new comments, posts or generally speaking new items to Facebook. A popular item is a simple text. Comments, posts, private messages support this type and a developer should have the possibility to easily publish text on Facebook.

Therefore you should have a look at the next example. Here, we send a new Post on the user feed. The great message is "RestFB test". In return we get the id of the created post. RestFB provides a special type for these returned ids and it is called `GraphResponse`.

{% highlight java %}
GraphResponse publishMessageResponse =
  facebookClient.publish("me/feed", GraphResponse.class,
    Parameter.with("message", "RestFB test"));

out.println("Published message ID: " + publishMessageResponse.getId());
{% endhighlight %}

It is possible to create more sophisticated items. For example if you like to schedule a post, you can simply check
the next example. In that example the scheduling timestamp is defined and the created `Date` object is used as `scheduled_publish_time`. Because scheduled post may not be published before, the `published` parameter needs to be false.

{% highlight java %}
Date tomorrow = new Date(currentTimeMillis() + 1000L * 60L * 60L * 24L);
GraphResponse publishMessageResponse =
  facebookClient.publish("me/feed", GraphResponse.class,
    Parameter.with("message", "RestFB test scheduled"), 
	Parameter.with("published", false), 
	Parameter.with("scheduled_publish_time", tomorrow));
	
out.println("Published message ID: " + publishMessageResponse.getId());
{% endhighlight %}