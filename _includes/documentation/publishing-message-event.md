See <a target="_blank" href="http://developers.facebook.com/docs/api#editing">Graph API documentation</a>

{% highlight java %}
// Publishing a simple message.
// FacebookType represents any Facebook Graph Object that has an ID property.

FacebookType publishMessageResponse =
  facebookClient.publish("me/feed", FacebookType.class,
    Parameter.with("message", "RestFB test"));

out.println("Published message ID: " + publishMessageResponse.getId());

// Publishing an event

Date tomorrow = new Date(currentTimeMillis() + 1000L * 60L * 60L * 24L);
Date twoDaysFromNow = new Date(currentTimeMillis() + 1000L * 60L * 60L * 48L);

FacebookType publishEventResponse = facebookClient.publish("me/events", FacebookType.class,
  Parameter.with("name", "Party"), Parameter.with("start_time", tomorrow),
    Parameter.with("end_time", twoDaysFromNow));

out.println("Published event ID: " + publishEventResponse.getId());
{% endhighlight %}