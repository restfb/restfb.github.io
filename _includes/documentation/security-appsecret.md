Most requests need an access token. If someone is able to steal the access token, he or she can 
send spam with this app.

To make this more secure, Facebook provides a special parameter called `appsecret_proof`. This is a parameter that is 
transferred as query parameter in a normal request and contains a hashed version of the app secret. 
The additional security is only achievable if the communication to Facebook occurs via a 
server controlled by the developer.

The `FacebookClient` contains the `obtainAppSecretProof` method to calculate the proof, 
but a much easier way is to instantiate the `DefaultFacebookClient` with the additional
`appsecret_proof` parameter. In that case, the `appsecret_proof` is automatically added to every call.

<div class="rfb-callout info" role="alert">
	<h4>Require proof on all API calls</h4>
	<div>In the advanced app settings, you may switch your app to require the <code>appsecret_proof</code> to be transferred.
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

String proof = new DefaultFacebookClient(Version.LATEST).obtainAppSecretProof(
  MY_ACCESS_TOKEN, MY_APP_SECRET);
out.println("Here's my proof: " + proof);
{% endhighlight %}

### time-based appsecret_proof

With the `appsecret_proof`, the request is more secure, but vulnerable to replay attacks, or if an attacker manages to get the posted url, they can extract the appsecret_proof and use it in their own requests.
But there is a solution. Facebook supports an additional time factor. The factor is used in the calculated hash and is provided as an additional parameter in the request.

Because this hash with a special time is only usable for the next 5 minutes, the attacker cannot store the proof and use it as he likes. Only in the very short 5-minute timeframe. 

To enable this additional security measure, you need to extend the `DefaultFacebookClient` and override the `isAppSecretProofWithTime` method. This method is part of the `FacebookClient` public API, so any client can override it. We have disabled this feature for compatibility reasons. 

{% highlight java %}
DefaultFacebookClient client = new DefaultFacebookClient("<ACCESS_TOKEN>", "<APP_SECRET">, Version.LATEST) {
    @Override
    public boolean isAppSecretProofWithTime() {
      return true;
    }
};
{% endhighlight %}