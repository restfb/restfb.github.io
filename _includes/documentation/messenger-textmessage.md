Now we have a recipient and need something we want to send to the recipient.

The simplest message you can send to a user is the text message. To generate a text
message simply need to generate a `Message` object and use the `String` constructor.

An example looks like this:

{% highlight java %}
Message simpleTextMessage = new Message("Just a simple text");
{% endhighlight %}