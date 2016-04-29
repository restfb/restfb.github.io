A `Message` object can contain a attachment. A simple attachment is the `ImageAttachment` and you only need to provide a URL that points to a image.

The image attachment is afterwards added to the new created message. The `Message` is created like this:

{% highlight java %}
ImageAttachment image = new ImageAttachment("http://example.com/testimage.jpg");
Message imageMessage = new Message(image);
{% endhighlight %}