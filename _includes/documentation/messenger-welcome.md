A special use case for the new messages is the welcome message. You can set a special message on a page that is send as soon as a new user starts a conversation with your page.

This welcome message contains three parameters: `setting_type`, `thread_state` and `call_to_actions`. 

Facebook expects that `setting_type` and `thread_state` are used as they define in the documentatio and you should not modify them. Only the `call_to_actions` is the parameter that you have to change modify the welcome message. It's a list of messages and these messages may be created as explained in the chapters above. 

Now we dive into coding. We configure a welcome message and send it to Facebook.

First we have to create some `Parameter` objects.

{% highlight java %}
Parameter settingType = Parameter.with("setting_type", "call_to_actions");
Parameter threadState = Parameter.with("thread_state", "new_thread");
{% endhighlight %}

Now a message object is created and added to our convenience object `CallToAction` to make the process a bit more easy.
In our example we only create a simple text message, but it's possible to create more complicated objects.

{% highlight java %}
Message simpleTextMessage = new Message("Welcome and chat with the Testbot");
CallToAction welcome = new CallToAction(simpleTextMessage);

List<CallToAction> actionList = new ArrayList<CallToAction>();
actionList.add(welcome);
{% endhighlight %}

After creating all the objects we can wire everything together and send it to Facebook.

{% highlight java %}
// we assume there's already a FacebookClient
JsonObject response = client.publish("<pageid>/thread_settings", 
     JsonObject.class, // the returned result as JsonObject
     settingType, // the setting type
     threadState, // the thread state
     Parameter.with("call_to_actions", actionList)); // our simple text message
{% endhighlight %}

If the request was successful you can check the result JSON and it looks like:

{% highlight javascript %}
{
    "result": "Successfully added new_thread's CTAs"
}
{% endhighlight %}
