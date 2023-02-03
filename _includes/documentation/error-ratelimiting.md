See <a target="_blank" href="https://developers.facebook.com/docs/graph-api/advanced/rate-limiting" class="badge badge-primary">Facebook documentation</a>

To prevent abuse of the Graph API, Facebook uses a rate limiting mechanism. 
The number of calls you are allowed to make depends on the kind of request. There 
are 3 types of limits: `app limit`, `user limit` and `page limit`.

The app limit is tied to the app. As soon as you hit this limit, you are in trouble. 
because you will not be able to make any more calls using this Facebook app. This 
is a limit that affects all of your users and Pages.
	
The user limit comes into play when you use a user access token. This limit can can be reached when a user sends too many requests to Facebook. If you reach this limit, the application can be used by other users and the application limit will not be triggered. by other users and the app limit will not be triggered. The user will have to wait before new requests can be sent.

The page limit is a bit different and more complicated. This limit is reached if a page access token is used to
send too many requests to Facebook. But the page limit is directly connected to the page and not to the application.
If any application that manages a page triggers the limit, all applications that use a page access token for this page
are in trouble. In the past, Facebook has permitted the app owner to send an increase request to enlarge the limit for the page. Now they are using an opaque algorithm to detect a suitable limit.

RestFB supports the limits and you can get the limit information from the `WebRequestor`. The `WebRequestor` provides
a `DebugHeaderInfo` with rate limiting and some additional debug information Facebook provides per call and
developers can process this information and act according to the limits given. 
In general, the rate limits are not provided until you reach an 80% threshold. Once you are above this limit, the
request will include the rate limit and you can reduce your calls.

The `DebugHeaderInfo` can be fetched *after* every client call like this:

{% highlight java %}
DebugHeaderInfo headerInfos = client.getWebRequestor().getDebugHeaderInfo();
System.out.println("App usage: " + headerInfos.getAppUsage());
System.out.println("Page usage: " + headerInfos.getPageUsage());
{% endhighlight %}

The example above shows only a short sample and you can get more information. Very important for opening new bug reports on Facebook is the trace id. A complete explanation of the returned header fields can be found [here](https://developers.facebook.com/docs/graph-api/using-graph-api/).