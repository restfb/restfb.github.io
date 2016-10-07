A `Message` object can contain an attachment. A simple attachment is the `MediaAttachment` and you only need to provide a URL that points to the attachment and the type of it. Available types are `IMAGE`, `VIDEO`, `AUDIO` and `FILE`.

The attachment is then added to the newly-created message. The `Message` is created like this:

{% highlight java %}
MediaAttachment image = 
     new MediaAttachment(MediaAttachment.Type.IMAGE, "http://example.com/testimage.jpg");
Message imageMessage = new Message(image);
{% endhighlight %}