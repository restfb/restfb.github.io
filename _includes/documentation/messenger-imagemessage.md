A `Message` object can contain an attachment. A simple attachment is the `ImageAttachment` and you only need to provide a URL that points to a image.

The image attachment is then added to the newly-created message. The `Message` is created like this:

{% highlight java %}
ImageAttachment image = new ImageAttachment("http://example.com/testimage.jpg");
Message imageMessage = new Message(image);
{% endhighlight %}