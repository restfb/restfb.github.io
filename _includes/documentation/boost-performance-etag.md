You can improve your connection's performance by using the <a target="_blank" href="/javadoc/com/restfb/ETagWebRequestor.html">`ETagWebRequestor`</a>. This WebRequestor is a special implementation wich adds ETag support to the restfb's requests. For further information about `ETag` you should have a look at the <a href="http://en.wikipedia.org/wiki/HTTP_ETag" target="_blank">wikipedia</a> page.

{% highlight java %}
// create the special WebRequestor with ETag support
ETagWebRequestor webRequestor = new ETagWebRequestor();
FacebookClient client = 
  new DefaultFacebookClient(accessToken, webRequestor, new DefaultJsonMapper(), Version.VERSION_2_2);
{% endhighlight %}