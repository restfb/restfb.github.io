See <a target="_blank" href="http://developers.facebook.com/docs/api#reading">Graph API documentation</a>

{% highlight java %}
// You can specify metadata=1 for many calls, not just this one.
// See the Facebook Graph API documentation for more details.

User userWithMetadata =
  facebookClient.fetchObject("me", User.class, Parameter.with("metadata", 1));

out.println("User metadata: has albums? "
  + userWithMetadata.getMetadata().getConnections().hasAlbums());
{% endhighlight %}