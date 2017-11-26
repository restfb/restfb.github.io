See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/send-messages/template/media" class="label label-primary">Messenger Platform API</a>

With the messenger platform 2.2 the new media template type was introduced. This template allows the developer to send a message with animated content like video or animated gif. Additionally buttons are allowed as optional interaction elements. The animation is shown directly in the message thread.

Here, you see an example of this template type:

{% highlight java %}
MediaAttachment.MediaTemplateElement mediaTemplateElement =
     new MediaTemplateUrlElement("https://business.facebook.com/<PAGE_NAME>/videos/<NUMERIC_ID>");

// the MediaAttachment contains a list of MediaTemplateElements
MediaAttachment attachment = new MediaAttachment(Collections.singletonList(mediaTemplateElement));
Message recipient = new Message(attachment);	 
{% endhighlight %}

If a button is added to the `MediaTemplateElement` the example code looks this:

{% highlight java %}
WebButton button = new WebButton("Title", "<WEB_URL>");

MediaAttachment.MediaTemplateElement mediaTemplateElement =
     new MediaTemplateAttachmentElement(MediaAttachment.MediaType.IMAGE, "<ATTACHMENT_ID>");

mediaTemplateElement.addButton(button);

// the MediaAttachment contains a list of MediaTemplateElements
MediaAttachment attachment = new MediaAttachment(Collections.singletonList(mediaTemplateElement));
Message recipient = new Message(attachment);	 
{% endhighlight %}

The `MediaTemplateAttachmentElement` is generated with a attachment id and then you have to provide the correct `MediaType` as seen in the example above. 

An alternative way to generate the `MediaTemplateElement` is the `MediaTemplateUrlElement`. A Facebook URL is used to generate the `MediaTemplateElement` and only special urls are allowed. The `MediaType` is not needed here, because RestFB detects the type automatically according to the given URL. Check the allowed URL list here:

| Media Type | Media Source | URL Format |
| ---------- | ------------ | ---------- |
| Video | Facebook Page | https://business.facebook.com/<PAGE_NAME>/videos/<NUMERIC_ID> |
| Video | Facebook Account | https://www.facebook.com/<USERNAME>/videos/<NUMERIC_ID>/ |
| Image | Facebook Page | https://business.facebook.com/<PAGE_NAME>/photos/<NUMERIC_ID> |
| Image | Facebook Account | https://www.facebook.com/photo.php?fbid=<NUMERIC_ID> |

