See <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/access-tokens#apptokens" class="label label-primary">Graph API documentation</a>

App access tokens are used to make server to server calls on behalf of your application. With these special access tokens, you can modify your application settings as well as perform some other calls - for example, publishing Open Graph actions or debugging access tokens.

To obtain an application access token you'll need your App ID and App Secret. This is the reason why application access tokens are only used in the server-to-server communication.

RestFB provides a mechanism for obtaining app access tokens. You simply have to make the following call:

{% highlight java %}
// Obtains an access token which can be used to perform Graph API operations
// on behalf of an application instead of a user.

AccessToken accessToken =
  new DefaultFacebookClient(Version.LATEST).obtainAppAccessToken(MY_APP_ID, MY_APP_SECRET);

out.println("My application access token: " + accessToken);
{% endhighlight %}