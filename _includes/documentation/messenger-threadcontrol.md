See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/reference/handover-protocol" class="label label-primary">Handover protocol documentation</a>

As of Graph API 2.6, Facebook supports the Handover Protocol API. This API is used to allow several applications to
work on the Messenger Platform of one page. The primary message receiver can be changed via the API. 

For example, you can switch between a chatbot that answers to incoming messages and a human agent who has to take over the conversation as soon as the chatbot is not able to fulfill the request or answer the question. It's even possible to switch between dedicated chatbots.

To pass the thread control to another app, you can simply use this call:

{% highlight java %}
GraphResponse result = 
   facebookClient.publish("me/pass_thread_control", 
   GraphResponse.class, // result type
   Parameter.with("recipient", new IdMessageRecipient("<PSID>")),  // recipient
   Parameter.with("target_app_id", 123456789), // app
   Parameter.with("metadata", "String to pass to ...")); // metadata
{% endhighlight %}

If the primary receiver app wishes to take back the control, we have to use another request and it will look like this:

{% highlight java %}
GraphResponse result = 
   facebookClient.publish("me/take_thread_control", 
   GraphResponse.class, // result type
   Parameter.with("recipient", new IdMessageRecipient("<PSID>")),  // recipient
   Parameter.with("metadata", "String to pass to ...")); // metadata
{% endhighlight %}

### Fetch secondary receivers
The primary receiver needs a list of secondary receivers to pass the control to one of them. This list can easily be obtained by calling the Graph API. An example call looks like:

{% highlight java %}
Connection<Application> appConnection = 
	facebookClient.fetchConnection("/me/secondary_receivers", Application.class, Parameter.with("fields","id,name,link,daily_active_users"));
{% endhighlight %}

The `fields` parameter is optional and can be omitted. In that case, only `id` and `name` are provided by Facebook. If you need the applications to be prefilled with additional values, you have to add the `fields` parameter like in the example above. 