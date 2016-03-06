See <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/access-tokens#apptokens">Graph API documentation</a>

{% highlight java %}
// Obtains an access token which can be used to perform Graph API operations
// on behalf of an application instead of a user.

AccessToken accessToken =
  new DefaultFacebookClient().obtainAppAccessToken(MY_APP_ID, MY_APP_SECRET);

out.println("My application access token: " + accessToken);
{% endhighlight %}