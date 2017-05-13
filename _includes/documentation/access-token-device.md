See <a target="_blank" href="https://developers.facebook.com/docs/facebook-login/for-devices" class="label label-primary">Graph API documentation</a>

<div class="rfb-callout warning" role="alert">
	<h4>Important change with Graph API 2.6</h4>
	<div>Facebook made a breaking change with Graph API 2.6 and getting a device access token changed. The most important change is the need of a special access token. This consists of the application id AND a client token. Both values build the new access token. RestFB supports the new way to fetch the device access token and you find in the following text sections that explain how the both ways work.</div>
</div>

With the Device Access Token Facebook provides a possibility to connect to devices with limited input or display capabilities. 

The device access token is generated in a two step way. First you have to call <code>FacebookClient.fetchDeviceCode</code>(see example code). You receive a user code, a code and some additional information. The user code has to be shown to the user and she has to enter it on a special Facebook page. The url of that page is part of the DeviceCode object. You should not hard code this url, because Facebook may changed it. As soon as you presented these information to the user, you have to poll Facebook and try to fetch the device access token.

### Fetching with Graph API 2.5 or below

Graph API 2.5 and below don't use any access token to fetch the device access token. Only the App Id is needed and you are ready to go. First we have receive a `DeviceCode` object. 

{% highlight java %}
// Graph API 2.5 is just an example, you may also use lower versions
DefaultFacebookClient client = new DefaultFacebookClient(Version.VERSION_2_5);
ScopeBuilder scope = new ScopeBuilder();

DeviceCode deviceCode = client.fetchDeviceCode(MY_APP_ID, scope);

out.println("Open in a browser: " + deviceCode.getVerificationUri);
out.println("Enter this Code: " + deviceCode.getUserCode);
{% endhighlight %}

Now you have to start the polling of Facebook with the <code>code</code> you received in the `DeviceCode` object. Every poll request may result in an checked exception that extends the `FacebookDeviceTokenException`. A table of the possible exceptions and the intention can be found below.

The call that is used to poll the `AccessToken` from Facebook looks like this. You should call it in a loop:
{% highlight java %}
// Obtains an access token which can be used to perform Graph API operations
// on behalf of a user.

AccessToken accessToken =
   new DefaultFacebookClient().obtainDeviceAccessToken(MY_APP_ID, deviceCode.getCode());

out.println("My device access token: " + accessToken);
{% endhighlight %}

### Fetching with Graph API 2.6 or newer

With Graph API 2.6 Facebook changed the way a device token is requested. First we need a special access token that consists of the `application id` and the `client token`. The client token can be found in the Application Dashboard. The new token looks like `<pp_id>|<client_token>`. With this access token a new `FacebookClient` is created and the client is used for the device token interactions with Facebook. Because tha application id is part of the access token we don't need to provide the application id in the method call. So we have two new methods that work with this access token and don't use the application id as parameter.

The first part - fetching the `DeviceCode` - looks like this: 
{% highlight java %}
String specialAccessToken = MY_APP_ID + "|" + MY_CLIENT_TOKEN;
// Graph API 2.9 is just an example, you may also use lower versions down to 2.6
DefaultFacebookClient deviceTokenClient = 
         new DefaultFacebookClient(specialAccessToken, Version.VERSION_2_9);
ScopeBuilder scope = new ScopeBuilder();

DeviceCode deviceCode = client.fetchDeviceCode(scope);

out.println("Open in a browser: " + deviceCode.getVerificationUri);
out.println("Enter this Code: " + deviceCode.getUserCode);
{% endhighlight %}

Now we have to call the polling call in a loop and can receive the same exceptions as in earlier versions. One change is important: there is no `FacebookDeviceTokenDeclinedException` because this information is not send to the application. This is a important change, because you have to handle this in your application. You can run into the code expired exception or you let the user close a dialog or something and stop the polling in respect to the user action.

The polling call doesn't need the application id, so it looks like this:
{% highlight java %}
// Obtains an access token which can be used to perform Graph API operations
// on behalf of a user.

AccessToken accessToken =
   deviceTokenClient.obtainDeviceAccessToken(deviceCode.getCode());

out.println("My device access token: " + accessToken);
{% endhighlight %}

### The checked device token exception

The polling method should return the AccessToken, but may throw a <a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenException.html" target="_blank">FacebookDeviceAccessToken</a> exception.

<div class="list-group">
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenPendingException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenPendingException</h4>
			    <p class="list-group-item-text">You showed the <code>user_code</code> to the user and he/she had not finished the authorisation. This is a rather normal case so, because you should poll Facebook in short intervals and the user cannot switch devices (for example) that fast.<br>
			    </p>
			</a>
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenDeclinedException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenDeclinedException - (only up to Graph API 2.5)</h4>
			    <p class="list-group-item-text">The user declined the authorisation and your application is not allowed to access Facebook in behalf of that user.</p>
			</a>
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenCodeExpiredException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenCodeExpiredException</h4>
			    <p class="list-group-item-text">Everything workd fine, but the authorisation proccess took to long. Perhaps you showed the <code>user_token</code> to the user and he/she not started the authorisation. Anyway, it is not possible to finish the process and you have to start again from the beginning.</p>
			</a>
			<a href="/javadoc/com/restfb/exception/devicetoken/FacebookDeviceTokenSlowdownException.html" class="list-group-item" target="_blank">
			    <h4 class="list-group-item-heading">FacebookDeviceTokenSlowdownException</h4>
			    <p class="list-group-item-text">You started the polling and the polling interval is to small, so you poll to fast. Make the interval larger and spend more time waiting between 2 polling requests. The <code>DeviceCode</code> object contains the intervall facebook expects. You should respect this.</p>
			</a>
</div>