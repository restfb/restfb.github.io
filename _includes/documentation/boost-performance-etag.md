See <a href="https://developers.facebook.com/docs/marketing-api/etags" target="_blank" class="label label-primary">Graph API documentation</a>

You can improve your connection's performance by using the <a target="_blank" href="/javadoc/com/restfb/ETagWebRequestor.html">`ETagWebRequestor`</a>. This WebRequestor is a special implementation wich adds ETag support to the restfb's requests. For further information about `ETag` you should have a look at the <a href="http://en.wikipedia.org/wiki/HTTP_ETag" target="_blank">wikipedia</a> page.

With the `EtagWebRequestor` the response body of every single request is stored in a cache. If you send the same request again to the Graph API, a hash key is added to the request header. Facebook will check the hash key and if the new response is the same as the stored one, Facebook returns an HTTP 304 and RestFB uses the cached response body. If an HTTP 200 is received instead, the old cached response body is replaced with the newly received response.

With this `Requestor` you can cut down on a lot of network traffic and it is very easy to use. This snippet shows how the `EtagWebRequestor` is created and used in RestFB.

<div class="rfb-callout info">
	<h4>Disable Caching while using EtagWebRequestor</h4>
	<div>
		<p markdown="1">Sometimes it is useful to switch to the non-caching version. The `EtagWebRequestor` provides the `isUseCache` and `setUseCache` methods. With these methods you can ask the Requestor if caching is enabled and switch it to your needs.
		</p>
	</div>
</div>

{% highlight java %}
// create the special WebRequestor with ETag support
ETagWebRequestor webRequestor = new ETagWebRequestor();
FacebookClient client = 
  new DefaultFacebookClient(accessToken, webRequestor, new DefaultJsonMapper(), Version.VERSION_2_2);
{% endhighlight %}



<div class="rfb-callout warning">
	<h4>Possible problems</h4>
	<div>
		<ol>
<li>Because every call is stored in the cache, this may lead to a performance degredation if the cache size increases significantly.</li>
<li>The cache uses a <code>SoftHashMap</code> to store the response bodies. If you drive your system to the memory limit, the JVM will remove elements from the cache to allow the system to work normally. If this happens at a really bad time, RestFB may run into problems and you will have to re-try your request.</li>
</ol>
	</div>
</div>