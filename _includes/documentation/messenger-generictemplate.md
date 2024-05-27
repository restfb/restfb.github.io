A more complex example is the "generic" template.

It may contain some of the so-called "bubbles" that are horizontally-aligned and the user 
can switch between them. Switching between bubbles is performed by clicking on
a arrow at the left or at the right side of the messenger view. Devices with touch 
support like smartphones can switch between these bubbles by swiping them to the left or 
right. The arrows are only visible on mouseover, so you should not be confused if you 
add more than one bubble and don't see the other bubbles at first glance.

Every `Bubble` can contain further information like subtitles and images as well as the buttons 
we already saw in the earlier example.

The `GenericTemplate` allows a developer to create great-looking messages users can 
interact with in very new ways. 

{% highlight java %}
GenericTemplatePayload payload = new GenericTemplatePayload();

// Create a bubble with a web button
Bubble firstBubble = new Bubble("Title of first bubble");
WebButton webButton = new WebButton("EXAMPLE TITLE", "http://example.org/sample.html");
firstBubble.addButton(webButton);

// Create a bubble with a postback button
Bubble secondBubble = new Bubble("Title of second bubble");
PostbackButton postbackButton = new PostbackButton("EXAMPLE TITLE", "POSTBACK_STRING");
secondBubble.addButton(postbackButton);

payload.addBubble(firstBubble);
payload.addBubble(secondBubble);

TemplateAttachment templateAttachment = new TemplateAttachment(payload);
Message imageMessage = new Message(templateAttachment);
{% endhighlight %}