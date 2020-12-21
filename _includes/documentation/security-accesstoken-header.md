For a long time RestFB used the access token only as query parameter and this was the only way to do authenticated Graph API calls. For security reasons this is not the best way, because query parameters are most of the time logged in proxy servers and many other appliances. 

Facebook supports another mechanism and so it is possible to provide the access token as HTTP header information. This is part of the oauth specification and RestFB allows the developer to enable this qay to transport the access tokens to Facebook, too.

By default, RestFB still uses the query parameter, but you can change this using this flag on the `DefaultFacebookClient` object like shown in this code:

{% highlight java %}
DefaultFacebookClient client = new DefaultFacebookClient("access token", Version.LATEST);
client.setHeaderAuthorization(true);
{% endhighlight %}

Please keep in mind, that this feature is not tested in every aspect and with every possible call. So please provide us information if you run into problems with the mechanism.