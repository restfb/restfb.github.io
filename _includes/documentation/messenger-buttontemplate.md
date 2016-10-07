Facebook allows more complex objects and with these it is possible to define postbacks the user can use.

The postback is a button that is presented to the user in the messenger. On click, a specially-defined string is sent back to the bot via the webhook api so the bot knows which button was pressed.

Like the postback button, there exists a `WebButton`. A click on that button directs the user to a webpage.

In this example we create both types of buttons and add them to a `Message`.

{% highlight java %}
ButtonTemplatePayload payload = new ButtonTemplatePayload("TEMPLATE TITLE");

// build a new button that links to a web url
WebButton webButton = new WebButton("EXAMPLE TITLE", "http://example.org/sample.html");

// build a button that sends a postback
PostbackButton postbackButton = new PostbackButton("EXAMPLE TITLE", "POSTBACK_STRING");

payload.addButton(webButton);
payload.addButton(postbackButton);

TemplateAttachment templateAttachment = new TemplateAttachment(payload);
Message imageMessage = new Message(templateAttachment);
{% endhighlight %}