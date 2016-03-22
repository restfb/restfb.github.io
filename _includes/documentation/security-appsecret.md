Most of the requests need an access token. If someone is able to steal the access token he can 
send spam with this app.

To make this more secure Facebook provides the `appsecret_proof`. This is a parameter that is 
transfered as query parameter in a normal request and contains a hashed version of the app secret. 
The additional security is only feasible if the communication to Facebook is realised via a 
server controlled by the developer.

The `FacebookClient` contains the `obtainAppSecretProof` method to calculate the proof, 
but a much easier way is to instantiate the `DefaultFacebookClient` with the additional
`appsecret_proof` parameter. In that case the `appsecret_proof` is automatically added to every call.

<div class="rfb-callout info" role="alert">
	<h4>Require proof on all API calls</h4>
	<div>In the advanced app settings, you may switch your app to require the <code>appsecret_proof</code> to be transfered.
		If this option is enabled, all calls without a proof result in an exception.</div>
</div>

{% highlight java %}
// If you create a DefaultFacebookClient instance with your app secret, RestFB will
// automatically include appsecret_proof with your requests,
// no work needs to be done on your end.

FacebookClient facebookClient =
  new DefaultFacebookClient(MY_ACCESS_TOKEN, MY_APP_SECRET, Version.LATEST);

// Request will include appsecret_proof

facebookClient.fetchObject("XXX", User.class);

// You may also generate the appsecret_proof value directly (not normally needed).

String proof = new DefaultFacebookClient().obtainAppSecretProof(
  MY_ACCESS_TOKEN, MY_APP_SECRET);
out.println("Here's my proof: " + proof);
{% endhighlight %}