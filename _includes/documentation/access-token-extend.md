See <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/access-tokens/expiration-and-extension">Graph API documentation</a>

Normally access tokens are only valid for a short time, but you can extend the lifetime with a simple Facebook call. RestFB provides a method to make this easy.

{% highlight java %}
// Tells Facebook to extend the lifetime of MY_ACCESS_TOKEN.
// Facebook may return the same token or a new one.

AccessToken accessToken =
  new DefaultFacebookClient().obtainExtendedAccessToken(MY_APP_ID,
    MY_APP_SECRET, MY_ACCESS_TOKEN);

out.println("My extended access token: " + accessToken);
{% endhighlight %}