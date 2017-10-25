See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/discovery/messenger-codes" class="label label-primary">Messenger Code API</a>

To advertise your Facebook page and let the user talk to you with the messenger you can use the Messenger Codes.

Messenger Coder are similar to the QR-codes widly used in different places, but the are designed as circles and 
after scanning such a code the messenger app connects to the page.
{% highlight java %}
JsonObject result = 
   facebookClient.publish("me/messenger_codes", 
   JsonObject.class, // result type
   Parameter.with("type", "standard"),  // type
   Parameter.with("image_size", 1000), // image size
   Parameter.with("data", new BasicRefdata("billboard-ad")); // data
{% endhighlight %}