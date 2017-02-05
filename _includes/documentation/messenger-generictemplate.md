A more complex example is the "generic" template.

It may contain some of the so-called "bubbles" that are horizontal aligned and the user 
can switch between them. Switching between bubbles is realised by clicking on
a arrow at the left or at the right side of the messenger view. Devices with touch 
support like smartphones can switch between these bubbles by wipe them to the left or 
right. The arrows are only visible on mouse over. So you should not be confused if you 
add more then one bubble and don't see the other bubbles at the first sight.

Every `Bubble` can contain further information like subtitles and images and the buttons 
we already saw in the example before.

The `GenericTemplate` allows a developer to create great-looking messages users can 
interact with in very new ways. 

{% highlight java %}
GenericTemplatePayload payload = new GenericTemplatePayload();

// create a bubble with a web button
Bubble firstBubble = new Bubble("Title of first bubble");
WebButton webButton = new WebButton("EXAMPLE TITLE", "http://example.org/sample.html");
firstBubble.addButton(webButton);

// create a bubble with a postback button
Bubble secondBubble = new Bubble("Title of second bubble");
PostbackButton postbackButton = new PostbackButton("EXAMPLE TITLE", "POSTBACK_STRING");
secondBubble.addButton(postbackButton);

payload.add(firstBubble);
payload.add(secondBubble);

TemplateAttachment templateAttachment = new TemplateAttachment(payload);
Message imageMessage = new Message(templateAttachment);
{% endhighlight %}