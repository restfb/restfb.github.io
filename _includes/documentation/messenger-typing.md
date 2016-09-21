Sometimes you need to send a large text to a recipient. Using the messenger platform this can be done in a very small amount of time. Because this is not a natural behavior for a normal user, it is possible to simulate typing so you let the user think she is talking to a human being.

RestFB supports this with a special enum called `SenderActionEnum`. In the following example, you can see how the typing simulation can be started.

{% highlight java %}
IdMessageRecipient recipient = new IdMessageRecipient("<userID>");
Parameter senderActionParam = Parameter.with("sender_action", SenderActionEnum.typing_on);
Parameter recipientParam = Parameter.with("recipient", recipient);
SendResponse resp = pageclient.publish("me/messages", SendResponse.class,
     senderActionParam, // the sender action
     recipientParam); // the recipient
{% endhighlight %}

To stop the typing you can simply use the `SenderActionEnum.typing_off` instead.

The `SenderActionEnum.mark_seen` action is very interesting. With this, you are able to show the recipient that you've read his/her message. This is useful to give the user a good experience and the feeling he/she is talking to a human although it is a bot.