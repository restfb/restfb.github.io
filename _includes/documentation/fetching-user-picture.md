Fetching objects with RestFB is straightforward, but there's a special endpoint 
that is a bit different and can be a little confusing.

If you call the `<userid>/picture` endpoint you don't receive a JSON response object. This endpoint 
redirects directly to the user picture and you get the image's binary data.

{% highlight shell %}
GET https://graph.facebook.com/v3.0/me/picture
{% endhighlight %}

The GET request above returns these header fields. 

{% highlight shell %}
status: 302
content-type: image/jpeg
pragma: no-cache
location: https://example.fbcdn.net/example_profile_picture.jpg
{% endhighlight %}

Now, we want to receive the image url in a JSON instead of the binary data. This can be achieved by adding a special parameter to the request URL. The query parameter is `redirect=false`.

The corresponding Java code looks like this:

{% highlight java %}
FacebookClient client = new DefaultFacebookClient(accessToken, Version.LATEST);
JsonObject picture = 
      client.fetchObject("me/picture", 
	      JsonObject.class, Parameter.with("redirect","false"));
{% endhighlight %}

With this "trick" you receive a JSON response as expected when calling the Facebook Graph endpoint.

{% highlight json %}
{
  "data": {
    "is_silhouette": false,
    "url": "https://example.fbcdn.net/example_profile_picture.jpg"
  }
}
{% endhighlight %}