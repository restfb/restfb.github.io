See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/discovery/welcome-screen" class="badge badge-primary">Messenger Platform API</a>

<div class="alert alert-warning">
	<h4>Remove the deprecated <code>call_to_actions</code> from <code>thread_settings</code> endpoint</h4>
	<div>
	 The old <code>thread_settings</code> endpoint is deprecated and you should remove any configuration you made earlier. In following sections, you will learn the current way to add the greeting text and so on. Use this snippet to clean your bot's welcome screen:
<div markdown="1">
{% highlight java %}
fbClient.deleteObject("/me/thread_settings", 
     Parameter.with("setting_type","call_to_actions"), 
     Parameter.with("thread_state","new_thread"));
{% endhighlight %}
</div>
	</div>
</div>

The welcome screen is the first thing a user sees from a Facebook chat bot. On this screen, the user can learn what functionality the bot offers and therefore some basic information about this is presented. The name, profile picture, and cover photo from the Facebook page are shown along with the responsiveness of the bot.

To make it easier for the user to start a conversation with the bot, the developer can use 2 approaches: the "Get Started" button and the Greeting Text.

### The `Get Started` button

Let's begin with the "Get Started" button. The button text cannot be changed, but you can define the postback payload. As soon as a user clicks on the button, the payload is sent to the webhook and the chat bot receives the request.

To generate the encapsulated payload, we start with a `CallToAction` object. It is initialized with the payload `String`. This object is published to the Facebook Graph API. Please see the following example:

{% highlight java %}
CallToAction getStartedPayload = new CallToAction("GET_STARTED_PAYLOAD");

// we assume there's already a FacebookClient
JsonObject response = client.publish("me/messenger_profile", 
     JsonObject.class, // the returned result as JsonObject
	 Parameter.with("get_started", getStartedPayload));
{% endhighlight %}

### The greeting text

The first opportunity to tell a person why the should chat with your bot is the greeting text. You can include a short description of the bot in your greeting text. It can also be used to show a person what the style of your bot is.

To add text, you only need a `Greeting` object. This object has several constructors and the simplest way to create the object is a plain `String`. This results in a `default` greeting text. If you would like to add a locale-specific message, you can add a locale as `String` or a `Locale` object in the constructor. In the following example you see the construction of a `default` text and a text with a `en_US` locale. We use the Java `Locale` object in the constructor.

Afterwards, you simply publish the `Greeting` objects as a list in a `Parameter` object to the `messenger_profile` endpoint. 

{% highlight java %}
Greeting defaultLocaleGreetingText = new Greeting("Hello world");
Greeting usLocaleGreetingText= new Greeting(Locale.US, "Timeless apparel for the masses.");

// we assume there's already a FacebookClient
JsonObject response = client.publish("me/messenger_profile", 
     JsonObject.class, // the returned result as JsonObject
	 Parameter.with("greeting", Arrays.asList(defaultLocaleGreetingText, usLocaleGreetingText)));
{% endhighlight %}

### Personalize your greeting text

Facebook supports a way to personalize the greeting text. You need to add a placeholder in the text template. There are placeholders for first, last, and full name.

{% raw %}
<ul class="list-group">
	<li class="list-group-item">{{user_first_name}} - user first name</li>
	<li class="list-group-item">{{user_last_name}} - user last name</li>
	<li class="list-group-item">{{user_full_name}} - user full name</li>
</ul>
{% endraw %}

An example greeting text template looks like this:

{% highlight java %}
{% raw %}
Greeting defaultLocaleGreetingTemplate = new Greeting("Hello {{user_first_name}}");
{% endraw %}
// we assume there's already a FacebookClient
JsonObject response = client.publish("me/messenger_profile", 
     JsonObject.class, // the returned result as JsonObject
	 Parameter.with("greeting", Arrays.asList(defaultLocaleGreetingText)));
{% endhighlight %}
