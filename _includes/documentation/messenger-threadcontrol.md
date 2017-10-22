See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/reference/handover-protocol" class="label label-primary">Handover protocol documentation</a>

With Graph API 2.6, Facebook supports the Hadover Protocol API. This API is used to allow several applications to
work on the Messenger Platform of one page. So the primary message receiver can be changed via API. 

For example you can switch between a chatbot that answers to incoming messages and a human agent who has to take over the conversation as soon as the chatbot is not able to fulfill the request or answer the question. It's even possible to switch between dedicated chatbots.

To pass the thread control to another app, you can simply use this call:

{% highlight java %}
GraphResponse result = 
   facebookClient.publish("me/pass_thread_control", 
   GraphResponse.class, // result type
   Parameter.with("recipient", new IdMessageRecipient("<PSID>")),  // recipient
   Parameter.with("target_app_id", 123456789), // app
   Parameter.with("metadata", "String to pass to ...")); // metadata
{% endhighlight %}

If the primary receiver app likes to take back the control, we have to use another request and this will look like this:

{% highlight java %}
GraphResponse result = 
   facebookClient.publish("me/take_thread_control", 
   GraphResponse.class, // result type
   Parameter.with("recipient", new IdMessageRecipient("<PSID>")),  // recipient
   Parameter.with("metadata", "String to pass to ...")); // metadata
{% endhighlight %}
