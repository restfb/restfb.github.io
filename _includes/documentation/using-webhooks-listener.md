Webhooks are a great feature, but using them is not that easy. The objects have a complex structure and mostly in development the `changes` or the `MessagingItem` objects are used.
These two object classes are the important objects of every webhook and so we have implemented a helper class that gives developers the opportunity to implement a suitable listener.
The object structure is run through and a callback method is called for each relevant `Value` or` MessagingItem` object.
So that developers can write a clear class, we have prepared an abstract class that should be used as a basis.

As an example, we would like to react to `FeedCommentValue` changes. To do this, we first implement a short class:

{% highlight java %}
class MyFeedCommentListener extends AbstractWebhookChangeListener {
    @Override
    public void feedCommentValue(FeedCommentValue feedCommentValue) {
     // do some stuff with the FeedCommentValue here
    }
}
{% endhighlight %}

Then we register the listener and pass a `WebhookObject`. And the listener is already active.

{% highlight java %}
Webhook webhook = new Webhooks();
webhook.registerListener(new MyFeedCommentListener());
webhook.process(webhookObject);
{% endhighlight %}

If you want to react to a MessagingItem instead of the changes, the class must be derived from the `AbstractWebhookMessagingListener`.