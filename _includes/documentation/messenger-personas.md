See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform/send-messages/personas/" class="badge badge-primary">Personas API documentation</a>

The Persona API allows Facebook pages to use virtual persons while sending message with the Send API. With these persons it is possible to show users different contact persons. The contact person has a name an a profile picture. Communication is more personal and users will know who they are talking to, not an abstract company.

### Create a new Persona

A `Persona` consists of a name, a profile picture and the persona id. While creating a new persona only the name and the profile picture url is needed. As soon as you publish this information to Facebook, you get the persona id. Usually it is the easiest way to use the `GraphResponse` type as response object.

{% highlight java %}
GraphResponse resp = facebookclient.publish("me/personas", GraphResponse.class, 
     Parameter.with("name", "John Mathew"), Parameter.with("profile_picture_url", "https://facebook.com/john_image.jpg"));
{% endhighlight %}

### Sending messages with a Persona

As soon as a new persona is created, you can use its id in a new message. The id is an additional parameter with the name `persona_id`.

{% highlight java %}
String personaId = "<persona id>";
Message message = new Message("Just a simple text");
PhoneMessageRecipient recipient = new PhoneMessageRecipient("<userPhone>");

// the access token can be found in your Facebook app in the messenger section
String pageAccessToken = "MY PAGE ACCESS TOKEN";

// create a version 3.0 client
FacebookClient pageClient = new DefaultFacebookClient(pageAccessToken, Version.VERSION_3_0);

SendResponse resp = pageclient.publish("me/messages", SendResponse.class,
     Parameter.with("recipient", recipient), // the id or phone recipient
	 Parameter.with("message", message),
	 Parameter.with("persona_id", personaId)); // one of the messages from above
{% endhighlight %}

### Guidelines for Personas
These guidelines are defined on Facebook and are copied here for convenience.

* The `name` of a persona is freeform, but Facebook recommends a first name and last initial, such as "John Z.".
* The page name of the bot will still be included at the top of the thread, even when a persona is invoked. It is not necessary to include the company name in the `name` field.
* The persona should not be overly generic.
* The persona should be clearly distinguished from the page/bot itself.
* The persona should not attempt to deceive the user.
* A persona can be created on the fly. It is not necessary to sync one's entire database of agents to Messenger Platform in advance.
* The total size of the image in `profile_picture_url` may not exceed 8MB.

