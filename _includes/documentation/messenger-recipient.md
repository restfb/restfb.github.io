Sending a message to a user requires a unique recipient identifier. There are three types of identifiers that are supported by the `Send API`.

The first is the `id`-identifier. You can get the recipient `id` as soon as a user sends a message to your bot. Please be aware of the fact that the `recipient id` is *not* the user id. If you try to send a message to a `user id` this will not work. You are required to use the `recipient id`.

If you received a message and took the `id` from that message you can create a new `IdMessageRecipient` with this simple line of code:

{% highlight java %}
IdMessageRecipient recipient = new IdMessageRecipient("<userID>");
{% endhighlight %}

The second identifier type is the phone number of the user you try to contact. Facebook only sends a message to a phone number if there is a certain level of confidence the the phone number can be reached.

{% highlight java %}
PhoneMessageRecipient recipient = new PhoneMessageRecipient("<userPhone>");
{% endhighlight %}

And last, but not least, there is the `user_ref`. This reference is fetched from a webhook message and used to create a `UserRefMessageRecipient` object. The `user_ref` is send to the webhook as soon as the <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/discovery/checkbox-plugin">Facebook Checkbox Plugin</a> is used and a user opt-in to receive messages from the website, that shows this plugin. 

The code to create a `UserRefMessageRecipient` is:

{% highlight java %}
UserRefMessageRecipient recipient = new UserRefMessageRecipient("<userRef>");
{% endhighlight %}