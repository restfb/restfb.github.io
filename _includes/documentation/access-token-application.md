See <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/access-tokens#apptokens" class="label label-primary">Graph API documentation</a>

App access tokens are used to make server to server calls on behalf of the application. With this access token you can change the 
application settings and do some other calls. For example publishing Open Graph actions or debugging access tokens.

To create an application access token you need the app id and the app secret. That's the reason why application access tokens are only used in the server-to-server communication.

RestFB helps you obtaining app access tokens and you simply have to use the following call 

{% highlight java %}
// Obtains an access token which can be used to perform Graph API operations
// on behalf of an application instead of a user.

AccessToken accessToken =
  new DefaultFacebookClient().obtainAppAccessToken(MY_APP_ID, MY_APP_SECRET);

out.println("My application access token: " + accessToken);
{% endhighlight %}