See <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/access-tokens#apptokens" class="badge badge-primary">Graph API documentation</a>

App access tokens are used to make server-to-server calls on behalf of your application. These special access tokens allow you to modify your application settings and make some other calls - for example, publishing Open Graph actions or debugging access tokens.

To obtain an Application Access Token, you'll need your App ID and App Secret. For this reason, Application Access Tokens are only used for server-to-server communication.

RestFB provides a mechanism to obtain application access tokens. All you need to do is make the following call:

{% highlight java %}
// Obtains an access token which can be used to perform Graph API operations
// on behalf of an application instead of a user.

AccessToken accessToken =
  new DefaultFacebookClient(Version.LATEST).obtainAppAccessToken(MY_APP_ID, MY_APP_SECRET);

out.println("My application access token: " + accessToken);
{% endhighlight %}