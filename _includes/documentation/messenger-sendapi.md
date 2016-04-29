Now, we are ready to do the most important thing with our new build objects: *sending them to Facebook*. 

We use the well known `publish` method of RestFB and only need to use the right endpoint with the right access token. 

To send the message you have to use two parameters, the recipient and the message.

So we are ready to go and do something like this:

{% highlight java %}
// the access token can be found in your Facebook app in the messenger section
String pageAccessToken = "MY PAGE ACCESS TOKEN";

// create a version 2.6 client
FacebookClient pageClient = new DefaultFacebookClient(pageAccessToken, Version.VERSION_2_6);

pageclient.publish("me/messages", 
     Parameter.with("recipient", recipient), // the id or phone recipient
	 Parameter.with("message", message)); // one of the messages from above
{% endhighlight %}