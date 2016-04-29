A more complex example is the "generic" template. 

It may contain some of the so called bubbles that are aligned in a horizontal order and the user may switch between them. Every `Bubble` can contain further information like subtitles and image and the buttons we already saw in the example before.

The `GenericTemplate` allows the developer to create great looking messages the user can interact in a very new way. 

{% highlight java %}
GenericTemplatePayload payload = new GenericTemplatePayload();

// create a bubble with a web button
Bubble firstBubble = new Bubble("Title of first bubble");
WebButton webButton = new WebButton("EXAMPLE TITLE", "http://example.org/sample.html");
firstBubble.add(webButton);

// create a bubble with a postback button
Bubble secondBubble = new Bubble("Title of second bubble");
PostbackButton postbackButton = new PostbackButton("EXAMPLE TITLE", "POSTBACK_STRING");
secondBubble.add(postbackButton);

payload.add(firstBubble);
payload.add(secondBubble);

TemplateAttachment templateAttachment = new TemplateAttachment(payload);
Message imageMessage = new Message(templateAttachment);
{% endhighlight %}