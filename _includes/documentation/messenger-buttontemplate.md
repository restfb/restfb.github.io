Facebook allows more complex objects and with these it is possible to define postbacks the user can use. 

The postback is a button that is presented to the user in the messenger. On click a special defined string is send back to the bot via the webhook api. So the bot knows which button was pressed.

Like the postback button there exists a `WebButton`. The click on that button directs the user to a webpage.

In this example we create both types of buttons and add them to a `Message`.

{% highlight java %}
ButtonTemplatePayload payload = new ButtonTemplatePayload();

// build a new button that links to a web url
WebButton webButton = new WebButton("EXAMPLE TITLE", "http://example.org/sample.html");

// build a button that sends a postback
PostbackButton postbackButton = new PostbackButton("EXAMPLE TITLE", "POSTBACK_STRING");

payload.add(webButton);
payload.add(postbackButton);

TemplateAttachment templateAttachment = new TemplateAttachment(payload);
Message imageMessage = new Message(templateAttachment);
{% endhighlight %}