A user may uninstall an application in his or her <a href="https://www.facebook.com/settings?tab=applications" 
target="_blank">Facebook app settings</a>. Because the application owner might need this information, Facebook 
calls a *Deauthorization Callback*. A developer can set the deauthorization callback url in the app 
settings. As soon as someone uninstalls the app, this url is called with a signed POST request.

RestFB provides support for checking these signed requests and decoding the provided information. 

The following snippet explains how to use the `DeAuth` type to get the user id of the user who 
uninstalled the app. Additionally, you'll get the date when the app was uninstalled.

{% highlight java %}
// Facebook can send you an encoded signed request, as soon as someone deletes
// your Facebook app. This only happens if you have defined a deauthorization
// callback url in your Facebook App (Settings -> Advanced).

String signedRequest = "xxx";
String appSecret = "yyy";
DeAuth deauthObj = facebookClient.parseSignedRequest(signedRequest,
  appSecret, DeAuth.class);

out.println("This user just deleted your app: " + deauthObj.getUserId());
out.println("Deauthorization at: " + deauthObj.getIssuedAt());
{% endhighlight %}