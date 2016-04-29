<div class="rfb-callout warning" role="alert">
	<h4>
		A note about the Publish and Delete examples below
	</h4>
	<p>
		In order to use these, you'll need to create a Facebook Application and then request an OAuth access token with the proper permissions, e.g. <code>publish_stream,create_event</code>.
	</p>
	<p>
		The <a target="_blank" href="http://developers.facebook.com/docs/api#auth">Facebook Graph API authorization documentation</a> explains how to do this in detail.<br>
		If you're in a hurry, though, here's a quick example:
	</p>
	<ul style="list-style-type: decimal;">
		<li>Create a Facebook Application</li>
		<li>Request <code>https://graph.facebook.com/​oauth/authorize?​client_id=MY_API_KEY&amp;​redirect_uri=http://www.facebook.com/​connect/login_success.html&amp;​scope=publish_stream,​create_event</code>
		</li>
		<li>Facebook will redirect you to <code>http://www.facebook.com/​connect/​login_success.html?code=MY_VERIFICATION_CODE</code>
		</li>
		<li>Request <code>https://graph.facebook.com/​oauth/access_token?​client_id=MY_API_KEY&amp;​redirect_uri=http://www.facebook.com/​connect/​login_success.html&amp;​client_secret=MY_APP_SECRET&amp;​code=MY_VERIFICATION_CODE</code>
		</li>
		<li>Facebook will respond with <code>access_token=MY_ACCESS_TOKEN</code></li>
	</ul>
</div>
<div class="rfb-callout info" role="alert">
	<h4>
		A note regarding the difference between live and dev apps
	</h4>
	<p>
		Newly created Facebook apps are in development mode. These apps work similar to live apps, but some actions act a bit different. In particular the publishing of elements is completely different. Even public elements are not visible to other
		users.
	</p>
	<p>
		So plese check the state of the app, if your application acts strange or you miss published elements.
	</p>
</div>
