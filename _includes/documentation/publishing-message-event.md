See <a target="_blank" href="http://developers.facebook.com/docs/api#editing" class="label label-primary">Graph API documentation</a>

{% highlight java %}
// Publishing a simple message.
// GraphResponse represents any Facebook Graph response that has an ID property.
// The GraphResponse type supports the optional post_id field

GraphResponse publishMessageResponse =
  facebookClient.publish("me/feed", GraphResponse.class,
    Parameter.with("message", "RestFB test"));

out.println("Published message ID: " + publishMessageResponse.getId());

// Publishing an event

Date tomorrow = new Date(currentTimeMillis() + 1000L * 60L * 60L * 24L);
Date twoDaysFromNow = new Date(currentTimeMillis() + 1000L * 60L * 60L * 48L);

GraphResponse publishEventResponse = facebookClient.publish("me/events", GraphResponse.class,
  Parameter.with("name", "Party"), Parameter.with("start_time", tomorrow),
    Parameter.with("end_time", twoDaysFromNow));

out.println("Published event ID: " + publishEventResponse.getId());
{% endhighlight %}