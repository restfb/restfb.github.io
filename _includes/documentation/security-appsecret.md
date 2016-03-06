{% highlight java %}
// If you create a DefaultFacebookClient instance with your app secret, RestFB will
// automatically include appsecret_proof with your requests,
// no work needs to be done on your end.

FacebookClient facebookClient =
  new DefaultFacebookClient(MY_ACCESS_TOKEN, MY_APP_SECRET);

// Request will include appsecret_proof

facebookClient.fetchObject("XXX", User.class);

// You may also generate the appsecret_proof value directly (not normally needed).

String proof = new DefaultFacebookClient().obtainAppSecretProof(
  MY_ACCESS_TOKEN, MY_APP_SECRET);
out.println("Here's my proof: " + proof);
{% endhighlight %}