See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/send-messages/template/media" class="badge badge-primary">Messenger Platform API</a>

With the Messenger Platform 2.2, the new media template type was introduced. This template allows the developer to send a message with animated content like a video or an animated gif. The animation is shown directly in the message thread. Additionally, buttons are available as optional interaction elements.

An example of this template type follows:

{% highlight java %}
MediaAttachment.MediaTemplateElement mediaTemplateElement =
     new MediaTemplateUrlElement("https://business.facebook.com/<PAGE_NAME>/videos/<NUMERIC_ID>");

// the MediaAttachment contains a list of MediaTemplateElement
MediaAttachment attachment = new MediaAttachment(Collections.singletonList(mediaTemplateElement));
Message recipient = new Message(attachment);	 
{% endhighlight %}

If a button is added to the `MediaTemplateElement`, the example code looks this:

{% highlight java %}
WebButton button = new WebButton("Title", "<WEB_URL>");

MediaAttachment.MediaTemplateElement mediaTemplateElement =
     new MediaTemplateAttachmentElement(MediaAttachment.MediaType.IMAGE, "<ATTACHMENT_ID>");

mediaTemplateElement.addButton(button);

// the MediaAttachment contains a list of MediaTemplateElement
MediaAttachment attachment = new MediaAttachment(Collections.singletonList(mediaTemplateElement));
Message recipient = new Message(attachment);	 
{% endhighlight %}

The `MediaTemplateAttachmentElement` is generated with an attachment id and a `MediaType` as seen in the example above. 

An alternative way to generate the `MediaTemplateElement` is the `MediaTemplateUrlElement`. A Facebook URL is used to generate the `MediaTemplateElement` and only special URLs are allowed. The `MediaType` is not needed here, because RestFB detects the type automatically according to the given URL.  The allowed URL list follows:

| Media Type | Media Source | URL Format |
| ---------- | ------------ | ---------- |
| Video | Facebook Page | https://business.facebook.com/&lt;PAGE_NAME&gt;/videos/&lt;NUMERIC_ID&gt; |
| Video | Facebook Account | https://www.facebook.com/&lt;USERNAME&gt;/videos/&lt;NUMERIC_ID&gt; |
| Image | Facebook Page | https://business.facebook.com/&lt;PAGE_NAME&gt;/photos/&lt;NUMERIC_ID&gt; |
| Image | Facebook Account | https://www.facebook.com/photo.php?fbid=&lt;NUMERIC_ID&gt; |

