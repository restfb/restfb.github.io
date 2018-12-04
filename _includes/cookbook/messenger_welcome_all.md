The messenger welcome screen is the entry point for a user to interact with your Facebook chat bot.
Because every bot is different, there are several options for the welcome screen. But sometimes you need to
set more than one option. Normally, you need to send the `get_started` button payload, the greeting text, and the persistent menu as discrete calls. However, there is a way to perform these 3 calls all at once:

{% highlight java %}
JsonObject response = client.publish("me/messenger_profile",
     JsonObject.class,
     Parameter.with("get_started", new CallToAction("GET_ME_STARTED_PAYLOAD")),
     Parameter.with("greeting", asList(greeting)),
     Parameter.with("persistent_menu", asList(menu)));
{% endhighlight %} 

As you can see, the `get_started`, the `greeting`, and the `persistent_menu` parameter are passed in a single call.