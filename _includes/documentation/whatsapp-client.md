The easiest way for developers to use the WhatsApp Business Platform is to create a RestFB Client based on the `DefaultFacebookClient`.

However, communication with the WhatsApp Business Platform differs from communication with the Facebook Graph API in one important respect. The access token must not simply be passed as a query parameter, but must be passed as an HTTP header field. WhatsApp Business Platform only accepts this method, so we created the ability to easily toggle the behavior.

The class method is called `setHeaderAuthorization`. An example code for switching the behavior and sending an object then looks like this:

{% highlight java %}
DefaultFacebookClient fbClient = 
  new DefaultFacebookClient("<access token>", Version.VERSION_13_0);
fbClient.setHeaderAuthorization(true);
JsonObject message = new JsonObject();
// fill message JSON here - or use WABP objects here 
Body body = Body.withData(message);
JsonObject result = 
  fbClient.publish("FROM_PHONE_NUMBER_ID/messages", JsonObject.class, body);
{% endhighlight %}