{% highlight java %}
// Facebook can send you an encoded signed request, as soon as someone deletes
// your Facebook app. This only happens, if you have defined a deauthorization
// callback url in your Facebook App (Settings -> Advanced).

String signedRequest = "xxx";
String appSecret = "yyy";
DeAuth deauthObj = facebookClient.parseSignedRequest(signedRequest,
  appSecret, DeAuth.class);

out.println("This user just deleted your app: " + deauthObj.getUserId());
out.println("Deauthorization at: " + deauthObj.getIssuedAt());
{% endhighlight %}