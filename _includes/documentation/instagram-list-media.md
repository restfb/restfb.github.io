The most important elements, you can start with when using the instagram api, are the `IgMedia` objects. Because we now know how to access the profile, we can access the media list with a similar call. But in this case we have to use a `Connection` object, because the data is returned as a list with paging.

{% highlight java %}
FacebookClient client = new DefaultFacebookClient("<page access token>", Version.VERSION_5_0);

String mediaFields = "children{permalink,media_type,media_url,timestamp},thumbnail_url,shortcode,timestamp,media_type,media_url,is_comment_enabled,comments{like_count,media,replies,timestamp,user,username,text},permalink,caption";

Connection<IgMedia> mediaConnection = 
    client.fetchObject("<instagram profile id>/media", IgMedia.class,
		Parameter.withFields(mediaFields));
		
List<IgMedia> mediaList = StreamSupport.stream(pageConnection.spliterator(), false)
	.flatMap(List::stream)
	.collect(Collectors.toList());
{% endhighlight %}

With this snippet, we get a list of `IgMedia` objects with almost completely filled objects.