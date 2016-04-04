See <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/for-devices" class="label label-primary">Graph API documentation</a>

With the Device Access Token Facebook provides a possibility to connect to devices with limited input or display capabilities. RestFB supports this kind of access tokens since version 1.12.0.

The device access token is generated in a two step way. First you have to call <a href="http://localhost:8080/restfb.github.io/javadoc/com/restfb/FacebookClient.html#fetchDeviceCode(java.lang.String, com.restfb.scope.ScopeBuilder)" target="_blank"><code>FacebookClient.fetchDeviceCode</code></a>(see example code). You receive a user code, a code and some additional information. The user code has to be shown to the user and he have to enter it on a special Facebook page. The url is part of the DeviceCode object. As soon as you presented these information to the user, you have to poll Facebook and try to fetch the device access token.

{% highlight java %}
DefaultFacebookClient client = new DefaultFacebookClient(Version.VERSION_2_3);
ScopeBuilder scope = new ScopeBuilder();

DeviceCode deviceCode = client.fetchDeviceCode(MY_APP_ID, scope);

out.println("Open in a browser: " + deviceCode.getVerificationUri);
out.println("Enter this Code: " + deviceCode.getUserCode);
{% endhighlight %}


The polling method should return the AccessToken, but may throw a <a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenException.html" target="_blank">FacebookDeviceAccessToken</a> exception.

<div class="list-group">
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenPendingException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenPendingException</h4>
			    <p class="list-group-item-text">You showed the user_code to the user and he/she had not finished the authorisation.
				This is a rather normal case so, because you should poll Facebook in short intervals and the user cannot switch devices (for example) that fast.<br>
			    </p>
			</a>
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenDeclinedException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenDeclinedException</h4>
			    <p class="list-group-item-text">The user declined the authorisation and you you is not allowed to access Facebook.</p>
			</a>
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenCodeExpiredException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenCodeExpiredException</h4>
			    <p class="list-group-item-text">Everything workd fine, but the authorisation proccess took to long. Perhaps you showed the user
			    token to the user and he/she not started the authorisation. Anyway, it is not possible to finish the process and to have to start again from the beginning.</p>
			</a>
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenSlowdownException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenSlowdownException</h4>
			    <p class="list-group-item-text">You started the polling and the polling interval is no small, so you poll to fast. Make the interval
				larger and spend mor time waiting between 2 polling requests. The DeviceCode object contains the intervall facebook expects. You should respect this.</p>
			</a>
</div>

{% highlight java %}
// Obtains an access token which can be used to perform Graph API operations
// on behalf of a user.

AccessToken accessToken =
   new DefaultFacebookClient().obtainDeviceAccessToken(MY_APP_ID, deviceCode.getCode());

out.println("My device access token: " + accessToken);
{% endhighlight %}